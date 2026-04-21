import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { galleryImages } from "@/src/db/schema"
import { eq, asc } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Validation schema for reorder request
const reorderSchema = z.object({
  section: z.enum(["hero", "gallery_preview", "gallery_full", "about", "services", "contact", "signin", "signup"]),
  imageIds: z.array(z.string()).min(1), // Ordered array of image IDs
})

// PATCH /api/v1/gallery/reorder - Reorder images within a section
export async function PATCH(req: NextRequest) {
  try {
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

    const validation = reorderSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { section, imageIds } = validation.data

    // Get all images for this section to validate
    const sectionImages = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.section, section))

    // Validate all imageIds belong to this section
    const sectionImageIds = new Set(sectionImages.map((img: typeof galleryImages.$inferSelect) => img.id))
    const invalidIds = imageIds.filter((id) => !sectionImageIds.has(id))

    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: "Invalid image IDs", invalidIds },
        { status: 400 }
      )
    }

    // Check all section images are included
    if (imageIds.length !== sectionImages.length) {
      return NextResponse.json(
        {
          error: "All images in the section must be included in the reorder",
          expected: sectionImages.length,
          received: imageIds.length,
        },
        { status: 400 }
      )
    }

    // Update slot indices sequentially to avoid D1 conflicts.
    // Promise.all on D1 HTTP proxy can cause two writes to briefly hold
    // the same slot_index before the rest complete.
    const now = new Date().toISOString()
    for (let index = 0; index < imageIds.length; index++) {
      await db
        .update(galleryImages)
        .set({ slotIndex: index, updatedAt: now })
        .where(eq(galleryImages.id, imageIds[index]))
    }

    // Re-fetch the section in order (.returning() not supported by D1 HTTP proxy)
    const reordered = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.section, section))
      .orderBy(asc(galleryImages.slotIndex))

    return NextResponse.json(
      {
        success: true,
        section,
        reordered,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("PATCH /api/v1/gallery/reorder error:", error)
    return NextResponse.json({ error: "Failed to reorder gallery images" }, { status: 500 })
  }
}
