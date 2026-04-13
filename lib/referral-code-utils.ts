import { getDb } from "@/src/db"
import { users, referralCodes } from "@/src/db/schema"
import { eq } from "drizzle-orm"

/**
 * Generate a unique referral code for a user
 * Format: STRING + NUMBER (e.g., "JOHN123", "USER456")
 */
export async function generateReferralCode(userId: string, email: string): Promise<string> {
	// Extract base string from email (first 4-6 letters, uppercase, alphanumeric only)
	const emailPrefix = email.split("@")[0].toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
	
	// Ensure we have at least 3 characters for the string part
	let stringPart = emailPrefix.length >= 3 ? emailPrefix : "USER"
	
	// If string part is too short, pad with "USER"
	if (stringPart.length < 3) {
		stringPart = "USER" + stringPart.slice(0, 2)
	}
	
	// Start with a random 3-4 digit number
	let numberPart = Math.floor(100 + Math.random() * 900).toString() // 100-999
	let code = `${stringPart}${numberPart}`
	let counter = 1

	// Ensure uniqueness
	const db = getDb()
	while (true) {
		const existing = await db.query.users.findFirst({
			where: eq(users.referralCode, code),
		})

		if (!existing) {
			break
		}

		// If code exists, increment the number part
		numberPart = (parseInt(numberPart) + counter).toString()
		
		// If number gets too long (more than 6 digits), reset with new random number
		if (numberPart.length > 6) {
			numberPart = Math.floor(1000 + Math.random() * 9000).toString() // 1000-9999
		}
		
		code = `${stringPart}${numberPart}`
		counter++

		// Safety limit to prevent infinite loop
		if (counter > 10000) {
			// Last resort: use timestamp-based code
			const timestamp = Date.now().toString().slice(-6)
			code = `${stringPart}${timestamp}`
			break
		}
	}

	return code
}

/**
 * Ensure user has a referral code and ReferralCode record
 * This should be called whenever a user is created or accessed
 */
export async function ensureReferralCode(userId: string, email: string): Promise<string> {
	const db = getDb()
	const user = await db.query.users.findFirst({
		where: eq(users.id, userId),
		columns: {
			id: true,
			referralCode: true,
		},
	})

	if (!user) {
		throw new Error("User not found")
	}

	let referralCode = user.referralCode

	// Generate code if user doesn't have one
	if (!referralCode) {
		referralCode = await generateReferralCode(userId, email)

		// Update user with referral code
		await db.update(users)
			.set({ referralCode })
			.where(eq(users.id, userId))
	}

	// Ensure ReferralCode record exists for tracking
	const existingCode = await db.query.referralCodes.findFirst({
		where: eq(referralCodes.code, referralCode),
	})

	if (!existingCode) {
		await db.insert(referralCodes)
			.values({
				code: referralCode,
				userId: user.id,
				pointsPerReferral: 100,
			})
	}

	return referralCode
}
