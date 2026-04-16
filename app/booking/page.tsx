import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/layout/Container"
import { AmeliaBookingForm } from "@/components/SimpleBookingForm/AmeliaBookingForm"

export default function BookingPage() {
	return (
		<main className="min-h-screen bg-warm-50 flex flex-col">
			<Navbar />
			<div className="flex-1">
				<section className="py-12 md:py-16">
					<Container>
						<div className="text-center max-w-2xl mx-auto mb-12">
							<p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
								Book Now
							</p>
							<h1 className="font-serif text-3xl md:text-5xl text-warm-900 mb-6">
								Book Your <span className="italic text-terracotta-600">Appointment</span>
							</h1>
							<p className="text-sm text-warm-600">
								Select your service, choose a date and time, and reserve your spot.
							</p>
						</div>

						<div className="relative z-10 w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl border border-warm-200 bg-white">
							<AmeliaBookingForm />
						</div>
					</Container>
				</section>
			</div>
			<Footer />
		</main>
	)
}
