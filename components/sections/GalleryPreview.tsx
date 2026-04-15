"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import Link from "next/link"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop",
    alt: "Natural Hair Styling",
    wide: true,
  },
  {
    src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
    alt: "Silk Press Style",
    wide: false,
  },
  {
    src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=400&fit=crop",
    alt: "Color Treatment",
    wide: false,
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop",
    alt: "Salon Atmosphere",
    wide: true,
  },
]

export function GalleryPreview() {
  return (
    <section className="py-20 md:py-28 bg-warm-50">
      <Container>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
                Our Work
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-warm-900">
                 Visual <span className="italic text-terracotta-600">Diary</span>
              </h2>
            </div>
            <Link href="/gallery" className="text-terracotta-600 uppercase tracking-wider text-[11px] font-medium hover:text-terracotta-800 transition-colors">
               Explore Gallery →
            </Link>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((img, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                 className={`relative w-full overflow-hidden group cursor-pointer ${
                   img.wide ? "md:col-span-2 aspect-[16/9]" : "aspect-square"
                 }`}
               >
                 <img
                   src={img.src}
                   alt={img.alt}
                   loading="lazy"
                   width={img.wide ? 800 : 400}
                   height={img.wide ? 450 : 400}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/20 transition-colors duration-500" />
               </motion.div>
            ))}
         </div>
      </Container>
    </section>
  )
}
