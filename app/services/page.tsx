"use client"

import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <div className="flex-1 py-24 md:py-32">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="font-playfair text-5xl md:text-7xl text-[#2D3A31] mb-6">
              Our <span className="italic text-[#8C9A84]">Services</span>
            </h1>
            <p className="font-source text-lg text-[#2D3A31]/70">
              A complete directory of our botanical care treatments. Click on any service for details and booking.
            </p>
          </motion.div>
          
          <div className="mt-20 text-center font-playfair italic text-[#2D3A31]/40 text-xl">
             [ Service Grid Directory Placeholder ]
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  )
}
