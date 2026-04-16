"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface ReplyInputProps {
	onSend: (content: string) => void
	disabled?: boolean
	placeholder?: string
}

export function ReplyInput({ onSend, disabled, placeholder = "Type your message..." }: ReplyInputProps) {
	const [content, setContent] = useState("")
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleSend = useCallback(() => {
		if (!content.trim() || disabled) return
		onSend(content.trim())
		setContent("")
		// Reset textarea height
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"
		}
	}, [content, disabled, onSend])

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				handleSend()
			}
		},
		[handleSend]
	)

	// Auto-resize textarea
	useEffect(() => {
		const textarea = textareaRef.current
		if (textarea) {
			textarea.style.height = "auto"
			textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
		}
	}, [content])

	return (
		<div className="border-t border-[var(--warm-200)] bg-white p-4">
			<div className="flex gap-3">
				<Textarea
					ref={textareaRef}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					disabled={disabled}
					rows={1}
					className="flex-1 min-h-[44px] max-h-[200px] resize-none border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)] bg-[var(--warm-50)]"
				/>
				<Button
					onClick={handleSend}
					disabled={!content.trim() || disabled}
					className="bg-[var(--terracotta-600)] hover:bg-[var(--terracotta-700)] text-white h-auto px-4 shrink-0"
				>
					<Send className="w-4 h-4" />
				</Button>
			</div>
			<p className="text-xs text-[var(--warm-500)] mt-2">
				Press Cmd/Ctrl + Enter to send
			</p>
		</div>
	)
}
