import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { discountCodes } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const db = getDb()
		const { id } = await params
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role
		
		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		const body = await req.json() as {
			type?: string;
			value?: number;
			minAmount?: number;
			maxUses?: number;
			expiresAt?: string;
			active?: boolean;
		}
		const { type, value, minAmount, maxUses, expiresAt, active } = body

		// Build update data object
		const updateData: any = {}
		
		if (type !== undefined) updateData.type = type
		if (value !== undefined) updateData.value = value
		if (minAmount !== undefined) updateData.minAmount = minAmount || null
		if (maxUses !== undefined) updateData.maxUses = maxUses || null
		if (expiresAt !== undefined) updateData.expiresAt = expiresAt ? new Date(expiresAt).toISOString() : null
		if (active !== undefined) updateData.active = active

		const [updated] = await db.update(discountCodes)
			.set(updateData)
			.where(eq(discountCodes.id, id))
			.returning()

		return NextResponse.json(updated)
	} catch (error) {
		console.error("Discount update error:", error)
		return NextResponse.json({ error: "Failed to update discount" }, { status: 500 })
	}
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const db = getDb()
		const { id } = await params
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role
		
		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		await db.delete(discountCodes).where(eq(discountCodes.id, id))

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Discount delete error:", error)
		return NextResponse.json({ error: "Failed to delete discount" }, { status: 500 })
	}
}
