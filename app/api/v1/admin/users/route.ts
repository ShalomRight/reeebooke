// TODO: Review Drizzle query conversions — complex where/orderBy patterns need manual adjustment
import { authOptions } from "@/lib/auth"
import { db } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq, count, desc, asc, or, ilike, and } from "drizzle-orm"
import { canAccessResource } from "@/lib/rbac"
import { sendEmail } from "@/lib/email-service"
import { getAdminCreatedEmail, getRoleChangedEmail } from "@/lib/email-templates/roles"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}
		const userRole = (session.user as any).role
		if (!canAccessResource(userRole, "ADMIN")) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}

		const { searchParams } = new URL(req.url)
		const roleFilter = searchParams.get("role")
		const page = Number.parseInt(searchParams.get("page") || "1")
		const limit = Number.parseInt(searchParams.get("limit") || "10")
		const sort = searchParams.get("sort") || "date-desc"
		const search = searchParams.get("search") || ""
		const skip = (page - 1) * limit

		const conditions = []
		if (roleFilter && roleFilter !== "ALL") {
			conditions.push(eq(users.role, roleFilter))
		}
		if (search) {
			conditions.push(
				or(
					ilike(users.name, `%${search}%`),
					ilike(users.email, `%${search}%`)
				)
			)
		}
		const whereClause = conditions.length > 0 ? and(...conditions) : undefined

		let orderByClause: any = [desc(users.createdAt)]
		if (sort === "name-asc") {
			orderByClause = [asc(users.name)]
		} else if (sort === "name-desc") {
			orderByClause = [desc(users.name)]
		} else if (sort === "date-asc") {
			orderByClause = [asc(users.createdAt)]
		}

		const [userList, totalRows] = await Promise.all([
			db.query.users.findMany({
				where: whereClause,
				columns: {
					id: true,
					name: true,
					email: true,
					role: true,
					phone: true,
					createdAt: true,
				},
				orderBy: orderByClause,
				offset: skip,
				limit: limit,
			}),
			db.query.users.findMany({ where: whereClause }),
		])
        
        const total = totalRows.length

		return NextResponse.json({
			users: userList,
			pagination: {
				total,
				page,
				limit,
				pages: Math.ceil(total / limit),
			},
		})
	} catch (error) {
		console.error("Users API error:", error)
		return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const userRole = (session.user as any).role
		if (!canAccessResource(userRole, "ADMIN")) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}

		const { name, email, phone, password, role } = await req.json()

		// Check if user already exists
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email),
		})

		if (existingUser) {
			return NextResponse.json({ error: "User already exists" }, { status: 400 })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUserRole = role || "STAFF"
		const [newStaff] = await db.insert(users).values({
			name,
			email,
			phone,
			password: hashedPassword,
			role: newUserRole,
		}).returning()

		// Generate referral code for all users (admin, super admin, client, staff)
		try {
			const { ensureReferralCode } = await import("@/lib/referral-code-utils")
			await ensureReferralCode(newStaff.id, email)
		} catch (err) {
			console.error("Failed to generate referral code for staff:", err)
			// Don't fail user creation if referral code generation fails
		}

		// Send admin created email
		try {
			await sendEmail({
				to: email,
				subject: `Welcome ${newUserRole === "SUPER_ADMIN" ? "Super Admin" : newUserRole === "ADMIN" ? "Admin" : "Staff"} - Account Created`,
				html: getAdminCreatedEmail(name, email, newUserRole, password),
			})
		} catch (emailError) {
			console.error("Failed to send admin created email:", emailError)
			// Don't fail user creation if email fails
		}

		return NextResponse.json(newStaff, { status: 201 })
	} catch (error) {
		console.error("Create staff error:", error)
		return NextResponse.json({ error: "Failed to create staff member" }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const userRole = (session.user as any).role
		if (userRole !== "SUPER_ADMIN") {
			return NextResponse.json({ error: "Only Super Admin can manage roles" }, { status: 403 })
		}

		const { userId, role: newRole } = await req.json()

		if (userId === session.user.id) {
			return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 })
		}

		// Get current user to check old role
		const currentUser = await db.query.users.findFirst({
			where: eq(users.id, userId),
			columns: { role: true, name: true, email: true },
		})

		if (!currentUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const [updatedUser] = await db.update(users)
			.set({ role: newRole })
			.where(eq(users.id, userId))
			.returning()

		// Send role changed email
		if (currentUser.email && currentUser.role !== newRole) {
			try {
				await sendEmail({
					to: currentUser.email,
					subject: "Account Role Updated - Luxury Nail Spa",
					html: getRoleChangedEmail(currentUser.name || "there", newRole, currentUser.role),
				})
			} catch (emailError) {
				console.error("Failed to send role changed email:", emailError)
				// Don't fail role update if email fails
			}
		}

		return NextResponse.json(updatedUser)
	} catch (error) {
		console.error("Update user role error:", error)
		return NextResponse.json({ error: "Failed to update user role" }, { status: 500 })
	}
}
