"use client"

import { motion, LayoutGroup, useReducedMotion } from "framer-motion"
import { Container } from "../layout/Container"
import Link from "next/link"
import { TextRotate } from "@/components/ui/text-rotate"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    title: "Hair Styling",
  },
  {
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
    title: "Natural Hair",
  },
  {
    url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=350&fit=crop",
    title: "Locs Style",
  },
  {
    url: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=300&fit=crop",
    title: "Color Treatment",
  },
  {
    url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=450&fit=crop",
    title: "Silk Press",
  },
]

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex flex-col items-center justify-center bg-warm-50">
      {/* Floating Background Images - hidden for reduced motion users */}
      <Floating sensitivity={prefersReducedMotion ? 0 : -0.5} className={`h-full ${prefersReducedMotion ? "opacity-30" : ""}`}>
        <FloatingElement depth={0.5} className="top-[12%] left-[3%] md:top-[20%] md:left-[5%]">
          <motion.img
            src={heroImages[0].url}
            alt={heroImages[0].title}
            className="w-24 h-16 sm:w-32 sm:h-24 md:w-36 md:h-28 object-cover hover:scale-105 duration-500 cursor-pointer transition-transform -rotate-3 shadow-xl rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[5%] left-[8%] md:top-[10%] md:left-[12%]">
          <motion.img
            src={heroImages[1].url}
            alt={heroImages[1].title}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover hover:scale-105 duration-500 cursor-pointer transition-transform -rotate-12 shadow-xl rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[75%] left-[5%] md:top-[70%] md:left-[8%]">
          <motion.img
            src={heroImages[2].url}
            alt={heroImages[2].title}
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-cover -rotate-6 hover:scale-105 duration-500 cursor-pointer transition-transform shadow-xl rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
        </FloatingElement>

        <FloatingElement depth={2} className="top-[8%] left-[82%] md:top-[5%] md:left-[78%]">
          <motion.img
            src={heroImages[3].url}
            alt={heroImages[3].title}
            className="w-32 h-28 sm:w-40 sm:h-36 md:w-48 md:h-44 object-cover hover:scale-105 duration-500 cursor-pointer transition-transform shadow-xl rotate-6 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[72%] left-[78%] md:top-[65%] md:left-[75%]">
          <motion.img
            src={heroImages[4].url}
            alt={heroImages[4].title}
            className="w-40 h-48 sm:w-52 sm:h-64 md:w-60 md:h-72 object-cover hover:scale-105 duration-500 cursor-pointer transition-transform shadow-xl rotate-12 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </FloatingElement>
      </Floating>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center w-[280px] sm:w-[360px] md:w-[600px] lg:w-[800px] z-10 pointer-events-auto px-4">
        <motion.p
          className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-6"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Abby Hair Studio
        </motion.p>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-center text-warm-900 tracking-tight leading-[1.1] mb-6"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <span>Experience </span>
          <LayoutGroup>
            <motion.span layout className="flex flex-wrap justify-center whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                <span className="italic">authentic</span>{" "}
              </motion.span>
              <TextRotate
                texts={[
                  "beauty",
                  "luxury",
                  "transformation",
                  "pampering",
                  "style",
                  "care",
                  "confidence",
                  "elegance",
                ]}
                mainClassName="overflow-hidden text-terracotta-600"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-center text-warm-600 pt-4 max-w-lg"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          Premium hair care services for natural hair, locs, and color transformations.
          Book your appointment today.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-12 gap-4 sm:gap-4">
          <motion.a
            href="#booking"
            className="text-xs sm:text-sm font-medium tracking-tight bg-terracotta-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded shadow-lg hover:shadow-xl transition-all hover:scale-105"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          >
            Book Appointment <span className="ml-1">→</span>
          </motion.a>
          <motion.a
            href="/services"
            className="text-xs sm:text-sm font-medium tracking-tight text-terracotta-800 border border-terracotta-800 px-6 py-3 sm:px-8 sm:py-4 rounded hover:bg-terracotta-50 transition-all"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          >
            View Services
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-terracotta-400 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-terracotta-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
