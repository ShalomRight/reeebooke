import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { messages, users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"
import { updateMessageSchema } from "@/lib/validations/messages"

// ─── GET /api/v1/messages/[id] ────────────────────────────────────────────────
// Admin only — message detail with notes
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(getAuthOptions())
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = getDb()
    const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email) })
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const message = await db.query.messages.findFirst({
      where: eq(messages.id, id),
      with: { user: true, requestedService: true, notes: true },
    })

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    // Auto-mark as read when admin opens it
    if (message.status === "unread") {
      await db.update(messages)
        .set({ status: "read", updatedAt: new Date().toISOString() })
        .where(eq(messages.id, id))
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("GET /api/v1/messages/[id] error:", error)
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 })
  }
}

// ─── PATCH /api/v1/messages/[id] ─────────────────────────────────────────────
// Admin only — update status and/or tags
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(getAuthOptions())
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = getDb()
    const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email) })
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()
    const parsed = updateMessageSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
    }

    const updateData: Record<string, string> = { updatedAt: new Date().toISOString() }
    if (parsed.data.status) updateData.status = parsed.data.status
    if (parsed.data.tags !== undefined) updateData.tags = JSON.stringify(parsed.data.tags)

    await db.update(messages).set(updateData).where(eq(messages.id, id))

    const updated = await db.query.messages.findFirst({
      where: eq(messages.id, id),
      with: { user: true, requestedService: true, notes: true },
    })

    if (!updated) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("PATCH /api/v1/messages/[id] error:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}
