"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBookings } from "@/lib/swr"
import { Star, TrendingUp, UserCheck, Users } from "lucide-react"

export function CustomerAnalytics() {
	const { data: response } = useBookings({ limit: 1000 })

	const bookings = response?.bookings || []

	// Calculate customer metrics
	const uniqueCustomers = new Set(bookings?.map((b) => b.userId).filter((id): id is string => !!id) || []).size

	const customerBookingCount = bookings?.reduce(
		(acc, booking) => {
			if (booking.userId) {
				acc[booking.userId] = (acc[booking.userId] || 0) + 1
			}
			return acc
		},
		{} as Record<string, number>,
	)

	const returningCustomers = Object.values(customerBookingCount || {}).filter((count) => count > 1).length

	const completedBookings = bookings?.filter((b) => b.status === "COMPLETED") || []
	const avgBookingValue =
		completedBookings.length > 0
			? completedBookings.reduce((sum, b) => sum + b.service.price, 0) / completedBookings.length
			: 0

	const retentionRate = uniqueCustomers > 0 ? (returningCustomers / uniqueCustomers) * 100 : 0

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Total Customers</CardTitle>
					<Users className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">{uniqueCustomers}</div>
					<p className="text-xs text-warm-500">Unique customers</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Returning Customers</CardTitle>
					<UserCheck className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">{returningCustomers}</div>
					<p className="text-xs text-warm-500">{retentionRate.toFixed(1)}% retention rate</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Avg Booking Value</CardTitle>
					<Star className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">${avgBookingValue.toFixed(0)}</div>
					<p className="text-xs text-warm-500">Per completed booking</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-warm-800">Completion Rate</CardTitle>
					<TrendingUp className="h-4 w-4 text-warm-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-warm-900">
						{bookings && bookings.length > 0 ? ((completedBookings.length / bookings.length) * 100).toFixed(1) : 0}%
					</div>
					<p className="text-xs text-warm-500">{completedBookings.length} completed</p>
				</CardContent>
			</Card>
		</div>
	)
}
