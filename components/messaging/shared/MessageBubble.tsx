"use client"

import { format } from "date-fns"
import { User } from "lucide-react"
import type { Message } from "@/src/db/schema"

interface MessageBubbleProps {
	message: Message & { user?: { name: string | null; email: string } | null }
	isAdmin?: boolean
	showSender?: boolean
}

export function MessageBubble({ message, isAdmin, showSender }: MessageBubbleProps) {
	const isFromAdmin = message.isFromAdmin || message.source === "admin_initiated"
	const isCurrentUser = isAdmin ? !isFromAdmin : isFromAdmin

	return (
		<div className={`flex ${isCurrentUser ? "justify-start" : "justify-end"} mb-4`}>
			<div
				className={`max-w-[80%] rounded-2xl px-4 py-3 ${
					isCurrentUser
						? "bg-[var(--warm-50)] border border-[var(--warm-200)] rounded-tl-sm"
						: "bg-[var(--terracotta-600)] text-white rounded-tr-sm"
				}`}
			>
				{showSender && (
					<div className={`flex items-center gap-2 mb-2 ${isCurrentUser ? "text-[var(--warm-600)]" : "text-white/80"}`}>
						<User className="w-3 h-3" />
						<span className="text-xs font-medium">
							{isFromAdmin ? "Team" : message.name || message.user?.name || "Guest"}
						</span>
					</div>
				)}
				<p className={`whitespace-pre-wrap text-sm leading-relaxed ${isCurrentUser ? "text-[var(--warm-800)]" : "text-white"}`}>
					{message.body}
				</p>
				<div className={`text-xs mt-2 ${isCurrentUser ? "text-[var(--warm-400)]" : "text-white/60"}`}>
					{format(new Date(message.createdAt), "MMM d, h:mm a")}
				</div>
			</div>
		</div>
	)
}
