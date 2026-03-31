"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
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
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					Create Code
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create Discount Code</DialogTitle>
					<DialogDescription>Add a new discount code that customers can use at checkout</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="code">Code *</Label>
							<Input
								id="code"
								placeholder="WELCOME10"
								value={form.code}
								onChange={(e) => setForm({ ...form, code: e.target.value })}
								required
							/>
						</div>
						<div>
							<Label htmlFor="type">Type *</Label>
							<Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
								<SelectTrigger id="type">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="PERCENT">Percentage (%)</SelectItem>
									<SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div>
						<Label htmlFor="value">Value *</Label>
						<Input
							id="value"
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
							<Label htmlFor="minAmount">Minimum Order (Optional)</Label>
							<Input
								id="minAmount"
								type="number"
								placeholder="500"
								value={form.minAmount}
								onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
							/>
						</div>
						<div>
							<Label htmlFor="maxUses">Max Uses (Optional)</Label>
							<Input
								id="maxUses"
								type="number"
								placeholder="100"
								value={form.maxUses}
								onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="expiresInDays">Expires in Days (Optional)</Label>
						<Input
							id="expiresInDays"
							type="number"
							placeholder="30"
							value={form.expiresInDays}
							onChange={(e) => setForm({ ...form, expiresInDays: e.target.value })}
						/>
						<p className="text-xs text-muted-foreground mt-1">Leave empty for no expiration</p>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
							Cancel
						</Button>
						<Button type="submit">Create Code</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

