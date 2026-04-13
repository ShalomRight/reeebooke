import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { referralCodes, referralRewards } from "@/src/db/schema"
import { eq, desc } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		// Get all referral codes with user info and statistics
		const referralCodesList = await db.query.referralCodes.findMany({
			with: {
				user: {
					columns: {
						id: true,
						name: true,
						email: true,
						phone: true,
						referralPoints: true,
					},
				},
			},
			orderBy: [desc(referralCodes.createdAt)],
		})

		// Get referral rewards for statistics
		const rewardsList = await db.query.referralRewards.findMany({
			columns: {
				referrerId: true,
				referredId: true,
				points: true,
			}
		})

		// Calculate statistics for each referral code
		const codesWithStats = referralCodesList.map((code: any) => {
			// Find rewards where the referrer is the owner of this code
			const rewards = rewardsList.filter((r: any) => r.referrerId === code.userId)

			const totalPointsAwarded = rewards.reduce((sum: number, r: any) => sum + r.points, 0)
			const uniqueReferrals = new Set(rewards.map((r: any) => r.referredId)).size

			return {
				id: code.id,
				code: code.code,
				userId: code.userId,
				userName: code.user.name,
				userEmail: code.user.email,
				userPhone: code.user.phone,
				userPoints: code.user.referralPoints,
				pointsPerReferral: code.pointsPerReferral,
				usageCount: code.usageCount,
				totalPointsAwarded,
				uniqueReferrals,
				createdAt: code.createdAt,
				updatedAt: code.updatedAt,
			}
		})

		return NextResponse.json(codesWithStats)
	} catch (error) {
		console.error("Referral management error:", error)
		return NextResponse.json({ error: "Failed to fetch referral data" }, { status: 500 })
	}
}

