// TODO: Review Drizzle query conversions — complex where/orderBy patterns need manual adjustment
import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users, carts } from "@/src/db/schema"
import { eq, desc, gte, lte, lt, inArray } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"

export type SyncCartItem = {
	serviceId: string
	date: string
	time: string
}

export async function POST(req: NextRequest) {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const body = await req.json()
		const { guestCartItems } = body

		if (!Array.isArray(guestCartItems)) {
			return NextResponse.json({ error: "Invalid cart items" }, { status: 400 })
		}

		const sessionUserEmail = session.user.email as string;
		// Get user
		const user = await db.query.users.findFirst({
			where: (fields: any, { eq }: any) => eq(fields.email, sessionUserEmail),
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		// Normalize date function
		const normalizeDate = (date: Date | string): string => {
			const dateObj = typeof date === "string" ? new Date(date) : date
			return dateObj.toISOString().split("T")[0] // YYYY-MM-DD
		}

		// Get existing cart items
		const existingCartItems = await db.query.carts.findMany({
			where: (fields: any, { eq }: any) => eq(fields.userId, user.id),
		})

		const existingItemsSet = new Set(
			existingCartItems.map((item: any) => `${item.serviceId}-${normalizeDate(item.date)}-${item.time}`)
		)

		// Deduplicate guest cart items
		const uniqueGuestItems = new Map<string, SyncCartItem>()
		guestCartItems.forEach((item: any) => {
			const key = `${item.serviceId}-${normalizeDate(item.date)}-${item.time}`
			if (!uniqueGuestItems.has(key)) uniqueGuestItems.set(key, item)
		})

		// Filter items that are not in DB yet
		let itemsToAdd = Array.from(uniqueGuestItems.values()).filter(
			(item: any) => !existingItemsSet.has(`${item.serviceId}-${normalizeDate(item.date)}-${item.time}`)
		)

		let itemsAddedCount = 0

		// Insert items one by one to avoid duplicates
		for (const item of itemsToAdd) {
			try {
				const itemDate = new Date(item.date)
				const startOfDay = new Date(itemDate)
				startOfDay.setHours(0, 0, 0, 0)
				const endOfDay = new Date(itemDate)
				endOfDay.setHours(23, 59, 59, 999)

				const exists = await db.query.carts.findFirst({
					where: (fields: any, { and, eq, gte, lte }: any) => and(
						eq(fields.userId, user.id),
						eq(fields.serviceId, item.serviceId),
						gte(fields.date, startOfDay.toISOString()),
						lte(fields.date, endOfDay.toISOString()),
						eq(fields.time, item.time)
					)
				})

				if (!exists) {
					await db.insert(carts).values({
						userId: user.id,
						serviceId: item.serviceId,
						date: itemDate.toISOString(),
						time: item.time,
					})
					itemsAddedCount++
				}
			} catch (error) {
				console.error("Error adding cart item:", error)
			}
		}

		// Fetch updated cart
		const updatedCart = await db.query.carts.findMany({
			where: (fields: any, { eq }: any) => eq(fields.userId, user.id),
			with: { service: true },
			orderBy: (fields: any, { desc }: any) => [desc(fields.createdAt)],
		})

		// Remove duplicates (keep latest createdAt)
		const uniqueCartMap = new Map<string, typeof updatedCart[0]>()
		const itemsToDelete: string[] = []

		updatedCart.forEach((item: any) => {
			const key = `${item.serviceId}-${normalizeDate(item.date)}-${item.time}`
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

		if (itemsToDelete.length > 0) {
			await db.delete(carts).where(inArray(carts.id, itemsToDelete))
		}

		const finalCart = await db.query.carts.findMany({
			where: (fields: any, { eq }: any) => eq(fields.userId, user.id),
			with: { service: true },
			orderBy: (fields: any, { desc }: any) => [desc(fields.createdAt)],
		})

		return NextResponse.json({
			success: true,
			itemsAdded: itemsAddedCount,
			duplicatesRemoved: itemsToDelete.length,
			cart: finalCart,
		})
	} catch (error) {
		console.error("Cart sync error:", error)
		return NextResponse.json({ error: "Failed to sync cart" }, { status: 500 })
	}
}
