import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { galleryImages, type GallerySection } from "@/src/db/schema"
import { eq, and } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Validation schemas
const sectionEnum = z.enum(["hero", "gallery_preview", "gallery_full", "about", "services", "contact", "signin", "signup"])

const updateGalleryImageSchema = z.object({
  url: z.string().url().optional(),
  alt: z.string().optional(),
  section: sectionEnum.optional(),
  slotIndex: z.number().min(0).optional(),
})

// Helper to validate request
function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, error: result.error }
}

function validationErrorResponse(error: z.ZodError) {
  return NextResponse.json({ error: "Validation failed", details: error.flatten() }, { status: 400 })
}

// GET /api/v1/gallery/[id] - Get single gallery image
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const db = getDb()

    const [image] = await db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1)

    if (!image) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json({ image }, { status: 200 })
  } catch (error: unknown) {
    console.error("GET /api/v1/gallery/[id] error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery image" }, { status: 500 })
  }
}

// PUT /api/v1/gallery/[id] - Update gallery image
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const session = await getServerSession(getAuthOptions())
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin or super admin
    const userRole = (session.user as any)?.role
    if (!["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    const db = getDb()
    const body = await req.json()

    const validation = validateRequest(updateGalleryImageSchema, body)
    if (!validation.success) {
      return validationErrorResponse(validation.error)
    }

    const { url, alt, section, slotIndex } = validation.data

    // Check if image exists
    const [existingImage] = await db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1)

    if (!existingImage) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    // If changing section or slotIndex, check for conflicts
    if (section !== undefined || slotIndex !== undefined) {
      const newSection = section ?? existingImage.section
      const newSlotIndex = slotIndex ?? existingImage.slotIndex

      // Check if target slot is already taken by another image
      const conflict = await db
        .select()
        .from(galleryImages)
        .where(and(eq(galleryImages.section, newSection), eq(galleryImages.slotIndex, newSlotIndex)))
        .limit(1)

      if (conflict.length > 0 && conflict[0].id !== id) {
        return NextResponse.json(
          { error: `Slot ${newSlotIndex} in section "${newSection}" is already occupied.` },
          { status: 400 }
        )
      }
    }

    // Build update object
    const updateData: Partial<typeof existingImage> = {}
    if (url !== undefined) updateData.url = url
    if (alt !== undefined) updateData.alt = alt
    if (section !== undefined) updateData.section = section
    if (slotIndex !== undefined) updateData.slotIndex = slotIndex
    // Store as ISO string — D1 text columns expect ISO-8601, not Date.toString()
    updateData.updatedAt = new Date().toISOString()

    // Update the image
    // Note: .returning() is not supported by the D1 HTTP proxy; re-select after update
    await db.update(galleryImages).set(updateData).where(eq(galleryImages.id, id))

    const [updatedImage] = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.id, id))
      .limit(1)

    return NextResponse.json({ image: updatedImage }, { status: 200 })
  } catch (error: unknown) {
    console.error("PUT /api/v1/gallery/[id] error:", error)
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 })
  }
}

// DELETE /api/v1/gallery/[id] - Delete gallery image
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const session = await getServerSession(getAuthOptions())
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin or super admin
    const userRole = (session.user as any)?.role
    if (!["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    const db = getDb()

    // Check if image exists
    const [existingImage] = await db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1)

    if (!existingImage) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    // Delete the image
    await db.delete(galleryImages).where(eq(galleryImages.id, id))

    return NextResponse.json({ success: true, deleted: { id, section: existingImage.section } }, { status: 200 })
  } catch (error: unknown) {
    console.error("DELETE /api/v1/gallery/[id] error:", error)
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
  }
}
