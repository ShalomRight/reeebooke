"use client"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CheckCircle2, Clock, DollarSign, Download, Mail, Phone, Trash2, User } from "lucide-react"

interface Booking {
	id: string
	service: { name: string; price: number }
	userName: string
	phone: string
	email?: string | null
	date: string
	time: string
	status: string
	paymentMethod?: string | null
	createdAt?: string | null
	user?: { email?: string | null } | null
}

interface BookingCardProps {
	booking: Booking
	viewMode: "list" | "grid"
	onStatusChange: (bookingId: string, status: string) => void
	onDownloadReceipt: (bookingId: string) => void
	onDelete: (bookingId: string) => void
	showConfirmButton?: boolean
}

export function BookingCard({
	booking,
	viewMode,
	onStatusChange,
	onDownloadReceipt,
	onDelete,
	showConfirmButton = false,
}: BookingCardProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "PENDING":
				return "border-l-amber-400"
			case "CONFIRMED":
				return "border-l-emerald-400"
			case "COMPLETED":
				return "border-l-blue-400"
			case "CANCELLED":
				return "border-l-rose-400"
			default:
				return ""
		}
	}

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "PENDING":
				return (
					<Badge variant="outline" className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
						Pending
					</Badge>
				)
			case "CONFIRMED":
				return (
					<Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
						Confirmed
					</Badge>
				)
			case "COMPLETED":
				return (
					<Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
						Completed
					</Badge>
				)
			case "CANCELLED":
				return (
					<Badge variant="outline" className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
						Cancelled
					</Badge>
				)
			default:
				return null
		}
	}

	const userEmail = booking.user?.email || booking.email || null

	return (
		<Card className={`bg-white border-y border-r border-slate-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow border-l-4 ${getStatusColor(booking.status)}`}>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="space-y-1 flex-1">
						<CardTitle className="text-xl">{booking.service.name}</CardTitle>
						<CardDescription>
							<div className={viewMode === "grid" ? "space-y-2 mt-2" : "flex flex-wrap gap-4 mt-2"}>
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<User className="w-4 h-4" />
										<span className="font-medium">{booking.userName}</span>
									</div>
									{userEmail && (
										<div className="flex items-center gap-2 text-xs text-muted-foreground ml-6">
											<Mail className="w-3 h-3" />
											{userEmail}
										</div>
									)}
								</div>
								<div className="flex items-center gap-2">
									<Phone className="w-4 h-4" />
									{booking.phone}
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									{new Date(booking.date).toLocaleDateString()}
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4" />
									{booking.time}
								</div>
								{booking.createdAt && (
									<div className="text-xs text-muted-foreground">
										Created: {new Date(booking.createdAt).toLocaleString()}
									</div>
								)}
							</div>
						</CardDescription>
					</div>
					<div className="flex flex-col items-end gap-2">
						<div className="flex items-center gap-2">
							<DollarSign className="w-5 h-5 text-slate-400" />
							<span className="text-lg font-bold text-slate-900">${booking.service.price.toLocaleString()}</span>
						</div>
						{getStatusBadge(booking.status)}
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className={viewMode === "grid" ? "space-y-3" : "flex items-center justify-between gap-4"}>
					<div className="flex items-center gap-4">
						<Select value={booking.status} onValueChange={(value) => onStatusChange(booking.id, value)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="PENDING">Pending</SelectItem>
								<SelectItem value="CONFIRMED">Confirmed</SelectItem>
								<SelectItem value="COMPLETED">Completed</SelectItem>
								<SelectItem value="CANCELLED">Cancelled</SelectItem>
							</SelectContent>
						</Select>
						<Badge variant="outline">{booking.paymentMethod || "N/A"}</Badge>
					</div>
					<div className="flex gap-2">
						{showConfirmButton && booking.status === "PENDING" && (
							<Button size="sm" onClick={() => onStatusChange(booking.id, "CONFIRMED")} className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
								<CheckCircle2 className="w-4 h-4" />
								Confirm
							</Button>
						)}
						<Button variant="outline" size="sm" className="rounded-full border-slate-200 hover:bg-slate-50 text-slate-600" onClick={() => onDownloadReceipt(booking.id)}>
							<Download className="w-4 h-4 mr-2" />
							Receipt
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive" size="sm" className="gap-2">
									<Trash2 className="w-4 h-4" />
									Delete
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogTitle>Delete Booking</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to delete this booking? This action cannot be undone.
								</AlertDialogDescription>
								<div className="flex gap-2 justify-end">
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => onDelete(booking.id)}
										className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
									>
										Delete
									</AlertDialogAction>
								</div>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

