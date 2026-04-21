"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Save, ImageIcon, LayoutGrid, ArrowLeft, Check } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SECTION_LABELS, type GallerySection, SECTION_SLOT_LIMITS } from "@/lib/swr/hooks/gallery"
import ImageUpload from "@/components/profile/ImageUpload"

const SECTIONS = Object.entries(SECTION_LABELS).map(([key, label]) => ({
  value: key as GallerySection,
  label,
  limit: SECTION_SLOT_LIMITS[key as GallerySection],
}))

interface GalleryUploadSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  section?: GallerySection
  slotIndex?: number
  onSuccess: () => void
}

export function GalleryUploadSheet({
  isOpen,
  onOpenChange,
  section: initialSection,
  slotIndex: initialSlotIndex,
  onSuccess,
}: GalleryUploadSheetProps) {
  const [selectedSection, setSelectedSection] = useState<GallerySection | "">(initialSection || "")
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | undefined>(initialSlotIndex)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [altText, setAltText] = useState<string>("")
  const [saving, setSaving] = useState(false)

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedSection(initialSection || "")
      setSelectedSlotIndex(initialSlotIndex)
      setImageUrl("")
      setAltText("")
      setSaving(false)
    }
  }, [isOpen, initialSection, initialSlotIndex])

  const handleSave = async () => {
    if (!selectedSection) {
      toast.error("Please select a section")
      return
    }
    if (!imageUrl) {
      toast.error("Please upload an image first")
      return
    }

    setSaving(true)
    try {
      const payload: Record<string, unknown> = {
        section: selectedSection,
        url: imageUrl,
        alt: altText,
      }
      if (selectedSlotIndex !== undefined) {
        payload.slotIndex = selectedSlotIndex
      }

      const res = await fetch("/api/v1/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "" })) as { error?: string }
        throw new Error(err.error || "Failed to save image")
      }

      toast.success("Image added to gallery")
      onSuccess()
    } catch (err: any) {
      toast.error(err.message || "Failed to save image")
    } finally {
      setSaving(false)
    }
  }

  const availableSlots = selectedSection ? SECTION_SLOT_LIMITS[selectedSection] : 0

  if (!isOpen) return null

  return (
    // Fullscreen overlay — same z-layer as the ServiceFormSheet panel
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Slide-in panel — matches ServiceFormSheet width + style */}
      <div className="relative ml-auto w-full sm:max-w-2xl h-full flex flex-col bg-slate-50 shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">

        {/* ── Sticky header ── */}
        <div className="px-6 py-4 bg-white border-b sticky top-0 z-10 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 hover:bg-slate-100"
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-base font-semibold leading-tight">Upload Gallery Image</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add an image to a section of your website
            </p>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Section card */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold">Section</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="section" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Website Section <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={selectedSection}
                  onValueChange={(value) => {
                    setSelectedSection(value as GallerySection)
                    setSelectedSlotIndex(undefined)
                  }}
                >
                  <SelectTrigger id="section" className="h-10 bg-white border-slate-200 text-sm">
                    <SelectValue placeholder="Choose a section…" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTIONS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                        <span className="ml-2 text-xs text-muted-foreground">(max {s.limit})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Slot picker — only show when section has >1 slot */}
              {selectedSection && availableSlots > 1 && (
                <div className="space-y-1.5">
                  <Label htmlFor="slot" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Slot Position
                    <span className="ml-2 text-[10px] font-normal text-muted-foreground normal-case">(optional)</span>
                  </Label>
                  <Select
                    value={selectedSlotIndex?.toString() ?? "auto"}
                    onValueChange={(v) =>
                      setSelectedSlotIndex(v === "auto" ? undefined : parseInt(v))
                    }
                  >
                    <SelectTrigger id="slot" className="h-10 bg-white border-slate-200 text-sm">
                      <SelectValue placeholder="Auto-assign slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-assign next available</SelectItem>
                      {Array.from({ length: availableSlots }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>Slot {i + 1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Leave as "Auto-assign" to fill the first empty slot
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Media card — uses the exact same ImageUpload used by services */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                <ImageIcon className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <h3 className="text-sm font-semibold">Image</h3>
            </div>
            <div className="p-5 space-y-4">
              {/* ImageUpload is the same component used in ServiceFormSheet —
                  it handles CldUploadWidget internally with a Dialog picker and
                  doesn't conflict with page-level overlays */}
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                imgHeight="220px"
                showReuse
              />

              {imageUrl && (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <Check className="w-4 h-4" />
                  Image ready
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="alt" className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Alt Text
                  <span className="ml-2 text-[10px] font-normal text-muted-foreground normal-case">(for accessibility &amp; SEO)</span>
                </Label>
                <Input
                  id="alt"
                  placeholder="e.g., Woman with a silk press hairstyle"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="h-10 bg-white border-slate-200 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Summary card — shown once image is picked */}
          {imageUrl && selectedSection && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Summary</h4>
              <div className="space-y-1 text-sm text-slate-700">
                <p><span className="text-slate-400 mr-2">Section:</span>{SECTION_LABELS[selectedSection as GallerySection]}</p>
                <p><span className="text-slate-400 mr-2">Slot:</span>{selectedSlotIndex !== undefined ? `Slot ${selectedSlotIndex + 1}` : "Auto-assign"}</p>
                {altText && <p><span className="text-slate-400 mr-2">Alt:</span>{altText}</p>}
              </div>
            </div>
          )}

          {/* Save button (inline, like service form) */}
          <div className="pt-2 pb-6">
            <Button
              onClick={handleSave}
              disabled={!imageUrl || !selectedSection || saving}
              className="w-full gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-md text-base py-6"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? "Saving…" : "Save to Gallery"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
