"use client"

import { MessagesInbox } from "./MessagesInbox"

interface UserInboxProps {
	userId: string
}

export function UserInbox({ userId }: UserInboxProps) {
	return <MessagesInbox userId={userId} isAdmin={false} />
}
