"use client"

import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import { GalleryPreview } from "@/components/sections/GalleryPreview"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <div className="flex-1 py-12 md:py-20">
         {/* Reusing Gallery Preview to stub the page */}
         <GalleryPreview />
      </div>
      <Footer />
    </main>
  )
}
