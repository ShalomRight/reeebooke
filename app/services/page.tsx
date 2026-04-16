"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ACCOUNTS_SERVICES, type Service } from "@/lib/constants/services"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  ChevronDown,
  ImageIcon,
  Droplets,
  Leaf,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type SortOption = "default" | "price-low" | "price-high" | "name"
type FilterCategory = "all" | "Natural Hair" | "Locs" | "Color & Chemical"

const categoryIcons: Record<string, React.ReactNode> = {
  "Natural Hair": <Droplets className="w-4 h-4" />,
  Locs: <Leaf className="w-4 h-4" />,
  "Color & Chemical": <Sparkles className="w-4 h-4" />,
}

// Image placeholder component
function ServiceImage({ service, index }: { service: Service; index: number }) {
  // Generate a consistent placeholder color based on service name
  const colors = [
    "bg-terracotta-100",
    "bg-terracotta-200",
    "bg-warm-200",
    "bg-terracotta-50",
  ]
  const bgColor = colors[index % colors.length]

  return (
    <div
      className={`relative aspect-[4/3] ${bgColor} overflow-hidden group/image`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-terracotta-800/10 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-terracotta-600" />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-terracotta-500/60 text-center leading-tight">
            {service.imagePrompt.slice(0, 40)}...
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-warm-900/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

// Service Card Component
function ServiceCard({
  service,
  index,
  onBook,
}: {
  service: Service
  index: number
  onBook: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: (index % 6) * 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === cardRef.current) t.kill()
      })
    }
  }, [index])

  return (
    <div ref={cardRef} className="group">
      <div className="glass-card overflow-hidden rounded hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <ServiceImage service={service} index={index} />

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-serif text-lg font-medium text-warm-900 leading-tight group-hover:text-terracotta-700 transition-colors">
              {service.name}
            </h3>
            {service.isUpgrade && (
              <Badge
                variant="outline"
                className="shrink-0 text-[9px] uppercase tracking-wider border-terracotta-300 text-terracotta-600 bg-terracotta-50"
              >
                Add-on
              </Badge>
            )}
          </div>

          <p className="text-xs text-warm-600 leading-relaxed mb-4 line-clamp-2">
            {service.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-warm-200">
            <span className="font-serif text-base font-medium text-terracotta-700">
              {service.priceDisplay}
            </span>
            <button 
              onClick={onBook}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-terracotta-600 hover:text-terracotta-800 transition-colors group/btn"
            >
              Book
              <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all")
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [showSortMenu, setShowSortMenu] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const handleBook = () => {
    router.push("/booking")
  }

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

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let services = [...ACCOUNTS_SERVICES]

    if (activeCategory !== "all") {
      services = services.filter((s) => s.category === activeCategory)
    }

    switch (sortBy) {
      case "price-low":
        services.sort((a, b) => a.priceMin - b.priceMin)
        break
      case "price-high":
        services.sort((a, b) => b.priceMin - a.priceMin)
        break
      case "name":
        services.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return services
  }, [activeCategory, sortBy])

  const categories: FilterCategory[] = [
    "all",
    "Natural Hair",
    "Locs",
    "Color & Chemical",
  ]

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "default", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name A-Z" },
  ]

  return (
    <main className="min-h-screen bg-warm-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-8">
        <Container>
          <div ref={headerRef} className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
              What We Offer
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium text-warm-900 tracking-tight mb-6">
              Our <span className="italic text-terracotta-600">Services</span>
            </h1>
            <p className="text-sm text-warm-600 leading-relaxed max-w-lg">
              Discover our curated selection of professional hair care services.
              From natural hair treatments to loc maintenance and color
              transformations, we bring artistry to every appointment.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter & Sort Bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-warm-50/95 backdrop-blur-md border-y border-warm-200 py-4">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-wider whitespace-nowrap rounded transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-terracotta-800 text-white"
                      : "text-terracotta-600 hover:bg-terracotta-50"
                  }`}
                >
                  {cat === "all" ? "All Services" : cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-wider text-terracotta-600 hover:text-terracotta-800 transition-colors"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                {sortOptions.find((o) => o.value === sortBy)?.label}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    showSortMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-44 glass-card rounded py-1 z-50"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value)
                        setShowSortMenu(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-xs transition-colors ${
                        sortBy === option.value
                          ? "bg-terracotta-100 text-terracotta-800"
                          : "text-terracotta-600 hover:bg-terracotta-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="flex-1 py-12">
        <Container>
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
                <ServiceCard key={`${service.name}-${index}`} service={service} index={index} onBook={handleBook} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-sm text-warm-500">
                No services found in this category.
              </p>
            </div>
          )}

          {/* Results count */}
          <div className="mt-12 pt-8 border-t border-warm-200">
            <p className="text-[11px] uppercase tracking-widest text-terracotta-500 text-center">
              Showing {filteredServices.length} of {ACCOUNTS_SERVICES.length}{" "}
              services
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="glass-card rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-warm-900 mb-4">
              Ready to <span className="italic">transform</span> your look?
            </h2>
            <p className="text-sm text-warm-600 mb-8 max-w-md mx-auto">
              Book your appointment today and experience the artistry of
              premium hair care.
            </p>
            <Button className="bg-terracotta-800 hover:bg-terracotta-700 text-white text-[11px] uppercase tracking-widest px-8 py-5 rounded">
              Book Appointment
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
