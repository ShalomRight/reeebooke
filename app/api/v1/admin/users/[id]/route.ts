import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getAuthOptions } from "@/lib/auth"

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const db = getDb()
    const { id } = await params
    const session = await getServerSession(getAuthOptions())
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userRole = (session.user as any).role
    if (userRole !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await db.delete(users).where(eq(users.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
