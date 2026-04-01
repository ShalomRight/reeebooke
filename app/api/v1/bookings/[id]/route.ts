import { authOptions } from "@/lib/auth"
import { db } from "@/src/db"
import { bookings, photos, services } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { sendEmail } from "@/lib/email-service"
import { getBookingStatusUpdateEmail, getBookingCompletedEmail } from "@/lib/email-templates/bookings"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params
		const booking = await db.query.bookings.findFirst({
			where: eq(bookings.id, id),
			with: {
				service: true,
				photos: true,
			},
		})

		if (!booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 })
		}

		return NextResponse.json(booking, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params
		const body = await req.json()
		const { status } = body

		// Get old status before update
		const oldBooking = await db.query.bookings.findFirst({
			where: eq(bookings.id, id),
			with: { service: true },
		})

		if (!oldBooking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 })
		}

		const oldStatus = oldBooking.status

		db.update(bookings)
			.set({ status, updatedAt: new Date().toISOString() })
			.where(eq(bookings.id, id))
			.run()

		const booking = await db.query.bookings.findFirst({
			where: eq(bookings.id, id),
			with: {
				service: true,
				photos: true,
			},
		})

		if (!booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 })
		}

		// Send status update email if status changed and email exists
		if (oldStatus !== status && booking.email) {
			try {
				await sendEmail({
					to: booking.email,
					subject: "Booking Status Updated - Luxury Nail Spa",
					html: getBookingStatusUpdateEmail(
						{
							bookingId: booking.id,
							serviceName: booking.service.name,
							date: booking.date,
							time: booking.time,
							price: booking.service.price,
							status: booking.status,
							userName: booking.userName,
							phone: booking.phone || undefined,
							paymentMethod: booking.paymentMethod || undefined,
						},
						oldStatus,
					),
				})

				// Send completion email if status changed to COMPLETED
				if (status === "COMPLETED") {
					await sendEmail({
						to: booking.email,
						subject: "Thank You - Service Completed",
						html: getBookingCompletedEmail({
							bookingId: booking.id,
							serviceName: booking.service.name,
							date: booking.date,
							time: booking.time,
							price: booking.service.price,
							status: booking.status,
							userName: booking.userName,
							phone: booking.phone || undefined,
							paymentMethod: booking.paymentMethod || undefined,
						}),
					})
				}
			} catch (emailError) {
				console.error("Failed to send booking status update email:", emailError)
			}
		}

		return NextResponse.json(booking, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
	}
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params
		const body = await req.json()
		const { serviceId, date, time, paymentMethod, mobileProvider, photoUrls, userName, phone, status } = body

		// Build update data
		const updateData: Record<string, any> = { updatedAt: new Date().toISOString() }
		if (serviceId) updateData.serviceId = serviceId
		if (date) updateData.date = new Date(date).toISOString()
		if (time) updateData.time = time
		if (paymentMethod) updateData.paymentMethod = paymentMethod
		if (mobileProvider !== undefined) updateData.mobileProvider = mobileProvider
		if (userName) updateData.userName = userName
		if (phone) updateData.phone = phone
		if (status) updateData.status = status

		db.update(bookings)
			.set(updateData)
			.where(eq(bookings.id, id))
			.run()

		// Handle photos: delete existing and create new ones
		if (photoUrls) {
			db.delete(photos).where(eq(photos.bookingId, id)).run()
			for (const url of photoUrls) {
				db.insert(photos).values({
					id: crypto.randomUUID(),
					bookingId: id,
					url,
				}).run()
			}
		}

		const booking = await db.query.bookings.findFirst({
			where: eq(bookings.id, id),
			with: {
				service: true,
				photos: true,
			},
		})

		return NextResponse.json(booking, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const { id } = await params

		const booking = await db.query.bookings.findFirst({
			where: eq(bookings.id, id),
		})

		if (!booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 })
		}

		const userRole = (session.user as any).role
		const userId = (session.user as any).id

		if (![" ADMIN", "SUPER_ADMIN"].includes(userRole) && booking.userId !== userId) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}

		// Delete photos first, then booking
		db.delete(photos).where(eq(photos.bookingId, id)).run()
		db.delete(bookings).where(eq(bookings.id, id)).run()

		return NextResponse.json({ message: "Booking deleted" }, { status: 200 })
	} catch (error) {
		console.error("Error deleting booking:", error)
		return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 })
	}
}
