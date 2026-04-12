"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Container } from "./Container"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFCFB]/80 backdrop-blur-md border-b border-[#E2E0D9]">
      <Container>
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="font-playfair text-2xl md:text-3xl font-bold tracking-tight text-[#1A2421]">
            Botanical
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-300 ${
                  pathname === link.href 
                    ? "text-[#5B7065] font-medium" 
                    : "text-[#1A2421]/70 hover:text-[#1A2421]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link 
              href="/#booking"
              className="px-6 py-2.5 rounded-full bg-[#3E4D45] text-white text-sm font-medium tracking-wide hover:bg-[#BD9354] transition-colors duration-300"
            >
              Book Appointment
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-[#1A2421]"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#F9F8F4] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-[#E2E0D9]">
               <span className="font-playfair text-2xl font-bold text-[#1A2421]">Botanical</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#1A2421]" aria-label="Close Menu">
                 <X className="w-6 h-6 stroke-[1.5]" />
               </button>
            </div>
            
            <nav className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-2xl font-playfair transition-colors ${
                    pathname === link.href ? "text-[#5B7065]" : "text-[#1A2421]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-[#E2E0D9]">
                 <Link 
                   href="/#booking"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="inline-block px-8 py-4 rounded-full bg-[#3E4D45] text-white text-lg font-medium hover:bg-[#BD9354] transition-colors w-full text-center"
                 >
                   Book Appointment
                 </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
