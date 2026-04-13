import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users, bookings, services, ratings } from "@/src/db/schema"
import { eq, and, or } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"
import { getRatingsQuerySchema, createRatingSchema, validateRequest, validationErrorResponse } from "@/lib/validations"
import { createGetHandler, createPostHandler } from "@/lib/api-wrapper"
import { apiRateLimit, ratingRateLimit } from "@/lib/rate-limit"

async function handleGetRatings(req: NextRequest) {
		const db = getDb()
		const { searchParams } = new URL(req.url)
		const queryParams = Object.fromEntries(searchParams.entries())
		
		const validation = validateRequest(getRatingsQuerySchema, queryParams)
		if (!validation.success) {
			return validationErrorResponse(validation.error)
		}
		
		const { serviceId } = validation.data

		if (!serviceId) {
			return NextResponse.json({ error: "Service ID required" }, { status: 400 })
		}

		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		// Build where conditions
		const conditions = [eq(ratings.serviceId, serviceId)]
		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			conditions.push(eq(ratings.status, "APPROVED"))
		}

		const allRatings = await db.query.ratings.findMany({
			where: and(...conditions),
			with: {
				user: {
					columns: {
						id: true,
						name: true,
						email: true,
						image: true,
					},
				},
				service: {
					columns: {
						id: true,
						name: true,
					},
				},
			},
			orderBy: (ratings: any, { desc }: any) => [desc(ratings.createdAt)],
		})

	return NextResponse.json(allRatings)
}

async function handleCreateRating(req: NextRequest) {
	const db = getDb()
	const session = await getServerSession(getAuthOptions())

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const user = await db.query.users.findFirst({
			where: eq(users.email, session.user.email),
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const body = await req.json()
		
		const validation = validateRequest(createRatingSchema, body)
		if (!validation.success) {
			return validationErrorResponse(validation.error)
		}
		
		const { serviceId, rating, comment } = validation.data

		// Check if service exists
		const service = await db.query.services.findFirst({
			where: eq(services.id, serviceId),
		})

		if (!service) {
			return NextResponse.json({ error: "Service not found" }, { status: 404 })
		}

		// Check if user has a completed booking for this service
		const completedBooking = await db.query.bookings.findFirst({
			where: and(
				or(
					eq(bookings.userId, user.id),
					eq(bookings.email, user.email),
				),
				eq(bookings.serviceId, serviceId),
				eq(bookings.status, "COMPLETED"),
			),
		})

		if (!completedBooking) {
			return NextResponse.json(
				{ error: "You can only rate services you have completed. Please complete a booking for this service first." },
				{ status: 403 },
			)
		}

		// Check if user already rated this service
		const existingRating = await db.query.ratings.findFirst({
			where: and(
				eq(ratings.userId, user.id),
				eq(ratings.serviceId, serviceId),
			),
		})

		if (existingRating) {
			// Update existing rating
			await db.update(ratings)
				.set({
					rating,
					comment: comment || null,
					status: "PENDING",
					updatedAt: new Date().toISOString(),
				})
				.where(eq(ratings.id, existingRating.id))

			const updatedRating = await db.query.ratings.findFirst({
				where: eq(ratings.id, existingRating.id),
				with: {
					user: { columns: { id: true, name: true, email: true, image: true } },
					service: { columns: { id: true, name: true } },
				},
			})

			return NextResponse.json(updatedRating, { status: 200 })
		}

		// Create new rating
		const ratingId = crypto.randomUUID()
		await db.insert(ratings).values({
			id: ratingId,
			userId: user.id,
			serviceId,
			rating,
			comment: comment || null,
			status: "PENDING",
		})

		const newRating = await db.query.ratings.findFirst({
			where: eq(ratings.id, ratingId),
			with: {
				user: { columns: { id: true, name: true, email: true, image: true } },
				service: { columns: { id: true, name: true } },
			},
		})

	return NextResponse.json(newRating, { status: 201 })
}

export const GET = createGetHandler(handleGetRatings, {
	rateLimit: apiRateLimit,
})

export const POST = createPostHandler(handleCreateRating, {
	rateLimit: ratingRateLimit,
})
