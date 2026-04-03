"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import Link from "next/link"

export function GalleryPreview() {
  return (
    <section className="py-24 md:py-32 bg-[#F9F8F4]">
      <Container>
         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <h2 className="font-playfair text-4xl md:text-5xl text-[#2D3A31]">
               Visual <span className="italic text-[#8C9A84]">Diary</span>
            </h2>
            <Link href="/gallery" className="text-[#8C9A84] uppercase tracking-wide text-sm font-medium hover:text-[#C27B66] transition-colors">
               Explore Gallery →
            </Link>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                 className={`relative w-full overflow-hidden bg-[#DCCFC2]/20 group ${
                   i === 2 || i === 4 ? "aspect-3/4 md:translate-y-12" : "aspect-square"
                 } ${i === 1 || i === 3 ? "rounded-[40px]" : "rounded-t-full rounded-b-xl"}`}
               >
                 <div className="absolute inset-0 flex items-center justify-center text-[#2D3A31]/20 font-playfair italic transition-transform duration-1000 group-hover:scale-105">
                    [Image {i}]
                 </div>
               </motion.div>
            ))}
         </div>
      </Container>
    </section>
  )
}
