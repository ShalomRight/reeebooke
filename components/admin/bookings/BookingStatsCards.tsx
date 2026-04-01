"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Sparkles, TrendingUp, XCircle } from "lucide-react"

interface BookingStatsCardsProps {
	newBookingsCount: number
	pendingCount: number
	confirmedCount: number
	completedCount: number
	cancelledCount: number
	totalCount: number
}

export function BookingStatsCards({
	newBookingsCount,
	pendingCount,
	confirmedCount,
	completedCount,
	cancelledCount,
	totalCount,
}: BookingStatsCardsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<Card className="border-slate-200 shadow-sm rounded-xl bg-white">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">New Bookings</p>
							<p className="text-3xl font-bold">{newBookingsCount}</p>
							<p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
							<Sparkles className="w-6 h-6 text-blue-600" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-slate-200 shadow-sm rounded-xl bg-white">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
							<p className="text-3xl font-bold">{pendingCount}</p>
							<p className="text-xs text-muted-foreground mt-1">Awaiting confirmation</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
							<AlertCircle className="w-6 h-6 text-amber-500" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-slate-200 shadow-sm rounded-xl bg-white">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">Confirmed</p>
							<p className="text-3xl font-bold">{confirmedCount}</p>
							<p className="text-xs text-muted-foreground mt-1">Ready for service</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
							<CheckCircle2 className="w-6 h-6 text-green-500" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-slate-200 shadow-sm rounded-xl bg-white">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">Completed</p>
							<p className="text-3xl font-bold">{completedCount}</p>
							<p className="text-xs text-muted-foreground mt-1">Finished appointments</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
							<CheckCircle2 className="w-6 h-6 text-green-500" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-slate-200 shadow-sm rounded-xl bg-white">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">Cancelled</p>
							<p className="text-3xl font-bold">{cancelledCount}</p>
							<p className="text-xs text-muted-foreground mt-1">Cancelled appointments</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
							<XCircle className="w-6 h-6 text-red-500" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-slate-200 shadow-sm rounded-xl bg-white">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">Total Bookings</p>
							<p className="text-3xl font-bold">{totalCount}</p>
							<p className="text-xs text-muted-foreground mt-1">All time</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
							<TrendingUp className="w-6 h-6 text-muted-foreground" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

