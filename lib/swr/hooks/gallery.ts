"use client"

import useSWR from "swr"
import { fetcher } from "../fetcher"

export type GallerySection =
  | "hero"
  | "gallery_preview"
  | "gallery_full"
  | "about"
  | "services"
  | "contact"
  | "signin"
  | "signup"

export interface GalleryImage {
  id: string
  section: GallerySection
  slotIndex: number
  url: string
  alt: string
  createdAt: string
  updatedAt: string
}

export interface GalleryResponse {
  images: GalleryImage[]
  grouped?: Record<string, GalleryImage[]>
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
  sectionLimits: Record<GallerySection, number>
}

// Section slot limits (should match API)
export const SECTION_SLOT_LIMITS: Record<GallerySection, number> = {
  hero: 5,
  gallery_preview: 4,
  gallery_full: 12,
  about: 1,
  services: 3,
  contact: 1,
  signin: 1,
  signup: 1,
}

// Section labels for UI
export const SECTION_LABELS: Record<GallerySection, string> = {
  hero: "Hero (Homepage)",
  gallery_preview: "Visual Diary Preview",
  gallery_full: "Full Gallery Page",
  about: "About Us",
  services: "Services Preview",
  contact: "Contact Page",
  signin: "Sign In Page",
  signup: "Sign Up Page",
}

/**
 * Hook to fetch gallery images with optional section filter
 */
export function useGallery(params?: {
  section?: GallerySection
  page?: number
  limit?: number
}) {
  const queryParams = new URLSearchParams()

  if (params?.section) queryParams.append("section", params.section)
  if (params?.page) queryParams.append("page", params.page.toString())
  if (params?.limit) queryParams.append("limit", params.limit.toString())

  const url = `/api/v1/gallery?${queryParams.toString()}`

  return useSWR<GalleryResponse>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
      keepPreviousData: true,
      refreshInterval: 0,
    }
  )
}

/**
 * Hook to fetch images for a specific section
 */
export function useGallerySection(section: GallerySection) {
  return useGallery({ section })
}

/**
 * Get filled slots count for a section
 */
export function useSectionSlots(section: GallerySection) {
  const { data, error, isLoading } = useGallerySection(section)

  const limit = SECTION_SLOT_LIMITS[section]
  const filled = data?.images.length ?? 0
  const available = limit - filled
  const slots = Array.from({ length: limit }, (_, i) => {
    const image = data?.images.find((img) => img.slotIndex === i)
    return {
      index: i,
      filled: !!image,
      image: image || null,
    }
  })

  return {
    slots,
    filled,
    limit,
    available,
    isLoading,
    error,
  }
}
