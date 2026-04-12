"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBookings, useBookingStats } from "@/lib/swr"
import { AlertCircle, BarChart3, Calendar, CheckCircle2, Clock, DollarSign } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { BookingsManagement } from "../admin/BookingsManagement"
import { AdminBookingCalendarWrapper } from "@/components/admin/calendar/AdminBookingCalendarWrapper"
import { DashboardLayout } from "../layout/dashboard/DashboardLayout"
import { StaffAnalytics } from "./StaffAnalytics"

export function StaffDashboard() {
	const { data: session } = useSession()
	const { data: stats } = useBookingStats()
	const { data: response } = useBookings({ limit: 1000 })

	const bookings = response?.bookings || []
	const [activeTab, setActiveTab] = useState("today")

	const todayBookings =
		bookings?.filter((b) => {
			const bookingDate = new Date(b.date)
			return bookingDate.toDateString() === new Date().toDateString()
		}) || []

	const completedBookings = bookings?.filter((b) => b.status === "COMPLETED") || []
	const totalRevenue = bookings?.reduce((sum, b) => sum + (b.service?.price || 0), 0) || 0

	const navItems = [
		{ key: "today", label: "Today's Bookings", icon: Clock },
		{ key: "all", label: "All Bookings", icon: Calendar },
		{ key: "calendar", label: "Calendar", icon: Calendar },
		{ key: "analytics", label: "Analytics", icon: BarChart3 }
	]

	return (
		<DashboardLayout navItems={navItems} activeTab={activeTab} onTabChange={setActiveTab}>
			<div className="max-w-7xl mx-auto space-y-6">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-foreground mb-2">Staff Dashboard</h1>
					<p className="text-muted-foreground">Manage today's appointments and bookings</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
							<Clock className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.today || todayBookings.length}</div>
							<p className="text-xs text-muted-foreground">Appointments scheduled</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Completed</CardTitle>
							<CheckCircle2 className="h-4 w-4 text-green-600" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.completed || completedBookings.length}</div>
							<p className="text-xs text-muted-foreground">This week</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Pending</CardTitle>
							<AlertCircle className="h-4 w-4 text-orange-600" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.pending || 0}</div>
							<p className="text-xs text-muted-foreground">Awaiting confirmation</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
							<p className="text-xs text-muted-foreground">All time bookings</p>
						</CardContent>
					</Card>
				</div>

				<div>
					{activeTab === "analytics" && <StaffAnalytics />}
					{activeTab === "calendar" && <AdminBookingCalendarWrapper mode="staff" />}
					{activeTab === "today" && <BookingsManagement filterByToday={true} />}
					{activeTab === "all" && <BookingsManagement />}
				</div>
			</div>
		</DashboardLayout>
	)
}
