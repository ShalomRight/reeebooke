"use client"

import currentUserClient from "@/lib/currentUserClient"
import { BarChart3, Calendar, Clock, Settings, Star, Ticket, TrendingUp, UserPlus, Users } from "lucide-react"
import { useState } from "react"
import LayoutAdmin from "../layout/admin"

import { BookingsManagement } from "./BookingsManagement"
import { ComprehensiveAnalytics } from "./ComprehensiveAnalytics"
import { CustomerAnalytics } from "./CustomerAnalytics"
import { DiscountManagement } from "./DiscountManagement"
import { PopularServices } from "./PopularServices"
import { RatingsManagement } from "./RatingsManagement"
import { RecentActivity } from "./RecentActivity"
import { ReferralManagement } from "./ReferralManagement"
import { ScheduleManagement } from "./ScheduleManagement"
import { BookingCalendar } from "@/components/bookings/BookingCalendar"
import { RevenueChart } from "./RevenueChart"
import { ServicesManagement } from "./ServicesManagement"
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
		<LayoutAdmin>
			<div className="flex h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6">
				{/* Sidebar */}
				<aside className="flex flex-col w-64 min-h-[32rem] rounded-xl  bg-card overflow-hidden">
					<nav className="flex-1 py-4 px-2 space-y-1">
						{navItems.map((item) => (
							<button
								key={item.key}
								className={[
									"flex items-center w-full gap-3 px-3 py-2 text-left rounded-lg transition",
									activeTab === item.key
										? "bg-primary/10 text-primary font-semibold"
										: "hover:bg-muted",
									"focus:outline-none focus:ring-2 focus:ring-primary/20"
								].join(" ")}
								onClick={() => setActiveTab(item.key)}
							>
								<span className="shrink-0">{item.icon}</span>
								<span className="truncate">{item.label}</span>
							</button>
						))}
					</nav>
					<div className="py-3 px-4 border-t border-border text-xs text-muted-foreground">
						<span>&copy; {new Date().getFullYear()} Salon Admin</span>
					</div>
				</aside>
				{/* Content */}
				<main className="flex-1  space-y-5">
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
					{activeTab === "calendar" && <BookingCalendar />}
					{activeTab === "services" && <ServicesManagement />}
					{activeTab === "schedules" && <ScheduleManagement />}
					{activeTab === "discounts" && <DiscountManagement />}
					{activeTab === "ratings" && <RatingsManagement />}
					{activeTab === "referrals" && <ReferralManagement />}
					{isSuperAdmin && activeTab === "staff" && <StaffManagement />}
					{isSuperAdmin && activeTab === "users" && <UserManagement />}
				</main>
			</div>
		</LayoutAdmin>
	)
}
