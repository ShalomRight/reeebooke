import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { galleryImages, type GallerySection } from "@/src/db/schema"
import { eq, and, asc, count } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Validation schemas
const sectionEnum = z.enum(["hero", "gallery_preview", "gallery_full", "about", "services", "contact", "signin", "signup"])

const getGalleryQuerySchema = z.object({
  section: sectionEnum.optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(50),
})

const createGalleryImageSchema = z.object({
  section: sectionEnum,
  url: z.string().url(),
  alt: z.string().optional().default(""),
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

// Section slot limits
const SECTION_SLOT_LIMITS: Record<GallerySection, number> = {
  hero: 5,
  gallery_preview: 4,
  gallery_full: 12,
  about: 1,
  services: 3,
  contact: 1,
  signin: 1,
  signup: 1,
}

// GET /api/v1/gallery - List gallery images
export async function GET(req: NextRequest) {
  try {
    const db = getDb()
    const { searchParams } = new URL(req.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    const validation = validateRequest(getGalleryQuerySchema, queryParams)
    if (!validation.success) {
      return validationErrorResponse(validation.error)
    }

    const { section, page, limit } = validation.data
    const pageNum = page ?? 1
    const limitNum = limit ?? 50
    const skip = (pageNum - 1) * limitNum

    // Build where clause
    const whereClause = section ? eq(galleryImages.section, section) : undefined

    // Build query
    let query = db.select().from(galleryImages).orderBy(asc(galleryImages.slotIndex))
    if (whereClause) {
      query = db.select().from(galleryImages).where(whereClause).orderBy(asc(galleryImages.slotIndex))
    }

    // Get images with pagination
    const allImages = await query
    const total = allImages.length

    const images = allImages.slice(skip, skip + limitNum)

    // Group by section if no section filter
    let groupedImages: Record<string, typeof images> | undefined
    if (!section) {
      groupedImages = {}
      for (const img of allImages) {
        if (!groupedImages[img.section]) {
          groupedImages[img.section] = []
        }
        groupedImages[img.section].push(img)
      }
    }

    return NextResponse.json(
      {
        images,
        grouped: groupedImages,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          pages: total > 0 ? Math.ceil(total / limitNum) : 0,
        },
        sectionLimits: SECTION_SLOT_LIMITS,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("GET /api/v1/gallery error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}

// POST /api/v1/gallery - Create new gallery image
export async function POST(req: NextRequest) {
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

    const validation = validateRequest(createGalleryImageSchema, body)
    if (!validation.success) {
      return validationErrorResponse(validation.error)
    }

    const { section, url, alt, slotIndex } = validation.data

    // Check section slot limit
    const limit = SECTION_SLOT_LIMITS[section as GallerySection]
    const existingCount = await db
      .select({ count: count() })
      .from(galleryImages)
      .where(eq(galleryImages.section, section))
      .then((res: { count: number }[]) => res[0].count)

    if (existingCount >= limit) {
      return NextResponse.json(
        { error: `Section "${section}" is full. Maximum ${limit} images allowed.` },
        { status: 400 }
      )
    }

    // Determine slot index - use provided or find next available
    let finalSlotIndex = slotIndex
    if (finalSlotIndex === undefined) {
      // Find the next available slot
      const existingSlots = await db
        .select({ slotIndex: galleryImages.slotIndex })
        .from(galleryImages)
        .where(eq(galleryImages.section, section))
        .orderBy(asc(galleryImages.slotIndex))

      // Find first gap or use next slot
      let nextSlot = 0
      for (const slot of existingSlots) {
        if (slot.slotIndex === nextSlot) {
          nextSlot++
        } else {
          break
        }
      }
      finalSlotIndex = nextSlot
    } else {
      // Check if slot is already taken
      const existingAtSlot = await db
        .select()
        .from(galleryImages)
        .where(and(eq(galleryImages.section, section), eq(galleryImages.slotIndex, finalSlotIndex)))
        .limit(1)

      if (existingAtSlot.length > 0) {
        return NextResponse.json(
          { error: `Slot ${finalSlotIndex} in section "${section}" is already occupied.` },
          { status: 400 }
        )
      }
    }

    // Generate id before insert so we can re-select after
    // (.returning() is not supported by the D1 HTTP proxy)
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await db
      .insert(galleryImages)
      .values({
        id,
        section,
        url,
        alt: alt || "",
        slotIndex: finalSlotIndex,
        createdAt: now,
        updatedAt: now,
      })

    // Re-select the created row (D1 HTTP proxy doesn't support RETURNING)
    const [newImage] = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.id, id))
      .limit(1)

    return NextResponse.json({ image: newImage }, { status: 201 })
  } catch (error: unknown) {
    console.error("POST /api/v1/gallery error:", error)
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 })
  }
}
