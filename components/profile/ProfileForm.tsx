"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getRoleLabel } from "@/lib/rbac"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Copy, Gift, Link2, Users, TrendingUp, CheckCircle2 } from "lucide-react"
import ImageUpload from "./ImageUpload"

interface UserProfile {
	id: string
	name: string | null
	email: string
	phone: string | null
	image: string | null
	role: string
	createdAt: string
}

interface ReferralData {
	code: string
	link: string
	points: number
	pointsPerReferral: number
	totalReferrals: number
	totalPointsAwarded: number
}

export function ProfileForm() {
	const [profile, setProfile] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [referralData, setReferralData] = useState<ReferralData | null>(null)
	const [loadingReferral, setLoadingReferral] = useState(false)
	const [copied, setCopied] = useState<"code" | "link" | null>(null)
	const { data: session } = useSession()

	useEffect(() => {
		fetchProfile()
		fetchReferralData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchProfile = async () => {
		try {
			const res = await fetch("/api/v1/user/profile")
			if (!res.ok) throw new Error("Failed to fetch profile")
			const data = await res.json()
			// Fallback to session role if role is not in response
			if (!data.role && session?.user) {
				data.role = (session.user as any).role || "CLIENT"
			}
			setProfile(data)
		} catch (error) {
			toast.error("Failed to load profile")
		} finally {
			setLoading(false)
		}
	}

	const fetchReferralData = async () => {
		setLoadingReferral(true)
		try {
			const res = await fetch("/api/v1/user/referral")
			if (!res.ok) throw new Error("Failed to fetch referral data")
			const data = await res.json()
			setReferralData(data)
		} catch (error) {
			// Silently fail - referral is optional
		} finally {
			setLoadingReferral(false)
		}
	}

	const copyToClipboard = async (text: string, type: "code" | "link") => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(type)
			toast.success(`${type === "code" ? "Referral code" : "Referral link"} copied to clipboard!`)
			setTimeout(() => setCopied(null), 2000)
		} catch (error) {
			toast.error("Failed to copy to clipboard")
		}
	}

	const handleImageUpload = async (imageUrl: string) => {
		if (!profile) return
		setSaving(true)
		try {
			const res = await fetch("/api/v1/user/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: profile.name,
					phone: profile.phone,
					image: imageUrl,
				}),
			})
			if (!res.ok) throw new Error("Failed to update profile")
			setProfile({ ...profile, image: imageUrl })
			toast.success("Profile picture updated successfully")
		} catch (error) {
			toast.error("Failed to update profile picture")
		} finally {
			setSaving(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!profile) return

		setSaving(true)
		try {
			const res = await fetch("/api/v1/user/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: profile.name,
					phone: profile.phone,
				}),
			})
			if (!res.ok) throw new Error("Failed to update profile")
			toast.success("Profile updated successfully")
		} catch (error) {
			toast.error("Failed to update profile")
		} finally {
			setSaving(false)
		}
	}

	if (loading) return <div className="text-center py-8">Loading...</div>
	if (!profile) return <div className="text-center py-8">Failed to load profile</div>

	return (
		<div className="space-y-6">
			{/* Profile Picture */}
			<Card>
				<CardHeader>
					<CardTitle>Profile Picture</CardTitle>
					<CardDescription>Upload and manage your profile picture</CardDescription>
				</CardHeader>
				<CardContent>
					<ImageUpload
						value={profile.image || ""}
						onChange={handleImageUpload}
						showReuse={true}
						imgHeight={150}
						imgWidth={150}
					/>
				</CardContent>
			</Card>

			{/* Personal Information */}
			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
					<CardDescription>Update your profile details</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<Label htmlFor="email">Email Address</Label>
								<Input id="email" type="email" value={profile.email} disabled className="mt-2 bg-muted" />
								<p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
							</div>
							<div>
								<Label htmlFor="role">Role</Label>
								<Input 
									id="role" 
									type="text" 
									value={profile?.role ? getRoleLabel(profile.role as any) : (session?.user ? getRoleLabel((session.user as any).role as any) : "")} 
									disabled 
									className="mt-2 bg-muted" 
									placeholder="Loading..."
								/>
								<p className="text-xs text-muted-foreground mt-1">Contact admin to change role</p>
							</div>
						</div>

						<div>
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								type="text"
								value={profile.name || ""}
								onChange={(e) => setProfile({ ...profile, name: e.target.value })}
								className="mt-2"
								placeholder="Enter your full name"
							/>
						</div>

						<div>
							<Label htmlFor="phone">Phone Number</Label>
							<Input
								id="phone"
								type="tel"
								value={profile.phone || ""}
								onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
								className="mt-2"
								placeholder="Enter your phone number"
							/>
						</div>

						<Button type="submit" disabled={saving} className="w-full">
							{saving ? "Saving..." : "Save Changes"}
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Account Information */}
			<Card>
				<CardHeader>
					<CardTitle>Account Information</CardTitle>
					<CardDescription>View your account details</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex justify-between items-center py-2 border-b">
						<span className="text-sm text-muted-foreground">Member Since</span>
						<span className="font-medium">{new Date(profile.createdAt).toLocaleDateString()}</span>
					</div>
					<div className="flex justify-between items-center py-2">
						<span className="text-sm text-muted-foreground">Account Status</span>
						<span className="font-medium text-green-600">Active</span>
					</div>
				</CardContent>
			</Card>

			{/* Referral Program */}
			<Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Gift className="w-5 h-5 text-primary" />
						Referral Program
					</CardTitle>
					<CardDescription>Share your referral code and earn points when friends complete their first payment</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{loadingReferral ? (
						<div className="text-center py-4 text-muted-foreground">Loading referral data...</div>
					) : (
						<>
							{/* Statistics */}
							{referralData && (
								<div className="grid grid-cols-3 gap-4">
									<div className="text-center p-4 bg-background rounded-lg border">
										<div className="flex items-center justify-center gap-2 mb-2">
											<Gift className="w-4 h-4 text-primary" />
										</div>
										<div className="text-2xl font-bold">{referralData.points || 0}</div>
										<div className="text-xs text-muted-foreground">Total Points</div>
									</div>
									<div className="text-center p-4 bg-background rounded-lg border">
										<div className="flex items-center justify-center gap-2 mb-2">
											<Users className="w-4 h-4 text-primary" />
										</div>
										<div className="text-2xl font-bold">{referralData.totalReferrals || 0}</div>
										<div className="text-xs text-muted-foreground">Referrals</div>
									</div>
									<div className="text-center p-4 bg-background rounded-lg border">
										<div className="flex items-center justify-center gap-2 mb-2">
											<TrendingUp className="w-4 h-4 text-primary" />
										</div>
										<div className="text-2xl font-bold">{referralData.pointsPerReferral || 100}</div>
										<div className="text-xs text-muted-foreground">Points/Referral</div>
									</div>
								</div>
							)}

							{/* Referral Code */}
							<div>
								<Label>Your Referral Code</Label>
								<div className="flex gap-2 mt-2">
									<Input
										value={referralData?.code || "Loading..."}
										readOnly
										className="font-mono text-lg font-bold bg-background"
										disabled={!referralData}
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() => referralData && copyToClipboard(referralData.code, "code")}
										className="shrink-0"
										disabled={!referralData}
									>
										{copied === "code" ? (
											<CheckCircle2 className="w-4 h-4 text-green-600" />
										) : (
											<Copy className="w-4 h-4" />
										)}
									</Button>
								</div>
							</div>

							{/* Referral Link */}
							<div>
								<Label>Your Referral Link</Label>
								<div className="flex gap-2 mt-2">
									<Input
										value={referralData?.link || "Loading..."}
										readOnly
										className="font-mono text-sm bg-background"
										disabled={!referralData}
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() => referralData && copyToClipboard(referralData.link, "link")}
										className="shrink-0"
										disabled={!referralData}
									>
										{copied === "link" ? (
											<CheckCircle2 className="w-4 h-4 text-green-600" />
										) : (
											<Copy className="w-4 h-4" />
										)}
									</Button>
								</div>
								<p className="text-xs text-muted-foreground mt-2">
									Share this link with friends. When they sign up and complete their first payment, you'll earn{" "}
									{referralData?.pointsPerReferral || 100} points!
								</p>
							</div>

							{/* Social Media Sharing */}
							{referralData && (
								<div>
									<Label>Share on Social Media</Label>
									<div className="flex gap-2 mt-2 flex-wrap">
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												const text = `Join me on Reebooking! Use my referral code ${referralData.code} and get amazing spa services. ${referralData.link}`
												window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank")
											}}
											className="gap-2"
										>
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
												<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
											</svg>
											Twitter
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												const text = `Join me on Reebooking! Use my referral code ${referralData.code} and get amazing spa services.`
												window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralData.link)}&quote=${encodeURIComponent(text)}`, "_blank")
											}}
											className="gap-2"
										>
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
											</svg>
											Facebook
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												const text = `Join me on Reebooking! Use my referral code ${referralData.code} and get amazing spa services. ${referralData.link}`
												window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
											}}
											className="gap-2"
										>
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
												<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
											</svg>
											WhatsApp
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												const text = `Join me on Reebooking! Use my referral code ${referralData.code} and get amazing spa services.`
												window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralData.link)}`, "_blank")
											}}
											className="gap-2"
										>
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
												<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
											</svg>
											LinkedIn
										</Button>
									</div>
								</div>
							)}

							{/* How it works */}
							<div className="bg-muted/50 p-4 rounded-lg border">
								<h4 className="font-semibold mb-2 flex items-center gap-2">
									<Link2 className="w-4 h-4" />
									How it works
								</h4>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>1. Share your referral code or link with friends</li>
									<li>2. When they sign up using your code and complete their first payment, you earn {referralData?.pointsPerReferral || 100} points</li>
									<li>3. Use your points to redeem discounts on bookings</li>
									<li>4. The more you refer, the more points you earn!</li>
								</ul>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
