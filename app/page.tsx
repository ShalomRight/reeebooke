import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { ServicesPreview } from "@/components/sections/ServicesPreview"
import { BookingSection } from "@/components/sections/BookingSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { Testimonials } from "@/components/sections/Testimonials"
import { GalleryPreview } from "@/components/sections/GalleryPreview"
import { CTASection } from "@/components/sections/CTASection"

export default function Home() {
	return (
		<main className="min-h-screen bg-background flex flex-col">
			<Navbar />
			<div className="flex-1">
				<Hero />
				<ServicesPreview />
				<BookingSection />
				<AboutSection />
				<Testimonials />
				<GalleryPreview />
				<CTASection />
			</div>
			<Footer />
		</main>
	)
}
