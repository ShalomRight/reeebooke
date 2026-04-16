import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/src/db"
import { messages, messageNotes } from "@/src/db/schema"
import { eq, and } from "drizzle-orm"
import { z } from "zod"
import currentUserServer from "@/lib/currentUserServer"

const replySchema = z.object({
	content: z.string().min(1).max(5000),
})

// POST /api/v1/messages/[id]/reply - Admin reply to a message
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params

	// Admin only
	const currentUser = await currentUserServer()
	if (!currentUser?.isAdmin && !currentUser?.isSuperAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	// Validate body
	let body: z.infer<typeof replySchema>
	try {
		const json = await request.json()
		body = replySchema.parse(json)
	} catch {
		return NextResponse.json({ error: "Invalid body" }, { status: 400 })
	}

	const db = getDb()

	// Get the parent message
	const parentMessage = await db.query.messages.findFirst({
		where: eq(messages.id, id),
	})

	if (!parentMessage) {
		return NextResponse.json({ error: "Message not found" }, { status: 404 })
	}

	// Create the reply
	const now = new Date().toISOString()
	const replyId = crypto.randomUUID()

	await db.insert(messages).values({
		id: replyId,
		parentId: id,
		email: currentUser.email!,
		name: currentUser.name || "Admin",
		userId: currentUser.id,
		source: "admin_reply",
		intent: "general",
		subject: `Re: ${parentMessage.subject || "Your message"}`,
		body: body.content,
		isFromAdmin: 1,
		status: "read", // Admin replies are already "read" from admin perspective
		tags: "[]",
		createdAt: now,
		updatedAt: now,
	})

	// Update parent message status to "replied"
	await db
		.update(messages)
		.set({ status: "replied", updatedAt: now })
		.where(eq(messages.id, id))

	// Return the reply with relations
	const reply = await db.query.messages.findFirst({
		where: eq(messages.id, replyId),
		with: {
			user: { columns: { name: true, email: true } },
		},
	})

	return NextResponse.json(reply, { status: 201 })
}
