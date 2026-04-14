
import { getDb } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { sendEmail } from "@/lib/email-service"
import { getPasswordResetSuccessEmail } from "@/lib/email-templates/auth"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
	try {
		const db = getDb()
		const { token, email, newPassword } = await req.json() as { token: string; email: string; newPassword: string }

		if (!token || !email || !newPassword) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
		}

		if (newPassword.length < 6) {
			return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
		}

		// Find user with valid reset token
		const user = await db.query.users.findFirst({
			where: (fields: any, { eq }: any) => eq(fields.email, email),
		})

		if (!user || !user.resetToken || user.resetToken !== token) {
			return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
		}

		if (!user.resetTokenExpiry || new Date(user.resetTokenExpiry) < new Date()) {
			return NextResponse.json({ error: "Reset token has expired" }, { status: 400 })
		}

		// Hash new password and clear reset token
		const hashedPassword = await bcrypt.hash(newPassword, 10)
		await db.update(users)
			.set({
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiry: null,
			})
			.where(eq(users.id, user.id))

		// Send success email
		try {
			await sendEmail({
				to: email,
				subject: "Password Reset Successful - Luxury Nail Spa",
				html: getPasswordResetSuccessEmail(user.name || "there"),
			})
		} catch (emailError) {
			console.error("Failed to send password reset success email:", emailError)
			// Don't fail the reset if email fails
		}

		return NextResponse.json({ message: "Password reset successfully" })
	} catch (error) {
		console.error("Reset password error:", error)
		return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
	}
}

