import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq, or, isNull } from "drizzle-orm"
import { ensureReferralCode } from "@/lib/referral-code-utils"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

/**
 * Generate a referral code for a single user who doesn't have one
 * Only accessible by Super Admin and Admin
 */
export async function POST() {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		// Find exactly one user without a referral code
		const userWithoutCode = await db.query.users.findFirst({
			where: or(
				isNull(users.referralCode),
				eq(users.referralCode, "")
			),
			columns: {
				id: true,
				email: true,
			},
		})

		if (!userWithoutCode) {
			return NextResponse.json({ 
				message: "No users found without a referral code." 
			}, { status: 404 })
		}
		
		try {
			await ensureReferralCode(userWithoutCode.id, userWithoutCode.email)
			return NextResponse.json({ 
				message: `Successfully generated referral code for ${userWithoutCode.email}` 
			})
		} catch (error) {
			return NextResponse.json({ 
				error: `Failed to generate code for ${userWithoutCode.email}: ${error instanceof Error ? error.message : "Unknown error"}` 
			}, { status: 500 })
		}

	} catch (error) {
		console.error("Generate single referral code error:", error)
		return NextResponse.json({ 
			error: "Failed to generate referral code" 
		}, { status: 500 })
	}
}
