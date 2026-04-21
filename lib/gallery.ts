/**
 * lib/gallery.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared helpers for consuming gallery images from the D1 database.
 *
 * Usage pattern across all sections:
 *   const { data } = useGallerySection("hero")
 *   const images = getSectionImages("hero", data?.images, HERO_FALLBACKS)
 *
 * - If D1 has images for that section, they are sorted by slotIndex and used.
 * - If D1 has fewer images than needed, fallbacks fill the remaining slots.
 * - If D1 has no images at all, all fallbacks are returned.
 */

import type { GalleryImage, GallerySection } from "@/lib/swr/hooks/gallery"

export interface SectionImage {
  url: string
  alt: string
}

/**
 * Merges D1 images with fallbacks.
 * D1 images fill slot positions 0..N; any unfilled slots get the fallback at
 * that index. If there are more D1 images than fallbacks, extras are appended.
 */
export function getSectionImages(
  section: GallerySection,
  dbImages: GalleryImage[] | undefined,
  fallbacks: SectionImage[]
): SectionImage[] {
  if (!dbImages || dbImages.length === 0) return fallbacks

  // Sort by slotIndex
  const sorted = [...dbImages].sort((a, b) => a.slotIndex - b.slotIndex)

  const count = Math.max(sorted.length, fallbacks.length)
  const result: SectionImage[] = []

  for (let i = 0; i < count; i++) {
    const dbImg = sorted[i]
    const fallback = fallbacks[i]
    if (dbImg) {
      result.push({ url: dbImg.url, alt: dbImg.alt || fallback?.alt || "" })
    } else if (fallback) {
      result.push(fallback)
    }
  }

  return result
}

/**
 * Returns the first image from D1 for a section, or the fallback URL.
 * Used for single-image sections (about, contact, signin, signup).
 */
export function getSingleSectionImage(
  dbImages: GalleryImage[] | undefined,
  fallbackUrl: string,
  fallbackAlt = ""
): SectionImage {
  if (!dbImages || dbImages.length === 0) return { url: fallbackUrl, alt: fallbackAlt }
  const sorted = [...dbImages].sort((a, b) => a.slotIndex - b.slotIndex)
  return { url: sorted[0].url, alt: sorted[0].alt || fallbackAlt }
}

// ─── Fallback images per section ─────────────────────────────────────────────
// These are the current hardcoded Unsplash images — they stay as fallbacks.

export const HERO_FALLBACKS: SectionImage[] = [
  { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop", alt: "Hair Styling" },
  { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop", alt: "Natural Hair" },
  { url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=350&fit=crop", alt: "Locs Style" },
  { url: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=300&fit=crop", alt: "Color Treatment" },
  { url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=450&fit=crop", alt: "Silk Press" },
]

export const GALLERY_PREVIEW_FALLBACKS: SectionImage[] = [
  { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop", alt: "Natural Hair Styling" },
  { url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop", alt: "Silk Press Style" },
  { url: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=400&fit=crop", alt: "Color Treatment" },
  { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop", alt: "Salon Atmosphere" },
]

export const GALLERY_FULL_FALLBACKS: SectionImage[] = [
  { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop", alt: "Natural Hair Styling" },
  { url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=600&fit=crop", alt: "Silk Press Style" },
  { url: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=400&fit=crop", alt: "Color Treatment" },
  { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop", alt: "Salon Atmosphere" },
  { url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop", alt: "Locs Style" },
  { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop", alt: "Hair Styling 2" },
  { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop", alt: "Bridal Styling" },
  { url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=400&fit=crop", alt: "Ombre Blend" },
  { url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=600&fit=crop", alt: "Loc Maintenance" },
  { url: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=400&fit=crop", alt: "Twist Out" },
  { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=600&fit=crop", alt: "Rod Set Curls" },
  { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop", alt: "Wash and Go" },
]

export const SERVICES_FALLBACKS: SectionImage[] = [
  { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop", alt: "Natural Hair Care" },
  { url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop", alt: "Locs and Retwist" },
  { url: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&h=400&fit=crop", alt: "Color and Chemical" },
]

export const ABOUT_FALLBACK: SectionImage = {
  url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop",
  alt: "Salon Interior",
}

export const CONTACT_FALLBACK: SectionImage = {
  url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1200&fit=crop",
  alt: "Natural hair care",
}

export const SIGNIN_FALLBACK: SectionImage = {
  url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1200&fit=crop",
  alt: "Abi's Hair Creation",
}

export const SIGNUP_FALLBACK: SectionImage = {
  url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=1200&fit=crop",
  alt: "Silk press hair styling",
}
