import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/src/db"
import { messages, users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import currentUserServer from "@/lib/currentUserServer"

const adminComposeSchema = z.object({
	userId: z.string().uuid(),
	subject: z.string().min(1).max(200),
	body: z.string().min(1).max(5000),
})

// POST /api/v1/messages/admin-compose - Admin initiates conversation with user
export async function POST(request: NextRequest) {
	// Admin only
	const currentUser = await currentUserServer()
	if (!currentUser?.isAdmin && !currentUser?.isSuperAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	// Validate body
	let body: z.infer<typeof adminComposeSchema>
	try {
		const json = await request.json()
		body = adminComposeSchema.parse(json)
	} catch {
		return NextResponse.json({ error: "Invalid body" }, { status: 400 })
	}

	const db = getDb()

	// Verify target user exists
	const targetUser = await db.query.users.findFirst({
		where: eq(users.id, body.userId),
	})

	if (!targetUser) {
		return NextResponse.json({ error: "User not found" }, { status: 404 })
	}

	// Create the message (admin-initiated, so it's from admin to user)
	const now = new Date().toISOString()
	const messageId = crypto.randomUUID()

	await db.insert(messages).values({
		id: messageId,
		email: targetUser.email,
		name: targetUser.name,
		userId: targetUser.id,
		source: "admin_initiated",
		intent: "general",
		subject: body.subject,
		body: body.body,
		isFromAdmin: 1, // This is from admin
		status: "read", // Mark as read since admin sent it
		tags: "[]",
		createdAt: now,
		updatedAt: now,
	})

	// Return the created message
	const created = await db.query.messages.findFirst({
		where: eq(messages.id, messageId),
		with: {
			user: { columns: { name: true, email: true } },
		},
	})

	return NextResponse.json(created, { status: 201 })
}
