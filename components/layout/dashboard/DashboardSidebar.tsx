"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export interface NavItem {
    key: string;
    label: string;
    icon: React.ElementType | React.ReactNode;
}

export function DashboardSidebar({
  navItems,
  activeTab,
  onTabChange,
}: {
  navItems: NavItem[]
  activeTab: string
  onTabChange: (key: string) => void
}) {
  return (
    <Sidebar className="border-r border-warm-200 bg-warm-100">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="p-4 space-y-1">
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = activeTab === item.key;
                
                let IconElement: React.ReactNode = item.icon as React.ReactNode;
                if (typeof item.icon === 'function' || (typeof item.icon === 'object' && '$$typeof' in (item.icon as any) && !(item.icon as any).props)) {
                    const IconComp = item.icon as React.ElementType;
                    IconElement = <IconComp className="w-4 h-4" />;
                }

                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onTabChange(item.key)}
                      className={`gap-3 ${isActive ? 'bg-terracotta-100 text-terracotta-800 font-semibold' : 'hover:bg-warm-200 text-warm-600 hover:text-warm-900'}`}
                    >
                      {IconElement}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
