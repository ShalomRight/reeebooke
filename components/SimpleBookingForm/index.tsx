"use client"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-redux-cart"
import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingCart, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { toast } from "sonner"
import { CalendarCard } from "./CalendarCard"
import { CartSummary } from "./CartSummary"
import { PhotoUpload } from "./PhotoUpload"
import { ServiceSelection } from "./ServiceSelection"
import { TimeSelection } from "./TimeSelection"
import { useBookingForm } from "./useBookingForm"
import { format24hTo12hLabel } from "@/lib/booking/time"

// ─── Step config ────────────────────────────────────────────────────────────
const STEPS = [
	{ num: 1, label: "Service" },
	{ num: 2, label: "Date" },
	{ num: 3, label: "Time" },
	{ num: 4, label: "Photos" },
] as const

// ─── Step progress indicator ─────────────────────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: number }) {
	return (
		<div className="flex items-center justify-center gap-0 mb-8 select-none">
			{STEPS.map((step, i) => {
				const isDone = currentStep > step.num
				const isActive = currentStep === step.num
				return (
					<div key={step.num} className="flex items-center">
						{/* Circle */}
						<div className="flex flex-col items-center gap-1">
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
									isDone
										? "bg-primary text-primary-foreground"
										: isActive
											? "bg-primary text-primary-foreground ring-4 ring-primary/20"
											: "bg-muted text-muted-foreground"
								}`}
							>
								{isDone ? <CheckCircle2 className="w-4 h-4" /> : step.num}
							</div>
							<span
								className={`text-xs font-medium transition-colors duration-300 ${
									isActive ? "text-primary" : isDone ? "text-primary/70" : "text-muted-foreground"
								}`}
								style={{ fontFamily: "var(--font-dm-sans)" }}
							>
								{step.label}
							</span>
						</div>

						{/* Connector line */}
						{i < STEPS.length - 1 && (
							<div
								className={`h-0.5 w-12 sm:w-20 mx-2 mb-5 rounded-full transition-all duration-500 ${
									currentStep > step.num ? "bg-primary" : "bg-muted"
								}`}
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}

// ─── Main form ───────────────────────────────────────────────────────────────
function SimpleBookingFormContent() {
	const searchParams = useSearchParams()
	const serviceIdFromUrl = searchParams.get("serviceId") || undefined

	const form = useBookingForm(serviceIdFromUrl)
	const {
		services, selectedService, setSelectedService, selectedDate, setSelectedDate,
		selectedTime, setSelectedTime, photos, setPhotos, currentMonth, currentYear,
		handlePreviousMonth, handleNextMonth, calendarDays, weekDays, timeSlots,
		bookingCounts, totalPrice, selectedServiceData, isLoadingTimeSlots, isLoadingServices,
	} = form

	const { addToCart, cartCount } = useCart()
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [prevCartCount, setPrevCartCount] = useState<number | null>(null)
	const [isInit, setIsInit] = useState(true)

	// ── Multi-step state ──────────────────────────────────────────────────────
	const [currentStep, setCurrentStep] = useState(1)
	// Gate that turns on when the user explicitly clicks "Add to Cart" on step 4
	const [readyToAdd, setReadyToAdd] = useState(false)

	// ── Cart open/close logic (unchanged) ────────────────────────────────────
	useEffect(() => { setIsCartOpen(false) }, [])
	useEffect(() => {
		if (isInit) { setPrevCartCount(cartCount); setIsCartOpen(false); setIsInit(false) }
	}, [cartCount, isInit])
	useEffect(() => { if (cartCount === 0) setIsCartOpen(false) }, [cartCount])
	useEffect(() => {
		if (!isInit && prevCartCount !== null && cartCount > prevCartCount && cartCount > 0) setIsCartOpen(true)
		setPrevCartCount(cartCount)
	}, [cartCount])

	// ── Scroll into view when pre-selected via URL ────────────────────────────
	useEffect(() => {
		if (serviceIdFromUrl && selectedService === serviceIdFromUrl)
			setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }), 100)
	}, [serviceIdFromUrl, selectedService])

	// ── Auto-add to cart — now gated behind readyToAdd ───────────────────────
	// (original logic preserved; only the trigger condition has been added)
	useEffect(() => {
		if (readyToAdd && selectedService && selectedDate && selectedTime) {
			addToCart({
				id: `${selectedService}-${selectedDate}-${selectedTime}-${Date.now()}`,
				serviceId: selectedService,
				serviceName: selectedServiceData?.name || "",
				price: totalPrice,
				date: `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`,
				time: selectedTime,
				photos,
			})
			toast.success("Added to Cart", { description: `${selectedServiceData?.name} added successfully` })
			// Reset everything
			setReadyToAdd(false)
			setCurrentStep(1)
			setSelectedService("")
			setSelectedDate(null)
			setSelectedTime("")
			setPhotos([])
		}
		// eslint-disable-next-line
	}, [readyToAdd])

	// ── Step navigation helpers ───────────────────────────────────────────────
	const allSlotsBooked = !!selectedDate && !!selectedService && timeSlots.every(t => !t.available)

	const canProceed = () => {
		if (currentStep === 1) return !!selectedService
		if (currentStep === 2) return !!selectedDate && !allSlotsBooked
		if (currentStep === 3) return !!selectedTime
		return true // step 4: photos are optional
	}

	const handleNext = () => {
		if (currentStep === 4) {
			setReadyToAdd(true)   // triggers the add-to-cart useEffect above
		} else {
			setCurrentStep(s => Math.min(s + 1, 4))
		}
	}

	const handleBack = () => setCurrentStep(s => Math.max(s - 1, 1))

	// ── Step content ─────────────────────────────────────────────────────────
	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className="animate-in fade-in slide-in-from-right-4 duration-300">
						<StepHeading
							title="Choose Your Service"
							subtitle="Select the nail service you'd like to book"
						/>
						<ServiceSelection
							services={services}
							selectedService={selectedService}
							setSelectedService={setSelectedService}
							isLoading={isLoadingServices}
						/>
					</div>
				)

			case 2:
				return (
					<div className="animate-in fade-in slide-in-from-right-4 duration-300">
						<StepHeading
							title="Pick a Date"
							subtitle="Choose an available date for your appointment"
						/>
						<div className="max-w-sm mx-auto">
							<CalendarCard
								currentMonth={currentMonth}
								currentYear={currentYear}
								handlePreviousMonth={handlePreviousMonth}
								handleNextMonth={handleNextMonth}
								calendarDays={calendarDays}
								weekDays={weekDays}
								selectedDate={selectedDate}
								setSelectedDate={setSelectedDate}
								bookingCounts={bookingCounts}
								selectedService={selectedService}
								disabledDates={
									selectedService
										? Object.keys(bookingCounts).filter(d => bookingCounts[+d] >= 6).map(Number)
										: []
								}
							/>
						</div>
						{allSlotsBooked && (
							<div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mt-4 max-w-sm mx-auto">
								<p className="text-destructive text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
									All time slots are booked for this service on the selected date. Please choose a different date.
								</p>
							</div>
						)}
					</div>
				)

			case 3:
				return (
					<div className="animate-in fade-in slide-in-from-right-4 duration-300">
						<StepHeading
							title="Select a Time"
							subtitle="Pick a time slot that works for you"
						/>
						<TimeSelection
							timeSlots={timeSlots}
							selectedTime={selectedTime}
							setSelectedTime={setSelectedTime}
							isLoading={isLoadingTimeSlots}
							disabled={false}
						/>
					</div>
				)

			case 4:
				return (
					<div className="animate-in fade-in slide-in-from-right-4 duration-300">
						<StepHeading
							title="Inspiration Photos"
							subtitle="Optionally upload reference photos for your nail design"
						/>
						{/* Booking summary */}
						<div className="mb-6 p-4 rounded-xl border border-border bg-muted/30">
							<p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold" style={{ fontFamily: "var(--font-dm-sans)" }}>
								Your Booking
							</p>
							<div className="flex flex-col gap-1.5 text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>
								<Row label="Service" value={selectedServiceData?.name ?? "—"} />
								<Row
									label="Date"
									value={selectedDate
										? new Date(currentYear, currentMonth - 1, selectedDate).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" })
										: "—"}
								/>
								<Row
									label="Time"
									value={selectedTime ? format24hTo12hLabel(selectedTime) : "—"}
								/>
								<div className="mt-2 pt-2 border-t border-border flex justify-between font-bold text-card-foreground">
									<span>Total</span>
									<span className="text-primary">${totalPrice.toLocaleString()}</span>
								</div>
							</div>
						</div>
						<PhotoUpload photos={photos} setPhotos={setPhotos} />
					</div>
				)

			default:
				return null
		}
	}

	return (
		<div id="booking" className="relative py-8 px-4 sm:px-6 lg:px-8 scroll-mt-20">
			<div className="max-w-2xl mx-auto">
				{/* Page title */}
				<div className="text-center mb-8">
					<h1
						className="text-3xl md:text-4xl font-bold text-card-foreground mb-3"
						style={{ fontFamily: "var(--font-space-grotesk)" }}
					>
						Book Your Appointment
					</h1>
					<p className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-dm-sans)" }}>
						Select your service, choose a date and time, and add to cart
					</p>
				</div>

				{/* Step indicator */}
				<StepIndicator currentStep={currentStep} />

				{/* Step content */}
				<div className="overflow-y-auto pr-1" style={{ height: "min(480px, 70vh)" }}>
					{renderStep()}
				</div>

				{/* Navigation */}
				<div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
					<Button
						variant="ghost"
						onClick={handleBack}
						disabled={currentStep === 1}
						className="gap-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Back
					</Button>

					<span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-dm-sans)" }}>
						Step {currentStep} of {STEPS.length}
					</span>

					<Button
						onClick={handleNext}
						disabled={!canProceed()}
						className="gap-2"
					>
						{currentStep === 4 ? (
							<>
								<ShoppingCart className="w-4 h-4" />
								Add to Cart
							</>
						) : (
							<>
								Next
								<ArrowRight className="w-4 h-4" />
							</>
						)}
					</Button>
				</div>
			</div>

			{/* Floating cart button (unchanged) */}
			<Button
				onClick={() => setIsCartOpen(true)}
				className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
				size="icon"
				aria-label="Open cart"
			>
				<ShoppingCart className="w-6 h-6" />
				{cartCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
						{cartCount}
					</span>
				)}
			</Button>

			{/* Cart sidebar (unchanged) */}
			{isCartOpen && (
				<>
					<div
						className="fixed inset-0 bg-black/50 z-40"
						onClick={() => setIsCartOpen(false)}
						aria-hidden="true"
					/>
					<div
						className={`fixed top-0 right-0 h-full w-full md:w-96 lg:w-[420px] bg-card border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
						onClick={e => e.stopPropagation()}
					>
						<div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
							<div className="flex items-center gap-2">
								<ShoppingCart className="w-5 h-5 text-primary" />
								<h2 className="text-lg font-bold text-card-foreground" style={{ fontFamily: "var(--font-space-grotesk)" }}>
									Your Cart {cartCount > 0 && `(${cartCount})`}
								</h2>
							</div>
							<Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="h-8 w-8" aria-label="Close cart">
								<X className="w-5 h-5" />
							</Button>
						</div>
						<div className="h-[calc(100vh-80px)] overflow-y-auto p-4 md:p-6">
							<CartSummary onClose={() => setIsCartOpen(false)} />
						</div>
					</div>
				</>
			)}
		</div>
	)
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
	return (
		<div className="mb-6">
			<h2
				className="text-xl font-bold text-card-foreground mb-1"
				style={{ fontFamily: "var(--font-space-grotesk)" }}
			>
				{title}
			</h2>
			<p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-dm-sans)" }}>
				{subtitle}
			</p>
		</div>
	)
}

function Row({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between text-card-foreground">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium">{value}</span>
		</div>
	)
}

// ─── Suspense wrapper (unchanged) ────────────────────────────────────────────
export function SimpleBookingForm() {
	return (
		<Suspense
			fallback={
				<div className="relative py-8 px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl mx-auto text-center mb-8">
						<h1
							className="text-3xl md:text-4xl font-bold text-card-foreground mb-3"
							style={{ fontFamily: "var(--font-space-grotesk)" }}
						>
							Book Your Appointment
						</h1>
						<p className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-dm-sans)" }}>
							Select your service, choose a date and time, and add to cart
						</p>
					</div>
				</div>
			}
		>
			<SimpleBookingFormContent />
		</Suspense>
	)
}
