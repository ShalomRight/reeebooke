"use client"

import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
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
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent side="right" className="w-full sm:max-w-md bg-slate-50 border-l border-slate-200 p-0 flex flex-col">
				<SheetHeader className="bg-white px-6 py-4 border-b border-slate-200 sticky top-0 z-10">
					<SheetTitle>Edit Discount Code</SheetTitle>
					<SheetDescription>
						Update discount code details. Code: <code className="font-mono font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded">{code?.code}</code>
					</SheetDescription>
				</SheetHeader>
				
				<div className="flex-1 overflow-y-auto p-6">
					<div className="bg-white rounded-xl border border-slate-200 p-5">
						<form id="edit-discount-form" onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="edit-type" className="text-xs font-semibold text-slate-500 uppercase">Type *</Label>
								<Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
									<SelectTrigger id="edit-type" className="h-10 border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="PERCENT">Percentage (%)</SelectItem>
										<SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="edit-value" className="text-xs font-semibold text-slate-500 uppercase">Value *</Label>
								<Input
									id="edit-value"
									type="number"
									placeholder={form.type === "PERCENT" ? "10" : "50"}
									value={form.value}
									onChange={(e) => setForm({ ...form, value: e.target.value })}
									className="h-10 bg-white border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500"
									required
								/>
								<p className="text-xs text-muted-foreground mt-1">
									{form.type === "PERCENT" ? "Percentage discount (e.g., 10 = 10%)" : "Fixed amount in dollars"}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="edit-minAmount" className="text-xs font-semibold text-slate-500 uppercase">Min Order</Label>
									<Input
										id="edit-minAmount"
										type="number"
										placeholder="Optional"
										value={form.minAmount}
										onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
										className="h-10 bg-white border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="edit-maxUses" className="text-xs font-semibold text-slate-500 uppercase">Max Uses</Label>
									<Input
										id="edit-maxUses"
										type="number"
										placeholder="Optional"
										value={form.maxUses}
										onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
										className="h-10 bg-white border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="edit-expiresAt" className="text-xs font-semibold text-slate-500 uppercase">Expiration Date</Label>
								<div className="flex gap-2">
									<Input
										id="edit-expiresAt"
										type="date"
										value={form.expiresAt}
										onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
										min={new Date().toISOString().split("T")[0]}
										className="flex-1 h-10 bg-white border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500"
									/>
									{form.expiresAt && (
										<Button type="button" variant="outline" size="sm" className="h-10 border-slate-200 hover:bg-slate-50" onClick={() => setForm({ ...form, expiresAt: "" })}>
											Clear
										</Button>
									)}
								</div>
								<p className="text-xs text-muted-foreground mt-1">Leave empty for no expiration</p>
							</div>

							<div className="flex items-center space-x-2 pt-2">
								<input
									type="checkbox"
									id="edit-active"
									checked={form.active}
									onChange={(e) => setForm({ ...form, active: e.target.checked })}
									className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
								/>
								<Label htmlFor="edit-active" className="text-sm font-medium leading-none text-slate-700">
									Active
								</Label>
							</div>
						</form>
					</div>
				</div>

				<div className="bg-white px-6 py-4 border-t border-slate-200 sticky bottom-0 z-10 flex gap-3">
					<Button type="button" variant="outline" className="flex-1 rounded-full border-slate-200 hover:bg-slate-50" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" form="edit-discount-form" className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
						Update Code
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}

