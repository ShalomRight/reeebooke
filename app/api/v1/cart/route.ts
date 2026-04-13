import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users, carts, services } from "@/src/db/schema"
import { eq, and, ne, inArray } from "drizzle-orm"
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

		const cartItems = await db.query.carts.findMany({
			where: eq(carts.userId, user.id),
			with: { service: true },
			orderBy: (carts: any, { desc }: any) => [desc(carts.createdAt)],
		})

		// Deduplicate cart items by serviceId, date, and time
		const uniqueCartMap = new Map<string, typeof cartItems[0]>()
		const itemsToDelete: string[] = []

		cartItems.forEach((item: any) => {
			const key = `${item.serviceId}-${item.date}-${item.time}`
			if (!uniqueCartMap.has(key)) {
				uniqueCartMap.set(key, item)
			} else {
				const existing = uniqueCartMap.get(key)!
				if (item.createdAt > existing.createdAt) {
					itemsToDelete.push(existing.id)
					uniqueCartMap.set(key, item)
				} else {
					itemsToDelete.push(item.id)
				}
			}
		})

		// Clean up duplicates
		if (itemsToDelete.length > 0) {
			await db.delete(carts).where(inArray(carts.id, itemsToDelete))
		}

		return NextResponse.json(Array.from(uniqueCartMap.values()))
	} catch (error) {
		console.error("Get cart error:", error)
		return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const body = await req.json()
		const { serviceId, date, time } = body

		if (!serviceId || !date || !time) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
		}

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const user = await db.query.users.findFirst({
			where: eq(users.email, session.user.email),
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const normalizedDate = new Date(date).toISOString().split('T')[0]

		// Check if item already exists in cart
		const duplicateExists = await db.query.carts.findFirst({
			where: and(
				eq(carts.userId, user.id),
				eq(carts.serviceId, serviceId),
				eq(carts.date, normalizedDate),
				eq(carts.time, time),
			),
		})

		if (duplicateExists) {
			return NextResponse.json({ error: "Item already in cart" }, { status: 409 })
		}

		const cartId = crypto.randomUUID()
		await db.insert(carts).values({
			id: cartId,
			userId: user.id,
			serviceId,
			date: normalizedDate,
			time,
		})

		const cartItem = await db.query.carts.findFirst({
			where: eq(carts.id, cartId),
			with: { service: true },
		})

		return NextResponse.json(cartItem, { status: 201 })
	} catch (error) {
		console.error("Add to cart error:", error)
		return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const { searchParams } = new URL(req.url)
		const cartItemId = searchParams.get("id")
		const body = await req.json()
		const { serviceId, date, time } = body

		if (!cartItemId) {
			return NextResponse.json({ error: "Cart item ID required" }, { status: 400 })
		}

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const user = await db.query.users.findFirst({
			where: eq(users.email, session.user.email),
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const existingCartItem = await db.query.carts.findFirst({
			where: and(
				eq(carts.id, cartItemId),
				eq(carts.userId, user.id),
			),
		})

		if (!existingCartItem) {
			return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
		}

		// Check for duplicates (excluding the current item)
		if (serviceId && date && time) {
			const normalizedDate = new Date(date).toISOString().split('T')[0]
			const duplicateExists = await db.query.carts.findFirst({
				where: and(
					eq(carts.userId, user.id),
					ne(carts.id, cartItemId),
					eq(carts.serviceId, serviceId || existingCartItem.serviceId),
					eq(carts.date, normalizedDate),
					eq(carts.time, time || existingCartItem.time),
				),
			})

			if (duplicateExists) {
				return NextResponse.json({ error: "Item already in cart" }, { status: 409 })
			}
		}

		const updateData: Record<string, any> = { updatedAt: new Date().toISOString() }
		if (serviceId) updateData.serviceId = serviceId
		if (date) updateData.date = new Date(date).toISOString().split('T')[0]
		if (time) updateData.time = time

		await db.update(carts)
			.set(updateData)
			.where(eq(carts.id, cartItemId))

		const updatedCartItem = await db.query.carts.findFirst({
			where: eq(carts.id, cartItemId),
			with: { service: true },
		})

		return NextResponse.json(updatedCartItem)
	} catch (error) {
		console.error("Update cart item error:", error)
		return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const { searchParams } = new URL(req.url)
		const cartItemId = searchParams.get("id")

		if (!cartItemId) {
			return NextResponse.json({ error: "Cart item ID required" }, { status: 400 })
		}

		await db.delete(carts).where(eq(carts.id, cartItemId))

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Delete cart item error:", error)
		return NextResponse.json({ error: "Failed to delete cart item" }, { status: 500 })
	}
}
