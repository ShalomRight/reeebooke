import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { sql, or, like, and, inArray, eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role || null
		const userId = (session?.user as any)?.id || null

		const { searchParams } = new URL(req.url)
		const query = searchParams.get("q")?.trim() || ""

		if (!query || query.length < 2) {
			return NextResponse.json({
				bookings: [],
				services: [],
				users: [],
			})
		}

		const searchTerm = `%${query}%`

		// Search bookings (accessible to all authenticated users, but filtered by role)
		let bookingsResult: any[] = []
		if (userRole) {
			bookingsResult = await db.query.bookings.findMany({
				where: (fields: any, { or, like, and, eq }: any) => {
					const searchCondition = or(
						like(fields.userName, searchTerm),
						like(fields.phone, searchTerm),
						like(fields.email, searchTerm),
						sql`serviceId IN (SELECT id FROM services WHERE name LIKE ${searchTerm})`
					);

					if (userRole === "CLIENT" && userId) {
						return and(searchCondition, eq(fields.userId, userId));
					}
					return searchCondition;
				},
				with: {
					service: {
						columns: {
							id: true,
							name: true,
							price: true,
						},
					},
					user: {
						columns: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
				orderBy: (fields: any, { desc }: any) => [desc(fields.createdAt)],
				limit: 5,
			})
		}

		// Search services (accessible to all)
		const servicesResult = await db.query.services.findMany({
			where: (fields: any, { like }: any) => like(fields.name, searchTerm),
			columns: {
				id: true,
				name: true,
				price: true,
			},
			limit: 5,
		})

		// Search users (only for admins and super admins)
		let usersResult: any[] = []
		if (userRole && (userRole.includes("ADMIN") || userRole === "SUPER_ADMIN")) {
			usersResult = await db.query.users.findMany({
				where: (fields: any, { or, and, like, inArray, eq }: any) => {
					const searchCondition = or(
						like(fields.name, searchTerm),
						like(fields.email, searchTerm),
						like(fields.phone, searchTerm),
						like(fields.referralCode, searchTerm)
					);

					if (userRole === "ADMIN") {
						return and(
							searchCondition,
							or(
								eq(fields.id, userId),
								inArray(fields.role, ["CLIENT", "STAFF"])
							)
						);
					}
					return searchCondition;
				},
				columns: {
					id: true,
					name: true,
					email: true,
					phone: true,
					role: true,
					image: true,
					referralCode: true,
				},
				limit: 5,
			})
		}

		// Search discount codes (only for admins and super admins)
		let discountCodesResult: any[] = []
		if (userRole && (userRole.includes("ADMIN") || userRole === "SUPER_ADMIN")) {
			discountCodesResult = await db.query.discountCodes.findMany({
				where: (fields: any, { like }: any) => like(fields.code, `%${query.toUpperCase()}%`),
				columns: {
					id: true,
					code: true,
					type: true,
					value: true,
					active: true,
					usedCount: true,
				},
				limit: 5,
			})
		}

		// Search referral codes (only for super admin)
		let referralCodesResult: any[] = []
		if (userRole === "SUPER_ADMIN") {
			referralCodesResult = await db.query.referralCodes.findMany({
				where: (fields: any, { or, like }: any) => or(
					like(fields.code, `%${query.toUpperCase()}%`),
					sql`userId IN (SELECT id FROM users WHERE name LIKE ${searchTerm} OR email LIKE ${searchTerm})`
				),
				with: {
					user: {
						columns: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
				limit: 5,
			})
		}

		return NextResponse.json({
			bookings: bookingsResult.map((b: any) => ({
				id: b.id,
				type: "booking",
				title: b.service?.name || "Unknown Service",
				subtitle: `${b.userName} • ${new Date(b.date).toLocaleDateString()} at ${b.time}`,
				status: b.status,
				url: userRole && (userRole.includes("ADMIN") || userRole === "SUPER_ADMIN" || userRole === "STAFF")
					? `/admin/bookings`
					: `/dashboard`,
			})),
			services: servicesResult.map((s: any) => ({
				id: s.id,
				type: "service",
				title: s.name,
				subtitle: `$${s.price.toLocaleString()}`,
				url: "/",
			})),
			users: usersResult.map((u: any) => ({
				id: u.id,
				type: "user",
				title: u.name || "No name",
				subtitle: u.email || u.phone || "No contact info",
				role: u.role,
				image: u.image,
				referralCode: u.referralCode,
				url: userRole === "SUPER_ADMIN" ? `/admin/super?tab=users` : `/admin?tab=users`,
			})),
			discountCodes: discountCodesResult.map((d: any) => ({
				id: d.id,
				type: "discount",
				title: d.code,
				subtitle: `${d.type === "PERCENT" ? `${d.value}%` : `$${d.value}`} off • ${d.usedCount} uses`,
				active: d.active,
				url: userRole === "SUPER_ADMIN" ? `/admin/super?tab=discounts` : `/admin?tab=discounts`,
			})),
			referralCodes: referralCodesResult.map((r: any) => ({
				id: r.id,
				type: "referral",
				title: r.code,
				subtitle: `${r.user?.name || r.user?.email || "Unknown"} • ${r.usageCount} uses`,
				url: `/admin/super?tab=referrals`,
			})),
		})
	} catch (error) {
		console.error("Search error:", error)
		return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
	}
}
