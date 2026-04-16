"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, Plus, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"
import { UserCard } from "../shared/UserCard"
import { StatusBadge } from "../shared/StatusBadge"
import type { Message } from "@/src/db/schema"

type MessageWithReplies = Message & {
	replies?: Message[]
	user?: { name: string | null; email: string }
}

interface MessageListColumnProps {
	messages: MessageWithReplies[]
	selectedId: string | null
	searchQuery: string
	sortBy: "newest" | "oldest" | "unread_first"
	isAdmin: boolean
	isMobile: boolean
	loading: boolean
	onSelect: (message: MessageWithReplies) => void
	onSearchChange: (query: string) => void
	onSortChange: (sort: "newest" | "oldest" | "unread_first") => void
	onBack?: () => void
	onNewMessage?: () => void
	onShowFilters?: () => void
	className?: string
}

export function MessageListColumn({
	messages,
	selectedId,
	searchQuery,
	sortBy,
	isAdmin,
	isMobile,
	loading,
	onSelect,
	onSearchChange,
	onSortChange,
	onBack,
	onNewMessage,
	onShowFilters,
	className,
}: MessageListColumnProps) {
	const [showSortMenu, setShowSortMenu] = useState(false)

	const sortedMessages = useMemo(() => {
		const sorted = [...messages]
		if (sortBy === "newest") {
			sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		} else if (sortBy === "oldest") {
			sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
		} else if (sortBy === "unread_first") {
			sorted.sort((a, b) => {
				const aUnread = a.status === "unread" ? 1 : 0
				const bUnread = b.status === "unread" ? 1 : 0
				if (aUnread !== bUnread) return bUnread - aUnread
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			})
		}
		return sorted
	}, [messages, sortBy])

	if (loading) {
		return (
			<div className={`border-r border-[var(--warm-200)] bg-white h-full flex flex-col ${className || ""}`}>
				<div className="p-4 border-b border-[var(--warm-200)]">
					<div className="h-10 bg-[var(--warm-100)] rounded-md animate-pulse" />
				</div>
				<div className="flex-1 p-4 space-y-4">
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className="h-20 bg-[var(--warm-100)] rounded-lg animate-pulse" />
					))}
				</div>
			</div>
		)
	}

	return (
		<div className={`border-r border-[var(--warm-200)] bg-white h-full flex flex-col ${className || ""}`}>
			{/* Header */}
			<div className="p-4 border-b border-[var(--warm-200)] space-y-3">
				<div className="flex items-center gap-2">
					{isMobile && onBack && (
						<Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
							<ArrowLeft className="w-5 h-5" />
						</Button>
					)}
					<h2 className="font-semibold text-[var(--warm-800)] flex-1">
						Messages ({messages.length})
					</h2>
					{isAdmin && onNewMessage && (
						<Button size="sm" onClick={onNewMessage} className="bg-[var(--terracotta-600)] hover:bg-[var(--terracotta-700)] text-white gap-1">
							<Plus className="w-4 h-4" />
							<span className="hidden sm:inline">New</span>
						</Button>
					)}
					{isMobile && onShowFilters && (
						<Button variant="ghost" size="icon" onClick={onShowFilters}>
							<SlidersHorizontal className="w-5 h-5" />
						</Button>
					)}
				</div>

				{/* Search */}
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--warm-400)]" />
					<Input
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Search messages..."
						className="pl-9 border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)]"
					/>
				</div>

				{/* Sort */}
				<div className="flex items-center gap-2">
					<span className="text-xs text-[var(--warm-500)]">Sort by:</span>
					<div className="flex gap-1">
						{(["newest", "oldest", "unread_first"] as const).map((sort) => (
							<Button
								key={sort}
								variant={sortBy === sort ? "default" : "outline"}
								size="sm"
								onClick={() => onSortChange(sort)}
								className={`text-xs h-7 ${
									sortBy === sort
										? "bg-[var(--terracotta-600)] text-white hover:bg-[var(--terracotta-700)]"
										: "border-[var(--warm-200)] text-[var(--warm-600)]"
								}`}
							>
								{sort === "newest" ? "Newest" : sort === "oldest" ? "Oldest" : "Unread First"}
							</Button>
						))}
					</div>
				</div>
			</div>

			{/* Message List */}
			<ScrollArea className="flex-1">
				{sortedMessages.length === 0 ? (
					<div className="p-8 text-center">
						<p className="text-[var(--warm-500)] text-sm">No messages found</p>
						{isAdmin && onNewMessage && (
							<Button onClick={onNewMessage} variant="outline" className="mt-4">
								Start a conversation
							</Button>
						)}
					</div>
				) : (
					<div className="divide-y divide-[var(--warm-100)]">
						{sortedMessages.map((message) => {
							const hasReplies = message.replies && message.replies.length > 0
							const isSelected = selectedId === message.id
							const isUnread = message.status === "unread"

							return (
								<button
									key={message.id}
									onClick={() => onSelect(message)}
									className={`w-full p-4 text-left transition-all hover:bg-[var(--warm-50)] ${
										isSelected ? "bg-[var(--terracotta-50)] border-l-4 border-l-[var(--terracotta-500)]" : "border-l-4 border-l-transparent"
									} ${isUnread ? "bg-blue-50/30" : ""}`}
								>
									<div className="flex items-start gap-3">
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between gap-2 mb-1">
												<span className={`font-medium truncate ${isUnread ? "text-[var(--warm-900)]" : "text-[var(--warm-800)]"}`}>
													{message.name || message.user?.name || "Guest"}
												</span>
												<span className="text-xs text-[var(--warm-400)] shrink-0">
													{format(new Date(message.createdAt), "MMM d")}
												</span>
											</div>

											<p className={`text-sm truncate mb-1 ${isUnread ? "font-medium text-[var(--warm-900)]" : "text-[var(--warm-700)]"}`}>
												{message.subject || "No subject"}
											</p>

											<div className="flex items-center gap-2">
												<StatusBadge
													status={message.status}
													isFromAdmin={!!message.isFromAdmin || message.source === "admin_initiated"}
												/>
												{hasReplies && (
													<Badge variant="outline" className="text-xs">
														{message.replies!.length} replies
													</Badge>
												)}
												{isUnread && <span className="w-2 h-2 rounded-full bg-blue-500" />}
											</div>
										</div>
									</div>
								</button>
							)
						})}
					</div>
				)}
			</ScrollArea>
		</div>
	)
}
