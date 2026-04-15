"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import { ArrowRight, Leaf, Sparkles, Droplets } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Natural Hair Care",
    description: "Expert care for your natural texture. From wash & go to protective styling, we enhance your curls with botanical treatments.",
    icon: Droplets,
    price: "From $90",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
  },
  {
    title: "Locs & Retwist",
    description: "Professional loc maintenance and styling. Starter locs, retwists, and creative loc styles that express your personality.",
    icon: Leaf,
    price: "From $85",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop",
  },
  {
    title: "Color & Chemical",
    description: "Vibrant color transformations and smoothing treatments. Balayage, highlights, and keratin treatments using premium products.",
    icon: Sparkles,
    price: "From $120",
    image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&h=400&fit=crop",
  }
]

export function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 bg-warm-50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
              What We Offer
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-warm-900 mb-4">
              Our <span className="italic text-terracotta-600">Services</span>
            </h2>
            <p className="text-sm text-warm-600">
              Curated experiences utilizing the purest ingredients to enhance your natural beauty.
            </p>
          </div>
          <Link href="/services" className="inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-800 transition-colors font-medium text-[11px] uppercase tracking-wider">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group glass-card rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-900/20 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="w-10 h-10 rounded bg-terracotta-100 flex items-center justify-center mb-4 text-terracotta-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-warm-900 mb-3">{service.title}</h3>
                  <p className="text-xs text-warm-600 leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                    <span className="text-sm font-medium text-warm-800">{service.price}</span>
                    <Link href="/services" className="w-8 h-8 rounded bg-terracotta-100 flex items-center justify-center text-terracotta-700 hover:bg-terracotta-800 hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
