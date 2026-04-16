"use client"

import { DashboardLayout } from "@/components/layout/dashboard/DashboardLayout"
import { MessageSquare, Inbox, Send } from "lucide-react"
import { useState } from "react"
import MessageCompose from "@/components/messaging/MessageCompose"

export default function UserMessagesPage() {
	const [activeTab, setActiveTab] = useState("compose")

	const navItems = [
		{ key: "compose", label: "Compose", icon: Send },
		{ key: "sent", label: "Sent Messages", icon: Inbox },
	]

	return (
		<DashboardLayout navItems={navItems} activeTab={activeTab} onTabChange={setActiveTab}>
			<div className="max-w-3xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-[var(--warm-800)] mb-2 flex items-center gap-2">
						<MessageSquare className="w-7 h-7 text-[var(--terracotta-500)]" />
						Messages
					</h1>
					<p className="text-[var(--warm-500)]">
						Send inquiries, booking requests, or service questions directly to our team.
					</p>
				</div>

				{activeTab === "compose" && <MessageCompose />}
				{activeTab === "sent" && <SentMessagesList />}
			</div>
		</DashboardLayout>
	)
}

function SentMessagesList() {
	return (
		<div className="bg-white rounded-2xl border border-[var(--warm-200)] p-8 text-center">
			<Inbox className="w-12 h-12 mx-auto mb-4 text-[var(--warm-300)]" />
			<p className="text-[var(--warm-500)]">
				Your sent messages will appear here. Use the Compose tab to send a new message.
			</p>
		</div>
	)
}
