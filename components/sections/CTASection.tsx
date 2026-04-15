"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-warm-900 text-white overflow-hidden relative">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-8"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">
            Ready for your <span className="italic text-terracotta-300">transformation?</span>
          </h2>
          <p className="text-warm-300 text-sm md:text-base">
            Book your session today and let us guide you toward the healthy, vibrant hair you deserve.
          </p>
          <div className="pt-4">
             <Link 
               href="#booking"
               className="inline-block px-10 py-5 rounded bg-terracotta-600 text-white font-medium uppercase tracking-widest hover:bg-terracotta-500 hover:-translate-y-1 transition-all duration-500 shadow-xl"
             >
               Book Your Appointment
             </Link>
          </div>
        </motion.div>
      </Container>
      
      {/* Background soft lighting effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terracotta-800/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}
