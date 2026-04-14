"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Save, Loader2, LayoutGrid, ImageIcon,
  Clock, DollarSign, Tag, Calendar, ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ServiceScheduleSection } from "@/components/admin/services/ServiceScheduleSection"
import ImageUpload from "@/components/profile/ImageUpload"
import Link from "next/link"
import { useServices } from "@/lib/swr/hooks/services"
import { useMemo } from "react"

// ─── Section nav definition ────────────────────────────────────────────────────
const SECTIONS = [
  { id: "general",  label: "General",          icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { id: "media",    label: "Media",             icon: <ImageIcon className="w-3.5 h-3.5" /> },
  { id: "pricing",  label: "Durations & Price", icon: <DollarSign className="w-3.5 h-3.5" /> },
  { id: "schedule", label: "Schedule",          icon: <Calendar className="w-3.5 h-3.5" /> },
]

interface ServiceDetailViewProps {
  serviceId?: string
}

export function ServiceDetailView({ serviceId }: ServiceDetailViewProps) {
  const router = useRouter()
  const isNew = !serviceId || serviceId === "new"

  const [name, setName]               = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory]       = useState("")
  const [mediaUrl, setMediaUrl]       = useState("")
  const [price, setPrice]             = useState("")
  const [duration, setDuration]       = useState("")
  const [saving, setSaving]           = useState(false)
  const [loading, setLoading]         = useState(!isNew)
  const [savedId, setSavedId]         = useState<string | undefined>(isNew ? undefined : serviceId)
  const [activeSection, setActiveSection] = useState("general")

  // Derive existing categories from all loaded services for the datalist
  const { data: servicesData } = useServices({ limit: 1000 })
  const existingCategories = useMemo(() => {
    const cats = Array.from(
      new Set(
        (servicesData?.services || [])
          .map((s) => s.category?.trim())
          .filter(Boolean) as string[]
      )
    ).sort()
    return cats
  }, [servicesData])

  // Load service for edit mode
  useEffect(() => {
    if (!isNew && serviceId) {
      setLoading(true)
      fetch(`/api/v1/services/${serviceId}`)
        .then((r) => r.json())
        .then((s: any) => {
          setName(s.name ?? "")
          setDescription(s.description ?? "")
          setCategory(s.category ?? "")
          setMediaUrl(s.mediaUrl ?? "")
          setPrice(s.price?.toString() ?? "")
          setSavedId(s.id)
        })
        .catch(() => toast.error("Failed to load service"))
        .finally(() => setLoading(false))
    }
  }, [serviceId, isNew])

  // Intersection observer for active section tracking
  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(`section-${s.id}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [loading])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setActiveSection(id)
  }, [])

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
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
      if (!isNew && serviceId) {
        res = await fetch(`/api/v1/services/${serviceId}`, {
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
      toast.success(isNew ? "Service created" : "Service updated")

      if (isNew) {
        setSavedId(saved.id)
        router.replace(`/admin/services/${saved.id}`)
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save service")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* ── Sticky top bar ─────────────────────────────────────── */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/admin/services">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground shrink-0">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">All Services</span>
            </Button>
          </Link>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <h1 className="font-semibold text-sm truncate">{isNew ? "New Service" : name || "Edit Service"}</h1>
          {!isNew && category && (
            <Badge variant="outline" className="text-xs hidden sm:flex shrink-0">{category}</Badge>
          )}
        </div>
        <Button
          onClick={() => handleSave()}
          disabled={saving}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shrink-0"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </Button>
      </div>

      {/* ── Two-column layout ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16 flex gap-8 items-start">

        {/* Main scrollable content */}
        <div className="flex-1 min-w-0 space-y-8">

          {/* General */}
          <section id="section-general">
            <SectionCard
              icon={<LayoutGrid className="w-4 h-4 text-blue-600" />}
              iconBg="bg-blue-50"
              title="General"
            >
              <div className="space-y-4">
                <Field label="Service Name" required>
                  <Input
                    placeholder="e.g. Silk Press, Starter Locs…"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white"
                  />
                </Field>

                <Field label="Category" hint="type or pick existing">
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="svc-category"
                      list="svc-cat-opts"
                      placeholder="e.g. Natural Hair, Locs, Color & Chemical"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="pl-9 bg-white"
                    />
                    <datalist id="svc-cat-opts">
                      {existingCategories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>
                </Field>

                <Field label="Short Description" hint="optional">
                  <Textarea
                    placeholder="A brief description of what this service includes…"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    maxLength={1000}
                    className="resize-none bg-white"
                  />
                  <p className="text-[11px] text-muted-foreground text-right mt-1">
                    {description.length}/1000
                  </p>
                </Field>
              </div>
            </SectionCard>
          </section>

          {/* Media */}
          <section id="section-media">
            <SectionCard
              icon={<ImageIcon className="w-4 h-4 text-violet-600" />}
              iconBg="bg-violet-50"
              title="Media"
            >
              <ImageUpload value={mediaUrl} onChange={setMediaUrl} imgHeight="220px" />
            </SectionCard>
          </section>

          {/* Pricing */}
          <section id="section-pricing">
            <SectionCard
              icon={<DollarSign className="w-4 h-4 text-emerald-600" />}
              iconBg="bg-emerald-50"
              title="Durations & Price"
            >
              <div className="grid grid-cols-2 gap-4">
                <Field label="Duration (minutes)">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="60"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="1"
                      className="pl-9 bg-white"
                    />
                  </div>
                </Field>
                <Field label="Price ($)" required>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      min="0"
                      step="1"
                      className="pl-9 bg-white"
                      required
                    />
                  </div>
                </Field>
              </div>
            </SectionCard>
          </section>

          {/* Schedule */}
          <section id="section-schedule">
            <SectionCard
              icon={<Calendar className="w-4 h-4 text-amber-600" />}
              iconBg="bg-amber-50"
              title="Schedule"
            >
              <ServiceScheduleSection serviceId={savedId} />
            </SectionCard>
          </section>
        </div>

        {/* ── Sticky sidebar nav ─────────────────────────────── */}
        <aside className="hidden lg:flex flex-col gap-1 w-44 shrink-0 sticky top-[129px]">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2 px-3">
            Sections
          </p>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === s.id
                  ? "bg-slate-900 text-white font-medium"
                  : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
          <div className="pt-4 px-1">
            <Button
              onClick={() => handleSave()}
              disabled={saving}
              className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ─── Reusable sub-components ───────────────────────────────────────────────────
function SectionCard({
  icon,
  iconBg,
  title,
  children,
}: {
  icon: React.ReactNode
  iconBg: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center`}>{icon}</div>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
        {hint && (
          <span className="ml-2 text-[10px] font-normal text-muted-foreground normal-case">({hint})</span>
        )}
      </Label>
      {children}
    </div>
  )
}
