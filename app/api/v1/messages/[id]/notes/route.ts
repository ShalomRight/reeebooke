import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { messageNotes, messages, users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"
import { addNoteSchema } from "@/lib/validations/messages"

// ─── POST /api/v1/messages/[id]/notes ────────────────────────────────────────
// Admin only — add an internal note to a message
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const message = await db.query.messages.findFirst({ where: eq(messages.id, id) })
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    const body = await req.json()
    const parsed = addNoteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
    }

    const noteId = crypto.randomUUID()
    await db.insert(messageNotes).values({
      id:        noteId,
      messageId: id,
      content:   parsed.data.content,
    })

    const note = await db.query.messageNotes.findFirst({
      where: eq(messageNotes.id, noteId),
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    console.error("POST /api/v1/messages/[id]/notes error:", error)
    return NextResponse.json({ error: "Failed to add note" }, { status: 500 })
  }
}
