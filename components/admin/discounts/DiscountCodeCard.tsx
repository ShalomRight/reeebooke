"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Edit2, Eye, Trash2, XCircle } from "lucide-react"

interface DiscountCode {
	id: string
	code: string
	type: string
	value: number
	minAmount?: number | null
	maxUses?: number | null
	usedCount: number
	expiresAt?: string | null
	active: boolean
	createdAt: string
}

interface DiscountCodeCardProps {
	code: DiscountCode
	onViewDetails: (id: string) => void
	onEdit: (code: DiscountCode) => void
	onToggleActive: (id: string, active: boolean) => void
	onDelete: (id: string, code: string) => void
}

export function DiscountCodeCard({
	code,
	onViewDetails,
	onEdit,
	onToggleActive,
	onDelete,
}: DiscountCodeCardProps) {
	const isExpired = (expiresAt: string | null | undefined) => {
		if (!expiresAt) return false
		return new Date(expiresAt) < new Date()
	}

	const isFullyUsed = (code: DiscountCode) => {
		return code.maxUses ? code.usedCount >= code.maxUses : false
	}

	const expired = isExpired(code.expiresAt)
	const fullyUsed = isFullyUsed(code)
	const isInvalid = expired || fullyUsed || !code.active

	return (
		<div
			className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
				isInvalid ? "bg-muted/30 opacity-75" : "bg-card"
			}`}
		>
			<div className="flex-1">
				<div className="flex items-center gap-3 mb-2">
					<code className="font-mono font-bold text-lg">{code.code}</code>
					<Badge variant={code.active ? "default" : "secondary"}>{code.active ? "Active" : "Inactive"}</Badge>
					{expired && <Badge variant="destructive">Expired</Badge>}
					{fullyUsed && <Badge variant="destructive">Fully Used</Badge>}
				</div>
				<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
					<span className="font-semibold text-card-foreground">
						{code.value}
						{code.type === "PERCENT" ? "%" : "$"} off
					</span>
					{code.minAmount && <span>Min: ${code.minAmount}</span>}
					{code.maxUses && (
						<span>
							Used: {code.usedCount}/{code.maxUses}
						</span>
					)}
					{code.expiresAt && <span>Expires: {new Date(code.expiresAt).toLocaleDateString()}</span>}
					<span className="text-xs">Created: {new Date(code.createdAt).toLocaleDateString()}</span>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" onClick={() => onViewDetails(code.id)}>
					<Eye className="w-4 h-4 mr-2" />
					View Details
				</Button>
				<Button variant="outline" size="sm" onClick={() => onEdit(code)}>
					<Edit2 className="w-4 h-4 mr-2" />
					Edit
				</Button>
				<Button variant="outline" size="sm" onClick={() => onToggleActive(code.id, code.active)}>
					{code.active ? (
						<>
							<CheckCircle2 className="w-4 h-4 mr-2" />
							Active
						</>
					) : (
						<>
							<XCircle className="w-4 h-4 mr-2" />
							Inactive
						</>
					)}
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onDelete(code.id, code.code)}
					className="text-destructive hover:text-destructive"
				>
					<Trash2 className="w-4 h-4" />
				</Button>
			</div>
		</div>
	)
}

