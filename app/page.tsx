import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { SimpleFooter } from "@/components/landing/SimpleFooter"
import LayoutAdmin from "@/components/layout/landing"
import { BookingFormToggle } from "@/components/SimpleBookingForm/BookingFormToggle"

export default function Home() {
	return (
		<LayoutAdmin>
			<div className="min-h-screen bg-background">
				<BookingFormToggle />
				<HowItWorksSection />
				<SimpleFooter />
			</div>
		</LayoutAdmin>
	)
}
