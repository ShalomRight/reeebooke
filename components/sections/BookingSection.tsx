"use client"

import { Container } from "../layout/Container"
import { AmeliaBookingForm } from "@/components/SimpleBookingForm/AmeliaBookingForm"

export function BookingSection() {
  return (
    <section id="booking" className="py-24 md:py-32 bg-[#F2F0EB]">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2D3A31] mb-6">
            Reserve Your <span className="italic text-[#8C9A84]">Moment</span>
          </h2>
          <p className="font-source text-[#2D3A31]/70 text-lg">
            Take a breath. Choose a time that works for you, and allow us to prepare a calming experience.
          </p>
        </div>

        {/* Dynamic Booking Wrapper ensuring spacing and gentle styling */}
        <div className="relative z-10 w-full rounded-3xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,58,49,0.05)] border border-[#E6E2DA]/50 bg-white">
           <AmeliaBookingForm />
        </div>
      </Container>
    </section>
  )
}
