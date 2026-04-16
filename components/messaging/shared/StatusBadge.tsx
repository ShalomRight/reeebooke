"use client"

import { Badge } from "@/components/ui/badge"
import type { Message } from "@/src/db/schema"

interface StatusBadgeProps {
	status: Message["status"]
	isFromAdmin?: boolean
	className?: string
}

export function StatusBadge({ status, isFromAdmin, className }: StatusBadgeProps) {
	const styles: Record<string, string> = {
		unread: "bg-blue-100 text-blue-700 hover:bg-blue-100",
		read: "bg-[var(--warm-100)] text-[var(--warm-700)] hover:bg-[var(--warm-100)]",
		replied: "bg-green-100 text-green-700 hover:bg-green-100",
		archived: "bg-gray-100 text-gray-700 hover:bg-gray-100",
		open: "bg-[var(--terracotta-100)] text-[var(--terracotta-700)] hover:bg-[var(--terracotta-100)]",
		closed: "bg-gray-100 text-gray-700 hover:bg-gray-100",
	}

	const labels: Record<string, string> = {
		unread: "Unread",
		read: "Read",
		replied: "Replied",
		archived: "Archived",
		open: "Open",
		closed: "Closed",
	}

	if (isFromAdmin) {
		return (
			<Badge className="bg-[var(--terracotta-100)] text-[var(--terracotta-700)] text-xs">
				From Team
			</Badge>
		)
	}

	return (
		<Badge className={`text-xs ${styles[status] || styles.read} ${className || ""}`}>
			{labels[status] || status}
		</Badge>
	)
}
