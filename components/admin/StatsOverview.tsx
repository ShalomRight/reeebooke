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
					<CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
					<Calendar className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{todayBookings}</div>
					<p className="text-xs text-muted-foreground">Appointments scheduled today</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
					<DollarSign className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">${monthlyRevenue.toLocaleString()}</div>
					<p className="text-xs text-muted-foreground">{thisMonth.length} bookings this month</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
					<Users className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalBookings}</div>
					<p className="text-xs text-muted-foreground">All time bookings</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Pending</CardTitle>
					<TrendingUp className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{pendingBookings}</div>
					<p className="text-xs text-muted-foreground">Awaiting confirmation</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Completed</CardTitle>
					<CheckCircle2 className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{completedBookings}</div>
					<p className="text-xs text-muted-foreground">Finished appointments</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Cancelled</CardTitle>
					<XCircle className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{cancelledBookings}</div>
					<p className="text-xs text-muted-foreground">Cancelled appointments</p>
				</CardContent>
			</Card>
		</div>
	)
}
