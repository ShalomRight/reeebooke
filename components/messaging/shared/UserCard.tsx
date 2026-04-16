"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, User } from "lucide-react"

interface UserCardProps {
	name: string | null
	email: string
	className?: string
	compact?: boolean
}

export function UserCard({ name, email, className, compact }: UserCardProps) {
	const initials = (name || email)
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2)

	if (compact) {
		return (
			<div className={`flex items-center gap-2 ${className || ""}`}>
				<Avatar className="h-8 w-8">
					<AvatarFallback className="bg-[var(--terracotta-100)] text-[var(--terracotta-700)] text-xs">
						{initials}
					</AvatarFallback>
				</Avatar>
				<div className="min-w-0">
					<p className="text-sm font-medium text-[var(--warm-800)] truncate">{name || email}</p>
					{name && <p className="text-xs text-[var(--warm-500)] truncate">{email}</p>}
				</div>
			</div>
		)
	}

	return (
		<Card className={`border-[var(--warm-200)] ${className || ""}`}>
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<Avatar className="h-10 w-10">
						<AvatarFallback className="bg-[var(--terracotta-100)] text-[var(--terracotta-700)]">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<User className="w-4 h-4 text-[var(--warm-400)]" />
							<p className="font-medium text-[var(--warm-800)] truncate">{name || "Guest User"}</p>
						</div>
						<div className="flex items-center gap-2 mt-1">
							<Mail className="w-4 h-4 text-[var(--warm-400)]" />
							<p className="text-sm text-[var(--warm-600)] truncate">{email}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
