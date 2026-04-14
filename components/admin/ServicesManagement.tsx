"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useServices, type Service } from "@/lib/swr"
import { DollarSign, Plus, Trash2, Edit2, Star, ImageIcon, ExternalLink } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { ServiceFormSheet } from "./services/ServiceFormSheet"

export function ServicesManagement() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "price-asc" | "price-desc">("name-asc")
  const { data: response, mutate } = useServices({ page, limit: 12, sort: sortBy })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)

  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const services = response?.services || []
  const pagination = response?.pagination
  const existingCategories = Array.from(
    new Set(services.map((s) => s.category?.trim()).filter(Boolean) as string[])
  ).sort()

  const openDeleteDialog = (serviceId: string) => {
    setServiceToDelete(serviceId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteService = async () => {
    if (!serviceToDelete) return
    try {
      const res = await fetch(`/api/v1/services/${serviceToDelete}`, { method: "DELETE" })
      if (res.ok) {
        mutate()
        setDeleteDialogOpen(false)
        setServiceToDelete(null)
        toast.success("Service deleted successfully")
      } else {
        const err = await res.json() as any
        toast.error("Failed to delete service", { description: err.error || "An error occurred" })
      }
    } catch (error) {
      toast.error("Failed to delete service", {
        description: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Services
        </h2>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A–Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z–A)</SelectItem>
              <SelectItem value="price-asc">Price (Low → High)</SelectItem>
              <SelectItem value="price-desc">Price (High → Low)</SelectItem>
            </SelectContent>
          </Select>

          <Link href="/admin/services">
            <Button variant="outline" className="gap-2 rounded-full text-muted-foreground hover:text-foreground">
              <ExternalLink className="w-4 h-4" />
              New UI
            </Button>
          </Link>

          <Button
            id="add-service-btn"
            className="gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => { setSelectedService(null); setSheetOpen(true); }}
          >
            <Plus className="w-4 h-4" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={() => { setSelectedService(service); setSheetOpen(true); }}
            onDelete={() => openDeleteDialog(service.id)}
          />
        ))}

        {services.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
            <DollarSign className="w-10 h-10 mb-3 opacity-30" />
            <p className="font-medium">No services yet</p>
            <p className="text-sm mt-1">Create your first service to start accepting bookings.</p>
            <Button
              className="mt-4 gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => { setSelectedService(null); setSheetOpen(true); }}
            >
              <Plus className="w-4 h-4" /> Add Service
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages} ({pagination.total} total)
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={open => { if (!open) { setDeleteDialogOpen(false); setServiceToDelete(null) } }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteService}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Sheet Form */}
      <ServiceFormSheet
        isOpen={sheetOpen}
        onOpenChange={setSheetOpen}
        existingService={selectedService}
        existingCategories={existingCategories}
        onSaved={mutate}
      />
    </div>
  )
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  onEdit,
  onDelete,
}: {
  service: Service
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group border-slate-200">
      {/* Thumbnail */}
      {service.mediaUrl ? (
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.mediaUrl}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-slate-300" />
        </div>
      )}

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">{service.name}</CardTitle>
          {service.rating != null && service.rating > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1 shrink-0 text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {service.rating.toFixed(1)}
              <span className="text-muted-foreground">({service.ratingsCount})</span>
            </Badge>
          )}
        </div>
        {service.category && (
          <Badge variant="outline" className="text-[10px] w-fit mt-1 text-muted-foreground border-slate-300">
            {service.category}
          </Badge>
        )}
        {service.description && (
          <CardDescription className="text-xs line-clamp-2 mt-1">{service.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-1 text-lg font-semibold mb-3">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          {service.price.toLocaleString()}
        </div>

        <div className="flex gap-2">
          <Button
            id={`edit-service-${service.id}`}
            variant="outline"
            size="sm"
            className="flex-1 gap-2 bg-transparent hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
            onClick={onEdit}
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </Button>
          <Button
            id={`delete-service-${service.id}`}
            variant="destructive"
            size="sm"
            className="flex-1 gap-2"
            onClick={onDelete}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
