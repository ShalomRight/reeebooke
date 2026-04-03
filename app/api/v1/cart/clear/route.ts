import { authOptions } from "@/lib/auth"
import { db } from "@/src/db"
import { users, carts } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const sessionUserEmail = session.user.email as string;
		const user = await db.query.users.findFirst({
			where: (fields, { eq }) => eq(fields.email, sessionUserEmail),
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		// Delete all cart items for this user
		await db.delete(carts).where(eq(carts.userId, user.id))

		return NextResponse.json({ success: true, message: "Cart cleared successfully" })
	} catch (error) {
		console.error("Clear cart error:", error)
		return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 })
	}
}

