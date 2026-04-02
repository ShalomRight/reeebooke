import { db } from "@/src/db"
import { bookings, services, photos, users } from "@/src/db/schema"
import { eq, and, gte, lt, desc, asc } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"
import { getBookingsQuerySchema, createBookingSchema, validateRequest, validationErrorResponse } from "@/lib/validations"
import { createGetHandler, createPostHandler } from "@/lib/api-wrapper"
import { apiRateLimit } from "@/lib/rate-limit"

async function handleGetBookings(req: NextRequest) {
		const { searchParams } = new URL(req.url)
		const queryParams = Object.fromEntries(searchParams.entries())
		
		const validation = validateRequest(getBookingsQuerySchema, queryParams)
		if (!validation.success) {
			return validationErrorResponse(validation.error)
		}
		
		const { date, startDate, endDate, userId, serviceId, page = 1, limit = 10, sort = "date-desc", status = "ALL" } = validation.data
		const skip = (page - 1) * limit

		if (startDate && endDate) {
			const allBookings = await db.query.bookings.findMany({
				where: and(
					gte(bookings.date, new Date(startDate).toISOString()),
					lt(bookings.date, new Date(endDate).toISOString())
				),
				columns: {
					date: true,
					time: true,
				},
			})
			return NextResponse.json(allBookings, { status: 200 })
		}

		// Build conditions array
		const conditions = []

		if (date) {
			const dateStr = new Date(date).toISOString().split('T')[0]
			const nextDate = new Date(date)
			nextDate.setDate(nextDate.getDate() + 1)
			const nextDateStr = nextDate.toISOString().split('T')[0]
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

		let orderByClause: any = [desc(bookings.date)]
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
			limit: limit,
			offset: skip,
		})

		const total = (await db.query.bookings.findMany({
			where: whereClause,
		})).length

		return NextResponse.json(
			{
				bookings: allBookings,
				pagination: {
					total,
					page,
					limit,
					pages: Math.ceil(total / limit),
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

		// Create bookings for each selected service
		const createdBookings = await Promise.all(serviceIds.map(async (serviceId: string) => {
			const bookingId = crypto.randomUUID()
			
			db.insert(bookings).values({
				id: bookingId,
				serviceId,
				date: new Date(date).toISOString(),
				time,
				paymentMethod,
				mobileProvider,
				userName,
				phone,
				email,
			}).run()

			// Create photos for this booking
			for (const url of (photoUrls || [])) {
				db.insert(photos).values({
					id: crypto.randomUUID(),
					bookingId,
					url,
				}).run()
			}

			// Fetch the complete booking with relations
			const fullBooking = await db.query.bookings.findFirst({
				where: eq(bookings.id, bookingId),
				with: {
					service: true,
					photos: true,
				},
			})

			return fullBooking
		}))

	return NextResponse.json(createdBookings, { status: 201 })
}

export const GET = createGetHandler(handleGetBookings, {
	rateLimit: apiRateLimit,
})

export const POST = createPostHandler(handleCreateBooking, {
	rateLimit: apiRateLimit,
})
