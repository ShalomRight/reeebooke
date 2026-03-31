"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBookings } from "@/lib/swr"
import { DollarSign, TrendingUp } from "lucide-react"

export function PopularServices() {
	const { data: response } = useBookings({ limit: 1000 })

	const bookings = response?.bookings || []

	// Calculate service popularity
	const serviceStats = bookings?.reduce(
		(acc, booking) => {
			const serviceId = booking.service.id
			if (!acc[serviceId]) {
				acc[serviceId] = {
					name: booking.service.name,
					price: booking.service.price,
					count: 0,
					revenue: 0,
				}
			}
			acc[serviceId].count += 1
			acc[serviceId].revenue += booking.service.price
			return acc
		},
		{} as Record<string, { name: string; price: number; count: number; revenue: number }>,
	)

	const topServices = Object.values(serviceStats || {})
		.sort((a, b) => b.count - a.count)
		.slice(0, 5)

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<TrendingUp className="w-5 h-5" />
					Popular Services
				</CardTitle>
				<CardDescription>Top 5 most booked services</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{topServices.length === 0 ? (
						<p className="text-sm text-muted-foreground text-center py-4">No booking data available</p>
					) : (
						topServices.map((service, index) => (
							<div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
								<div className="flex items-center gap-3">
									<Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full">
										{index + 1}
									</Badge>
									<div>
										<p className="font-medium">{service.name}</p>
										<p className="text-sm text-muted-foreground">{service.count} bookings</p>
									</div>
								</div>
								<div className="text-right">
									<div className="flex items-center gap-1 font-semibold">
										<DollarSign className="w-4 h-4" />
										{service.revenue.toLocaleString()}
									</div>
									<p className="text-xs text-muted-foreground">total revenue</p>
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	)
}
