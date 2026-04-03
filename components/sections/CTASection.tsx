"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-[#2D3A31] text-white overflow-hidden relative">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-8"
        >
          <h2 className="font-playfair text-4xl md:text-6xl text-[#F9F8F4] leading-tight">
            Ready for your <span className="italic text-[#8C9A84]">renewal?</span>
          </h2>
          <p className="font-source text-[#DCCFC2] text-lg md:text-xl">
            Book your visit today and let us guide you back to your natural state of balance and beauty.
          </p>
          <div className="pt-4">
             <Link 
               href="#booking"
               className="inline-block px-10 py-5 rounded-full bg-[#8C9A84] text-[#F9F8F4] font-medium uppercase tracking-widest hover:bg-[#C27B66] hover:-translate-y-1 transition-all duration-500 shadow-xl"
             >
               Book Your Visit
             </Link>
          </div>
        </motion.div>
      </Container>
      
      {/* Background soft lighting effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8C9A84]/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}
