"use client"

import { BarChart3, Calendar, Settings, Shield, Star, Ticket, TrendingUp, UserPlus, Users } from "lucide-react"
import { useState } from "react"
import { DashboardLayout } from "../layout/dashboard/DashboardLayout"
import { AdminBookingCalendarWrapper } from "@/components/admin/calendar/AdminBookingCalendarWrapper"

import { BookingsManagement } from "./BookingsManagement"
import { ComprehensiveAnalytics } from "./ComprehensiveAnalytics"
import { DiscountManagement } from "./DiscountManagement"
import { PopularServices } from "./PopularServices"
import { RatingsManagement } from "./RatingsManagement"
import { RecentActivity } from "./RecentActivity"
import { ReferralManagement } from "./ReferralManagement"
import { ScheduleManagement } from "./ScheduleManagement"
import { RevenueChart } from "./RevenueChart"
import { ServicesManagement } from "./ServicesManagement"
import { StaffManagement } from "./StaffManagement"
import { StatsOverview } from "./StatsOverview"
import { UserManagement } from "./UserManagement"

const SIDEBAR_TABS = [
	{
		key: "overview",
		label: "Overview",
		icon: TrendingUp,
	},
	{
		key: "users",
		label: "Users",
		icon: Users,
	},
	{
		key: "staff",
		label: "Staff",
		icon: Shield,
	},
	{
		key: "bookings",
		label: "Bookings",
		icon: BarChart3,
	},
	{
		key: "calendar",
		label: "Calendar",
		icon: Calendar,
	},
	{
		key: "schedules",
		label: "Schedules",
		icon: Calendar,
	},
	{
		key: "services",
		label: "Services",
		icon: Settings,
	},
	{
		key: "discounts",
		label: "Discounts",
		icon: Ticket,
	},
	{
		key: "ratings",
		label: "Ratings",
		icon: Star,
	},
	{
		key: "referrals",
		label: "Referrals",
		icon: UserPlus,
	},
	{
		key: "analytics",
		label: "Analytics",
		icon: TrendingUp,
	},
]

export function SuperAdminDashboard() {
	const [activeTab, setActiveTab] = useState<string>("overview")

	return (
		<DashboardLayout navItems={SIDEBAR_TABS} activeTab={activeTab} onTabChange={setActiveTab}>
			<div className="max-w-7xl mx-auto space-y-5">
				{activeTab === "overview" && (
					<>
						<StatsOverview />
						<div className="grid gap-6 lg:grid-cols-3">
							<RevenueChart />
							<PopularServices />
						</div>
						<RecentActivity />
					</>
				)}

				{activeTab === "users" && <UserManagement />}
				{activeTab === "staff" && <StaffManagement />}
				{activeTab === "bookings" && <BookingsManagement />}
				{activeTab === "calendar" && <AdminBookingCalendarWrapper mode="admin" />}
				{activeTab === "schedules" && <ScheduleManagement />}
				{activeTab === "services" && <ServicesManagement />}
				{activeTab === "discounts" && <DiscountManagement />}
				{activeTab === "ratings" && <RatingsManagement />}
				{activeTab === "referrals" && <ReferralManagement />}
				{activeTab === "analytics" && <ComprehensiveAnalytics />}
			</div>
		</DashboardLayout>
	)
}
