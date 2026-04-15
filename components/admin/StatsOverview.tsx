"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBookings, useBookingStats } from "@/lib/swr"
import { Calendar, CheckCircle2, DollarSign, TrendingUp, Users, XCircle } from "lucide-react"

export function StatsOverview() {
	const { data: response } = useBookings({ limit: 1000 })
	const { data: stats } = useBookingStats()

	const bookings = response?.bookings || []

	const today = new Date()
	const todayBookings =
		bookings?.filter((b) => {
			const bookingDate = new Date(b.date)
			return bookingDate.toDateString() === today.toDateString()
		}).length || 0

	const thisMonth =
		bookings?.filter((b) => {
			const bookingDate = new Date(b.date)
			return bookingDate.getMonth() === today.getMonth() && bookingDate.getFullYear() === today.getFullYear()
		}) || []

	const monthlyRevenue = thisMonth.reduce((sum, b) => sum + (b.service?.price || 0), 0)

	const totalBookings = bookings?.length || 0
	const pendingBookings = bookings?.filter((b) => b.status === "PENDING").length || 0
	const completedBookings = bookings?.filter((b) => b.status === "COMPLETED").length || 0
	const cancelledBookings = stats?.cancelled || 0

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Today's Bookings</CardTitle>
					<Calendar className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">{todayBookings}</div>
					<p className="text-xs text-warm-500">Appointments scheduled today</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Monthly Revenue</CardTitle>
					<DollarSign className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">${monthlyRevenue.toLocaleString()}</div>
					<p className="text-xs text-warm-500">{thisMonth.length} bookings this month</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Total Bookings</CardTitle>
					<Users className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">{totalBookings}</div>
					<p className="text-xs text-warm-500">All time bookings</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Pending</CardTitle>
					<TrendingUp className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">{pendingBookings}</div>
					<p className="text-xs text-warm-500">Awaiting confirmation</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Completed</CardTitle>
					<CheckCircle2 className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">{completedBookings}</div>
					<p className="text-xs text-warm-500">Finished appointments</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Cancelled</CardTitle>
					<XCircle className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">{cancelledBookings}</div>
					<p className="text-xs text-warm-500">Cancelled appointments</p>
				</CardContent>
			</Card>
		</div>
	)
}
