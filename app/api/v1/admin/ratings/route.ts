// TODO: Review Drizzle query conversions — complex where/orderBy patterns need manual adjustment
// TODO: Review Drizzle query conversions — complex where/orderBy patterns need manual adjustment
import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { ratings } from "@/src/db/schema"
import { eq, count, desc, and } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"

// GET: List all ratings for admin (with filters)
export async function GET(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		const { searchParams } = new URL(req.url)
		const status = searchParams.get("status") // PENDING, APPROVED, REJECTED
		const serviceId = searchParams.get("serviceId")
		const page = Number.parseInt(searchParams.get("page") || "1")
		const limit = Number.parseInt(searchParams.get("limit") || "20")
		const skip = (page - 1) * limit

		const conditions = []
		if (status) {
			conditions.push(eq(ratings.status, status))
		}
		if (serviceId) {
			conditions.push(eq(ratings.serviceId, serviceId))
		}
		const whereClause = conditions.length > 0 ? and(...conditions) : undefined

		const [ratingsList, totalRows] = await Promise.all([
			db.query.ratings.findMany({
				where: whereClause,
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
							price: true,
						},
					},
				},
				orderBy: [desc(ratings.createdAt)],
				offset: skip,
				limit: limit,
			}),
			db.query.ratings.findMany({ where: whereClause }),
		])
		
		const total = totalRows.length

		return NextResponse.json({
			ratings: ratingsList,
			pagination: {
				total,
				page,
				limit,
				pages: Math.ceil(total / limit),
			},
		})
	} catch (error) {
		console.error("Get ratings error:", error)
		return NextResponse.json({ error: "Failed to fetch ratings" }, { status: 500 })
	}
}

