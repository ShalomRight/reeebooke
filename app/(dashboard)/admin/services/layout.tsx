"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/layout/dashboard/DashboardSidebar"
import Header from "@/components/layout/admin/header"
import { useRouter } from "next/navigation"
import currentUserClient from "@/lib/currentUserClient"
import {
  BarChart3, Calendar, Clock, Settings,
  Star, Ticket, TrendingUp, UserPlus, Users, ImageIcon,
} from "lucide-react"

const NAV_ITEMS = [
  { key: "overview",   label: "Overview",   icon: <TrendingUp className="w-4 h-4" />, forSuperAdmin: false },
  { key: "analytics",  label: "Analytics",  icon: <BarChart3 className="w-4 h-4" />,  forSuperAdmin: false },
  { key: "bookings",   label: "Bookings",   icon: <BarChart3 className="w-4 h-4" />,  forSuperAdmin: false },
  { key: "calendar",   label: "Calendar",   icon: <Calendar className="w-4 h-4" />,   forSuperAdmin: false },
  { key: "services",   label: "Services",   icon: <Settings className="w-4 h-4" />,   forSuperAdmin: false },
  { key: "gallery",    label: "Gallery",    icon: <ImageIcon className="w-4 h-4" />,  forSuperAdmin: false },
  { key: "discounts",  label: "Discounts",  icon: <Ticket className="w-4 h-4" />,     forSuperAdmin: false },
  { key: "ratings",    label: "Ratings",    icon: <Star className="w-4 h-4" />,       forSuperAdmin: false },
  { key: "referrals",  label: "Referrals",  icon: <UserPlus className="w-4 h-4" />,   forSuperAdmin: false },
  { key: "schedules",  label: "Schedules",  icon: <Clock className="w-4 h-4" />,      forSuperAdmin: false },
  { key: "staff",      label: "Staff",      icon: <Users className="w-4 h-4" />,      forSuperAdmin: true  },
  { key: "users",      label: "Users",      icon: <Users className="w-4 h-4" />,      forSuperAdmin: true  },
]

export default function AdminServicesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const currentUser = currentUserClient()
  const { isSuperAdmin } = currentUser || {}

  const navItems = NAV_ITEMS.filter((item) => !item.forSuperAdmin || isSuperAdmin)

  return (
    <SidebarProvider>
      <DashboardSidebar
        navItems={navItems}
        activeTab="services"
        onTabChange={(key) => router.push(`/admin?tab=${key}`)}
      />
      <SidebarInset className="flex-1 flex flex-col min-h-screen bg-background relative overflow-hidden">
        <Header showSidebarTrigger={true} />
        <main className="flex-1 w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
