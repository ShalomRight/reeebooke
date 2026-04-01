import { db } from "@/src/db"
import { users, referralCodes, referralRewards } from "@/src/db/schema"
import { eq, sql } from "drizzle-orm"

/**
 * Award referral points when a referred user completes their first payment
 * This function checks if the user was referred and awards points to the referrer
 */
export async function awardReferralPointsOnPayment(userId: string, bookingId?: string) {
	try {
		// Get the user who made the payment
		const user = await db.query.users.findFirst({
			where: eq(users.id, userId),
			columns: {
				id: true,
				referredById: true,
				name: true,
			},
		})

		if (!user || !user.referredById) {
			return null // User was not referred, no points to award
		}

		// Check if referral points have already been awarded for this user
		const existingReward = await db.query.referralRewards.findFirst({
			where: eq(referralRewards.referredId, user.id),
		})

		if (existingReward) {
			return null // Points already awarded for this referral
		}

		// Get referral code configuration and referrer info
		const referralCode = await db.query.referralCodes.findFirst({
			where: eq(referralCodes.userId, user.referredById),
		})

		const points = referralCode?.pointsPerReferral || 100

		// Get referrer info for email
		const referrer = await db.query.users.findFirst({
			where: eq(users.id, user.referredById),
			columns: {
				name: true,
				email: true,
				referralPoints: true,
			},
		})

		// Award points to the referrer
		db.update(users)
			.set({ referralPoints: sql`${users.referralPoints} + ${points}` })
			.where(eq(users.id, user.referredById))
			.run()

		// Get updated referrer points
		const updatedReferrer = await db.query.users.findFirst({
			where: eq(users.id, user.referredById),
			columns: { referralPoints: true },
		})

		// Update referral code usage count
		if (referralCode) {
			db.update(referralCodes)
				.set({ usageCount: sql`${referralCodes.usageCount} + 1` })
				.where(eq(referralCodes.id, referralCode.id))
				.run()
		}

		// Create referral reward record
		db.insert(referralRewards)
			.values({
				id: crypto.randomUUID(),
				referrerId: user.referredById,
				referredId: user.id,
				points,
				bookingId: bookingId || null,
			})
			.run()

		console.log(`Referral points awarded: ${points} points to user ${user.referredById} for referral ${user.id}`)

		// Return referrer info for email
		return {
			referrerEmail: referrer?.email || null,
			referrerName: referrer?.name || null,
			pointsEarned: points,
			totalPoints: updatedReferrer?.referralPoints || 0,
		}
	} catch (error) {
		console.error("Failed to award referral points:", error)
		// Don't throw - referral rewards are not critical to payment flow
		return null
	}
}
