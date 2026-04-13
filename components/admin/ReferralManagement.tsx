"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Eye, Users, Gift, TrendingUp, Copy, CheckCircle2, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

interface ReferralCode {
	id: string
	code: string
	userId: string
	userName: string
	userEmail: string
	userPhone?: string | null
	userPoints: number
	pointsPerReferral: number
	usageCount: number
	totalPointsAwarded: number
	uniqueReferrals: number
	createdAt: string
	updatedAt: string
}

interface ReferralDetails {
	referralCode: {
		id: string
		code: string
		pointsPerReferral: number
		usageCount: number
		createdAt: string
	}
	user: {
		id: string
		name: string
		email: string
		phone?: string | null
		referralPoints: number
	}
	statistics: {
		totalReferrals: number
		totalPointsAwarded: number
		totalRewards: number
	}
	referralsByUser: Array<{
		referredId: string
		referredUser: {
			id: string
			name: string
			email: string
			phone?: string | null
			createdAt: string
		}
		totalPoints: number
		referralCount: number
		firstReferral: string
		lastReferral: string
	}>
	recentRewards: Array<{
		id: string
		referredId: string
		points: number
		bookingId?: string | null
		createdAt: string
		User: {
			id: string
			name: string
			email: string
		} | null
	}>
}

export function ReferralManagement() {
	const [codes, setCodes] = useState<ReferralCode[]>([])
	const [loading, setLoading] = useState(false)
	const [selectedCodeId, setSelectedCodeId] = useState<string | null>(null)
	const [details, setDetails] = useState<ReferralDetails | null>(null)
	const [loadingDetails, setLoadingDetails] = useState(false)
	const [editPoints, setEditPoints] = useState("")
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isGenerating, setIsGenerating] = useState(false)
	const [isGeneratingOne, setIsGeneratingOne] = useState(false)

	// Load referral codes
	const loadCodes = async () => {
		setLoading(true)
		try {
			const res = await fetch("/api/v1/admin/referrals")
			if (!res.ok) throw new Error("Failed to load codes")
			const data = await res.json() as any
			setCodes(data)
		} catch (err) {
			toast.error("Failed to load referral codes")
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadCodes()
	}, [])

	// Load details for a referral code
	const loadDetails = async (id: string) => {
		setSelectedCodeId(id)
		setLoadingDetails(true)
		try {
			const res = await fetch(`/api/v1/admin/referrals/${id}`)
			if (!res.ok) throw new Error("Failed to load details")
			const data = await res.json() as any
			setDetails(data)
			setEditPoints(data.referralCode.pointsPerReferral.toString())
		} catch (err) {
			toast.error("Failed to load referral details")
		} finally {
			setLoadingDetails(false)
		}
	}

	// Update points per referral
	const handleUpdatePoints = async () => {
		if (!selectedCodeId) return

		try {
			const res = await fetch(`/api/v1/admin/referrals/${selectedCodeId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ pointsPerReferral: parseInt(editPoints) }),
			})

			if (res.ok) {
				toast.success("Points per referral updated")
				setIsEditDialogOpen(false)
				loadCodes()
				if (selectedCodeId) loadDetails(selectedCodeId)
			} else {
				toast.error("Failed to update points")
			}
		} catch (err) {
			toast.error("Failed to update points")
		}
	}

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
		toast.success("Copied to clipboard!")
	}

	// Generate referral codes for all users without one
	const generateAllCodes = async () => {
		setIsGenerating(true)
		try {
			const res = await fetch("/api/v1/admin/referrals/generate-all", {
				method: "POST",
			})
			const data = await res.json() as any
			if (res.ok) {
				toast.success(data.message || "Referral codes generated successfully")
				loadCodes() // Refresh the list
			} else {
				toast.error(data.error || "Failed to generate referral codes")
			}
		} catch (err) {
			toast.error("Failed to generate referral codes")
		} finally {
			setIsGenerating(false)
		}
	}

	// Generate a referral code for a single user without one
	const generateOneCode = async () => {
		setIsGeneratingOne(true)
		try {
			const res = await fetch("/api/v1/admin/referrals/generate", {
				method: "POST",
			})
			const data = await res.json() as any
			if (res.ok) {
				toast.success(data.message || "Referral code generated successfully")
				loadCodes() // Refresh the list
			} else {
				if (res.status === 404) {
					toast.info(data.message || "All users already have referral codes.")
				} else {
					toast.error(data.error || "Failed to generate referral code")
				}
			}
		} catch (err) {
			toast.error("Failed to generate referral code")
		} finally {
			setIsGeneratingOne(false)
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-space-grotesk)" }}>
						Referral & Affiliate Management
					</h2>
					<p className="text-muted-foreground mt-1">Manage referral codes and track affiliate performance</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={generateOneCode} disabled={isGeneratingOne || isGenerating || loading}>
						<Sparkles className={`w-4 h-4 mr-2 ${isGeneratingOne ? "animate-spin" : ""}`} />
						Generate One
					</Button>
					<Button variant="outline" size="sm" onClick={generateAllCodes} disabled={isGenerating || isGeneratingOne || loading}>
						<Sparkles className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
						Generate All Codes
					</Button>
					<Button variant="outline" size="sm" onClick={loadCodes} disabled={loading}>
						<RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
						Refresh
					</Button>
				</div>
			</div>

			{/* Statistics Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-2 mb-2">
							<Users className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Total Codes</span>
						</div>
						<div className="text-2xl font-bold">{codes.length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-2 mb-2">
							<TrendingUp className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Total Referrals</span>
						</div>
						<div className="text-2xl font-bold">
							{codes.reduce((sum, c) => sum + c.uniqueReferrals, 0)}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-2 mb-2">
							<Gift className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Total Points Awarded</span>
						</div>
						<div className="text-2xl font-bold">
							{codes.reduce((sum, c) => sum + c.totalPointsAwarded, 0)}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-2 mb-2">
							<Users className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Active Affiliates</span>
						</div>
						<div className="text-2xl font-bold">
							{codes.filter((c) => c.uniqueReferrals > 0).length}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Referral Codes List */}
			<Card>
				<CardHeader>
					<CardTitle>All Referral Codes</CardTitle>
					<CardDescription>View and manage all user referral codes</CardDescription>
				</CardHeader>
				<CardContent>
					{codes.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">No referral codes yet</p>
						</div>
					) : (
						<div className="space-y-3">
							{codes.map((code) => (
								<div
									key={code.id}
									className="flex items-center justify-between p-4 rounded-lg border bg-card"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<code className="font-mono font-bold text-lg">{code.code}</code>
											<Badge variant="secondary">{code.uniqueReferrals} referrals</Badge>
										</div>
										<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
											<span>
												<strong className="text-card-foreground">{code.userName}</strong> ({code.userEmail})
											</span>
											<span>{code.pointsPerReferral} pts/referral</span>
											<span>{code.totalPointsAwarded} total points</span>
											<span>{code.userPoints} user points</span>
											<span className="text-xs">Created: {new Date(code.createdAt).toLocaleDateString()}</span>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Button variant="outline" size="sm" onClick={() => loadDetails(code.id)}>
											<Eye className="w-4 h-4 mr-2" />
											View Details
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Details Dialog */}
			<Dialog open={selectedCodeId !== null} onOpenChange={(open) => !open && setSelectedCodeId(null)}>
				<DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Referral Code Details</DialogTitle>
						<DialogDescription>Detailed analytics and referral information</DialogDescription>
					</DialogHeader>

					{loadingDetails ? (
						<div className="flex items-center justify-center py-12">
							<RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
						</div>
					) : details ? (
						<div className="space-y-6">
							{/* Statistics Cards */}
							<div className="grid grid-cols-3 gap-4">
								<Card>
									<CardContent className="pt-6">
										<div className="flex items-center gap-2 mb-2">
											<Users className="w-4 h-4 text-muted-foreground" />
											<span className="text-sm text-muted-foreground">Total Referrals</span>
										</div>
										<div className="text-2xl font-bold">{details.statistics.totalReferrals}</div>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="pt-6">
										<div className="flex items-center gap-2 mb-2">
											<Gift className="w-4 h-4 text-muted-foreground" />
											<span className="text-sm text-muted-foreground">Points Awarded</span>
										</div>
										<div className="text-2xl font-bold">{details.statistics.totalPointsAwarded}</div>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="pt-6">
										<div className="flex items-center gap-2 mb-2">
											<TrendingUp className="w-4 h-4 text-muted-foreground" />
											<span className="text-sm text-muted-foreground">Total Rewards</span>
										</div>
										<div className="text-2xl font-bold">{details.statistics.totalRewards}</div>
									</CardContent>
								</Card>
							</div>

							{/* Code Info */}
							<Card>
								<CardHeader>
									<CardTitle>Code Information</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<Label>Referral Code</Label>
											<div className="flex items-center gap-2 mt-1">
												<code className="font-mono text-lg font-bold">{details.referralCode.code}</code>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => copyToClipboard(details.referralCode.code)}
												>
													<Copy className="w-4 h-4" />
												</Button>
											</div>
										</div>
										<div>
											<Label>Points Per Referral</Label>
											<div className="flex items-center gap-2 mt-1">
												<span className="text-lg font-semibold">{details.referralCode.pointsPerReferral}</span>
												<Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
													Edit
												</Button>
											</div>
										</div>
									</div>
									<div>
										<Label>Code Owner</Label>
										<p className="mt-1">
											{details.user.name} ({details.user.email}) - {details.user.referralPoints} points
										</p>
									</div>
								</CardContent>
							</Card>

							{/* Referrals by User */}
							{details.referralsByUser.length > 0 && (
								<Card>
									<CardHeader>
										<CardTitle>Referrals by User</CardTitle>
										<CardDescription>Users who were referred by this code</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											{details.referralsByUser.map((ref, idx) => (
												<div
													key={idx}
													className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
												>
													<div className="flex-1">
														<div className="font-semibold">
															{ref.referredUser?.name || "Unknown"} ({ref.referredUser?.email || "N/A"})
														</div>
														<div className="text-sm text-muted-foreground">
															Referred {ref.referralCount} time{ref.referralCount !== 1 ? "s" : ""} •{" "}
															{ref.totalPoints} points awarded
														</div>
														<div className="text-xs text-muted-foreground mt-1">
															First: {new Date(ref.firstReferral).toLocaleDateString()} • Last:{" "}
															{new Date(ref.lastReferral).toLocaleDateString()}
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}

							{/* Recent Rewards */}
							{details.recentRewards.length > 0 && (
								<Card>
									<CardHeader>
										<CardTitle>Recent Rewards</CardTitle>
										<CardDescription>Latest points awarded</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											{details.recentRewards.map((reward) => (
												<div
													key={reward.id}
													className="flex items-center justify-between p-3 border rounded-lg text-sm"
												>
													<div>
														<div className="font-medium">
															{reward.User?.name || "Unknown"} ({reward.User?.email || "N/A"})
														</div>
														<div className="text-muted-foreground text-xs">
															{new Date(reward.createdAt).toLocaleString()}
														</div>
													</div>
													<div className="text-right">
														<div className="font-semibold text-green-600">+{reward.points} points</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}
						</div>
					) : null}
				</DialogContent>
			</Dialog>

			{/* Edit Points Dialog */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Points Per Referral</DialogTitle>
						<DialogDescription>Update the points awarded for each referral</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<Label htmlFor="points">Points Per Referral</Label>
							<Input
								id="points"
								type="number"
								value={editPoints}
								onChange={(e) => setEditPoints(e.target.value)}
								min="0"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleUpdatePoints}>Update</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

