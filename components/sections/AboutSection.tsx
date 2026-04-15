"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import Image from "next/image"

export function AboutSection() {
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
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop"
                alt="Salon Interior"
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
               Our <span className="italic text-terracotta-600">Philosophy</span>
            </h2>
            <div className="space-y-4 text-warm-600 leading-relaxed">
               <p>
                 Abby Hair Studio has been Brooklyn's trusted destination for natural hair care since 2018. Our stylists specialize in protective styles, loc maintenance, and healthy hair transformations that work with your unique texture.
               </p>
               <p>
                 We use premium products and proven techniques to keep your hair strong and beautiful. Whether you're getting your first set of locs or maintaining your signature style, we take the time to do it right.
               </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
