import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesGallerySection } from "@/components/landing/ServicesGallerySection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { StatsSection } from "@/components/landing/StatsSection"

export default function DemoLandingPage() {
	return (
		<main className="min-h-screen bg-warm-50">
			<Navbar />
			<HeroSection />
			<ServicesGallerySection />
			<FeaturesSection />
			<StatsSection />
			<Footer />
		</main>
	)
}
