"use client"

import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import { ACCOUNTS_SERVICES, type Service } from "@/lib/constants/services"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Droplets, Leaf } from "lucide-react"

export default function ServicesPage() {
  const categories = ["Natural Hair", "Locs", "Color & Chemical"] as const;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Natural Hair": return <Droplets className="w-5 h-5 text-[#8C9A84]" />;
      case "Locs": return <Leaf className="w-5 h-5 text-[#8C9A84]" />;
      case "Color & Chemical": return <Sparkles className="w-5 h-5 text-[#8C9A84]" />;
      default: return null;
    }
  }

  return (
    <main className="min-h-screen bg-[#FDF2F8]/30 flex flex-col">
      <Navbar />
      <div className="flex-1 py-24 md:py-32">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mb-16"
          >
            <h1 className="font-playfair text-5xl md:text-7xl text-[#2D3A31] mb-6">
              Our <span className="italic text-[#8C9A84]">Botanical</span> Directory
            </h1>
            <p className="font-source text-lg text-[#2D3A31]/70 leading-relaxed">
              Explore our curated selection of professional hair care services. 
              At Abby Hair Studio, we specialize in the art of natural texture, 
              loc maintenance, and luxury color transformations.
            </p>
          </motion.div>
          
          <div className="space-y-24">
            {categories.map((category) => (
              <section key={category} id={category.toLowerCase().replace(/ /g, "-")}>
                <div className="flex items-center gap-3 mb-10 border-b border-[#E6E2DA] pb-4">
                  {getCategoryIcon(category)}
                  <h2 className="font-playfair text-3xl md:text-4xl text-[#2D3A31] uppercase tracking-wider font-medium">
                    {category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ACCOUNTS_SERVICES.filter(s => s.category === category).map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full border-[#E6E2DA]/50 bg-white/40 backdrop-blur-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 group overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start gap-4">
                            <CardTitle className="font-playfair text-xl text-[#2D3A31] group-hover:text-[#8C9A84] transition-colors leading-tight">
                              {service.name}
                            </CardTitle>
                            {service.isUpgrade && (
                              <Badge variant="outline" className="bg-[#8C9A84]/10 text-[#8C9A84] border-[#8C9A84]/20 font-source text-[10px] uppercase tracking-widest">
                                UPGRADE
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="font-source text-sm text-[#2D3A31]/60 line-clamp-2 mt-2">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-baseline gap-1">
                            <span className="font-playfair text-lg font-semibold text-[#8C9A84]">
                              {service.priceDisplay}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  )
}
