"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { toast } from "sonner"
import {
  Save, Loader2, LayoutGrid, ImageIcon,
  Clock, Calendar, DollarSign, Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ServiceScheduleSection } from "./ServiceScheduleSection"
import type { Service } from "@/lib/swr/hooks/services"
import ImageUpload from "@/components/profile/ImageUpload"

// ─── ServiceFormSheet ──────────────────────────────────────────────────────────
interface ServiceFormSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  existingService?: Service | null
  existingCategories?: string[]
  onSaved: () => void
}

export function ServiceFormSheet({ isOpen, onOpenChange, existingService, existingCategories = [], onSaved }: ServiceFormSheetProps) {
  const isEditMode = Boolean(existingService)

  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("")
  const [saving, setSaving] = useState(false)

  // For edit mode: track the saved serviceId so schedule section activates immediately
  const [savedServiceId, setSavedServiceId] = useState<string | undefined>(undefined)

  const scheduleRef = useRef<HTMLDivElement>(null)

  // Reset form when opened or existingService changes
  useEffect(() => {
    if (isOpen) {
      setName(existingService?.name ?? "")
      setDescription(existingService?.description ?? "")
      setCategory(existingService?.category ?? "")
      setMediaUrl(existingService?.mediaUrl ?? "")
      setPrice(existingService?.price?.toString() ?? "")
      setDuration("") // Need to fetch duration if needed, assume empty or handled elsewhere
      setSavedServiceId(existingService?.id)
    }
  }, [isOpen, existingService])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { toast.error("Service name is required"); return }
    if (!price || isNaN(Number(price))) { toast.error("Valid price is required"); return }

    setSaving(true)
    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || undefined,
        category: category.trim() || undefined,
        mediaUrl: mediaUrl.trim() || undefined,
        price: Number(price),
        duration: duration ? Number(duration) : undefined,
      }

      let res: Response
      if (isEditMode && existingService) {
        res = await fetch(`/api/v1/services/${existingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch("/api/v1/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as any
        throw new Error(err.error || "Failed to save service")
      }

      const saved = await res.json() as any
      toast.success(isEditMode ? "Service updated" : "Service created")
      onSaved()

      // Activate schedule section for new services after save
      if (!isEditMode) {
        setSavedServiceId(saved.id)
        // Scroll to schedule section after a short delay to allow UI to update
        setTimeout(() => {
          scheduleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save service")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto bg-slate-50 p-0 border-l">
        <div className="px-6 py-4 bg-white border-b sticky top-0 z-10">
          <SheetHeader>
            <SheetTitle>{isEditMode ? `Edit: ${existingService?.name}` : "New Service"}</SheetTitle>
            <SheetDescription>
              {isEditMode ? "Update details for this service below." : "Enter the details to create a new bookable service."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <form id="service-form" onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* ── General ── */}
          <section id="section-general">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">General</h2>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="service-name" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Service Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="service-name"
                    placeholder="e.g. Classic Manicure"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="h-10 bg-white border-slate-200 text-sm focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="service-category" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Category
                    <span className="ml-2 text-[10px] font-normal text-muted-foreground normal-case">(optional — type or pick existing)</span>
                  </Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="service-category"
                      list="category-options"
                      placeholder="e.g. Natural Hair, Locs, Color & Chemical"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="pl-9 h-10 bg-white border-slate-200 text-sm focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <datalist id="category-options">
                      {existingCategories.map(cat => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="service-description" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Short Description
                    <span className="ml-2 text-[10px] font-normal text-muted-foreground normal-case">(optional)</span>
                  </Label>
                  <Textarea
                    id="service-description"
                    placeholder="A brief description of what this service includes…"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    maxLength={1000}
                    rows={3}
                    className="bg-white border-slate-200 text-sm resize-none focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Media ── */}
          <section id="section-media">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                  <ImageIcon className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Media</h2>
                </div>
              </div>
              <div className="p-5">
                <ImageUpload value={mediaUrl} onChange={setMediaUrl} imgHeight="200px" />
              </div>
            </div>
          </section>

          {/* ── Duration & Price ── */}
          <section id="section-pricing">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Duration & Price</h2>
                </div>
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="service-duration" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Duration (minutes)
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="service-duration"
                      type="number"
                      placeholder="60"
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      min="1"
                      className="pl-9 h-10 bg-white border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="service-price" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Price ($) <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="service-price"
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      className="pl-9 h-10 bg-white border-slate-200 text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── INLINE SAVE BUTTON ── */}
          <div className="pt-2 pb-4">
            <Button
              type="submit"
              disabled={saving}
              className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base py-6"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isEditMode ? "Save Details Before Continuing" : "Save Service to Add Schedule"}
            </Button>
          </div>

          <hr className="border-slate-200" />

          {/* ── Schedule ── */}
          <section id="section-schedule" ref={scheduleRef}>
            <div className={`bg-white rounded-xl border ${savedServiceId ? 'border-slate-200' : 'border-slate-200 border-dashed opacity-70'} overflow-hidden shadow-sm transition-all duration-500`}>
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold">Service Schedule</h2>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <ServiceScheduleSection serviceId={savedServiceId} />
              </div>
            </div>
          </section>

        </form>
      </SheetContent>
    </Sheet>
  )
}
