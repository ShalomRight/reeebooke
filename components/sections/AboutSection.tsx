"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F9F8F4] overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            {/* The Arch Shape Image placeholder */}
            <div className="relative w-full aspect-4/5 rounded-t-full rounded-b-3xl overflow-hidden shadow-xl shadow-[#2D3A31]/5 bg-[#E6E2DA]">
              <div className="absolute inset-0 flex items-center justify-center text-[#2D3A31]/30 font-playfair italic text-xl">
                 [Salon Interior Image]
              </div>
            </div>
            
            {/* Floating detail box */}
             <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-lg border border-[#E6E2DA] max-w-[200px] hidden md:block">
                 <p className="font-playfair text-xl text-[#2D3A31] mb-1">Established</p>
                 <p className="font-source text-[#8C9A84] font-medium">Since 2018</p>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-[#2D3A31] leading-tight">
               Our <span className="italic text-[#8C9A84]">Philosophy</span>
            </h2>
            <div className="space-y-4 font-source text-[#2D3A31]/70 leading-relaxed text-lg">
               <p>
                 We believe that beauty is not manufactured, but nurtured. Our space was designed as a retreat from the digital noise—a place where time slows down and your natural state is celebrated.
               </p>
               <p>
                 Every treatment utilizes organic, sustainably sourced ingredients that honor both your health and the environment. Here, you are not just a client; you are part of a mindful ecosystem.
               </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
