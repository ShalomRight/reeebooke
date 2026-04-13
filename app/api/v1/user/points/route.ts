import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const session = await getServerSession(getAuthOptions())
		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const db = getDb()
		const user = await db.query.users.findFirst({
			where: eq(users.email, session.user.email),
			with: {
				bookings: {
					where: (fields: any, { eq }: any) => eq(fields.status, "COMPLETED"),
					columns: {
						id: true,
					},
				},
			},
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const bookingPoints = user.bookings.length * 10 // 10 points per completed booking
		const totalPoints = user.referralPoints + bookingPoints

		return NextResponse.json({
			referralPoints: user.referralPoints,
			bookingPoints,
			totalPoints,
		})
	} catch (error) {
		console.error("User points error:", error)
		return NextResponse.json({ error: "Failed to fetch points" }, { status: 500 })
	}
}

