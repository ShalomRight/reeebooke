"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"

const quotes = [
  {
    text: "The most serene and grounded experience I've ever had at a salon. The team works quietly with such immense skill.",
    author: "Elena M.",
  },
  {
    text: "They restored the health of my hair using only natural processing. I leave feeling completely refreshed and beautiful.",
    author: "Sarah J.",
  },
  {
    text: "A true sanctuary in the middle of the city. Their attention to detail and calming atmosphere makes every appointment special.",
    author: "Chloe T.",
  }
]

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl text-[#1A2421] mb-4">
             Client <span className="italic text-[#5B7065]">Notes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {quotes.map((quote, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
               className="bg-[#FDFCFB] p-8 md:p-10 rounded-3xl border border-[#E2E0D9]/50 flex flex-col h-full"
             >
                <div className="text-4xl text-[#C8B9A6] font-playfair leading-none mb-4">"</div>
                <p className="font-source text-[#1A2421]/80 text-lg leading-relaxed flex-1">
                   {quote.text}
                </p>
                <p className="mt-8 font-playfair font-semibold text-[#5B7065] tracking-wider">— {quote.author}</p>
             </motion.div>
           ))}
        </div>
      </Container>
    </section>
  )
}
