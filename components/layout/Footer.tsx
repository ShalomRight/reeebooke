import Link from "next/link"
import { Container } from "./Container"

export function Footer() {
  return (
    <footer className="bg-warm-100 border-t border-warm-200 py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="font-serif text-3xl font-bold text-warm-900">
              Abi's Hair Creation
            </Link>
            <p className="text-sm text-warm-600 leading-relaxed max-w-xs">
              A serene oasis for wellness, beauty, and mindful care. Take a deep breath and let us handle the rest.
            </p>
          </div>

          <div className="space-y-4 mt-2">
            <h4 className="font-serif font-semibold text-lg text-warm-900">Navigation</h4>
            <ul className="space-y-3 text-sm text-warm-600">
              <li><Link href="/" className="hover:text-terracotta-600 transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-terracotta-600 transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-terracotta-600 transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-terracotta-600 transition-colors">About Us</Link></li>
              <li><Link href="/find-us" className="hover:text-terracotta-600 transition-colors">Find Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4 mt-2">
            <h4 className="font-serif font-semibold text-lg text-warm-900">Visit Us</h4>
            <ul className="space-y-3 text-sm text-warm-600">
              <li>Upper Bay Street</li>
              <li>Kingstown, VC</li>
              <li>St Vincent and the Grenadines</li>
              <li>784-491-2850</li>
            </ul>
          </div>

          <div className="space-y-4 mt-2">
            <h4 className="font-serif font-semibold text-lg text-warm-900">Hours</h4>
            <ul className="space-y-3 text-sm text-warm-600">
              <li className="flex justify-between"><span>Mon - Fri</span> <span>9am - 7pm</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>10am - 5pm</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-warm-200 flex flex-col md:flex-row items-center justify-between text-sm text-warm-500 space-y-4 md:space-y-0">
           <p>© {new Date().getFullYear()} Abi's Hair Creation. All rights reserved.</p>
           <div className="flex gap-6">
              <Link href="#" className="hover:text-terracotta-600 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-terracotta-600 transition-colors">Terms of Service</Link>
           </div>
        </div>
      </Container>
    </footer>
  )
}
