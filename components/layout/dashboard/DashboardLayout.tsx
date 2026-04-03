"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar, NavItem } from "./DashboardSidebar"
import Header from "../admin/header"
import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  navItems: NavItem[]
  activeTab: string
  onTabChange: (key: string) => void
}

export function DashboardLayout({ children, navItems, activeTab, onTabChange }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar navItems={navItems} activeTab={activeTab} onTabChange={onTabChange} />
      <SidebarInset className="flex-1 flex flex-col min-h-screen bg-background relative overflow-hidden">
        <Header showSidebarTrigger={true} />
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
