export const runtime = 'edge'

import { getDb } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { sendEmail } from "@/lib/email-service"
import { getGuestSignupEmail } from "@/lib/email-templates/auth"
import bcrypt from "bcryptjs"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const db = getDb()
		const { name, email, phone } = await req.json() as { name: string; email: string; phone: string }

		// Validate input
		if (!name || !email || !phone) {
			return NextResponse.json({ error: "Name, email, and phone number are required" }, { status: 400 })
		}

		// Check if user already exists
		const existingUser = await db.query.users.findFirst({
			where: (fields: any, { eq }: any) => eq(fields.email, email),
		})

		if (existingUser) {
			return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
		}

		// Create new guest user with a temporary password
		const tempPassword = Math.random().toString(36).slice(-12)
		const hashedPassword = await bcrypt.hash(tempPassword, 10)

		const [user] = await db.insert(users).values({
			name,
			email,
			phone,
			password: hashedPassword,
			role: "CLIENT",
		}).returning({ id: users.id })

		// Generate referral code for all users
		try {
			const { ensureReferralCode } = await import("@/lib/referral-code-utils")
			await ensureReferralCode(user.id, email)
		} catch (err) {
			console.error("Failed to generate referral code for guest user:", err)
			// Don't fail user creation if referral code generation fails
		}

		const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
		const resetLink = `${appUrl}/auth/reset-password?email=${encodeURIComponent(email)}`

		try {
			await sendEmail({
				to: email,
				subject: "Welcome to Luxury Nail Spa - Set Your Password",
				html: getGuestSignupEmail(name, email, phone, resetLink),
			})
		} catch (emailError) {
			console.error("Failed to send guest signup email:", emailError)
			// Don't fail the signup if email fails, but log it
		}

		return NextResponse.json(
			{
				success: true,
				userId: user.id,
				message: "Guest account created successfully. Check your email to set your password.",
			},
			{ status: 201 },
		)
	} catch (error) {
		console.error("Guest signup error:", error)
		return NextResponse.json({ error: "Failed to create guest account" }, { status: 500 })
	}
}
