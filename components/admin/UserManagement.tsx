"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { getRoleLabel } from "@/lib/rbac"
import { useUsers } from "@/lib/swr"
import { AlertCircle, Search, Shield } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export function UserManagement() {
	const [page, setPage] = useState(1)
	const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "date-asc" | "date-desc">("date-desc")
	const [roleFilter, setRoleFilter] = useState<string>("ALL")
	const [searchQuery, setSearchQuery] = useState("")

	const { data, mutate } = useUsers({
		page,
		limit: 10,
		sort: sortBy,
		role: roleFilter === "ALL" ? undefined : roleFilter,
		search: searchQuery || undefined,
	})
	const users = data?.users || []
	const pagination = data?.pagination

	const { data: session } = useSession()
	const [updatingId, setUpdatingId] = useState<string | null>(null)

	const currentUserId = (session?.user as any)?.id
	const currentUserRole = (session?.user as any)?.role

	const handleRoleChange = async (userId: string, newRole: string) => {
		if (currentUserRole !== "SUPER_ADMIN") {
			toast.error("Only Super Admin can manage roles")
			return
		}

		if (userId === currentUserId) {
			toast.error("You cannot change your own role")
			return
		}

		setUpdatingId(userId)
		try {
			const response = await fetch("/api/v1/admin/users", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, role: newRole }),
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.error || "Failed to update role")
			}

			toast.success("User role updated successfully")
			mutate()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to update user role")
		} finally {
			setUpdatingId(null)
		}
	}

	const handleReset = () => {
		setPage(1)
		setSortBy("date-desc")
		setRoleFilter("ALL")
		setSearchQuery("")
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Shield className="w-5 h-5" />
					User Management
				</CardTitle>
				<CardDescription>Manage user roles and permissions (Super Admin only)</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{currentUserRole !== "SUPER_ADMIN" && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>You do not have permission to manage user roles</AlertDescription>
					</Alert>
				)}

				<div className="flex gap-2 flex-wrap">
					<div className="flex-1 min-w-[200px]">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search by name or email..."
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value)
									setPage(1)
								}}
								className="pl-8"
							/>
						</div>
					</div>
					<Select
						value={sortBy}
						onValueChange={(value: any) => {
							setSortBy(value)
							setPage(1)
						}}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort by..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="name-asc">Name (A-Z)</SelectItem>
							<SelectItem value="name-desc">Name (Z-A)</SelectItem>
							<SelectItem value="date-desc">Newest First</SelectItem>
							<SelectItem value="date-asc">Oldest First</SelectItem>
						</SelectContent>
					</Select>
					<Select
						value={roleFilter}
						onValueChange={(value) => {
							setRoleFilter(value)
							setPage(1)
						}}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter by role..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="ALL">All Roles</SelectItem>
							<SelectItem value="CLIENT">Client</SelectItem>
							<SelectItem value="STAFF">Staff</SelectItem>
							<SelectItem value="ADMIN">Admin</SelectItem>
							<SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" onClick={handleReset}>
						Reset
					</Button>
				</div>

				{!data ? (
					<div className="text-center py-8">Loading...</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
						{users.map((user) => (
							<div
								key={user.id}
								className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition col-span-1"
							>
								<div className="flex-1">
									<p className="font-semibold">{user.name}</p>
									<p className="text-sm text-muted-foreground">{user.email}</p>
									{user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
								</div>
								<div className="flex items-center gap-2">
									<Select
										value={user.role}
										onValueChange={(value) => handleRoleChange(user.id, value)}
										disabled={updatingId === user.id || currentUserRole !== "SUPER_ADMIN" || user.id === currentUserId}
									>
										<SelectTrigger className="w-40">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="CLIENT">{getRoleLabel("CLIENT")}</SelectItem>
											<SelectItem value="STAFF">{getRoleLabel("STAFF")}</SelectItem>
											<SelectItem value="ADMIN">{getRoleLabel("ADMIN")}</SelectItem>
											<SelectItem value="SUPER_ADMIN">{getRoleLabel("SUPER_ADMIN")}</SelectItem>
										</SelectContent>
									</Select>
									{user.id === currentUserId && <span className="text-xs text-muted-foreground">(You)</span>}
								</div>
							</div>
						))}
					</div>
				)}

				{pagination && pagination.pages > 1 && (
					<div className="flex items-center justify-between pt-4 border-t">
						<p className="text-sm text-muted-foreground">
							Page {pagination.page} of {pagination.pages} ({pagination.total} total)
						</p>
						<div className="flex gap-2">
							<Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage(Math.min(pagination.pages, page + 1))}
								disabled={page === pagination.pages}
							>
								Next
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
