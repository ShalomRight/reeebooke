"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBookings } from "@/lib/swr"
import { Calendar, Clock } from "lucide-react"

export function RecentActivity() {
	const { data: response } = useBookings({ limit: 1000 })

	const bookings = response?.bookings || []

	const recentBookings =
		bookings?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8) || []

	const getStatusColor = (status: string) => {
		switch (status) {
			case "CONFIRMED":
				return "default"
			case "PENDING":
				return "secondary"
			case "COMPLETED":
				return "outline"
			case "CANCELLED":
				return "destructive"
			default:
				return "secondary"
		}
	}

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-warm-800">Recent Activity</CardTitle>
				<CardDescription className="text-warm-600">Latest bookings and updates</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
					{recentBookings.length === 0 ? (
						<p className="text-sm text-warm-500 text-center py-4">No recent activity</p>
					) : (
						recentBookings.map((booking) => (
							<div
								key={booking.id}
								className="flex items-start gap-3 p-3 rounded-lg hover:bg-warm-100 transition-colors"
							>
								<Avatar className="w-10 h-10">
									<AvatarFallback className="bg-terracotta-100 text-terracotta-800 font-semibold">
										{getInitials(booking.userName || "")}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1 min-w-0">
									<div className="flex items-start justify-between gap-2 mb-1">
										<p className="font-medium text-sm truncate text-warm-900">{booking.userName}</p>
										<Badge variant={getStatusColor(booking.status)} className="text-xs">
											{booking.status}
										</Badge>
									</div>
									<p className="text-sm text-warm-600 mb-2">{booking.service?.name || "Unknown Service"}</p>
									<div className="flex items-center gap-3 text-xs text-warm-500">
										<div className="flex items-center gap-1">
											<Calendar className="w-3 h-3" />
											{new Date(booking.date).toLocaleDateString()}
										</div>
										<div className="flex items-center gap-1">
											<Clock className="w-3 h-3" />
											{booking.time}
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	)
}
