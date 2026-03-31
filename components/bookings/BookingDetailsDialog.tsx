"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, DollarSign, Mail, Phone, User, Download, Image as ImageIcon } from "lucide-react"

interface Booking {
	id: string
	service: {
		id: string
		name: string
		price: number
	}
	userName: string
	phone: string
	email?: string | null
	date: string
	time: string
	status: string
	paymentMethod: string
	user?: {
		id: string
		name: string | null
		email: string
		phone: string | null
	} | null
	photos?: Array<{ url: string }>
	createdAt?: string
}

interface BookingDetailsDialogProps {
	booking: Booking
	open: boolean
	onOpenChange: (open: boolean) => void
	userRole?: string
}

export function BookingDetailsDialog({ booking, open, onOpenChange, userRole }: BookingDetailsDialogProps) {
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "CONFIRMED":
			case "COMPLETED":
				return <Badge className="bg-green-500"> {status}</Badge>
			case "PENDING":
				return <Badge className="bg-yellow-500"> {status}</Badge>
			case "CANCELLED":
				return <Badge className="bg-red-500"> {status}</Badge>
			default:
				return <Badge>{status}</Badge>
		}
	}

	const handleDownloadReceipt = async () => {
		try {
			const response = await fetch(`/api/v1/bookings/${booking.id}/receipt?format=pdf`)
			if (!response.ok) {
				throw new Error("Failed to download receipt")
			}
			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement("a")
			a.href = url
			a.download = `receipt-${booking.id}.pdf`
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			document.body.removeChild(a)
		} catch (error) {
			console.error("Failed to download receipt:", error)
		}
	}

	const userEmail = booking.user?.email || booking.email || null
	const userPhone = booking.user?.phone || booking.phone || null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Booking Details</DialogTitle>
					<DialogDescription>View complete booking information</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 mt-4">
					{/* Service Info */}
					<div className="border-b pb-4">
						<h3 className="font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
							{booking.service.name}
						</h3>
						<div className="flex items-center gap-2">
							<DollarSign className="w-4 h-4 text-muted-foreground" />
							<span className="text-lg font-bold text-primary">${booking.service.price.toLocaleString()}</span>
						</div>
					</div>

					{/* Customer Info */}
					<div className="border-b pb-4 space-y-2">
						<h3 className="font-semibold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
							Customer Information
						</h3>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<User className="w-4 h-4 text-muted-foreground" />
								<span>{booking.userName}</span>
							</div>
							{userEmail && (
								<div className="flex items-center gap-2">
									<Mail className="w-4 h-4 text-muted-foreground" />
									<span>{userEmail}</span>
								</div>
							)}
							{userPhone && (
								<div className="flex items-center gap-2">
									<Phone className="w-4 h-4 text-muted-foreground" />
									<span>{userPhone}</span>
								</div>
							)}
						</div>
					</div>

					{/* Booking Details */}
					<div className="border-b pb-4 space-y-2">
						<h3 className="font-semibold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
							Booking Details
						</h3>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-muted-foreground" />
								<span>{new Date(booking.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="w-4 h-4 text-muted-foreground" />
								<span>{booking.time}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium">Status:</span>
								{getStatusBadge(booking.status)}
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium">Payment Method:</span>
								<span className="capitalize">{booking.paymentMethod}</span>
							</div>
							{booking.createdAt && (
								<div className="text-sm text-muted-foreground">
									Created: {new Date(booking.createdAt).toLocaleString()}
								</div>
							)}
						</div>
					</div>

					{/* Photos */}
					{booking.photos && booking.photos.length > 0 && (
						<div className="border-b pb-4">
							<h3 className="font-semibold mb-2 flex items-center gap-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
								<ImageIcon className="w-4 h-4" />
								Photos ({booking.photos.length})
							</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
								{booking.photos.map((photo, index) => (
									<img
										key={index}
										src={photo.url}
										alt={`Booking photo ${index + 1}`}
										className="w-full h-24 object-cover rounded-lg border"
									/>
								))}
							</div>
						</div>
					)}

					{/* Actions */}
					<div className="flex gap-2 justify-end pt-4">
						<Button variant="outline" onClick={handleDownloadReceipt}>
							<Download className="w-4 h-4 mr-2" />
							Download Receipt
						</Button>
						<Button variant="outline" onClick={() => onOpenChange(false)}>
							Close
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

