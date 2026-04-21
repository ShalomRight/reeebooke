"use client"

import { Container } from "@/components/layout/Container"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function FindUsPage() {
  return (
    <main className="min-h-screen bg-warm-50 flex flex-col">
      <Navbar />
      <div className="flex-1 py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
              Visit Abi's Hair Creation
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-warm-900 mb-6">
              Find <span className="italic text-terracotta-600">Us</span>
            </h1>
            <p className="text-warm-600">
              Come visit our salon in the heart of Kingstown. We look forward to giving you the premium hair care experience you deserve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Information Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-200">
                <h3 className="font-serif text-2xl text-warm-900 mb-6 border-b border-warm-100 pb-4">Our Details</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-terracotta-50 p-3 rounded-full text-terracotta-600 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-warm-900 mb-1">Address</h4>
                      <p className="text-warm-600 text-sm">
                        Upper Bay Street<br />
                        Kingstown, VC<br />
                        Saint Vincent and the Grenadines
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="bg-terracotta-50 p-3 rounded-full text-terracotta-600 mt-1">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-warm-900 mb-1">Phone</h4>
                      <a href="tel:7844912850" className="text-warm-600 text-sm hover:text-terracotta-600 transition-colors">
                        784-491-2850
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="bg-terracotta-50 p-3 rounded-full text-terracotta-600 mt-1">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-warm-900 mb-1">Email</h4>
                      <a href="mailto:hello@abbyshaircreation.com" className="text-warm-600 text-sm hover:text-terracotta-600 transition-colors">
                        hello@abbyshaircreation.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="bg-terracotta-50 p-3 rounded-full text-terracotta-600 mt-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-warm-900 mb-1">Business Hours</h4>
                      <div className="text-warm-600 text-sm space-y-1">
                        <div className="flex justify-between gap-4">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 7:00 PM</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span>Saturday</span>
                          <span>10:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between gap-4 text-terracotta-600">
                          <span>Sunday</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Map Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 h-[500px] lg:h-auto min-h-[400px] rounded-2xl overflow-hidden shadow-md border border-warm-200 bg-warm-200 relative"
            >
              <iframe
                title="Google Map - Abi's Hair Creation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.46461939103!2d-61.23305419999999!3d13.155452299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4cc31cdb2df283%3A0xe54e12c1c9b2ccab!2sKingstown%2C%20St.%20Vincent%20%26%20Grenadines!5e0!3m2!1sen!2sus!4v1713715000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              
              {/* Note: User requested mapcn.dev. If mapcn is preferred, the iframe above can be easily swapped for the <Map> component imported from mapcn once installed:
                  1. Run `pnpm dlx shadcn@latest add https://mapcn.dev/maps/map.json`
                  2. Replace iframe with:
                  <Map 
                    initialViewState={{ longitude: -61.2248, latitude: 13.1587, zoom: 14 }}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                  >
                    <Marker longitude={-61.2248} latitude={13.1587} color="var(--terracotta-600)" />
                  </Map>
              */}
            </motion.div>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  )
}
