"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import Link from "next/link"

export function GalleryPreview() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFCFB]">
      <Container>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl text-[#1A2421]">
               Visual <span className="italic text-[#5B7065]">Diary</span>
            </h2>
            <Link href="/gallery" className="text-[#5B7065] uppercase tracking-wide text-sm font-medium hover:text-[#BD9354] transition-colors">
               Explore Gallery →
            </Link>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i, idx) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                 className={`relative w-full overflow-hidden bg-[#C8B9A6]/20 group ${
                   idx === 0 || idx === 3 ? "md:col-span-2 aspect-[16/9]" : "aspect-square"
                 }`}
               >
                 <div className="absolute inset-0 flex items-center justify-center text-[#1A2421]/20 font-playfair italic transition-transform duration-1000 group-hover:scale-105">
                    [Image {i}]
                 </div>
               </motion.div>
            ))}
         </div>
      </Container>
    </section>
  )
}
