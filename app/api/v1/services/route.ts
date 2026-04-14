import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { services, ratings } from "@/src/db/schema"
import { eq, desc, asc, count } from "drizzle-orm"
import { stripe } from "@/lib/stripe"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"
import { getServicesQuerySchema, createServiceSchema, validateRequest, validationErrorResponse } from "@/lib/validations"

export async function GET(req: NextRequest) {
	try {
		const db = getDb()
		const { searchParams } = new URL(req.url)
		const queryParams = Object.fromEntries(searchParams.entries())
		
		const validation = validateRequest(getServicesQuerySchema, queryParams)
		if (!validation.success) {
			return validationErrorResponse(validation.error)
		}
		
		const { page, limit, sortBy, sortOrder } = validation.data
		const skip = (page - 1) * limit

		// Build order by
		let orderByClause: any
		if (sortBy === "name") {
			orderByClause = sortOrder === "asc" ? [asc(services.name)] : [desc(services.name)]
		} else if (sortBy === "price") {
			orderByClause = sortOrder === "asc" ? [asc(services.price)] : [desc(services.price)]
		} else {
			orderByClause = sortOrder === "asc" ? [asc(services.createdAt)] : [desc(services.createdAt)]
		}

		const [allServices, [{ total }]] = await Promise.all([
			db.query.services.findMany({
				with: { ratings: true },
				orderBy: orderByClause,
				limit,
				offset: skip,
			}),
			db.select({ total: count() }).from(services),
		])

		// Calculate average rating and count for each service
		const servicesWithRatings = allServices.map((service: any) => {
			const approvedRatings = service.ratings.filter((r: any) => r.status === "APPROVED")
			const ratingsCount = approvedRatings.length
			const averageRating =
				ratingsCount > 0
					? approvedRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratingsCount
					: 0

			return {
				id: service.id,
				name: service.name,
				description: service.description,
				category: service.category,
				mediaUrl: service.mediaUrl,
				price: service.price,
				stripePriceId: service.stripePriceId,
				createdAt: service.createdAt,
				updatedAt: service.updatedAt,
				rating: Math.round(averageRating * 10) / 10,
				ratingsCount,
			}
		})

		return NextResponse.json(
			{
				services: servicesWithRatings,
				pagination: {
					total,
					page,
					limit,
					pages: total > 0 ? Math.ceil(total / limit) : 0,
				},
			},
			{ status: 200 },
		)
	} catch (error: unknown) {
		console.error("Services API error:", error)
		
		const errorMessage = process.env.NODE_ENV === "development" 
			? `Failed to fetch services: ${error instanceof Error ? error.message : "Unknown error"}`
			: "Failed to fetch services"
		
		return NextResponse.json(
			{ 
				error: errorMessage,
				details: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : undefined) : undefined
			}, 
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const userRole = (session.user as { role?: string }).role

		if (!["ADMIN", "SUPER_ADMIN"].includes(userRole ?? "")) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}

		const body = await req.json()
		
		const validation = validateRequest(createServiceSchema, body)
		if (!validation.success) {
			return validationErrorResponse(validation.error)
		}
		
		const { name, price, description, category, mediaUrl } = validation.data

		let stripePriceId: string | undefined

		try {
			const product = await stripe.products.create({
				name: name,
				description: `Spa Service: ${name}`,
			})

			const priceObj = await stripe.prices.create({
				product: product.id,
				unit_amount: Math.round(price * 100),
				currency: "usd",
			})

			stripePriceId = priceObj.id
		} catch (stripeError) {
			console.error("Stripe error:", stripeError)
		}

		const serviceId = crypto.randomUUID()
		await db.insert(services).values({
			id: serviceId,
			name,
			price,
			description: description ?? null,
			category: category ?? null,
			mediaUrl: mediaUrl ?? null,
			stripePriceId: stripePriceId ?? null,
		})

		const service = await db.query.services.findFirst({
			where: eq(services.id, serviceId),
		})

		return NextResponse.json(service, { status: 201 })
	} catch (error) {
		console.error("Create service error:", error)
		return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
	}
}
