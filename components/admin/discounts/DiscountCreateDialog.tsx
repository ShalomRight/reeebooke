"use client"

import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useState } from "react"

interface DiscountCreateDialogProps {
	onSubmit: (data: {
		code: string
		type: string
		value: string
		minAmount: string
		maxUses: string
		expiresInDays: string
	}) => void
}

export function DiscountCreateDialog({ onSubmit }: DiscountCreateDialogProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [form, setForm] = useState({
		code: "",
		type: "PERCENT",
		value: "",
		minAmount: "",
		maxUses: "",
		expiresInDays: "",
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit(form)
		setIsOpen(false)
		setForm({ code: "", type: "PERCENT", value: "", minAmount: "", maxUses: "", expiresInDays: "" })
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
					<Plus className="w-4 h-4 mr-2" />
					Create Code
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-full sm:max-w-md bg-slate-50 border-l border-slate-200 p-0 flex flex-col">
				<SheetHeader className="bg-white px-6 py-4 border-b border-slate-200 sticky top-0 z-10">
					<SheetTitle>Create Discount Code</SheetTitle>
					<SheetDescription>Add a new discount code that customers can use at checkout</SheetDescription>
				</SheetHeader>
				
				<div className="flex-1 overflow-y-auto p-6">
					<div className="bg-white rounded-xl border border-slate-200 p-5">
						<form id="create-discount-form" onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="code" className="text-xs font-semibold text-slate-500 uppercase">Code *</Label>
									<Input
										id="code"
										placeholder="WELCOME10"
										value={form.code}
										onChange={(e) => setForm({ ...form, code: e.target.value })}
										className="h-10 bg-white border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="type" className="text-xs font-semibold text-slate-500 uppercase">Type *</Label>
									<Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
										<SelectTrigger id="type" className="h-10 border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="PERCENT">Percentage (%)</SelectItem>
											<SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="value" className="text-xs font-semibold text-slate-500 uppercase">Value *</Label>
								<Input
									id="value"
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
									<Label htmlFor="minAmount" className="text-xs font-semibold text-slate-500 uppercase">Min Order</Label>
									<Input
										id="minAmount"
										type="number"
										placeholder="Optional"
										value={form.minAmount}
										onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
										className="h-10 bg-white border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="maxUses" className="text-xs font-semibold text-slate-500 uppercase">Max Uses</Label>
									<Input
										id="maxUses"
										type="number"
										placeholder="Optional"
										value={form.maxUses}
										onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
										className="h-10 bg-white border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="expiresInDays" className="text-xs font-semibold text-slate-500 uppercase">Expires in Days</Label>
								<Input
									id="expiresInDays"
									type="number"
									placeholder="Optional (e.g., 30)"
									value={form.expiresInDays}
									onChange={(e) => setForm({ ...form, expiresInDays: e.target.value })}
									className="h-10 bg-white border-slate-200 rounded-lg focus:ring-blue-500/20 focus:border-blue-500"
								/>
								<p className="text-xs text-muted-foreground mt-1">Leave empty for no expiration</p>
							</div>
						</form>
					</div>
				</div>

				<div className="bg-white px-6 py-4 border-t border-slate-200 sticky bottom-0 z-10 flex gap-3">
					<Button type="button" variant="outline" className="flex-1 rounded-full border-slate-200 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button type="submit" form="create-discount-form" className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
						Create Code
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}

