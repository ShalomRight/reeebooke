"use client"

import { useState, useMemo } from "react"
import { useServices, type Service } from "@/lib/swr/hooks/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Plus, LayoutGrid, Table2, Search, Star, Edit2, Trash2, ImageIcon, DollarSign, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { ServicesTableView } from "./ServicesTableView"

const ALL = "All"

export function ServicesPageV2() {
  const { data: response, mutate, isLoading } = useServices({ limit: 1000 })
  const services = response?.services || []

  const [view, setView] = useState<"card" | "table">("card")
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [search, setSearch] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(services.map((s) => s.category?.trim()).filter(Boolean) as string[])
    ).sort()
    return cats.length > 0 ? [ALL, ...cats] : []
  }, [services])

  const filtered = useMemo(() => {
    let list = services
    if (activeCategory !== ALL && categories.length > 0) {
      list = list.filter((s) => s.category?.trim() === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
      )
    }
    return list
  }, [services, activeCategory, categories, search])

  const openDelete = (id: string) => {
    setServiceToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!serviceToDelete) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/v1/services/${serviceToDelete}`, { method: "DELETE" })
      if (res.ok) {
        mutate()
        toast.success("Service deleted")
      } else {
        toast.error("Failed to delete service")
      }
    } catch {
      toast.error("Failed to delete service")
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
      setServiceToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading ? "Loading…" : `${services.length} services · ${categories.length > 1 ? categories.length - 1 : 0} categories`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden text-sm">
            <button
              onClick={() => setView("card")}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                view === "card" ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50 text-muted-foreground"
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Cards
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors border-l border-border ${
                view === "table" ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50 text-muted-foreground"
              }`}
            >
              <Table2 className="w-4 h-4" /> Table
            </button>
          </div>

          <Link href="/admin/services/new">
            <Button className="gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
              <Plus className="w-4 h-4" /> New Service
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search services…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      {/* Category tabs */}
      {categories.length > 1 && (
        <div className="flex gap-2 flex-wrap border-b border-border pb-3">
          {categories.map((cat) => {
            const count =
              cat === ALL
                ? services.length
                : services.filter((s) => s.category?.trim() === cat).length
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900"
                    : "border-border bg-white text-muted-foreground hover:border-slate-400 hover:text-foreground"
                }`}
              >
                {cat}
                <span className="ml-1.5 text-xs opacity-60">({count})</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Content */}
      {!isLoading && view === "table" ? (
        <ServicesTableView services={filtered} onDelete={openDelete} />
      ) : !isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((service) => (
            <ServiceCardV2 key={service.id} service={service} onDelete={() => openDelete(service.id)} />
          ))}

          {/* Add new card */}
          <Link
            href="/admin/services/new"
            className="flex flex-col items-center justify-center min-h-[220px] rounded-xl border-2 border-dashed border-warm-200 hover:border-terracotta-400 hover:bg-terracotta-50/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center group-hover:bg-terracotta-200 transition-colors mb-3">
              <Plus className="w-6 h-6 text-terracotta-600" />
            </div>
            <span className="text-sm font-medium text-terracotta-600">New Service</span>
          </Link>

          {filtered.length === 0 && search && (
            <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
              No services match "{search}"
            </div>
          )}
        </div>
      ) : null}

      {/* Delete dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteDialogOpen(false)
            setServiceToDelete(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and will remove all associated data.
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

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCardV2({ service, onDelete }: { service: Service; onDelete: () => void }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow overflow-hidden group">
      {/* Thumbnail */}
      {service.mediaUrl ? (
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.mediaUrl}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-slate-300" />
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col gap-2">
        <div>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2">{service.name}</h3>
          {service.category && (
            <Badge variant="outline" className="text-[10px] mt-1 border-slate-300 text-muted-foreground">
              {service.category}
            </Badge>
          )}
          {service.description && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{service.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-0.5 text-sm font-bold text-emerald-600">
            <DollarSign className="w-3.5 h-3.5" />
            {service.price.toLocaleString()}
          </div>
          {service.rating != null && service.rating > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {service.rating.toFixed(1)}
              {service.ratingsCount ? <span>({service.ratingsCount})</span> : null}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <Link href={`/admin/services/${service.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 text-xs hover:bg-terracotta-50 hover:border-terracotta-300 hover:text-terracotta-700"
            >
              <Edit2 className="w-3 h-3" /> Edit Service
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
