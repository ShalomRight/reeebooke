"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BookingPaginationProps {
	currentPage: number
	totalPages: number
	totalItems: number
	itemsPerPage: number
	onPageChange: (page: number) => void
}

export function BookingPagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
}: BookingPaginationProps) {
	if (totalPages <= 1) return null

	const startItem = (currentPage - 1) * itemsPerPage + 1
	const endItem = Math.min(currentPage * itemsPerPage, totalItems)

	return (
		<div className="flex items-center justify-between pt-4 border-t">
			<p className="text-sm text-muted-foreground">
				Showing {startItem} to {endItem} of {totalItems} bookings
			</p>
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="w-4 h-4 mr-1" />
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
					disabled={currentPage === totalPages}
				>
					Next
					<ChevronRight className="w-4 h-4 ml-1" />
				</Button>
			</div>
		</div>
	)
}

