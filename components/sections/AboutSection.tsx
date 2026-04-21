"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import { useGallerySection } from "@/lib/swr/hooks/gallery"
import { getSingleSectionImage, ABOUT_FALLBACK } from "@/lib/gallery"

export function AboutSection() {
  const { data } = useGallerySection("about")
  const image = getSingleSectionImage(data?.images, ABOUT_FALLBACK.url, ABOUT_FALLBACK.alt)

  return (
    <section className="py-20 md:py-28 bg-warm-50 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-4/5 rounded-t-full rounded-b-3xl overflow-hidden shadow-xl shadow-warm-900/10">
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
                width="800"
                height="1000"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating detail box */}
             <div className="absolute -bottom-8 -right-8 bg-white shadow-lg border border-warm-100 p-6 rounded-2xl max-w-[200px] hidden md:block">
                 <p className="font-serif text-xl text-warm-900 mb-1">Established</p>
                 <p className="text-warm-600 font-medium text-sm">Since 2018</p>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
              About Us
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-warm-900 leading-tight">
               Meet <span className="italic text-terracotta-600">Abi</span>
            </h2>
            <div className="space-y-4 text-warm-600 leading-relaxed">
               <p>
                 Abi's Hair Creation is the realization of Abi's profound passion for natural hair. Hailing from Guyana, Abi brings over 10 years of international experience specializing in a diverse range of hair types and textures. Her deep expertise in natural hair care and protective styling has made her a sought-after stylist for those looking to embrace their natural beauty.
               </p>
               <p>
                 Beyond the salon chair, Abi has poured her extensive knowledge and experience into developing her own exclusive line of natural hair products. These products are meticulously designed to nourish, protect, and celebrate your hair's unique texture, ensuring your hair stays vibrant and healthy long after your visit.
               </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
