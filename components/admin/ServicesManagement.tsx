"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useServices, type Service } from "@/lib/swr"
import { DollarSign, Plus, Trash2, Edit2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

export function ServicesManagement() {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "price-asc" | "price-desc">("name-asc")
  const { data: response, mutate } = useServices({
    page,
    limit: 12,
    sort: sortBy,
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [newServiceName, setNewServiceName] = useState("")
  const [newServicePrice, setNewServicePrice] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editName, setEditName] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)

  const services = response?.services || []
  const pagination = response?.pagination

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/v1/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newServiceName,
          price: Number.parseInt(newServicePrice),
        }),
      })

      if (response.ok) {
        mutate()
        setIsOpen(false)
        setNewServiceName("")
        setNewServicePrice("")
        toast.success("Service added successfully")
      } else {
        const error = await response.json()
        toast.error("Failed to add service", {
          description: error.error || "An error occurred",
        })
      }
    } catch (error) {
      toast.error("Failed to add service", {
        description: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingService) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/v1/services/${editingService.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          price: Number.parseInt(editPrice),
        }),
      })

      if (response.ok) {
        mutate()
        setIsEditOpen(false)
        setEditingService(null)
        setEditName("")
        setEditPrice("")
        toast.success("Service updated successfully")
      } else {
        const error = await response.json()
        toast.error("Failed to update service", {
          description: error.error || "An error occurred",
        })
      }
    } catch (error) {
      toast.error("Failed to update service", {
        description: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEditDialog = (service: Service) => {
    setEditingService(service)
    setEditName(service.name)
    setEditPrice(service.price.toString())
    setIsEditOpen(true)
  }

  const handleDeleteService = async () => {
    if (!serviceToDelete) return

    try {
      const response = await fetch(`/api/v1/services/${serviceToDelete}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutate()
        setDeleteDialogOpen(false)
        setServiceToDelete(null)
        toast.success("Service deleted successfully")
      } else {
        const error = await response.json()
        toast.error("Failed to delete service", {
          description: error.error || "An error occurred",
        })
      }
    } catch (error) {
      toast.error("Failed to delete service", {
        description: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  const openDeleteDialog = (serviceId: string) => {
    setServiceToDelete(serviceId)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Services
        </h2>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Create a new spa service for customers to book</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    placeholder="e.g., Classic Manicure"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servicePrice">Price ($)</Label>
                  <Input
                    id="servicePrice"
                    type="number"
                    placeholder="e.g., 50"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    required
                    min="0"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Service"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update the service details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditService} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editServiceName">Service Name</Label>
              <Input
                id="editServiceName"
                placeholder="e.g., Classic Manicure"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editServicePrice">Price ($)</Label>
              <Input
                id="editServicePrice"
                type="number"
                placeholder="e.g., 50"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                required
                min="0"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground mt-2">
                  <DollarSign className="w-5 h-5" />
                  {service.price.toLocaleString()}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => openEditDialog(service)}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <AlertDialog open={deleteDialogOpen && serviceToDelete === service.id} onOpenChange={(open) => {
                  if (!open) {
                    setDeleteDialogOpen(false)
                    setServiceToDelete(null)
                  } else {
                    openDeleteDialog(service.id)
                  }
                }}>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => openDeleteDialog(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Service</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this service? This action cannot be undone.
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages} ({pagination.total} total)
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(pagination.pages, page + 1))}
              disabled={page === pagination.pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
