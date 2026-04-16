"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { format } from "date-fns"
import { Inbox, MailOpen, Archive, CheckCircle, MessageSquare, Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import type { Message, MessageNote } from "@/src/db/schema"

type MessageWithRelations = Message & {
	user?: { name: string | null; email: string } | null
	requestedService?: { name: string } | null
	notes?: MessageNote[]
}

export default function AdminMessagesPage() {
	const [messages, setMessages] = useState<MessageWithRelations[]>([])
	const [selectedMessage, setSelectedMessage] = useState<MessageWithRelations | null>(null)
	const [loading, setLoading] = useState(true)
	const [filter, setFilter] = useState<string>("all")
	const [noteContent, setNoteContent] = useState("")
	const [sendingNote, setSendingNote] = useState(false)
	const [availability, setAvailability] = useState<string[] | null>(null)
	const [checkingAvailability, setCheckingAvailability] = useState(false)

	useEffect(() => {
		fetchMessages()
	}, [filter])

	const fetchMessages = async () => {
		try {
			const params = new URLSearchParams()
			if (filter !== "all") params.append("status", filter)

			const res = await fetch(`/api/v1/messages?${params.toString()}`)
			if (!res.ok) throw new Error("Failed to fetch")
			const data = await res.json() as MessageWithRelations[]
			setMessages(data)
		} catch {
			toast.error("Failed to load messages")
		} finally {
			setLoading(false)
		}
	}

	const updateStatus = async (id: string, status: string) => {
		try {
			const res = await fetch(`/api/v1/messages/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status }),
			})
			if (!res.ok) throw new Error("Failed to update")
			const updated = await res.json() as MessageWithRelations
			setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)))
			if (selectedMessage?.id === id) setSelectedMessage(updated)
			toast.success(`Marked as ${status}`)
		} catch {
			toast.error("Failed to update status")
		}
	}

	const addNote = async () => {
		if (!selectedMessage || !noteContent.trim()) return
		setSendingNote(true)
		try {
			const res = await fetch(`/api/v1/messages/${selectedMessage.id}/notes`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content: noteContent }),
			})
			if (!res.ok) throw new Error("Failed to add note")
			const note = await res.json() as MessageNote
			setSelectedMessage((prev) =>
				prev ? { ...prev, notes: [...(prev.notes || []), note] } : null
			)
			setNoteContent("")
			toast.success("Note added")
		} catch {
			toast.error("Failed to add note")
		} finally {
			setSendingNote(false)
		}
	}

	const checkAvailability = async () => {
		if (!selectedMessage?.requestedServiceId || !selectedMessage.requestedDate) return
		setCheckingAvailability(true)
		try {
			const res = await fetch(
				`/api/schedules/service/${selectedMessage.requestedServiceId}/slots?date=${selectedMessage.requestedDate}&duration=60&buffer=0`
			)
			if (!res.ok) throw new Error("Failed to check")
			const slots = await res.json() as { time: string; available: boolean }[]
			setAvailability(slots.filter((s) => s.available).map((s) => s.time))
		} catch {
			toast.error("Failed to check availability")
			setAvailability([])
		} finally {
			setCheckingAvailability(false)
		}
	}

	const intentBadge = (intent: string) => {
		const styles: Record<string, string> = {
			general: "bg-[var(--warm-100)] text-[var(--warm-700)]",
			booking_inquiry: "bg-[var(--terracotta-100)] text-[var(--terracotta-700)]",
			service_question: "bg-blue-100 text-blue-700",
			cancellation_request: "bg-red-100 text-red-700",
		}
		return styles[intent] || styles.general
	}

	const statusBadge = (status: string) => {
		const styles: Record<string, string> = {
			unread: "bg-blue-100 text-blue-700",
			read: "bg-[var(--warm-100)] text-[var(--warm-700)]",
			replied: "bg-green-100 text-green-700",
			archived: "bg-gray-100 text-gray-700",
		}
		return styles[status] || styles.unread
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="animate-pulse text-[var(--warm-500)]">Loading messages...</div>
			</div>
		)
	}

	return (
		<div className="h-[calc(100vh-4rem)] flex flex-col">
			<div className="flex items-center justify-between p-6 border-b border-[var(--warm-200)]">
				<h1 className="text-2xl font-bold text-[var(--warm-800)] flex items-center gap-2">
					<Inbox className="w-6 h-6 text-[var(--terracotta-500)]" />
					Message Inbox
					{messages.filter((m) => m.status === "unread").length > 0 && (
						<Badge className="bg-[var(--terracotta-500)] text-white">
							{messages.filter((m) => m.status === "unread").length} new
						</Badge>
					)}
				</h1>

				<div className="flex gap-2">
					{["all", "unread", "read", "replied", "archived"].map((f) => (
						<Button
							key={f}
							variant={filter === f ? "default" : "outline"}
							size="sm"
							onClick={() => setFilter(f)}
							className={
								filter === f
									? "bg-[var(--terracotta-600)] text-white hover:bg-[var(--terracotta-700)]"
									: "border-[var(--warm-200)] text-[var(--warm-600)]"
							}
						>
							{f.charAt(0).toUpperCase() + f.slice(1)}
						</Button>
					))}
				</div>
			</div>

			<div className="flex-1 flex overflow-hidden">
				{/* Message List */}
				<div className={`${selectedMessage ? "hidden md:block md:w-1/3" : "w-full md:w-1/3"} border-r border-[var(--warm-200)]`}>
					<ScrollArea className="h-full">
						{messages.length === 0 ? (
							<div className="p-8 text-center text-[var(--warm-500)]">
								<MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
								<p>No messages found</p>
							</div>
							) : (
								<div className="divide-y divide-[var(--warm-200)]">
									{messages.map((message) => (
										<button
											key={message.id}
											onClick={() => setSelectedMessage(message)}
											className={`w-full p-4 text-left transition-colors hover:bg-[var(--warm-50)] ${
												selectedMessage?.id === message.id ? "bg-[var(--terracotta-50)]" : ""
											} ${message.status === "unread" ? "bg-blue-50/50" : ""}`}
										>
											<div className="flex items-start justify-between mb-1">
												<span className="font-medium text-[var(--warm-800)] truncate">
													{message.name || message.user?.name || message.email}
												</span>
												<span className="text-xs text-[var(--warm-400)]">
													{format(new Date(message.createdAt), "MMM d")}
												</span>
											</div>
											<div className="flex items-center gap-2 mb-1">
												<Badge className={`text-xs ${intentBadge(message.intent)}`}>
													{message.intent.replace("_", " ")}
												</Badge>
												<Badge className={`text-xs ${statusBadge(message.status)}`}>
													{message.status}
												</Badge>
											</div>
											<p className="text-sm text-[var(--warm-600)] truncate">
												{message.subject || message.body.slice(0, 60)}...
											</p>
										</button>
									))}
								</div>
							)}
						</ScrollArea>
					</div>

					{/* Message Detail */}
					<div className={`${selectedMessage ? "flex-1" : "hidden md:block md:flex-1"} flex flex-col`}>
						{selectedMessage ? (
							<>
								<div className="p-4 border-b border-[var(--warm-200)] flex items-center gap-4">
									<Button
										variant="ghost"
										size="sm"
										className="md:hidden"
										onClick={() => setSelectedMessage(null)}
									>
										<ArrowLeft className="w-4 h-4" />
									</Button>

									<div className="flex-1">
										<h2 className="font-semibold text-[var(--warm-800)]">
											{selectedMessage.name || selectedMessage.user?.name || selectedMessage.email}
										</h2>
										<p className="text-sm text-[var(--warm-500)]">{selectedMessage.email}</p>
									</div>

									<div className="flex gap-2">
										{selectedMessage.status !== "read" && selectedMessage.status !== "archived" && (
											<Button
												size="sm"
												variant="outline"
												onClick={() => updateStatus(selectedMessage.id, "read")}
												className="gap-1"
											>
												<MailOpen className="w-4 h-4" />
												<span className="hidden sm:inline">Mark Read</span>
											</Button>
										)}
										{selectedMessage.status !== "replied" && selectedMessage.status !== "archived" && (
											<Button
												size="sm"
												variant="outline"
												onClick={() => updateStatus(selectedMessage.id, "replied")}
												className="gap-1"
											>
												<CheckCircle className="w-4 h-4" />
												<span className="hidden sm:inline">Mark Replied</span>
											</Button>
										)}
										{selectedMessage.status !== "archived" && (
											<Button
												size="sm"
												variant="outline"
												onClick={() => updateStatus(selectedMessage.id, "archived")}
												className="gap-1"
											>
												<Archive className="w-4 h-4" />
												<span className="hidden sm:inline">Archive</span>
											</Button>
										)}
									</div>
								</div>

								<ScrollArea className="flex-1 p-6">
									{/* Message Content */}
									<Card className="mb-6 border-[var(--warm-200)]">
										<CardHeader>
											<CardTitle className="text-lg font-semibold text-[var(--warm-800)]">
												{selectedMessage.subject || "No subject"}
											</CardTitle>
											<div className="flex items-center gap-4 text-sm text-[var(--warm-500)]">
												<span className="flex items-center gap-1">
													<Calendar className="w-4 h-4" />
													{format(new Date(selectedMessage.createdAt), "PPP")}
												</span>
												<span className="flex items-center gap-1">
													<Clock className="w-4 h-4" />
													{format(new Date(selectedMessage.createdAt), "p")}
												</span>
											</div>
										</CardHeader>
										<CardContent className="space-y-4">
											<div className="flex items-center gap-2">
												<Badge className={intentBadge(selectedMessage.intent)}>
													{selectedMessage.intent.replace("_", " ")}
												</Badge>
												<Badge className={statusBadge(selectedMessage.status)}>
													{selectedMessage.status}
												</Badge>
											</div>

											<p className="text-[var(--warm-700)] whitespace-pre-wrap">
												{selectedMessage.body}
											</p>

											{/* Booking Context */}
											{selectedMessage.intent === "booking_inquiry" && (
												<div className="mt-4 p-4 bg-[var(--terracotta-50)] rounded-lg border border-[var(--terracotta-100)]">
													<h4 className="font-medium text-[var(--terracotta-800)] mb-2 flex items-center gap-2">
														<Calendar className="w-4 h-4" />
														Booking Request Context
													</h4>
													<div className="space-y-1 text-sm text-[var(--warm-700)]">
														{selectedMessage.requestedService && (
															<p>
																<strong>Service:</strong> {selectedMessage.requestedService.name}
															</p>
														)}
														{selectedMessage.requestedDate && (
															<p>
																<strong>Date:</strong> {selectedMessage.requestedDate}
															</p>
														)}
														{selectedMessage.requestedTimeRange && (
															<p>
																<strong>Time preference:</strong>{" "}
																{selectedMessage.requestedTimeRange}
															</p>
														)}
													</div>

													{/* Check Availability Button */}
													{selectedMessage.requestedServiceId && selectedMessage.requestedDate && (
														<div className="mt-3">
															<Button
																size="sm"
																variant="outline"
																onClick={checkAvailability}
																disabled={checkingAvailability}
																className="bg-white border-[var(--terracotta-300)] text-[var(--terracotta-700)] hover:bg-[var(--terracotta-50)]"
															>
																{checkingAvailability ? "Checking..." : "Check Availability"}
															</Button>

															{availability && (
																<div className="mt-3 p-3 bg-white rounded-lg">
																	<p className="text-sm font-medium text-[var(--warm-700)] mb-2">
																		Available slots:
																	</p>
																	{availability.length === 0 ? (
																		<p className="text-sm text-[var(--warm-500)]">
																			No available slots for this date
																		</p>
																	) : (
																		<div className="flex flex-wrap gap-2">
																			{availability.map((time) => (
																				<Badge
																					key={time}
																					variant="outline"
																					className="bg-green-50 border-green-200 text-green-700"
																				>
																					{time}
																				</Badge>
																			))}
																		</div>
																	)}
																</div>
															)}
														</div>
														)}
													</div>
												)}
											</CardContent>
									</Card>

									{/* Notes Section */}
									<div className="space-y-4">
										<h3 className="font-semibold text-[var(--warm-800)] flex items-center gap-2">
											<Tag className="w-4 h-4" />
											Internal Notes
										</h3>

										{(selectedMessage.notes || []).length > 0 ? (
											<div className="space-y-3">
												{selectedMessage.notes?.map((note) => (
													<Card key={note.id} className="border-[var(--warm-200)] bg-[var(--warm-50)]">
														<CardContent className="p-4">
															<p className="text-sm text-[var(--warm-700)]">{note.content}</p>
															<p className="text-xs text-[var(--warm-400)] mt-2">
																{format(new Date(note.createdAt), "PPp")}
															</p>
														</CardContent>
													</Card>
												))}
											</div>
										) : (
											<p className="text-sm text-[var(--warm-500)] italic">No notes yet</p>
										)}

										<div className="flex gap-2">
											<Textarea
												placeholder="Add a note..."
												value={noteContent}
												onChange={(e) => setNoteContent(e.target.value)}
												className="flex-1 min-h-[80px] border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)]"
											/>
											<Button
												onClick={addNote}
												disabled={!noteContent.trim() || sendingNote}
												className="self-end bg-[var(--terracotta-700)] hover:bg-[var(--terracotta-800)] text-white"
											>
												{sendingNote ? "Adding..." : "Add Note"}
											</Button>
										</div>
									</div>
								</ScrollArea>
							</>
							) : (
								<div className="flex-1 flex items-center justify-center text-[var(--warm-400)]">
									<div className="text-center">
										<Inbox className="w-16 h-16 mx-auto mb-4 opacity-50" />
										<p>Select a message to view details</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
	)
}
