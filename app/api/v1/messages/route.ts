import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { messages, users } from "@/src/db/schema"
import { and, desc, eq, isNull, or, sql } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"
import { contactFormSchema, userMessageSchema } from "@/lib/validations/messages"

// ─── GET /api/v1/messages ─────────────────────────────────────────────────────
// Admin: list all messages with optional filters
// User: list their own message threads (parent messages + replies)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(getAuthOptions())
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = getDb()
    const currentUser = await db.query.users.findFirst({ where: eq(users.email, session.user.email) })
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { searchParams } = new URL(req.url)
    const isAdmin = currentUser.role === "ADMIN" || currentUser.role === "SUPER_ADMIN"

    // Admin view: all messages with filters
    if (isAdmin) {
      const status = searchParams.get("status") ?? undefined
      const intent = searchParams.get("intent") ?? undefined
      const source = searchParams.get("source") ?? undefined

      const conditions = [or(eq(messages.parentId, ""), isNull(messages.parentId))] // Only parent messages
      if (status) conditions.push(eq(messages.status, status))
      if (intent) conditions.push(eq(messages.intent, intent))
      if (source) conditions.push(eq(messages.source, source))

      const results = await db.query.messages.findMany({
        where: and(...conditions),
        with: {
          user: true,
          requestedService: true,
          notes: true,
          replies: {
            with: { user: { columns: { name: true, email: true } } },
            orderBy: [desc(messages.createdAt)],
          },
        },
        orderBy: [desc(messages.createdAt)],
      })

      return NextResponse.json(results)
    }

    // User view: their own message threads
    const thread = searchParams.get("thread") === "true"

    if (thread) {
      // Get user's parent messages with replies
      const userMessages = await db.query.messages.findMany({
        where: and(
          eq(messages.userId, currentUser.id),
          or(eq(messages.parentId, ""), isNull(messages.parentId))
        ),
        with: {
          requestedService: true,
          replies: {
            with: { user: { columns: { name: true, email: true } } },
            orderBy: [desc(messages.createdAt)],
          },
        },
        orderBy: [desc(messages.createdAt)],
      })
      return NextResponse.json(userMessages)
    }

    // Simple list view (parent messages only)
    const results = await db.query.messages.findMany({
      where: and(
        eq(messages.userId, currentUser.id),
        isNull(messages.parentId)
      ),
      with: { requestedService: true },
      orderBy: [desc(messages.createdAt)],
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error("GET /api/v1/messages error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// ─── POST /api/v1/messages ────────────────────────────────────────────────────
// Public (contact form) or authenticated user
export async function POST(req: NextRequest) {
  try {
    const db = getDb()
    const session = await getServerSession(getAuthOptions())
    const body = await req.json()

    let messageData: {
      email: string
      name?: string | null
      userId?: string | null
      source: string
      intent: string
      subject?: string | null
      body: string
      requestedServiceId?: string | null
      requestedDate?: string | null
      requestedTimeRange?: string | null
    }

    if (session?.user?.email) {
      // Authenticated user
      const parsed = userMessageSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
      }

      const user = await db.query.users.findFirst({ where: eq(users.email, session.user.email) })
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      messageData = {
        email:              user.email,
        name:               user.name,
        userId:             user.id,
        source:             "authenticated_user",
        intent:             parsed.data.intent,
        subject:            parsed.data.subject,
        body:               parsed.data.body,
        requestedServiceId: parsed.data.requestedServiceId,
        requestedDate:      parsed.data.requestedDate,
        requestedTimeRange: parsed.data.requestedTimeRange,
      }
    } else {
      // Guest contact form
      const parsed = contactFormSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
      }

      messageData = {
        email:   parsed.data.email,
        name:    parsed.data.name,
        userId:  null,
        source:  "contact_form",
        intent:  "general",
        subject: parsed.data.subject,
        body:    parsed.data.body,
      }
    }

    const id = crypto.randomUUID()
    await db.insert(messages).values({ id, ...messageData })

    const created = await db.query.messages.findFirst({
      where: eq(messages.id, id),
      with: { user: true, requestedService: true },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("POST /api/v1/messages error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
