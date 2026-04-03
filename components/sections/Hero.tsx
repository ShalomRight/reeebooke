"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F9F8F4] pt-24 pb-32 lg:pt-32 lg:pb-48">
      <Container className="relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-6"
        >
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#2D3A31] leading-[1.1]">
            Cultivating <span className="italic font-light text-[#8C9A84]">Beauty</span> in <br className="hidden md:block" /> Every Detail
          </h1>
          <p className="font-source text-lg md:text-xl text-[#2D3A31]/70 max-w-2xl mx-auto leading-relaxed">
            A sanctuary for mindful care. Experience botanical treatments designed to restore, refresh, and ground your spirit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex gap-4"
        >
          <Link
            href="#booking"
            className="px-8 py-4 rounded-full bg-[#2D3A31] text-white text-sm font-medium tracking-wide uppercase hover:bg-[#C27B66] hover:-translate-y-1 transition-all duration-300 shadow-md"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 rounded-full border border-[#8C9A84] text-[#8C9A84] text-sm font-medium tracking-wide uppercase hover:bg-[#8C9A84]/10 transition-all duration-300"
          >
            Explore Services
          </Link>
        </motion.div>
        
      </Container>
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#8C9A84]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-[#DCCFC2]/30 rounded-full blur-3xl" />
    </section>
  )
}
