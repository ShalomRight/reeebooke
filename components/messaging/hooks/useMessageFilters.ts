"use client"

import { useState, useCallback, useMemo } from "react"
import type { Message } from "@/src/db/schema"

type FilterState = {
	category: "all" | "unread" | "read" | "sent" | "archived"
	intent: "all" | "booking_inquiry" | "cancellation_request" | "service_question" | "general"
	status: "all" | "open" | "closed" | "unassigned"
	search: string
	sortBy: "newest" | "oldest" | "unread_first"
}

const initialFilters: FilterState = {
	category: "all",
	intent: "all",
	status: "all",
	search: "",
	sortBy: "newest",
}

export function useMessageFilters(isAdmin: boolean) {
	const [filters, setFilters] = useState<FilterState>(initialFilters)

	const setCategory = useCallback((category: FilterState["category"]) => {
		setFilters((prev) => ({ ...prev, category }))
	}, [])

	const setIntent = useCallback((intent: FilterState["intent"]) => {
		setFilters((prev) => ({ ...prev, intent }))
	}, [])

	const setStatus = useCallback((status: FilterState["status"]) => {
		setFilters((prev) => ({ ...prev, status }))
	}, [])

	const setSearch = useCallback((search: string) => {
		setFilters((prev) => ({ ...prev, search }))
	}, [])

	const setSortBy = useCallback((sortBy: FilterState["sortBy"]) => {
		setFilters((prev) => ({ ...prev, sortBy }))
	}, [])

	const resetFilters = useCallback(() => {
		setFilters(initialFilters)
	}, [])

	const filterMessages = useCallback(
		(messages: Message[]) => {
			let result = [...messages]

			// Category filter
			if (filters.category === "unread") {
				result = result.filter((m) => m.status === "unread")
			} else if (filters.category === "read") {
				result = result.filter((m) => m.status === "read" || m.status === "replied")
			} else if (filters.category === "sent") {
				result = result.filter((m) => m.isFromAdmin || m.source === "admin_initiated")
			} else if (filters.category === "archived") {
				result = result.filter((m) => m.status === "archived")
			}

			// Intent filter
			if (filters.intent !== "all") {
				result = result.filter((m) => m.intent === filters.intent)
			}

			// Status filter (admin only)
			if (isAdmin && filters.status !== "all") {
				result = result.filter((m) => m.status === filters.status)
			}

			// Search filter
			if (filters.search) {
				const searchLower = filters.search.toLowerCase()
				result = result.filter(
					(m) =>
						m.subject?.toLowerCase().includes(searchLower) ||
						m.body?.toLowerCase().includes(searchLower) ||
						m.name?.toLowerCase().includes(searchLower) ||
						m.email?.toLowerCase().includes(searchLower)
				)
			}

			// Sort
			result.sort((a, b) => {
				if (filters.sortBy === "newest") {
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				} else if (filters.sortBy === "oldest") {
					return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				} else if (filters.sortBy === "unread_first") {
					const aUnread = a.status === "unread" ? 1 : 0
					const bUnread = b.status === "unread" ? 1 : 0
					if (aUnread !== bUnread) return bUnread - aUnread
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				}
				return 0
			})

			return result
		},
		[filters, isAdmin]
	)

	return {
		filters,
		setCategory,
		setIntent,
		setStatus,
		setSearch,
		setSortBy,
		resetFilters,
		filterMessages,
	}
}
