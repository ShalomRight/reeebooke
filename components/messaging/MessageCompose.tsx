"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userMessageSchema, type UserMessageInput, MESSAGE_INTENTS } from "@/lib/validations/messages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Send, CheckCircle, Calendar, HelpCircle, XCircle, MessageCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useServices } from "@/lib/swr"

const INTENT_OPTIONS = [
	{ value: "general", label: "General Inquiry", icon: MessageCircle },
	{ value: "booking_inquiry", label: "Booking Request", icon: Calendar },
	{ value: "service_question", label: "Service Question", icon: HelpCircle },
	{ value: "cancellation_request", label: "Cancellation Request", icon: XCircle },
] as const

export default function MessageCompose() {
	const [submitted, setSubmitted] = useState(false)
	const [loading, setLoading] = useState(false)
	const { data: session } = useSession()
	const { data: servicesData } = useServices()
	const services = servicesData?.services

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		reset,
	} = useForm<UserMessageInput>({
		resolver: zodResolver(userMessageSchema),
		defaultValues: {
			intent: "general",
		},
	})

	const selectedIntent = watch("intent")
	const showBookingFields = selectedIntent === "booking_inquiry"

	const onSubmit = async (data: UserMessageInput) => {
		if (!session?.user) {
			toast.error("Please sign in to send messages")
			return
		}

		setLoading(true)
		try {
			const res = await fetch("/api/v1/messages", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			if (!res.ok) {
				const err = await res.json() as { error?: string }
				throw new Error(err.error ?? "Failed to send")
			}

			setSubmitted(true)
			reset()
			toast.success("Message sent successfully!")
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Couldn't send your message")
		} finally {
			setLoading(false)
		}
	}

	if (submitted) {
		return (
			<div className="bg-white rounded-2xl border border-[var(--warm-200)] p-12 text-center">
				<CheckCircle className="size-12 mx-auto mb-4 text-[var(--terracotta-500)]" strokeWidth={1.5} />
				<h3 className="text-xl font-semibold text-[var(--warm-800)] mb-2">Message sent!</h3>
				<p className="text-[var(--warm-500)] mb-6">
					We'll review your message and get back to you soon.
				</p>
				<Button
					onClick={() => setSubmitted(false)}
					className="bg-[var(--terracotta-700)] hover:bg-[var(--terracotta-800)] text-white"
				>
					Send another message
				</Button>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-[var(--warm-200)] p-6 md:p-8 space-y-6">
			{/* Intent Selector */}
			<div className="space-y-3">
				<Label className="text-sm font-medium text-[var(--warm-700)]">
					What is this about? <span className="text-[var(--terracotta-500)]">*</span>
				</Label>
				<div className="grid grid-cols-2 gap-3">
					{INTENT_OPTIONS.map(({ value, label, icon: Icon }) => (
						<button
							key={value}
							type="button"
							onClick={() => setValue("intent", value)}
							className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
								selectedIntent === value
									? "border-[var(--terracotta-500)] bg-[var(--terracotta-50)] text-[var(--terracotta-800)]"
									: "border-[var(--warm-200)] hover:border-[var(--terracotta-300)] text-[var(--warm-700)]"
							}`}
						>
							<Icon className="size-5 shrink-0" />
							<span className="font-medium text-sm">{label}</span>
						</button>
					))}
				</div>
				{errors.intent && (
					<p className="text-xs text-red-500">{errors.intent.message}</p>
				)}
			</div>

			{/* Conditional Booking Fields */}
			{showBookingFields && (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[var(--terracotta-50)]/50 rounded-xl border border-[var(--terracotta-100)]">
					<div className="space-y-1.5">
						<Label htmlFor="requestedServiceId" className="text-sm font-medium text-[var(--warm-700)]">
							Service <span className="text-xs text-[var(--warm-400)]">(optional)</span>
						</Label>
						<select
							id="requestedServiceId"
							{...register("requestedServiceId")}
							className="w-full h-10 px-3 rounded-md border border-[var(--warm-200)] bg-white text-[var(--warm-800)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta-300)]"
						>
							<option value="">Select a service...</option>
							{services?.map((service) => (
								<option key={service.id} value={service.id}>
									{service.name}
								</option>
							))}
						</select>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="requestedDate" className="text-sm font-medium text-[var(--warm-700)]">
							Preferred Date <span className="text-xs text-[var(--warm-400)]">(optional)</span>
						</Label>
						<Input
							id="requestedDate"
							type="date"
							{...register("requestedDate")}
							className="border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)] bg-white"
						/>
					</div>

					<div className="space-y-1.5 sm:col-span-2">
						<Label htmlFor="requestedTimeRange" className="text-sm font-medium text-[var(--warm-700)]">
							Preferred Time <span className="text-xs text-[var(--warm-400)]">(optional)</span>
						</Label>
						<select
							id="requestedTimeRange"
							{...register("requestedTimeRange")}
							className="w-full h-10 px-3 rounded-md border border-[var(--warm-200)] bg-white text-[var(--warm-800)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta-300)]"
						>
							<option value="">Any time...</option>
							<option value="morning">Morning (9am - 12pm)</option>
							<option value="afternoon">Afternoon (12pm - 5pm)</option>
							<option value="evening">Evening (5pm - 8pm)</option>
						</select>
					</div>
				</div>
			)}

			{/* Subject */}
			<div className="space-y-1.5">
				<Label htmlFor="subject" className="text-sm font-medium text-[var(--warm-700)]">
					Subject <span className="text-xs text-[var(--warm-400)]">(optional)</span>
				</Label>
				<Input
					id="subject"
					placeholder="What's this about?"
					{...register("subject")}
					className="border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)] bg-white"
				/>
			</div>

			{/* Message Body */}
			<div className="space-y-1.5">
				<Label htmlFor="body" className="text-sm font-medium text-[var(--warm-700)]">
					Message <span className="text-[var(--terracotta-500)]">*</span>
				</Label>
				<Textarea
					id="body"
					rows={5}
					placeholder="Tell us more about your request..."
					{...register("body")}
					className="border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)] bg-white resize-none"
				/>
				{errors.body && (
					<p className="text-xs text-red-500">{errors.body.message}</p>
				)}
			</div>

			{/* Submit */}
			<Button
				type="submit"
				disabled={loading}
				className="bg-[var(--terracotta-700)] hover:bg-[var(--terracotta-800)] text-white px-8 gap-2"
			>
				<Send className="size-4" />
				{loading ? "Sending…" : "Send Message"}
			</Button>
		</form>
	)
}
