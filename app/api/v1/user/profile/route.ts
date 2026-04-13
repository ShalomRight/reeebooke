import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(getAuthOptions())
		if (!session?.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const db = getDb()
		const user = await db.query.users.findFirst({
			where: eq(users.id, (session.user as any).id),
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				image: true,
				role: true,
				createdAt: true,
			},
		})

		return NextResponse.json(user)
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	try {
		const session = await getServerSession(getAuthOptions())
		if (!session?.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const body = await req.json() as { name?: string; phone?: string; image?: string }
		const { name, phone, image } = body

		const db = getDb()

		const [updatedUser] = await db.update(users).set({
			name: name || undefined,
			phone: phone || undefined,
			image: image || undefined,
		})
		.where(eq(users.id, (session.user as any).id))
		.returning()

		return NextResponse.json(updatedUser)
	} catch (error) {
		return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
	}
}
