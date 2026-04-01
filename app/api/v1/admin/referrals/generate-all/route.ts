// TODO: Review Drizzle query conversions — complex where/orderBy patterns need manual adjustment
import { authOptions } from "@/lib/auth"
import { db } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq, or, isNull } from "drizzle-orm"
import { ensureReferralCode } from "@/lib/referral-code-utils"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

/**
 * Generate referral codes for all users who don't have one
 * Only accessible by Super Admin and Admin
 */
export async function POST() {
	try {
		const session = await getServerSession(authOptions)
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		// Find all users without referral codes
		const usersWithoutCodes = await db.query.users.findMany({
			where: or(
				isNull(users.referralCode),
				eq(users.referralCode, "")
			),
			columns: {
				id: true,
				email: true,
				name: true,
				role: true,
			},
		})

		const results = {
			total: usersWithoutCodes.length,
			generated: 0,
			failed: 0,
			errors: [] as string[],
		}

		// Generate codes for each user
		for (const user of usersWithoutCodes) {
			try {
				await ensureReferralCode(user.id, user.email)
				results.generated++
			} catch (error) {
				results.failed++
				results.errors.push(`${user.email}: ${error instanceof Error ? error.message : "Unknown error"}`)
			}
		}

		return NextResponse.json({
			message: `Generated ${results.generated} referral codes. ${results.failed} failed.`,
			results,
		})
	} catch (error) {
		console.error("Generate all referral codes error:", error)
		return NextResponse.json({ error: "Failed to generate referral codes" }, { status: 500 })
	}
}

