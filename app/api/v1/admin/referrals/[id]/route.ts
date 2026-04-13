// TODO: Review Drizzle query conversions — complex where/orderBy patterns need manual adjustment
import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { referralCodes, referralRewards } from "@/src/db/schema"
import { eq, desc } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const db = getDb()
		const { id } = await params
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		// Get referral code details with all referrals
		const referralCode = await db.query.referralCodes.findFirst({
			where: eq(referralCodes.id, id),
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
		})

		if (!referralCode) {
			return NextResponse.json({ error: "Referral code not found" }, { status: 404 })
		}

		const rewards = await db.query.referralRewards.findMany({
			where: eq(referralRewards.referrerId, referralCode.userId),
			orderBy: [desc(referralRewards.createdAt)],
		})

		const referredIds = [...new Set(rewards.map((r: any) => r.referredId))]
		const referredUsers = referredIds.length > 0 ? await db.query.users.findMany({
			where: (users: any, { inArray }: any) => inArray(users.id, referredIds),
			columns: { id: true, name: true, email: true, phone: true, createdAt: true }
		}) : []
		
		const userMap = new Map(referredUsers.map((u: any) => [u.id, u]))
		const referralsByUser = rewards.reduce(
			(acc: any, reward: any) => {
				const key = reward.referredId
				if (!acc[key]) {
					acc[key] = {
						referredId: reward.referredId,
						referredUser: userMap.get(reward.referredId),
						totalPoints: 0,
						referralCount: 0,
						firstReferral: reward.createdAt,
						lastReferral: reward.createdAt,
					}
				}
				acc[key].totalPoints += reward.points
				acc[key].referralCount++
				if (reward.createdAt < acc[key].firstReferral) {
					acc[key].firstReferral = reward.createdAt
				}
				if (reward.createdAt > acc[key].lastReferral) {
					acc[key].lastReferral = reward.createdAt
				}
				return acc
			},
			{} as Record<
				string,
				{
					referredId: string
					referredUser: any
					totalPoints: number
					referralCount: number
					firstReferral: string
					lastReferral: string
				}
			>
		)

		const statistics = {
			totalReferrals: Object.keys(referralsByUser).length,
			totalPointsAwarded: rewards.reduce((sum: number, r: any) => sum + r.points, 0),
			totalRewards: rewards.length,
		}

		return NextResponse.json({
			referralCode: {
				id: referralCode.id,
				code: referralCode.code,
				pointsPerReferral: referralCode.pointsPerReferral,
				usageCount: referralCode.usageCount,
				createdAt: referralCode.createdAt,
			},
			user: referralCode.user,
			statistics,
			referralsByUser: Object.values(referralsByUser),
			recentRewards: rewards.slice(0, 50),
		})
	} catch (error) {
		console.error("Referral details error:", error)
		return NextResponse.json({ error: "Failed to fetch referral details" }, { status: 500 })
	}
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const db = getDb()
		const { id } = await params
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		const body = await req.json()
		const { pointsPerReferral } = body

		if (pointsPerReferral === undefined || pointsPerReferral < 0) {
			return NextResponse.json({ error: "Invalid points per referral" }, { status: 400 })
		}

		const [updated] = await db.update(referralCodes)
			.set({ pointsPerReferral: parseInt(pointsPerReferral) })
			.where(eq(referralCodes.id, id))
			.returning()

		return NextResponse.json(updated)
	} catch (error) {
		console.error("Update referral error:", error)
		return NextResponse.json({ error: "Failed to update referral code" }, { status: 500 })
	}
}

