"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { GlobalSearch } from "@/components/ui/global-search"
import { getRoleLabel } from "@/lib/rbac"
import { LogOut, Settings, User, Home } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Header({ showSidebarTrigger = false }: { showSidebarTrigger?: boolean }) {
	const { data: session } = useSession()

	const userRole = (session?.user as any)?.role
	const userImage = (session?.user as any)?.image
	const userName = session?.user?.name || "User"
	const userEmail = session?.user?.email || ""

	const getDashboardLink = () => {
		switch (userRole) {
			case "SUPER_ADMIN":
				return "/admin/super"
			case "ADMIN":
				return "/admin"
			case "STAFF":
				return "/staff"
			default:
				return "/dashboard"
		}
	}

	return (
		<header className="bg-warm-100 border-b border-warm-200 sticky top-0 z-50 backdrop-blur-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center gap-2">
						{showSidebarTrigger && <SidebarTrigger className="-ml-2 md:hidden" />}
						<Logo href={getDashboardLink()} variant="default" />
					</div>

					<div className="flex items-center gap-3">
						<GlobalSearch />
						<ThemeToggle />
						<Link href="/" className="hidden md:flex">
							<Button variant="ghost" size="sm" className="gap-2">
								<Home className="w-4 h-4" />
								Home
							</Button>
						</Link>
						
						<div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-terracotta-100 rounded-full border border-terracotta-200">
							<div className="w-2 h-2 bg-terracotta-600 rounded-full animate-pulse" />
							<span className="text-xs font-medium text-terracotta-800">{getRoleLabel(userRole)}</span>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-terracotta-100 transition-colors">
									<Avatar className="h-10 w-10 ring-2 ring-terracotta-300 hover:ring-terracotta-500 transition-all overflow-hidden">
										<AvatarImage src={userImage || "/Abby/Abby Logo.svg"} alt={userName} className="object-contain p-1" />
										<AvatarFallback className="bg-terracotta-100 text-terracotta-800 font-semibold">
											{userName.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-64">
								<DropdownMenuLabel className="p-4">
									<div className="flex items-center gap-3">
										<Avatar className="h-12 w-12 overflow-hidden">
											<AvatarImage src={userImage || "/Abby/Abby Logo.svg"} alt={userName} className="object-contain p-1" />
											<AvatarFallback className="bg-terracotta-100 text-terracotta-800 font-semibold text-lg">
												{userName.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col space-y-0.5 flex-1 min-w-0">
											<p className="text-sm font-semibold truncate">{userName}</p>
											<p className="text-xs text-muted-foreground truncate">{userEmail}</p>
											<div className="flex items-center gap-1.5 mt-1">
												<div className="w-1.5 h-1.5 bg-terracotta-600 rounded-full" />
												<p className="text-xs text-terracotta-700 font-medium">{getRoleLabel(userRole)}</p>
											</div>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/profile" className="flex items-center cursor-pointer py-2.5">
										<User className="mr-2 h-4 w-4" />
										<span>My Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/settings" className="flex items-center cursor-pointer py-2.5">
										<Settings className="mr-2 h-4 w-4" />
										<span>Settings</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/" className="flex items-center cursor-pointer py-2.5 md:hidden">
										<Home className="mr-2 h-4 w-4" />
										<span>Home</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem 
									onClick={() => signOut({ callbackUrl: "/" })}
									className="text-destructive focus:text-destructive py-2.5"
								>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	)
}
