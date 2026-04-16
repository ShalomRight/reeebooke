"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormInput } from "@/lib/validations/messages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Send, CheckCircle } from "lucide-react"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormInput) => {
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
    } catch (err) {
      toast.error("Couldn't send your message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="size-12 text-[var(--terracotta-500)]" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold text-[var(--warm-800)]">Message received</h3>
        <p className="text-[var(--warm-500)] max-w-sm">
          Thank you for reaching out. We'll be in touch within one business day.
        </p>
        <Button
          variant="ghost"
          className="mt-2 text-[var(--terracotta-600)] hover:text-[var(--terracotta-700)] hover:bg-[var(--terracotta-50)]"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-lg">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="text-sm font-medium text-[var(--warm-700)]">
            Name <span className="text-[var(--terracotta-500)]">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Your name"
            {...register("name")}
            className="border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)] bg-white"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-[var(--warm-700)]">
            Email <span className="text-[var(--terracotta-500)]">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)] bg-white"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="body" className="text-sm font-medium text-[var(--warm-700)]">
          Message <span className="text-[var(--terracotta-500)]">*</span>
        </Label>
        <Textarea
          id="body"
          rows={5}
          placeholder="Tell us how we can help..."
          {...register("body")}
          className="border-[var(--warm-200)] focus-visible:ring-[var(--terracotta-300)] bg-white resize-none"
        />
        {errors.body && (
          <p className="text-xs text-red-500">{errors.body.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="self-start bg-[var(--terracotta-700)] hover:bg-[var(--terracotta-800)] text-white px-8 gap-2"
      >
        <Send className="size-4" />
        {loading ? "Sending…" : "Send Message"}
      </Button>
    </form>
  )
}
