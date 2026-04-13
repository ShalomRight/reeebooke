import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users, favorites } from "@/src/db/schema"
import { eq, and } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const user = await db.query.users.findFirst({
			where: eq(users.email, session.user.email),
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const favs = await db.query.favorites.findMany({
			where: eq(favorites.userId, user.id),
			with: { service: true },
			orderBy: (favorites: any, { desc }: any) => [desc(favorites.createdAt)],
		})

		return NextResponse.json(favs)
	} catch (error) {
		console.error("Get favorites error:", error)
		return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const user = await db.query.users.findFirst({
			where: eq(users.email, session.user.email),
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const { serviceId } = await req.json() as { serviceId: string }

		if (!serviceId) {
			return NextResponse.json({ error: "Service ID required" }, { status: 400 })
		}

		// Check if already favorited (upsert equivalent)
		const existing = await db.query.favorites.findFirst({
			where: and(
				eq(favorites.userId, user.id),
				eq(favorites.serviceId, serviceId),
			),
		})

		if (existing) {
			// Already exists, return it with service
			const fav = await db.query.favorites.findFirst({
				where: eq(favorites.id, existing.id),
				with: { service: true },
			})
			return NextResponse.json(fav, { status: 200 })
		}

		const favId = crypto.randomUUID()
		await db.insert(favorites).values({
			id: favId,
			userId: user.id,
			serviceId,
		})

		const favorite = await db.query.favorites.findFirst({
			where: eq(favorites.id, favId),
			with: { service: true },
		})

		return NextResponse.json(favorite, { status: 201 })
	} catch (error) {
		console.error("Add favorite error:", error)
		return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const user = await db.query.users.findFirst({
			where: eq(users.email, session.user.email),
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const { searchParams } = new URL(req.url)
		const serviceId = searchParams.get("serviceId")

		if (!serviceId) {
			return NextResponse.json({ error: "Service ID required" }, { status: 400 })
		}

		await db.delete(favorites)
			.where(and(
				eq(favorites.userId, user.id),
				eq(favorites.serviceId, serviceId),
			))

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Remove favorite error:", error)
		return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
	}
}
