"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3x3, List } from "lucide-react"

interface BookingFiltersProps {
	sortBy: "date-desc" | "date-asc" | "price-desc" | "price-asc"
	viewMode: "list" | "grid"
	onSortChange: (value: "date-desc" | "date-asc" | "price-desc" | "price-asc") => void
	onViewModeChange: (mode: "list" | "grid") => void
	onReset: () => void
}

export function BookingFilters({ sortBy, viewMode, onSortChange, onViewModeChange, onReset }: BookingFiltersProps) {
	return (
		<div className="flex gap-2 flex-wrap">
			<Select value={sortBy} onValueChange={onSortChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Sort by..." />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="date-desc">Newest First</SelectItem>
					<SelectItem value="date-asc">Oldest First</SelectItem>
					<SelectItem value="price-desc">Highest Price</SelectItem>
					<SelectItem value="price-asc">Lowest Price</SelectItem>
				</SelectContent>
			</Select>
			<div className="flex gap-1 border rounded-lg p-1">
				<Button
					variant={viewMode === "list" ? "default" : "ghost"}
					size="sm"
					onClick={() => onViewModeChange("list")}
					className="gap-2"
				>
					<List className="w-4 h-4" />
				</Button>
				<Button
					variant={viewMode === "grid" ? "default" : "ghost"}
					size="sm"
					onClick={() => onViewModeChange("grid")}
					className="gap-2"
				>
					<Grid3x3 className="w-4 h-4" />
				</Button>
			</div>
			<Button variant="outline" size="sm" onClick={onReset}>
				Reset
			</Button>
		</div>
	)
}

