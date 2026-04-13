import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { ratings } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"

// PATCH: Approve or reject a rating
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		const { id } = await params
		const { status } = await req.json()

		if (!status || !["APPROVED", "REJECTED"].includes(status)) {
			return NextResponse.json({ error: "Invalid status. Must be APPROVED or REJECTED" }, { status: 400 })
		}

		const rating = await db.query.ratings.findFirst({
			where: eq(ratings.id, id),
		})

		if (!rating) {
			return NextResponse.json({ error: "Rating not found" }, { status: 404 })
		}

		await db.update(ratings)
			.set({ status })
			.where(eq(ratings.id, id))

		const updatedRating = await db.query.ratings.findFirst({
			where: eq(ratings.id, id),
			with: {
				user: {
					columns: {
						id: true,
						name: true,
						email: true,
						image: true,
					},
				},
				service: {
					columns: {
						id: true,
						name: true,
						price: true,
					},
				},
			},
		})

		return NextResponse.json(updatedRating)
	} catch (error) {
		console.error("Update rating error:", error)
		return NextResponse.json({ error: "Failed to update rating" }, { status: 500 })
	}
}

// DELETE: Delete a rating (admin only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		const { id } = await params

		await db.delete(ratings).where(eq(ratings.id, id))

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Delete rating error:", error)
		return NextResponse.json({ error: "Failed to delete rating" }, { status: 500 })
	}
}

