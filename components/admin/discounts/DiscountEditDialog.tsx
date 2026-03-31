"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

interface DiscountCode {
	id: string
	code: string
	type: string
	value: number
	minAmount?: number | null
	maxUses?: number | null
	expiresAt?: string | null
	active: boolean
}

interface DiscountEditDialogProps {
	code: DiscountCode | null
	isOpen: boolean
	onClose: () => void
	onUpdate: (data: {
		type: string
		value: string
		minAmount: string
		maxUses: string
		expiresAt: string
		active: boolean
	}) => void
}

export function DiscountEditDialog({ code, isOpen, onClose, onUpdate }: DiscountEditDialogProps) {
	const [form, setForm] = useState({
		type: code?.type || "PERCENT",
		value: code?.value.toString() || "",
		minAmount: code?.minAmount?.toString() || "",
		maxUses: code?.maxUses?.toString() || "",
		expiresAt: code?.expiresAt ? new Date(code.expiresAt).toISOString().split("T")[0] : "",
		active: code?.active ?? true,
	})

	// Update form when code changes
	useEffect(() => {
		if (code) {
			setForm({
				type: code.type,
				value: code.value.toString(),
				minAmount: code.minAmount?.toString() || "",
				maxUses: code.maxUses?.toString() || "",
				expiresAt: code.expiresAt ? new Date(code.expiresAt).toISOString().split("T")[0] : "",
				active: code.active,
			})
		}
	}, [code])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onUpdate(form)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Edit Discount Code</DialogTitle>
					<DialogDescription>
						Update discount code details. Code: <code className="font-mono font-bold">{code?.code}</code>
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="edit-type">Type *</Label>
						<Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
							<SelectTrigger id="edit-type">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="PERCENT">Percentage (%)</SelectItem>
								<SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="edit-value">Value *</Label>
						<Input
							id="edit-value"
							type="number"
							placeholder={form.type === "PERCENT" ? "10" : "50"}
							value={form.value}
							onChange={(e) => setForm({ ...form, value: e.target.value })}
							required
						/>
						<p className="text-xs text-muted-foreground mt-1">
							{form.type === "PERCENT" ? "Percentage discount (e.g., 10 = 10%)" : "Fixed amount in dollars"}
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="edit-minAmount">Minimum Order (Optional)</Label>
							<Input
								id="edit-minAmount"
								type="number"
								placeholder="500"
								value={form.minAmount}
								onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
							/>
						</div>
						<div>
							<Label htmlFor="edit-maxUses">Max Uses (Optional)</Label>
							<Input
								id="edit-maxUses"
								type="number"
								placeholder="100"
								value={form.maxUses}
								onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="edit-expiresAt">Expiration Date (Optional)</Label>
						<div className="flex gap-2">
							<Input
								id="edit-expiresAt"
								type="date"
								value={form.expiresAt}
								onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
								min={new Date().toISOString().split("T")[0]}
								className="flex-1"
							/>
							{form.expiresAt && (
								<Button type="button" variant="outline" size="sm" onClick={() => setForm({ ...form, expiresAt: "" })}>
									Clear
								</Button>
							)}
						</div>
						<p className="text-xs text-muted-foreground mt-1">Leave empty for no expiration</p>
					</div>

					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							id="edit-active"
							checked={form.active}
							onChange={(e) => setForm({ ...form, active: e.target.checked })}
							className="h-4 w-4 rounded border-gray-300"
						/>
						<Label htmlFor="edit-active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Active
						</Label>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Update Code</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

