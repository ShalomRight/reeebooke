import { z } from "zod"

export const MESSAGE_INTENTS = [
  "general",
  "booking_inquiry",
  "service_question",
  "cancellation_request",
] as const

export const MESSAGE_STATUSES = [
  "unread",
  "read",
  "replied",
  "archived",
] as const

export const MESSAGE_SOURCES = [
  "contact_form",
  "authenticated_user",
] as const

export type MessageIntent = (typeof MESSAGE_INTENTS)[number]
export type MessageStatus = (typeof MESSAGE_STATUSES)[number]
export type MessageSource = (typeof MESSAGE_SOURCES)[number]

// ─── Contact Form ─────────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  email:   z.string().email("Please enter a valid email address"),
  name:    z.string().min(1, "Name is required").max(100),
  subject: z.string().max(200).optional(),
  body:    z.string().min(10, "Message must be at least 10 characters").max(5000),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

// ─── Authenticated User Message ───────────────────────────────────────────────

export const userMessageSchema = z.object({
  intent:             z.enum(MESSAGE_INTENTS),
  body:               z.string().min(5, "Message must be at least 5 characters").max(5000),
  subject:            z.string().max(200).optional(),
  requestedServiceId: z.string().optional(),
  requestedDate:      z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
  requestedTimeRange: z.string().max(100).optional(),
})

export type UserMessageInput = z.infer<typeof userMessageSchema>

// ─── Admin: update message status / tags ─────────────────────────────────────

export const updateMessageSchema = z.object({
  status: z.enum(MESSAGE_STATUSES).optional(),
  tags:   z.array(z.string().max(50)).max(10).optional(),
})

export type UpdateMessageInput = z.infer<typeof updateMessageSchema>

// ─── Admin: add note ──────────────────────────────────────────────────────────

export const addNoteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty").max(2000),
})

export type AddNoteInput = z.infer<typeof addNoteSchema>
