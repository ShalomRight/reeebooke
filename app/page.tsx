import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { SimpleFooter } from "@/components/landing/SimpleFooter"
import LayoutAdmin from "@/components/layout/landing"
import { ZapBookingForm } from '@/components/SimpleBookingForm/ZapBookingForm'

export default function Home() {
	return (
		<LayoutAdmin>
			<div className="min-h-screen bg-background">
				<ZapBookingForm />
				<HowItWorksSection />
				<SimpleFooter />
			</div>
		</LayoutAdmin>
	)
}
