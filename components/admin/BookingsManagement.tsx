"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBookings, useBookingStats } from "@/lib/swr"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { BookingFilters } from "./bookings/BookingFilters"
import { BookingStatsCards } from "./bookings/BookingStatsCards"
import { BookingTabs } from "./bookings/BookingTabs"

interface BookingsManagementProps {
	filterByToday?: boolean
}

export function BookingsManagement({ filterByToday = false }: BookingsManagementProps) {
	const [activeTab, setActiveTab] = useState<"new" | "pending" | "completed" | "all">("new")
	const [newPage, setNewPage] = useState(1)
	const [pendingPage, setPendingPage] = useState(1)
	const [completedPage, setCompletedPage] = useState(1)
	const [allPage, setAllPage] = useState(1)
	const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "price-desc" | "price-asc">("date-desc")
	const [viewMode, setViewMode] = useState<"list" | "grid">("grid")

	const ITEMS_PER_PAGE = 12

	const { data: stats, mutate: mutateStats } = useBookingStats()

	// Fetch new bookings (last 24 hours)
	const { data: newBookingsResponse, mutate: mutateNewBookings } = useBookings({
		page: newPage,
		limit: ITEMS_PER_PAGE,
		sort: sortBy,
		status: undefined,
	})
	const allNewBookings = newBookingsResponse?.bookings || []
	const newBookings = useMemo(() => {
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		return allNewBookings.filter((b) => {
			const createdAt = b.createdAt ? new Date(b.createdAt) : null
			return createdAt && createdAt >= yesterday
		})
	}, [allNewBookings])

	// Fetch pending bookings
	const { data: pendingBookingsResponse, mutate: mutatePendingBookings } = useBookings({
		page: pendingPage,
		limit: ITEMS_PER_PAGE,
		sort: sortBy,
		status: "PENDING",
	})
	const pendingBookings = pendingBookingsResponse?.bookings || []
	const pendingPagination = pendingBookingsResponse?.pagination

	// Fetch completed bookings
	const { data: completedBookingsResponse, mutate: mutateCompletedBookings } = useBookings({
		page: completedPage,
		limit: ITEMS_PER_PAGE,
		sort: sortBy,
		status: "COMPLETED",
	})
	const completedBookings = completedBookingsResponse?.bookings || []
	const completedPagination = completedBookingsResponse?.pagination

	// Fetch all bookings
	const { data: allBookingsResponse, mutate: mutateAllBookings } = useBookings({
		page: allPage,
		limit: ITEMS_PER_PAGE,
		sort: sortBy,
		status: undefined,
		date: filterByToday ? new Date().toISOString().split("T")[0] : undefined,
	})
	const allBookings = allBookingsResponse?.bookings || []
	const allPagination = allBookingsResponse?.pagination

	// Calculate statistics for display
	const newBookingsCount = useMemo(() => {
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		return allNewBookings.filter((b) => {
			const createdAt = b.createdAt ? new Date(b.createdAt) : null
			return createdAt && createdAt >= yesterday
		}).length
	}, [allNewBookings])

	// Mutate all caches
	const mutate = () => {
		mutateNewBookings()
		mutatePendingBookings()
		mutateCompletedBookings()
		mutateAllBookings()
		mutateStats()
	}

	// Handle status change
	const handleStatusChange = async (bookingId: string, newStatus: string) => {
		try {
			const response = await fetch(`/api/v1/bookings/${bookingId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: newStatus }),
			})

			if (response.ok) {
				toast.success("Booking status updated successfully")
				mutate()
			} else {
				toast.error("Failed to update booking status")
			}
		} catch (error) {
			toast.error("Failed to update booking status")
		}
	}

	// Handle delete booking
	const handleDeleteBooking = async (bookingId: string) => {
		try {
			const response = await fetch(`/api/v1/bookings/${bookingId}`, {
				method: "DELETE",
			})

			if (response.ok) {
				toast.success("Booking deleted successfully")
				mutate()
			} else {
				const errorData = await response.json().catch(() => ({ error: "Failed to delete booking" }))
				toast.error(errorData.error || "Failed to delete booking")
			}
		} catch (error) {
			toast.error("Failed to delete booking")
		}
	}

	// Handle download receipt
	const handleDownloadReceipt = async (bookingId: string) => {
		try {
			const response = await fetch(`/api/v1/bookings/${bookingId}/receipt?format=pdf`)
			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ error: "Failed to download receipt" }))
				throw new Error(errorData.error || "Failed to download receipt")
			}

			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement("a")
			a.href = url
			a.download = `receipt-${bookingId}.pdf`
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			document.body.removeChild(a)
			toast.success("Receipt downloaded successfully")
		} catch (error) {
			console.error("Receipt download error:", error)
			toast.error(error instanceof Error ? error.message : "Failed to download receipt")
		}
	}

	// Handle reset filters
	const handleReset = () => {
		setNewPage(1)
		setPendingPage(1)
		setCompletedPage(1)
		setAllPage(1)
		setSortBy("date-desc")
		setViewMode("grid")
	}

	// Handle sort change
	const handleSortChange = (value: "date-desc" | "date-asc" | "price-desc" | "price-asc") => {
		setSortBy(value)
		setNewPage(1)
		setPendingPage(1)
		setCompletedPage(1)
		setAllPage(1)
	}

	return (
		<div className="space-y-6">
			{/* Statistics Cards */}
			<BookingStatsCards
				newBookingsCount={newBookingsCount}
				pendingCount={pendingPagination?.total || 0}
				confirmedCount={stats?.confirmed || 0}
				completedCount={completedPagination?.total || 0}
				cancelledCount={stats?.cancelled || 0}
				totalCount={stats?.total || 0}
			/>

			{/* Tabs Section */}
			<Card className="border-none shadow-none bg-transparent">
				<CardHeader className="px-0 pt-0">
					<div className="flex items-center justify-between flex-wrap gap-4">
						<div>
							<CardTitle className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>Booking Management</CardTitle>
							<CardDescription className="text-slate-500">Manage all bookings with organized tabs and pagination</CardDescription>
						</div>
						<BookingFilters
							sortBy={sortBy}
							viewMode={viewMode}
							onSortChange={handleSortChange}
							onViewModeChange={setViewMode}
							onReset={handleReset}
						/>
					</div>
				</CardHeader>
				<CardContent className="px-0">
					<BookingTabs
						activeTab={activeTab}
						viewMode={viewMode}
						newBookings={newBookings}
						pendingBookings={pendingBookings}
						completedBookings={completedBookings}
						allBookings={allBookings}
						newBookingsCount={newBookingsCount}
						pendingPagination={pendingPagination}
						completedPagination={completedPagination}
						allPagination={allPagination}
						itemsPerPage={ITEMS_PER_PAGE}
						onTabChange={setActiveTab}
						onStatusChange={handleStatusChange}
						onDownloadReceipt={handleDownloadReceipt}
						onDelete={handleDeleteBooking}
						onNewPageChange={setNewPage}
						onPendingPageChange={setPendingPage}
						onCompletedPageChange={setCompletedPage}
						onAllPageChange={setAllPage}
					/>
				</CardContent>
			</Card>
		</div>
	)
}
