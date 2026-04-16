"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
	ArrowLeft,
	Archive,
	MailOpen,
	CheckCircle,
	MoreHorizontal,
	Calendar,
	Clock,
	Tag,
	MessageSquare,
} from "lucide-react"
import { format } from "date-fns"
import { MessageBubble } from "../shared/MessageBubble"
import { ReplyInput } from "../shared/ReplyInput"
import { UserCard } from "../shared/UserCard"
import type { Message } from "@/src/db/schema"

type MessageWithRelations = Message & {
	replies?: (Message & { user?: { name: string | null; email: string } })[]
	user?: { name: string | null; email: string }
	requestedService?: { name: string }
}

interface ConversationColumnProps {
	message: MessageWithRelations | null
	isAdmin: boolean
	isMobile: boolean
	onBack?: () => void
	onStatusChange?: (id: string, status: string) => void
	onReplySent?: () => void
	className?: string
}

export function ConversationColumn({
	message,
	isAdmin,
	isMobile,
	onBack,
	onStatusChange,
	onReplySent,
	className,
}: ConversationColumnProps) {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [sending, setSending] = useState(false)
	const [showActions, setShowActions] = useState(false)

	// Auto-scroll to bottom when replies change
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight
		}
	}, [message?.replies])

	if (!message) {
		return (
			<div className={`flex-1 bg-[var(--warm-50)] flex items-center justify-center ${className || ""}`}>
				<div className="text-center p-8">
					<MessageSquare className="w-16 h-16 mx-auto mb-4 text-[var(--warm-300)]" />
					<p className="text-[var(--warm-500)] text-lg">Select a message to view the conversation</p>
				</div>
			</div>
		)
	}

	const handleSendReply = async (content: string) => {
		if (!content.trim()) return
		setSending(true)
		try {
			const res = await fetch(`/api/v1/messages/${message.id}/reply`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content }),
			})
			if (!res.ok) throw new Error("Failed to send reply")
			onReplySent?.()
			toast.success("Reply sent")
		} catch {
			toast.error("Failed to send reply")
		} finally {
			setSending(false)
		}
	}

	const handleStatusUpdate = async (status: string) => {
		if (!onStatusChange) return
		try {
			const res = await fetch(`/api/v1/messages/${message.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status }),
			})
			if (!res.ok) throw new Error("Failed to update status")
			onStatusChange(message.id, status)
			toast.success(`Marked as ${status}`)
		} catch {
			toast.error("Failed to update status")
		}
	}

	const isFromAdmin = message.isFromAdmin || message.source === "admin_initiated"

	return (
		<div className={`flex-1 flex flex-col bg-white ${className || ""}`}>
			{/* Header */}
			<div className="border-b border-[var(--warm-200)] p-4">
				<div className="flex items-start gap-3">
					{isMobile && onBack && (
						<Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
							<ArrowLeft className="w-5 h-5" />
						</Button>
					)}

					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<h2 className="font-semibold text-[var(--warm-800)] truncate">
								{message.subject || "No subject"}
							</h2>
							{isFromAdmin && (
								<Badge className="bg-[var(--terracotta-100)] text-[var(--terracotta-700)]">
									From Team
								</Badge>
							)}
						</div>

						<div className="flex flex-wrap items-center gap-2 text-sm text-[var(--warm-500)]">
							<Badge variant="outline" className="text-xs">
								{message.intent.replace(/_/g, " ")}
							</Badge>
							{message.requestedService && (
								<span className="flex items-center gap-1">
									<Calendar className="w-3 h-3" />
									{message.requestedService.name}
								</span>
							)}
							<span className="flex items-center gap-1">
								<Clock className="w-3 h-3" />
								{format(new Date(message.createdAt), "MMM d, h:mm a")}
							</span>
						</div>
					</div>

					{/* Actions Menu */}
					<div className="relative">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowActions(!showActions)}
							className="shrink-0"
						>
							<MoreHorizontal className="w-5 h-5" />
						</Button>

						{showActions && (
							<div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[var(--warm-200)] rounded-lg shadow-lg z-50 py-1">
								{message.status === "unread" && (
									<button
										onClick={() => {
											handleStatusUpdate("read")
											setShowActions(false)
										}}
										className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--warm-50)] flex items-center gap-2"
									>
										<MailOpen className="w-4 h-4" />
										Mark as read
									</button>
								)}
								{message.status !== "archived" && (
									<button
										onClick={() => {
											handleStatusUpdate("archived")
											setShowActions(false)
										}}
										className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--warm-50)] flex items-center gap-2"
									>
										<Archive className="w-4 h-4" />
										Archive
									</button>
								)}
								{isAdmin && message.status !== "closed" && (
									<button
										onClick={() => {
											handleStatusUpdate("closed")
											setShowActions(false)
										}}
										className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--warm-50)] flex items-center gap-2"
									>
										<CheckCircle className="w-4 h-4" />
										Close conversation
									</button>
								)}
							</div>
						)}
					</div>
				</div>

				{/* User Card */}
				<div className="mt-3">
					<UserCard
						name={message.user?.name || message.name}
						email={message.user?.email || message.email}
						compact
					/>
				</div>
			</div>

			{/* Messages */}
			<ScrollArea className="flex-1 p-4" ref={scrollRef}>
				<div className="space-y-4">
					{/* Original Message */}
					<MessageBubble
						message={message}
						isAdmin={isAdmin}
						showSender={!isFromAdmin}
					/>

					{/* Replies */}
					{message.replies?.map((reply) => (
						<MessageBubble
							key={reply.id}
							message={reply}
							isAdmin={isAdmin}
							showSender
						/>
					))}
				</div>
			</ScrollArea>

			{/* Reply Input */}
			<ReplyInput
				onSend={handleSendReply}
				disabled={sending || message.status === "archived" || message.status === "closed"}
				placeholder={
					message.status === "archived"
						? "This conversation is archived"
						: message.status === "closed"
							? "This conversation is closed"
							: "Type your reply..."
				}
			/>
		</div>
	)
}
