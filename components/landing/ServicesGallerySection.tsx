"use client"

import { Gallery4 } from "@/components/ui/gallery4"

const servicesData = [
  {
    id: "natural-hair",
    title: "Natural Hair Care",
    description:
      "Expert care for your natural texture. From wash & go to protective styling, we enhance your curls with botanical treatments.",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
  },
  {
    id: "locs",
    title: "Locs & Retwist",
    description:
      "Professional loc maintenance and styling. Starter locs, retwists, and creative loc styles that express your personality.",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=600&fit=crop",
  },
  {
    id: "color",
    title: "Color & Chemical",
    description:
      "Vibrant color transformations and smoothing treatments. Balayage, highlights, and keratin treatments using premium products.",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=800&h=600&fit=crop",
  },
  {
    id: "styling",
    title: "Specialty Styling",
    description:
      "Updos, silk presses, and special occasion styles. From weddings to date nights, we create looks that turn heads.",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=600&fit=crop",
  },
  {
    id: "treatments",
    title: "Deep Treatments",
    description:
      "Restorative treatments for damaged hair. Steam treatments, protein masks, and custom hydration solutions.",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&h=600&fit=crop",
  },
]

export function ServicesGallerySection() {
  return (
    <section className="py-20 bg-warm-50">
      <Gallery4
        title="Our Services"
        description="Discover our range of premium hair care services designed to bring out your natural beauty. Each treatment is tailored to your unique hair journey."
        items={servicesData}
      />
    </section>
  )
}
