"use client"

import { Container } from "../layout/Container"
import { AmeliaBookingForm } from "@/components/SimpleBookingForm/AmeliaBookingForm"

export function BookingSection() {
  return (
    <section id="booking" className="py-20 md:py-28 bg-warm-100">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
            Book Now
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-warm-900 mb-6">
            Reserve Your <span className="italic text-terracotta-600">Moment</span>
          </h2>
          <p className="text-sm text-warm-600">
            Take a breath. Choose a time that works for you, and allow us to prepare a calming experience.
          </p>
        </div>

        <div className="relative z-10 w-full rounded-lg overflow-hidden shadow-xl border border-warm-200 bg-white">
           <AmeliaBookingForm />
        </div>
      </Container>
    </section>
  )
}
