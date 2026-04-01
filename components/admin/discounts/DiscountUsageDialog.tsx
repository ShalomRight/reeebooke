"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { DollarSign, RefreshCw, TrendingUp, Users } from "lucide-react"

interface UsageStats {
	totalUsages: number
	uniqueUsers: number
	totalDiscountAmount: number
	totalFinalRevenue: number
}

interface UsageByUser {
	userName: string | null
	email: string | null
	phone: string | null
	count: number
	totalDiscount: number
	totalSpent: number
	lastUsed: string
}

interface RecentUsage {
	userName: string | null
	email: string | null
	phone: string | null
	discountAmount: number
	finalTotal: number
	usedAt: string
}

interface DiscountUsageDialogProps {
	isOpen: boolean
	onClose: () => void
	loading: boolean
	statistics?: UsageStats
	usageByUser?: UsageByUser[]
	recentUsages?: RecentUsage[]
}

export function DiscountUsageDialog({
	isOpen,
	onClose,
	loading,
	statistics,
	usageByUser,
	recentUsages,
}: DiscountUsageDialogProps) {
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent side="right" className="w-full sm:max-w-xl bg-slate-50 border-l border-slate-200 p-0 flex flex-col">
				<SheetHeader className="bg-white px-6 py-4 border-b border-slate-200 sticky top-0 z-10">
					<SheetTitle>Discount Code Usage Details</SheetTitle>
					<SheetDescription>Detailed analytics and usage statistics for this discount code</SheetDescription>
				</SheetHeader>

				{loading ? (
					<div className="flex-1 flex items-center justify-center py-12">
						<RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
					</div>
				) : statistics ? (
					<div className="flex-1 overflow-y-auto p-6 space-y-6">
						{/* Statistics Cards */}
						<div className="grid grid-cols-2 gap-4">
							<Card className="border-slate-200 shadow-sm">
								<CardContent className="pt-6">
									<div className="flex items-center gap-2 mb-2">
										<TrendingUp className="w-4 h-4 text-slate-500" />
										<span className="text-sm text-slate-500 font-medium">Total Uses</span>
									</div>
									<div className="text-2xl font-bold text-slate-900">{statistics.totalUsages}</div>
								</CardContent>
							</Card>
							<Card className="border-slate-200 shadow-sm">
								<CardContent className="pt-6">
									<div className="flex items-center gap-2 mb-2">
										<Users className="w-4 h-4 text-slate-500" />
										<span className="text-sm text-slate-500 font-medium">Unique Users</span>
									</div>
									<div className="text-2xl font-bold text-slate-900">{statistics.uniqueUsers}</div>
								</CardContent>
							</Card>
							<Card className="border-slate-200 shadow-sm">
								<CardContent className="pt-6">
									<div className="flex items-center gap-2 mb-2">
										<DollarSign className="w-4 h-4 text-slate-500" />
										<span className="text-sm text-slate-500 font-medium">Total Discount</span>
									</div>
									<div className="text-2xl font-bold text-slate-900">${statistics.totalDiscountAmount.toLocaleString()}</div>
								</CardContent>
							</Card>
							<Card className="border-slate-200 shadow-sm">
								<CardContent className="pt-6">
									<div className="flex items-center gap-2 mb-2">
										<DollarSign className="w-4 h-4 text-slate-500" />
										<span className="text-sm text-slate-500 font-medium">Revenue</span>
									</div>
									<div className="text-2xl font-bold text-slate-900">${statistics.totalFinalRevenue.toLocaleString()}</div>
								</CardContent>
							</Card>
						</div>

						{/* Usage by User */}
						{usageByUser && usageByUser.length > 0 && (
							<Card className="border-slate-200 shadow-sm">
								<CardHeader className="pb-3 border-b border-slate-100">
									<CardTitle className="text-base font-semibold">Usage by User</CardTitle>
								</CardHeader>
								<CardContent className="pt-4">
									<div className="space-y-3">
										{usageByUser.map((user, idx) => (
											<div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
												<div className="flex-1">
													<div className="text-sm font-semibold text-slate-900">{user.userName || "Guest"}</div>
													<div className="text-xs text-slate-500 mt-0.5">
														{user.email && <span>{user.email}</span>}
														{user.phone && <span className="ml-2">{user.phone}</span>}
													</div>
												</div>
												<div className="text-right">
													<div className="text-sm font-medium text-slate-900">
														Used {user.count} time{user.count !== 1 ? "s" : ""}
													</div>
													<div className="text-xs text-slate-500 mt-0.5">
														Saved ${user.totalDiscount.toLocaleString()} • Spent ${user.totalSpent.toLocaleString()}
													</div>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Recent Usage History */}
						{recentUsages && recentUsages.length > 0 && (
							<Card className="border-slate-200 shadow-sm">
								<CardHeader className="pb-3 border-b border-slate-100">
									<CardTitle className="text-base font-semibold">Recent Usage History</CardTitle>
								</CardHeader>
								<CardContent className="pt-4">
									<div className="space-y-3">
										{recentUsages.map((usage, idx) => (
											<div key={idx} className="flex flex-col p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
												<div className="flex items-center justify-between font-medium text-sm text-slate-900">
													<span>{usage.userName || "Guest"}</span>
													<span className="text-blue-600">-${usage.discountAmount.toLocaleString()}</span>
												</div>
												<div className="flex items-center justify-between text-xs text-slate-500 mt-1">
													<span>{new Date(usage.usedAt).toLocaleString()}</span>
													<span>Total: ${usage.finalTotal.toLocaleString()}</span>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				) : null}
			</SheetContent>
		</Sheet>
	)
}

