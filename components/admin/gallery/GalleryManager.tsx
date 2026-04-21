"use client"

import { useState, useMemo } from "react"
import { mutate as globalMutate } from "swr"
import { useGallery, useSectionSlots, SECTION_LABELS, type GallerySection } from "@/lib/swr/hooks/gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, LayoutGrid, Trash2, ImageIcon, Loader2, Move, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"
import { GalleryUploadSheet } from "./GalleryUploadSheet"

const ALL_SECTIONS = "all"

// Slot visual component
function SectionSlotGrid({ section, onSelect }: { section: GallerySection; onSelect: (slotIndex?: number) => void }) {
  const { slots, filled, limit, isLoading } = useSectionSlots(section)

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-2 p-4 bg-slate-50 rounded-lg min-h-[120px]">
        <div className="col-span-full flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">
          {filled} of {limit} slots filled
        </span>
        {filled < limit && (
          <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => onSelect()}>
            <Plus className="w-3 h-3" />
            Add
          </Button>
        )}
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.index}
            onClick={() => slot.filled ? onSelect(slot.index) : onSelect()}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              slot.filled
                ? "border-terracotta-400 hover:border-terracotta-600"
                : "border-dashed border-slate-300 hover:border-slate-400 bg-slate-50"
            }`}
          >
            {slot.filled && slot.image ? (
              <>
                <img
                  src={slot.image.url}
                  alt={slot.image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                <span className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center text-[10px] bg-white/80 rounded-full text-slate-700 font-medium">
                  {slot.index + 1}
                </span>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium text-slate-300">+</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// Image card component
function GalleryImageCard({
  image,
  onDelete,
}: {
  image: { id: string; url: string; alt: string; slotIndex: number; section: string }
  onDelete: (id: string) => void
}) {
  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs bg-white/90 backdrop-blur-sm">
            Slot {image.slotIndex + 1}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="destructive"
            className="w-7 h-7"
            onClick={() => onDelete(image.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs text-slate-500 truncate">{image.alt || "No alt text"}</p>
        <p className="text-[10px] text-slate-400 uppercase mt-1">{SECTION_LABELS[image.section as GallerySection]}</p>
      </div>
    </div>
  )
}

// Invalidates all /api/v1/gallery* SWR keys (main list + all section-filtered hooks)
function mutateAllGalleryKeys() {
  return globalMutate((key: unknown) => typeof key === "string" && key.startsWith("/api/v1/gallery"), undefined, { revalidate: true })
}

export function GalleryManager() {
  const { data, isLoading, error, mutate } = useGallery()
  const [activeSection, setActiveSection] = useState<string>(ALL_SECTIONS)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadSection, setUploadSection] = useState<GallerySection | undefined>()
  const [uploadSlotIndex, setUploadSlotIndex] = useState<number | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const sections = useMemo(() => {
    const allSections = Object.keys(SECTION_LABELS) as GallerySection[]
    return allSections
  }, [])

  const filteredImages = useMemo(() => {
    if (!data?.images) return []
    if (activeSection === ALL_SECTIONS) return data.images
    return data.images.filter((img) => img.section === activeSection)
  }, [data?.images, activeSection])

  const handleAddImage = (section?: GallerySection, slotIndex?: number) => {
    setUploadSection(section)
    setUploadSlotIndex(slotIndex)
    setUploadOpen(true)
  }

  const openDelete = (id: string) => {
    setImageToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!imageToDelete) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/v1/gallery/${imageToDelete}`, { method: "DELETE" })
      if (res.ok) {
        await mutateAllGalleryKeys()
        toast.success("Image deleted")
      } else {
        const err = await res.json().catch(() => ({ error: "" })) as { error?: string }
        toast.error(err.error || "Failed to delete image")
      }
    } catch (e) {
      toast.error("Failed to delete image")
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
      setImageToDelete(null)
    }
  }

  const handleUploadSuccess = async () => {
    await mutateAllGalleryKeys()
    setUploadOpen(false)
    setUploadSection(undefined)
    setUploadSlotIndex(undefined)
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Failed to load gallery images</p>
        <Button onClick={() => mutate()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gallery Manager</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading
              ? "Loading..."
              : `${data?.pagination.total || 0} images across ${sections.length} sections`}
          </p>
        </div>
        <Button
          onClick={() => handleAddImage()}
          className="gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white"
        >
          <Plus className="w-4 h-4" />
          Upload Image
        </Button>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        <button
          onClick={() => setActiveSection(ALL_SECTIONS)}
          className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
            activeSection === ALL_SECTIONS
              ? "bg-slate-900 text-white border-slate-900"
              : "border-border bg-white text-muted-foreground hover:border-slate-400"
          }`}
        >
          All Sections
          <span className="ml-1.5 text-xs opacity-60">({data?.pagination.total || 0})</span>
        </button>
        {sections.map((section) => {
          const count = data?.images.filter((img) => img.section === section).length || 0
          const limit = data?.sectionLimits?.[section] || 0
          const isActive = activeSection === section
          return (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-border bg-white text-muted-foreground hover:border-slate-400"
              }`}
            >
              {SECTION_LABELS[section]}
              <span className={`ml-1.5 text-xs ${count >= limit ? "text-amber-500" : "opacity-60"}`}>
                ({count}/{limit})
              </span>
            </button>
          )
        })}
      </div>

      {/* Section Slot View (when a specific section is selected) */}
      {activeSection !== ALL_SECTIONS && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h3 className="text-sm font-semibold mb-3">{SECTION_LABELS[activeSection as GallerySection]} Slots</h3>
          <SectionSlotGrid
            section={activeSection as GallerySection}
            onSelect={(slotIndex) => handleAddImage(activeSection as GallerySection, slotIndex)}
          />
        </div>
      )}

      {/* All Sections Slot Overview (when all is selected) */}
      {activeSection === ALL_SECTIONS && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <div
              key={section}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:border-terracotta-300 transition-colors cursor-pointer"
              onClick={() => setActiveSection(section)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">{SECTION_LABELS[section]}</h3>
                <Badge variant="outline" className="text-xs">
                  {(data?.images.filter((img) => img.section === section).length || 0)} / {data?.sectionLimits?.[section] || 0}
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: data?.sectionLimits?.[section] || 0 }).map((_, i) => {
                  const hasImage = data?.images.some((img) => img.section === section && img.slotIndex === i)
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded ${hasImage ? "bg-terracotta-100" : "bg-slate-100"}`}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Image Grid */}
      {!isLoading && activeSection !== ALL_SECTIONS && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((image) => (
            <GalleryImageCard key={image.id} image={image} onDelete={openDelete} />
          ))}

          {/* Add new placeholder */}
          {filteredImages.length < (data?.sectionLimits?.[activeSection as GallerySection] || 0) && (
            <button
              onClick={() => handleAddImage(activeSection as GallerySection)}
              className="flex flex-col items-center justify-center min-h-[180px] rounded-xl border-2 border-dashed border-slate-300 hover:border-terracotta-400 hover:bg-terracotta-50/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center group-hover:bg-terracotta-200 transition-colors mb-3">
                <Plus className="w-6 h-6 text-terracotta-600" />
              </div>
              <span className="text-sm font-medium text-terracotta-600">Upload Image</span>
            </button>
          )}

          {filteredImages.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <ImageIcon className="w-8 h-8 mx-auto mb-3 text-slate-300" />
              <p>No images in this section yet</p>
              <p className="text-xs mt-1">Click "Upload Image" to add one</p>
            </div>
          )}
        </div>
      )}

      {/* Upload Sheet */}
      <GalleryUploadSheet
        isOpen={uploadOpen}
        onOpenChange={setUploadOpen}
        section={uploadSection}
        slotIndex={uploadSlotIndex}
        onSuccess={handleUploadSuccess}
      />

      {/* Delete Dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteDialogOpen(false)
            setImageToDelete(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the image from the gallery. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
            >
              {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
