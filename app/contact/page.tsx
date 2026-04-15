"use client"

import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-warm-50 flex flex-col">
      <Navbar />
      <div className="flex-1 py-24 md:py-32">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="font-serif text-5xl md:text-7xl text-warm-900 mb-6">
              Get in <span className="italic text-terracotta-600">Touch</span>
            </h1>
            <p className="text-lg text-warm-600">
              Reach out to us for general inquiries.
            </p>
          </motion.div>
          
          <div className="mt-20 text-center font-serif italic text-warm-400 text-xl border border-warm-200 p-24 rounded-3xl bg-white shadow-sm">
             [ Contact Form Placeholder ]
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  )
}
