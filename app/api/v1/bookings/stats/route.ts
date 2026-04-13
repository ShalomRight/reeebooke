import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { bookings } from "@/src/db/schema"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const db = getDb()
		const session = await getServerSession(getAuthOptions())
		const userRole = (session?.user as any)?.role

		if (!userRole || (!userRole.includes("ADMIN") && userRole !== "SUPER_ADMIN" && userRole !== "STAFF")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
		}

		const today = new Date()
		today.setHours(0, 0, 0, 0)
		const tomorrow = new Date(today)
		tomorrow.setDate(tomorrow.getDate() + 1)

		// Get all bookings with service price for statistics
		const allBookings = await db.query.bookings.findMany({
			with: {
				service: {
					columns: {
						price: true,
					},
				},
			},
		})

		const totalBookings = allBookings.length
		const todayBookings = allBookings.filter((b) => {
			const bookingDate = new Date(b.date)
			return bookingDate >= today && bookingDate < tomorrow
		}).length

		const pendingBookings = allBookings.filter((b) => b.status === "PENDING").length
		const confirmedBookings = allBookings.filter((b) => b.status === "CONFIRMED").length
		const completedBookings = allBookings.filter((b) => b.status === "COMPLETED").length
		const cancelledBookings = allBookings.filter((b) => b.status === "CANCELLED").length

		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		const newBookings = allBookings.filter((b) => new Date(b.createdAt) >= yesterday).length

		const totalRevenue = allBookings
			.filter((b) => b.status === "COMPLETED" || b.status === "CONFIRMED")
			.reduce((sum, b) => sum + b.service.price, 0)

		const todayRevenue = allBookings
			.filter((b) => {
				const bookingDate = new Date(b.date)
				return bookingDate >= today && bookingDate < tomorrow && (b.status === "COMPLETED" || b.status === "CONFIRMED")
			})
			.reduce((sum, b) => sum + b.service.price, 0)

		return NextResponse.json({
			total: totalBookings,
			today: todayBookings,
			pending: pendingBookings,
			confirmed: confirmedBookings,
			completed: completedBookings,
			cancelled: cancelledBookings,
			new: newBookings,
			totalRevenue,
			todayRevenue,
		})
	} catch (error) {
		console.error("Booking stats error:", error)
		return NextResponse.json({ error: "Failed to fetch booking statistics" }, { status: 500 })
	}
}
