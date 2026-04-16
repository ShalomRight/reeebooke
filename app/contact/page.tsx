"use client"

import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import ContactForm from "@/components/messaging/ContactForm"
import { Mail, Phone } from "lucide-react"

// Using one of the hero images
const contactImage = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1200&fit=crop"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-warm-50 flex flex-col">
      <Navbar />
      <div className="flex-1">
        {/* Split Layout - Image left, Form right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src={contactImage}
                alt="Natural hair care"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-warm-900/20 to-transparent" />
            </div>
          </motion.div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="w-full max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center lg:text-left mb-8"
              >
                <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
                  Contact Us
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-warm-900 mb-4">
                  Get in <span className="italic text-terracotta-600">Touch</span>
                </h1>
                <p className="text-sm text-warm-600 mb-6">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                {/* Contact info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-warm-500">
                  <a href="mailto:hello@abbyhairstudio.com" className="flex items-center gap-2 hover:text-terracotta-600 transition-colors">
                    <Mail className="w-4 h-4" />
                    hello@abbyhairstudio.com
                  </a>
                  <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-terracotta-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    +1 (555) 123-4567
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
