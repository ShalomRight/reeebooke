"use client"

import React, { useEffect, useRef, useState } from "react"
import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Mock gallery data with placeholder images
const galleryImages = [
  { id: 1, category: "Styles", aspect: "portrait", title: "Silk Press Transformation" },
  { id: 2, category: "Color", aspect: "landscape", title: "Balayage Highlights" },
  { id: 3, category: "Locs", aspect: "portrait", title: "Fresh Retwist" },
  { id: 4, category: "Natural", aspect: "square", title: "Wash & Go Curls" },
  { id: 5, category: "Styles", aspect: "landscape", title: "Elegant Updo" },
  { id: 6, category: "Color", aspect: "portrait", title: "Vibrant Red Dye" },
  { id: 7, category: "Locs", aspect: "square", title: "Starter Locs" },
  { id: 8, category: "Natural", aspect: "portrait", title: "Rod Set Curls" },
  { id: 9, category: "Styles", aspect: "landscape", title: "Bridal Styling" },
  { id: 10, category: "Color", aspect: "portrait", title: "Ombre Blend" },
  { id: 11, category: "Locs", aspect: "landscape", title: "Loc Maintenance" },
  { id: 12, category: "Natural", aspect: "square", title: "Twist Out" },
]

const categories = ["All", "Styles", "Color", "Locs", "Natural"]

// Gallery Item Component
function GalleryItem({
  image,
  index,
  onClick,
}: {
  image: (typeof galleryImages)[0]
  index: number
  onClick: () => void
}) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemRef.current) return

    const aspectClasses: Record<string, string> = {
      portrait: "row-span-2",
      landscape: "col-span-1 md:col-span-2",
      square: "",
    }

    gsap.fromTo(
      itemRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: (index % 4) * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === itemRef.current) t.kill()
      })
    }
  }, [index])

  const aspectClasses: Record<string, string> = {
    portrait: "row-span-2 aspect-[3/4]",
    landscape: "md:col-span-2 aspect-[16/9]",
    square: "aspect-square",
  }

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      className={`relative overflow-hidden rounded cursor-pointer group ${aspectClasses[image.aspect]}`}
    >
      {/* Placeholder with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-100 via-terracotta-50 to-warm-100">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-terracotta-800/5 flex items-center justify-center mb-3">
            <span className="font-serif text-2xl italic text-terracotta-400">
              {image.id}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-terracotta-500/60">
            {image.category}
          </p>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/40 transition-all duration-500 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-terracotta-800" />
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-warm-900/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-white font-serif text-sm">{image.title}</p>
        <p className="text-white/60 text-[10px] uppercase tracking-wider mt-1">
          {image.category}
        </p>
      </div>
    </div>
  )
}

// Lightbox Component
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: typeof galleryImages
  currentIndex: number
  onClose: () => void
  onNavigate: (direction: "prev" | "next") => void
}) {
  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-warm-900/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate("prev")
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate("next")
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          disabled={currentIndex === images.length - 1}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl max-h-[80vh] w-full mx-4 aspect-video bg-gradient-to-br from-terracotta-100 to-terracotta-200 rounded-lg flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <span className="font-serif text-6xl italic text-terracotta-400">
              {currentImage.id}
            </span>
            <p className="text-terracotta-600 mt-4 font-serif">{currentImage.title}</p>
          </div>
        </motion.div>

        {/* Info */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
            {currentIndex + 1} / {images.length}
          </p>
          <p className="text-white font-serif text-lg">{currentImage.title}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      }
    )
  }, [])

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  const handleNavigate = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return
    if (direction === "prev" && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
    } else if (direction === "next" && lightboxIndex < filteredImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
    }
  }

  return (
    <main className="min-h-screen bg-warm-50 flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-12 md:pt-20 pb-8">
        <Container>
          <div ref={headerRef} className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
              Our Work
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium text-warm-900 tracking-tight mb-6">
              Client <span className="italic text-terracotta-600">Gallery</span>
            </h1>
            <p className="text-sm text-warm-600 leading-relaxed max-w-lg">
              Explore our portfolio of transformations. Each image represents
              the artistry and care we bring to every client who sits in our chair.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-background/80 backdrop-blur-md border-y border-warm-200 py-4">
        <Container>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-wider whitespace-nowrap rounded transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-terracotta-800 text-white"
                    : "text-terracotta-600 hover:bg-terracotta-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="flex-1 py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {filteredImages.map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sm text-warm-500">
                No images in this category yet.
              </p>
            </div>
          )}

          {/* Results count */}
          <div className="mt-12 pt-8 border-t border-warm-200">
            <p className="text-[11px] uppercase tracking-widest text-terracotta-500 text-center">
              Showing {filteredImages.length} of {galleryImages.length} images
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="glass-card rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-warm-900 mb-4">
              Be our next <span className="italic">transformation</span>
            </h2>
            <p className="text-sm text-warm-600 mb-8 max-w-md mx-auto">
              Ready to add your story to our gallery? Book your appointment and
              let us create something beautiful together.
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-2 bg-terracotta-800 hover:bg-terracotta-700 text-white text-[11px] uppercase tracking-widest px-8 py-4 rounded transition-colors"
            >
              Book Now
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </main>
  )
}
