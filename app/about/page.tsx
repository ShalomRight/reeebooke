"use client"

import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import { AboutSection } from "@/components/sections/AboutSection"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-warm-50 flex flex-col">
      <Navbar />
      <div className="flex-1 py-12 md:py-20">
         {/* Reusing About Section to stub the page */}
         <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
