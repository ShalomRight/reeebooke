"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { toast } from "sonner"
import { useMediaQuery } from "@/lib/hooks/useMediaQuery"
import { FilterColumn } from "./columns/FilterColumn"
import { MessageListColumn } from "./columns/MessageListColumn"
import { ConversationColumn } from "./columns/ConversationColumn"
import { useMessageFilters } from "./hooks/useMessageFilters"
import { useMobileNavigation } from "./hooks/useMobileNavigation"
import type { Message } from "@/src/db/schema"

type MessageWithReplies = Message & {
	replies?: Message[]
	user?: { name: string | null; email: string }
	requestedService?: { name: string }
}

interface MessagesInboxProps {
	userId?: string
	isAdmin?: boolean
	className?: string
}

export function MessagesInbox({ userId, isAdmin = false, className }: MessagesInboxProps) {
	const [messages, setMessages] = useState<MessageWithReplies[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedMessage, setSelectedMessage] = useState<MessageWithReplies | null>(null)
	const [composeOpen, setComposeOpen] = useState(false)

	const { filters, setCategory, setIntent, setStatus, setSearch, setSortBy, filterMessages } =
		useMessageFilters(isAdmin)

	const isMobile = useMediaQuery("(max-width: 768px)")
	const { currentView, isFilterDrawerOpen, showList, showConversation, showFilters, closeFilters } = useMobileNavigation()

	// Fetch messages
	const fetchMessages = useCallback(async () => {
		setLoading(true)
		try {
			const params = new URLSearchParams()
			if (userId) params.append("userId", userId)
			// Add filter params
			if (filters.category !== "all") {
				if (filters.category === "unread") params.append("status", "unread")
				if (filters.category === "read") params.append("status", "read")
				if (filters.category === "archived") params.append("status", "archived")
			}
			if (filters.intent !== "all") params.append("intent", filters.intent)

			const res = await fetch(`/api/v1/messages?${params.toString()}`)
			if (!res.ok) throw new Error("Failed to fetch")
			const data = await res.json() as MessageWithReplies[]
			setMessages(data)
		} catch {
			toast.error("Failed to load messages")
		} finally {
			setLoading(false)
		}
	}, [userId, filters.category, filters.intent])

	useEffect(() => {
		fetchMessages()
	}, [fetchMessages])

	// Filter messages client-side
	const filteredMessages = useMemo(() => {
		return filterMessages(messages)
	}, [messages, filterMessages])

	// Calculate counts for filter badges
	const messageCounts = useMemo(() => ({
		all: messages.length,
		unread: messages.filter((m) => m.status === "unread").length,
		read: messages.filter((m) => m.status === "read" || m.status === "replied").length,
		sent: messages.filter((m) => m.isFromAdmin || m.source === "admin_initiated").length,
		archived: messages.filter((m) => m.status === "archived").length,
		booking: messages.filter((m) => m.intent === "booking_inquiry").length,
		cancellation: messages.filter((m) => m.intent === "cancellation_request").length,
		question: messages.filter((m) => m.intent === "service_question").length,
	}), [messages])

	// Handle message selection
	const handleSelectMessage = useCallback((message: MessageWithReplies) => {
		setSelectedMessage(message)
		if (isMobile) {
			showConversation()
		}
		// Mark as read if unread
		if (message.status === "unread") {
			fetch(`/api/v1/messages/${message.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: "read" }),
			})
		}
	}, [isMobile, showConversation])

	// Handle status change
	const handleStatusChange = useCallback((id: string, status: string) => {
		setMessages((prev) =>
			prev.map((m) => (m.id === id ? { ...m, status } : m))
		)
		if (selectedMessage?.id === id) {
			setSelectedMessage((prev) => (prev ? { ...prev, status } : null))
		}
	}, [selectedMessage?.id])

	// Handle reply sent
	const handleReplySent = useCallback(() => {
		fetchMessages()
	}, [fetchMessages])

	// Mobile layout
	if (isMobile) {
		if (currentView === "conversation" && selectedMessage) {
			return (
				<div className={`h-[calc(100vh-4rem)] w-full ${className || ""}`}>
					<ConversationColumn
						message={selectedMessage}
						isAdmin={isAdmin}
						isMobile={true}
						onBack={showList}
						onStatusChange={handleStatusChange}
						onReplySent={handleReplySent}
					></ConversationColumn>
				</div>
			)
		}

		return (
			<div className={`h-[calc(100vh-4rem)] w-full flex ${className || ""}`}>
				{/* Filter Drawer */}
				{currentView === "list" && (
					<>
						<div className={`${isFilterDrawerOpen ? "block" : "hidden"} absolute inset-0 z-50 bg-white`}>
							<FilterColumn
								isAdmin={isAdmin}
								category={filters.category}
								intent={filters.intent}
								status={filters.status}
								onCategoryChange={setCategory}
								onIntentChange={setIntent}
								onStatusChange={setStatus}
								messageCounts={messageCounts}
								isMobile={true}
								onClose={closeFilters}
							></FilterColumn>
						</div>
						<MessageListColumn
							messages={filteredMessages}
							selectedId={selectedMessage?.id || null}
							searchQuery={filters.search}
							sortBy={filters.sortBy}
							isAdmin={isAdmin}
							isMobile={true}
							loading={loading}
							onSelect={handleSelectMessage}
							onSearchChange={setSearch}
							onSortChange={setSortBy}
							onShowFilters={showFilters}
							onNewMessage={isAdmin ? () => setComposeOpen(true) : undefined}
						/>
					</>
				)}
			</div>
		)
	}

	// Desktop layout - 3 column
	return (
		<div
			className={`h-[calc(100vh-6rem)] w-[95%] mx-auto grid grid-cols-[200px_320px_1fr] gap-0 rounded-lg border border-[var(--warm-200)] overflow-hidden bg-white ${className || ""}`}
		>
			{/* Column 1: Filters */}
			<FilterColumn
				isAdmin={isAdmin}
				category={filters.category}
				intent={filters.intent}
				status={filters.status}
				onCategoryChange={setCategory}
				onIntentChange={setIntent}
				onStatusChange={setStatus}
				messageCounts={messageCounts}
			/>

			{/* Column 2: Message List */}
			<MessageListColumn
				messages={filteredMessages}
				selectedId={selectedMessage?.id || null}
				searchQuery={filters.search}
				sortBy={filters.sortBy}
				isAdmin={isAdmin}
				isMobile={false}
				loading={loading}
				onSelect={handleSelectMessage}
				onSearchChange={setSearch}
				onSortChange={setSortBy}
				onNewMessage={isAdmin ? () => setComposeOpen(true) : undefined}
			/>

			{/* Column 3: Conversation */}
			<ConversationColumn
				message={selectedMessage}
				isAdmin={isAdmin}
				isMobile={false}
				onStatusChange={handleStatusChange}
				onReplySent={handleReplySent}
			/>
		</div>
	)
}
