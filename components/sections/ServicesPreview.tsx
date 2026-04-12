"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"
import { ArrowRight, Leaf, Sparkles, Droplets } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Botanical Coloring",
    description: "Ammonia-free, plant-based color that nourishes while it transforms.",
    icon: Droplets,
    price: "From $120",
  },
  {
    title: "Organic Restructure",
    description: "Deep conditioning and architectural cuts to restore natural flow.",
    icon: Leaf,
    price: "From $85",
  },
  {
    title: "Mindful Care",
    description: "Scalp massage and aromatherapy combined with holistic styling.",
    icon: Sparkles,
    price: "From $65",
  }
]

import type { Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 bg-[#FFFFFF]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <h2 className="font-playfair text-4xl md:text-5xl text-[#1A2421] mb-4">
              Our <span className="italic text-[#5B7065]">Offerings</span>
            </h2>
            <p className="font-source text-[#1A2421]/70 text-lg">
              Curated experiences utilizing the purest ingredients to enhance your natural beauty.
            </p>
          </div>
          <Link href="/services" className="inline-flex items-center gap-2 text-[#5B7065] hover:text-[#BD9354] transition-colors font-medium text-sm tracking-wide uppercase">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12"
        >
          {services.map((service, idx) => {
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className={`group bg-[#FDFCFB] rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-500 border border-[#E2E0D9]/50`}
              >
                <div className="w-12 h-12 rounded-full bg-[#5B7065]/10 flex items-center justify-center mb-6 text-[#5B7065] group-hover:bg-[#5B7065] group-hover:text-white transition-colors duration-500">
                  <service.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-playfair text-2xl text-[#1A2421] mb-3">{service.title}</h3>
                <p className="font-source text-[#1A2421]/70 mb-6 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between border-t border-[#E2E0D9] pt-4 mt-auto">
                   <span className="text-sm font-medium text-[#1A2421]">{service.price}</span>
                   <Link href="/services" className="w-8 h-8 rounded-full border border-[#5B7065] flex items-center justify-center text-[#5B7065] group-hover:bg-[#5B7065] group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
