// GET: List codes
import { getServerSession } from "next-auth"
import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { discountCodes } from "@/src/db/schema"
import { desc } from "drizzle-orm"
import { NextResponse } from "next/server"
import { createDiscountSchema, validateRequest, validationErrorResponse } from "@/lib/validations"

export async function GET() {
  const db = getDb()
  const session = await getServerSession(getAuthOptions())
  const userRole = (session?.user as any)?.role
  
  if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const codes = await db.query.discountCodes.findMany({
    orderBy: [desc(discountCodes.createdAt)],
  })

  return NextResponse.json(codes)
}

// POST: Create code
export async function POST(req: Request) {
  const db = getDb()
  const session = await getServerSession(getAuthOptions())
  const userRole = (session?.user as any)?.role
  
  if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const body = await req.json()
  
  const validation = validateRequest(createDiscountSchema, body)
  if (!validation.success) {
    return validationErrorResponse(validation.error)
  }
  
  const { code, type, value, minAmount, maxUses, expiresAt, active } = validation.data

  try {
    const [discount] = await db.insert(discountCodes).values({
        code: code.toUpperCase(),
        type,
        value,
        minAmount: minAmount || null,
        maxUses: maxUses || null,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        active: active ?? true,
    }).returning()
    return NextResponse.json(discount)
  } catch (err: any) {
    if (err.message && err.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "Code already exists" }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}