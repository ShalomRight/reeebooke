import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const db = getDb()
    const session = await getServerSession(getAuthOptions())
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json() as { currentPassword?: string; newPassword?: string }
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, (session.user as any).id),
    })

    if (!user || !user.password) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const isCorrectPassword = await bcrypt.compare(currentPassword, user.password)
    if (!isCorrectPassword) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, (session.user as any).id))

    return NextResponse.json({ message: "Password updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
  }
}
