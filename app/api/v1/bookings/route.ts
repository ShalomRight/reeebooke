import { db } from "@/src/db"
import { bookings, photos } from "@/src/db/schema"
import { eq, and, gte, lt, desc, asc, ne, sql } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getBookingsQuerySchema, createBookingSchema, validateRequest, validationErrorResponse } from "@/lib/validations"
import { createGetHandler, createPostHandler } from "@/lib/api-wrapper"
import { apiRateLimit } from "@/lib/rate-limit"
import { normalizeBookingDateYmd, normalizeTimeTo24h } from "@/lib/booking/time"
import { isZapSlotBookable } from "@/lib/booking/slot-guard"

function isStaffRole(role: string | null | undefined) {
	return role === "ADMIN" || role === "SUPER_ADMIN" || role === "STAFF"
}

async function handleGetBookings(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const queryParams = Object.fromEntries(searchParams.entries())

	const validation = validateRequest(getBookingsQuerySchema, queryParams)
	if (!validation.success) {
		return validationErrorResponse(validation.error)
	}

	const { date, startDate, endDate, userId, serviceId, page = 1, limit = 10, sort = "date-desc", status = "ALL" } =
		validation.data
	const skip = (page - 1) * limit

	const session = await getServerSession(authOptions)
	const isStaff = isStaffRole(session?.user?.role)

	// ── Public aggregate: month heatmap (date + time only) ───────────────────
	if (startDate && endDate) {
		const startYmd = new Date(startDate).toISOString().split("T")[0]
		const endPlus = new Date(endDate)
		endPlus.setDate(endPlus.getDate() + 1)
		const endExclusive = endPlus.toISOString().split("T")[0]

		const allBookings = await db.query.bookings.findMany({
			where: and(gte(bookings.date, startYmd), lt(bookings.date, endExclusive)),
			columns: {
				date: true,
				time: true,
			},
		})
		return NextResponse.json(
			{
				bookings: allBookings,
				pagination: {
					total: allBookings.length,
					page: 1,
					limit: allBookings.length,
					pages: 1,
				},
			},
			{ status: 200 },
		)
	}

	// ── Public: slot conflict check for a single day + service (no PII) ─────
	if (date && serviceId) {
		const dateStr = new Date(date).toISOString().split("T")[0]
		const nextDate = new Date(date)
		nextDate.setDate(nextDate.getDate() + 1)
		const nextDateStr = nextDate.toISOString().split("T")[0]

		const rows = await db.query.bookings.findMany({
			where: and(
				eq(bookings.serviceId, serviceId),
				gte(bookings.date, dateStr),
				lt(bookings.date, nextDateStr),
				ne(bookings.status, "CANCELLED"),
			),
			columns: {
				id: true,
				time: true,
				serviceId: true,
				date: true,
				status: true,
			},
		})
		return NextResponse.json(
			{
				bookings: rows,
				pagination: {
					total: rows.length,
					page: 1,
					limit: rows.length,
					pages: 1,
				},
			},
			{ status: 200 },
		)
	}

	// ── Authenticated: own bookings by userId ────────────────────────────────
	if (userId) {
		if (!isStaff && session?.user?.id !== userId) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}
	} else if (!isStaff) {
		// Broad listing without user scope
		return NextResponse.json({ error: "Forbidden" }, { status: 403 })
	}

	const conditions = []

	if (date) {
		const dateStr = new Date(date).toISOString().split("T")[0]
		const nextDate = new Date(date)
		nextDate.setDate(nextDate.getDate() + 1)
		const nextDateStr = nextDate.toISOString().split("T")[0]
		conditions.push(gte(bookings.date, dateStr))
		conditions.push(lt(bookings.date, nextDateStr))
	}

	if (serviceId) {
		conditions.push(eq(bookings.serviceId, serviceId))
	}

	if (userId) {
		conditions.push(eq(bookings.userId, userId))
	}

	if (status !== "ALL") {
		conditions.push(eq(bookings.status, status))
	}

	const whereClause = conditions.length > 0 ? and(...conditions) : undefined

	let orderByClause: ReturnType<typeof desc>[] = [desc(bookings.date)]
	if (sort === "date-asc") {
		orderByClause = [asc(bookings.date)]
	}

	const allBookings = await db.query.bookings.findMany({
		where: whereClause,
		with: {
			service: true,
			photos: true,
			user: {
				columns: {
					id: true,
					name: true,
					email: true,
					phone: true,
					role: true,
				},
			},
		},
		orderBy: orderByClause,
		limit,
		offset: skip,
	})

	const countQuery = db.select({ c: sql<number>`count(*)`.mapWith(Number) }).from(bookings)
	const [countRow] = whereClause ? await countQuery.where(whereClause) : await countQuery
	const total = countRow?.c ?? 0

	return NextResponse.json(
		{
			bookings: allBookings,
			pagination: {
				total,
				page,
				limit,
				pages: Math.ceil(total / limit) || 1,
			},
		},
		{ status: 200 },
	)
}

async function handleCreateBooking(req: NextRequest) {
	const body = await req.json()

	const validation = validateRequest(createBookingSchema, body)
	if (!validation.success) {
		return validationErrorResponse(validation.error)
	}

	const { serviceIds, date, time, paymentMethod, mobileProvider, photoUrls, userName, phone, email } = validation.data

	let dateYmd: string
	let time24: string
	try {
		dateYmd = normalizeBookingDateYmd(date)
		time24 = normalizeTimeTo24h(time)
	} catch {
		return NextResponse.json({ error: "Invalid date or time" }, { status: 400 })
	}

	for (const serviceId of serviceIds) {
		const open = await isZapSlotBookable(serviceId, dateYmd, time24)
		if (!open) {
			return NextResponse.json(
				{ error: "That time slot is no longer available. Please choose another time." },
				{ status: 409 },
			)
		}
	}

	const createdIds: string[] = []

	try {
		db.transaction((tx) => {
			for (const serviceId of serviceIds) {
				const bookingId = crypto.randomUUID()
				createdIds.push(bookingId)
				tx.insert(bookings)
					.values({
						id: bookingId,
						serviceId,
						date: dateYmd,
						time: time24,
						paymentMethod,
						mobileProvider: mobileProvider ?? null,
						userName,
						phone,
						email: email ?? null,
					})
					.run()

				for (const url of photoUrls || []) {
					tx.insert(photos)
						.values({
							id: crypto.randomUUID(),
							bookingId,
							url,
						})
						.run()
				}
			}
		})
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : String(e)
		if (msg.includes("UNIQUE") || msg.includes("unique") || msg.includes("SQLITE_CONSTRAINT_UNIQUE")) {
			return NextResponse.json(
				{ error: "That time slot was just booked. Please choose another time." },
				{ status: 409 },
			)
		}
		throw e
	}

	const createdBookings = await Promise.all(
		createdIds.map((id) =>
			db.query.bookings.findFirst({
				where: eq(bookings.id, id),
				with: {
					service: true,
					photos: true,
				},
			}),
		),
	)

	return NextResponse.json(createdBookings, { status: 201 })
}

export const GET = createGetHandler(handleGetBookings, {
	rateLimit: apiRateLimit,
})

export const POST = createPostHandler(handleCreateBooking, {
	rateLimit: apiRateLimit,
})
