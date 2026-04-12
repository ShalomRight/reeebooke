import Link from "next/link"
import { Container } from "./Container"

export function Footer() {
  return (
    <footer className="bg-[#DCCFC2]/20 border-t border-[#E6E2DA] py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="font-playfair text-3xl font-bold text-[#2D3A31]">
              Abby Hair Studio
            </Link>
            <p className="text-sm text-[#2D3A31]/70 leading-relaxed font-source max-w-xs">
              A serene oasis for wellness, beauty, and mindful care. Take a deep breath and let us handle the rest.
            </p>
          </div>

          <div className="space-y-4 mt-2">
            <h4 className="font-playfair font-semibold text-lg text-[#2D3A31]">Navigation</h4>
            <ul className="space-y-3 text-sm text-[#2D3A31]/70 font-source">
              <li><Link href="/" className="hover:text-[#8C9A84] transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-[#8C9A84] transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-[#8C9A84] transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-[#8C9A84] transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4 mt-2">
            <h4 className="font-playfair font-semibold text-lg text-[#2D3A31]">Visit Us</h4>
            <ul className="space-y-3 text-sm text-[#2D3A31]/70 font-source">
              <li>123 Wellness Ave, Suite 100</li>
              <li>Los Angeles, CA 90028</li>
              <li>hello@botanicalsalon.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>

          <div className="space-y-4 mt-2">
            <h4 className="font-playfair font-semibold text-lg text-[#2D3A31]">Hours</h4>
            <ul className="space-y-3 text-sm text-[#2D3A31]/70 font-source">
              <li className="flex justify-between"><span>Mon - Fri</span> <span>9am - 7pm</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>10am - 5pm</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-[#E6E2DA]/50 flex flex-col md:flex-row items-center justify-between text-sm text-[#2D3A31]/50 font-source space-y-4 md:space-y-0">
           <p>© {new Date().getFullYear()} Abby Hair Studio. All rights reserved.</p>
           <div className="flex gap-6">
              <Link href="#" className="hover:text-[#8C9A84] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#8C9A84] transition-colors">Terms of Service</Link>
           </div>
        </div>
      </Container>
    </footer>
  )
}
