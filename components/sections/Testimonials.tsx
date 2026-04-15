"use client"

import { motion } from "framer-motion"
import { Container } from "../layout/Container"

const quotes = [
  {
    text: "Finally found a stylist who understands my natural hair. My silk press lasts for weeks and my curls are healthier than ever.",
    author: "Keisha B.",
  },
  {
    text: "Been coming here for my locs for 3 years now. The retwists are always neat, and they actually listen to what I want.",
    author: "Monica R.",
  },
  {
    text: "Took my daughter here for her first protective style. The staff was patient, professional, and made her feel comfortable.",
    author: "Darnell J.",
  }
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-warm-900 mb-4">
             Client <span className="italic text-terracotta-600">Notes</span>
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
               className="bg-warm-50 border border-warm-100 p-8 md:p-10 rounded-lg flex flex-col h-full"
             >
                <div className="text-4xl text-terracotta-300 font-serif leading-none mb-4">"</div>
                <p className="text-warm-700 text-sm leading-relaxed flex-1">
                   {quote.text}
                </p>
                <p className="mt-8 font-serif font-semibold text-terracotta-600 tracking-wider text-sm">— {quote.author}</p>
             </motion.div>
           ))}
        </div>
      </Container>
    </section>
  )
}
