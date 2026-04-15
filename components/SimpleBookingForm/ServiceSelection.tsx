"use client"

import { RatingDetailsDialog } from "@/components/ratings/RatingDetailsDialog"
import { RatingDisplay } from "@/components/ratings/RatingDisplay"
import { Skeleton } from "@/components/ui/skeleton"
import { useFavorites } from "@/hooks/use-favorites"
import { Scissors, Droplet, Sparkles, Wind, Leaf, Heart, Search } from "lucide-react"
import { useSession } from "next-auth/react"
import { useMemo, useState } from "react"

type Service = {
	id: string
	name: string
	price: number
	category?: string | null
	description?: string | null
	rating?: number
	ratingsCount?: number
}

interface ServiceSelectionProps {
	services: Service[]
	selectedService: string
	setSelectedService: (id: string) => void
	isLoading?: boolean
}

const ALL_TAB = "All"

function getIcon(name: string) {
	const n = name.toLowerCase()
	if (n.includes("cut") || n.includes("trim") || n.includes("shaping")) return Scissors
	if (n.includes("wash") || n.includes("treatment")) return Droplet
	if (n.includes("color") || n.includes("dye") || n.includes("highlight")) return Sparkles
	if (n.includes("twist") || n.includes("braid") || n.includes("locs")) return Wind
	if (n.includes("natural") || n.includes("organic")) return Leaf
	return Scissors
}

export function ServiceSelection({ services, selectedService, setSelectedService, isLoading = false }: ServiceSelectionProps) {
	const { isFavorite, addFavorite, removeFavorite } = useFavorites()
	const { data: session } = useSession()
	const [activeCategory, setActiveCategory] = useState<string>(ALL_TAB)
	const [searchQuery, setSearchQuery] = useState("")
	const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
	const [selectedServiceForRating, setSelectedServiceForRating] = useState<Service | null>(null)

	const categories = useMemo(() => {
		const cats = Array.from(
			new Set(services.map((s) => s.category?.trim()).filter(Boolean) as string[])
		).sort()
		return cats.length > 0 ? [ALL_TAB, ...cats] : []
	}, [services])

	const filtered = useMemo(() => {
		let result = activeCategory === ALL_TAB || categories.length === 0 
			? services 
			: services.filter((s) => s.category?.trim() === activeCategory)
		
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase()
			result = result.filter(s => 
				s.name.toLowerCase().includes(q) || 
				s.description?.toLowerCase().includes(q)
			)
		}
		
		return result
	}, [services, activeCategory, categories, searchQuery])

	const handleRatingClick = (service: Service, e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
		setSelectedServiceForRating(service)
		setRatingDialogOpen(true)
	}

	const handleFavoriteClick = (serviceId: string, e: React.MouseEvent | React.KeyboardEvent) => {
		e.stopPropagation()
		e.preventDefault()
		if (isFavorite(serviceId)) {
			removeFavorite(serviceId)
		} else {
			addFavorite(serviceId)
		}
	}

	if (isLoading) {
		return (
			<div className="space-y-3">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="w-full p-4 rounded-lg border border-warm-200 bg-white flex items-center gap-3">
						<Skeleton className="w-10 h-10 rounded-lg" />
						<div className="flex-1 space-y-2">
							<Skeleton className="h-5 w-2/3" />
							<Skeleton className="h-4 w-1/2" />
						</div>
						<Skeleton className="w-16 h-6" />
					</div>
				))}
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full">
			{/* ── Sticky Header: Search + Filters ───────────────────── */}
			<div className="flex-shrink-0 pb-3 space-y-3">
				{/* Search input */}
				<div className="relative mb-4">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
					<input
						type="text"
						placeholder="Search services..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-9 pr-4 py-2.5 border border-warm-200 rounded-lg bg-white text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-terracotta-400 text-sm"
					/>
				</div>

				{/* Category tabs */}
				{categories.length > 1 && (
					<div className="flex gap-2 flex-wrap mb-4">
						{categories.map((cat) => {
							const count = cat === ALL_TAB
								? services.length
								: services.filter((s) => s.category?.trim() === cat).length
							const isActive = activeCategory === cat
							return (
								<button
									key={cat}
									onClick={() => setActiveCategory(cat)}
									className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
										isActive
											? "bg-terracotta-600 text-white border-terracotta-600"
											: "bg-white text-warm-600 border-warm-200 hover:border-terracotta-400 hover:text-warm-800"
									}`}
								>
									{cat}
									<span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
										isActive ? "bg-white/20" : "bg-warm-100"
									}`}>
										{count}
									</span>
								</button>
							)
						})}
					</div>
				)}
			</div>

			{/* ── Scrollable Service list ─────────────────────────── */}
			<div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-3">
				{filtered.length === 0 && (
					<p className="text-sm text-warm-600 text-center py-6">
						{searchQuery ? "No services match your search." : "No services in this category."}
					</p>
				)}
				{filtered.map((service) => {
					const Icon = getIcon(service.name)
					const isSelected = selectedService === service.id
					const favorited = isFavorite(service.id)
					return (
						<div key={service.id} className="relative">
							<button
								onClick={() => setSelectedService(service.id)}
								className={`w-full p-4 bg-white rounded-lg border transition-colors text-left ${
									isSelected
										? "border-terracotta-600 bg-terracotta-50"
										: "border-warm-200 hover:border-terracotta-400"
								}`}
							>
								<div className="flex items-center gap-3">
									<div className={`p-2 rounded-lg flex-shrink-0 ${isSelected ? "bg-terracotta-600 text-white" : "bg-terracotta-100 text-terracotta-600"}`}>
										<Icon className="w-6 h-6" />
									</div>
									<div className="flex-1 min-w-0 pr-8">
										<h3 className="font-serif text-warm-900 text-lg leading-snug truncate">
											{service.name}
										</h3>
										{service.description && (
											<p className="text-xs text-warm-600 mt-0.5 line-clamp-1">
												{service.description}
											</p>
										)}
										{(service.ratingsCount ?? 0) > 0 && (
											<div
												className="mt-1 cursor-pointer inline-block"
												onClick={(e) => handleRatingClick(service, e)}
											>
												<RatingDisplay
													rating={service.rating || 0}
													ratingsCount={service.ratingsCount}
													size="sm"
													serviceId={service.id}
													serviceName={service.name}
													clickable={false}
												/>
											</div>
										)}
									</div>
									<span className="font-sans font-bold text-terracotta-600 text-lg flex-shrink-0">
										${service.price.toLocaleString()}
									</span>
								</div>
							</button>

							{/* ── Favorite button — outside the card button ── */}
							{session?.user && (
								<button
									type="button"
									onClick={(e) => handleFavoriteClick(service.id, e)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") handleFavoriteClick(service.id, e as any)
									}}
									aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
									className="absolute top-3 right-12 p-1 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-400 z-10"
								>
									<Heart
										className={`w-5 h-5 transition-all duration-200 ${
											favorited ? "fill-red-500 text-red-500 scale-110" : "text-warm-400 hover:text-red-400"
										}`}
									/>
								</button>
							)}
						</div>
					)
				})}
			</div>

			{selectedServiceForRating && (
				<RatingDetailsDialog
					serviceId={selectedServiceForRating.id}
					serviceName={selectedServiceForRating.name}
					averageRating={selectedServiceForRating.rating || 0}
					ratingsCount={selectedServiceForRating.ratingsCount || 0}
					open={ratingDialogOpen}
					onOpenChange={setRatingDialogOpen}
				/>
			)}
		</div>
	)
}
