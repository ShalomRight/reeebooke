"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
	Inbox,
	MailOpen,
	Send,
	Archive,
	MessageSquare,
	Calendar,
	HelpCircle,
	X,
	CheckCircle,
} from "lucide-react"

interface FilterColumnProps {
	isAdmin: boolean
	category: "all" | "unread" | "read" | "sent" | "archived"
	intent: "all" | "booking_inquiry" | "cancellation_request" | "service_question" | "general"
	status: "all" | "open" | "closed" | "unassigned"
	onCategoryChange: (category: "all" | "unread" | "read" | "sent" | "archived") => void
	onIntentChange: (intent: "all" | "booking_inquiry" | "cancellation_request" | "service_question" | "general") => void
	onStatusChange: (status: "all" | "open" | "closed" | "unassigned") => void
	messageCounts: {
		all: number
		unread: number
		read: number
		sent: number
		archived: number
		booking: number
		cancellation: number
		question: number
	}
	className?: string
	isMobile?: boolean
	onClose?: () => void
}

const categories: { key: "all" | "unread" | "read" | "sent" | "archived"; label: string; icon: React.ElementType }[] = [
	{ key: "all", label: "All Messages", icon: Inbox },
	{ key: "unread", label: "Unread", icon: MailOpen },
	{ key: "read", label: "Read", icon: CheckCircle },
	{ key: "sent", label: "Sent", icon: Send },
	{ key: "archived", label: "Archived", icon: Archive },
]

const intents: { key: "all" | "booking_inquiry" | "cancellation_request" | "service_question" | "general"; label: string; icon: React.ElementType }[] = [
	{ key: "all", label: "All Types", icon: MessageSquare },
	{ key: "booking_inquiry", label: "Bookings", icon: Calendar },
	{ key: "cancellation_request", label: "Cancellations", icon: X },
	{ key: "service_question", label: "Questions", icon: HelpCircle },
]

export function FilterColumn({
	isAdmin,
	category,
	intent,
	status,
	onCategoryChange,
	onIntentChange,
	onStatusChange,
	messageCounts,
	className,
	isMobile,
	onClose,
}: FilterColumnProps) {
	const FilterButton = ({
		active,
		onClick,
		icon: Icon,
		label,
		count,
	}: {
		active: boolean
		onClick: () => void
		icon: React.ElementType
		label: string
		count?: number
	}) => (
		<Button
			variant="ghost"
			onClick={onClick}
			className={`w-full justify-start gap-3 h-10 px-3 ${
				active
					? "bg-[var(--terracotta-50)] text-[var(--terracotta-700)] hover:bg-[var(--terracotta-100)]"
					: "text-[var(--warm-600)] hover:bg-[var(--warm-50)] hover:text-[var(--warm-800)]"
			}`}
		>
			<Icon className="w-4 h-4 shrink-0" />
			<span className="flex-1 text-left text-sm">{label}</span>
			{count !== undefined && count > 0 && (
				<Badge
					variant={active ? "default" : "secondary"}
					className={`text-xs ${
						active ? "bg-[var(--terracotta-600)] text-white" : "bg-[var(--warm-100)] text-[var(--warm-700)]"
					}`}
				>
					{count}
				</Badge>
			)}
		</Button>
	)

	const content = (
		<div className="space-y-6">
			{/* Categories */}
			<div>
				<h3 className="text-xs font-semibold text-[var(--warm-500)] uppercase tracking-wider mb-2 px-3">
					Inbox
				</h3>
				<div className="space-y-1">
					{categories.map((cat) => (
						<FilterButton
							key={cat.key}
							active={category === cat.key}
							onClick={() => onCategoryChange(cat.key)}
							icon={cat.icon}
							label={cat.label}
							count={
								cat.key === "all"
									? messageCounts.all
									: cat.key === "unread"
										? messageCounts.unread
										: cat.key === "read"
											? messageCounts.read
											: cat.key === "sent"
												? messageCounts.sent
												: cat.key === "archived"
													? messageCounts.archived
														: undefined
							}
						/>
					))}
				</div>
			</div>

			{/* Intent Filters */}
			<div>
				<h3 className="text-xs font-semibold text-[var(--warm-500)] uppercase tracking-wider mb-2 px-3">
					By Type
				</h3>
				<div className="space-y-1">
					{intents.map((int) => (
						<FilterButton
							key={int.key}
							active={intent === int.key}
							onClick={() => onIntentChange(int.key)}
							icon={int.icon}
							label={int.label}
							count={
								int.key === "booking_inquiry"
									? messageCounts.booking
									: int.key === "cancellation_request"
										? messageCounts.cancellation
										: int.key === "service_question"
											? messageCounts.question
											: undefined
							}
						/>
					))}
				</div>
			</div>

			{/* Admin Status Filters */}
			{isAdmin && (
				<div>
					<h3 className="text-xs font-semibold text-[var(--warm-500)] uppercase tracking-wider mb-2 px-3">
						Status
					</h3>
					<div className="space-y-1">
						{(["all", "open", "closed"] as const).map((stat) => (
							<FilterButton
								key={stat}
								active={status === stat}
								onClick={() => onStatusChange(stat)}
								icon={stat === "open" ? MailOpen : stat === "closed" ? CheckCircle : Inbox}
								label={stat.charAt(0).toUpperCase() + stat.slice(1)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)

	if (isMobile) {
		return (
			<div className={`bg-white h-full flex flex-col ${className || ""}`}>
				<div className="flex items-center justify-between p-4 border-b border-[var(--warm-200)]">
					<h2 className="font-semibold text-[var(--warm-800)]">Filters</h2>
					{onClose && (
						<Button variant="ghost" size="sm" onClick={onClose}>
							Done
						</Button>
					)}
				</div>
				<ScrollArea className="flex-1 p-4">{content}</ScrollArea>
			</div>
		)
	}

	return (
		<div className={`bg-[var(--warm-50)] border-r border-[var(--warm-200)] h-full ${className || ""}`}>
			<ScrollArea className="h-full p-3">{content}</ScrollArea>
		</div>
	)
}
