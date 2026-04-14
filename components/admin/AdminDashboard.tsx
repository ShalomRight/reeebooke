"use client"

import currentUserClient from "@/lib/currentUserClient"
import { BarChart3, Calendar, Clock, Settings, Star, Ticket, TrendingUp, UserPlus, Users } from "lucide-react"
import { useState } from "react"
import { DashboardLayout } from "../layout/dashboard/DashboardLayout"

import { BookingsManagement } from "./BookingsManagement"
import { ComprehensiveAnalytics } from "./ComprehensiveAnalytics"
import { CustomerAnalytics } from "./CustomerAnalytics"
import { DiscountManagement } from "./DiscountManagement"
import { PopularServices } from "./PopularServices"
import { RatingsManagement } from "./RatingsManagement"
import { RecentActivity } from "./RecentActivity"
import { ReferralManagement } from "./ReferralManagement"
import { ScheduleManagement } from "./ScheduleManagement"
import { AdminBookingCalendarWrapper } from "@/components/admin/calendar/AdminBookingCalendarWrapper"
import { RevenueChart } from "./RevenueChart"
import { ServicesPageV2 } from "@/components/admin/services-v2/ServicesPageV2"
import { StaffManagement } from "./StaffManagement"
import { StatsOverview } from "./StatsOverview"
import { UserManagement } from "./UserManagement"

const SIDEBAR_NAV = [
	{
		key: "overview",
		label: "Overview",
		icon: <TrendingUp className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "analytics",
		label: "Analytics",
		icon: <BarChart3 className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "bookings",
		label: "Bookings",
		icon: <BarChart3 className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "calendar",
		label: "Calendar",
		icon: <Calendar className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "services",
		label: "Services",
		icon: <Settings className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "discounts",
		label: "Discounts",
		icon: <Ticket className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "ratings",
		label: "Ratings",
		icon: <Star className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "referrals",
		label: "Referrals",
		icon: <UserPlus className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "schedules",
		label: "Schedules",
		icon: <Clock className="w-4 h-4" />,
		forSuperAdmin: false,
	},
	{
		key: "staff",
		label: "Staff",
		icon: <Users className="w-4 h-4" />,
		forSuperAdmin: true,
	},
	{
		key: "users",
		label: "Users",
		icon: <Users className="w-4 h-4" />,
		forSuperAdmin: true,
	},
]

export function AdminDashboard() {
	const currentUser = currentUserClient()
	const { isSuperAdmin } = currentUser || {}
	const [activeTab, setActiveTab] = useState<string>("overview")

	const navItems = SIDEBAR_NAV.filter(
		(item) => !item.forSuperAdmin || isSuperAdmin
	)

	return (
		<DashboardLayout navItems={navItems} activeTab={activeTab} onTabChange={setActiveTab}>
			<div className="max-w-7xl mx-auto space-y-5">
				{activeTab === "overview" && (
					<>
						<StatsOverview />
						<CustomerAnalytics />
						<div className="grid gap-6 lg:grid-cols-3">
							<RevenueChart />
							<PopularServices />
						</div>
						<RecentActivity />
					</>
				)}
				{activeTab === "analytics" && <ComprehensiveAnalytics />}
				{activeTab === "bookings" && <BookingsManagement />}
				{activeTab === "calendar" && <AdminBookingCalendarWrapper mode="admin" />}
				{activeTab === "services" && <ServicesPageV2 />}
				{activeTab === "schedules" && <ScheduleManagement />}
				{activeTab === "discounts" && <DiscountManagement />}
				{activeTab === "ratings" && <RatingsManagement />}
				{activeTab === "referrals" && <ReferralManagement />}
				{isSuperAdmin && activeTab === "staff" && <StaffManagement />}
				{isSuperAdmin && activeTab === "users" && <UserManagement />}
			</div>
		</DashboardLayout>
	)
}
