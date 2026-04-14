"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/hooks/use-redux-cart"
import {
  Check, ShoppingCart, ArrowLeft, ArrowRight, X,
  Calendar, Camera, CreditCard, AlertCircle,
  ImageIcon,
} from "lucide-react"
import { toast } from "sonner"

import { useZapBookingForm } from "./useZapBookingForm"
import { ServiceSelection } from "./ServiceSelection"
import { TimeSelection } from "./TimeSelection"
import { PhotoUpload } from "./PhotoUpload"
import { CartSummary } from "./CartSummary"
import { AvailabilityCalendar } from "@/components/ui/availability-calendar"

// ─── Step definitions ────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: "Service",    icon: CreditCard },
  { num: 2, label: "Date & Time", icon: Calendar },
  { num: 3, label: "Photos",     icon: Camera },
  { num: 4, label: "Review",     icon: Check },
]

// ─── Availability map from Zap capacity data ─────────────────────────────────
function buildAvailabilityMap(
  dailyCapacities: Record<number, { total: number; available: number }>,
  year: number,
  month: number,
): Record<string, "available" | "filling-up" | "almost-full" | "full"> {
  const map: Record<string, "available" | "filling-up" | "almost-full" | "full"> = {}
  Object.entries(dailyCapacities).forEach(([day, cap]) => {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    if (cap.total === 0 || cap.available === 0) map[dateStr] = "full"
    else if (cap.available <= 2) map[dateStr] = "almost-full"
    else if (cap.available > cap.total * 0.6) map[dateStr] = "available"
    else map[dateStr] = "filling-up"
  })
  return map
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepSidebar({ currentStep }: { currentStep: number }) {
  return (
    <aside className="w-full md:w-56 bg-forest-800 text-cream-50 p-6 flex flex-row md:flex-col gap-4 md:gap-0 shrink-0 rounded-l-lg md:rounded-l-lg md:rounded-r-none">
      <h2 className="hidden md:block font-serif text-lg italic opacity-60 mb-8">
        Your Booking
      </h2>
      <div className="flex md:flex-col flex-row gap-2 md:gap-5 flex-1 overflow-x-auto md:overflow-x-visible">
        {STEPS.map((step) => {
          const isActive = currentStep === step.num
          const isDone = currentStep > step.num
          const Icon = step.icon
          return (
            <div key={step.num} className="flex items-center gap-3 shrink-0">
              <div
                className={`w-8 h-8 rounded flex items-center justify-center border transition-all duration-300 ${
                  isDone
                    ? "bg-forest-500 border-forest-500 text-cream-50"
                    : isActive
                    ? "border-cream-200 bg-forest-700 text-cream-50"
                    : "border-forest-600 text-forest-400"
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <span
                className={`text-[11px] uppercase tracking-widest hidden md:block transition-colors duration-300 ${
                  isActive ? "text-cream-50" : isDone ? "text-cream-50/60" : "text-forest-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
      <p className="hidden md:block text-[10px] text-forest-400 mt-auto pt-8 leading-relaxed">
        Need help?<br />support@reebooking.com
      </p>
    </aside>
  )
}

// ─── Main form content ────────────────────────────────────────────────────────
function AmeliaBookingFormContent() {
  const searchParams = useSearchParams()
  const serviceIdFromUrl = searchParams.get("serviceId") || undefined

  const form = useZapBookingForm(serviceIdFromUrl)
  const {
    services, selectedService, setSelectedService,
    selectedDate, setSelectedDate, selectedTime, setSelectedTime,
    photos, setPhotos, currentMonth, currentYear,
    setCurrentMonth, setCurrentYear,
    timeSlots, dailyCapacities, totalPrice, selectedServiceData,
    isLoadingTimeSlots, isLoadingServices,
  } = form as any

  const { addToCart, cartCount } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [stepError, setStepError] = useState<string | null>(null)
  const [readyToAdd, setReadyToAdd] = useState(false)

  const selectedDateObj = selectedDate
    ? new Date(currentYear, currentMonth - 1, selectedDate)
    : undefined

  const availabilityMap = buildAvailabilityMap(dailyCapacities ?? {}, currentYear, currentMonth)

  // Sync calendar month navigation back into form state so capacity API re-fetches
  const handleMonthChange = useCallback(
    (year: number, month: number) => {
      setSelectedDate(null)
      setSelectedTime?.("")
      if (typeof setCurrentMonth === "function") setCurrentMonth(month)
      if (typeof setCurrentYear === "function") setCurrentYear(year)
    },
    [setSelectedDate, setSelectedTime, setCurrentMonth, setCurrentYear],
  )

  // Auto-add to cart when readyToAdd flag is set
  useEffect(() => {
    if (!readyToAdd || !selectedService || !selectedDate || !selectedTime) return
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
    setReadyToAdd(false)
    setCurrentStep(1)
    setSelectedService("")
    setSelectedDate(null)
    setSelectedTime("")
    setPhotos([])
    setStepError(null)
  }, [readyToAdd]) // eslint-disable-line react-hooks/exhaustive-deps

  const canProceed = (): { ok: boolean; message?: string } => {
    if (currentStep === 1) {
      if (!selectedService) return { ok: false, message: "Please select a service to continue." }
    }
    if (currentStep === 2) {
      if (!selectedDate) return { ok: false, message: "Please choose a date." }
      if (!selectedTime) return { ok: false, message: "Please select an available time slot." }
    }
    return { ok: true }
  }

  const handleNext = () => {
    const { ok, message } = canProceed()
    if (!ok) { setStepError(message || "Please complete this step."); return }
    setStepError(null)
    if (currentStep === 4) { setReadyToAdd(true); return }
    setCurrentStep((s) => Math.min(s + 1, 4))
  }

  const handleBack = () => {
    setStepError(null)
    setCurrentStep((s) => Math.max(s - 1, 1))
  }

  // ─── Step renderers ─────────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStep) {
      // ── Step 1: Service ──────────────────────────────────────────────────
      case 1:
        return (
          <div className="animate-in fade-in-0 duration-200 space-y-4">
            <StepHeader
              title="Choose a Service"
              subtitle={`${services.length} services available`}
            />
            {isLoadingServices ? (
              <ServiceSkeleton />
            ) : services.length === 0 ? (
              <EmptyState message="No services available right now. Please check back later." />
            ) : (
              <div className="overflow-y-auto max-h-[55vh] pr-1 -mr-1">
                <ServiceSelection
                  services={services}
                  selectedService={selectedService}
                  setSelectedService={(id) => { setSelectedService(id); setStepError(null) }}
                  isLoading={false}
                />
              </div>
            )}
          </div>
        )

      // ── Step 2: Date & Time ───────────────────────────────────────────────
      case 2:
        return (
          <div className="animate-in fade-in-0 duration-200 space-y-5">
            <StepHeader
              title="Pick a Date & Time"
              subtitle={selectedServiceData?.name}
            />
            <div className="flex flex-col xl:flex-row gap-5">
              {/* Calendar */}
              <div className="flex-1 min-w-0">
                <AvailabilityCalendar
                  value={selectedDateObj}
                  onChange={(d) => {
                    setSelectedDate(d.getDate())
                    setStepError(null)
                  }}
                  onMonthChange={handleMonthChange}
                  availabilityMap={availabilityMap}
                />
                {/* Legend */}
                <div className="flex gap-3 mt-3 flex-wrap text-[11px] text-muted-foreground">
                  {(["available", "filling-up", "almost-full", "full"] as const).map((lvl) => (
                    <span key={lvl} className="flex items-center gap-1.5 capitalize">
                      <span className={`w-2.5 h-2.5 rounded-full inline-block ${
                        lvl === "available" ? "bg-emerald-500" :
                        lvl === "filling-up" ? "bg-amber-400" :
                        lvl === "almost-full" ? "bg-orange-500" : "bg-rose-400"
                      }`} />
                      {lvl.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Time slots panel */}
              <div className="w-full xl:w-60 shrink-0">
                <div className="rounded-xl border border-border bg-muted/30 p-4 h-full min-h-[200px] xl:max-h-[380px] xl:overflow-y-auto">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    {selectedDateObj
                      ? selectedDateObj.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
                      : "Select a date"}
                  </p>
                  {!selectedDateObj ? (
                    <p className="text-sm text-muted-foreground">
                      Click a date on the calendar to see available time slots.
                    </p>
                  ) : (
                    <TimeSelection
                      timeSlots={timeSlots}
                      selectedTime={selectedTime}
                      setSelectedTime={(t) => { setSelectedTime(t); setStepError(null) }}
                      isLoading={isLoadingTimeSlots}
                      disabled={false}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      // ── Step 3: Photos ───────────────────────────────────────────────────
      case 3:
        return (
          <div className="animate-in fade-in-0 duration-200 space-y-4">
            <StepHeader
              title="Inspiration Photos"
              subtitle="Optional — share reference photos for your stylist"
            />
            <PhotoUpload photos={photos} setPhotos={setPhotos} />
          </div>
        )

      // ── Step 4: Review & Add to Cart ─────────────────────────────────────
      case 4:
        return (
          <div className="animate-in fade-in-0 duration-200 space-y-5">
            <StepHeader title="Review & Confirm" subtitle="Everything look right?" />

            <div className="rounded-xl border border-border overflow-hidden">
              <SummaryRow
                label="Service"
                value={selectedServiceData?.name ?? "—"}
                valueClass="font-semibold"
              />
              <SummaryRow
                label="Date"
                value={
                  selectedDateObj
                    ? selectedDateObj.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"
                }
              />
              <SummaryRow label="Time" value={selectedTime || "—"} />
              {photos.length > 0 && (
                <SummaryRow
                  label="Photos"
                  value={
                    <div className="flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{photos.length} photo{photos.length > 1 ? "s" : ""} attached</span>
                    </div>
                  }
                />
              )}
              <div className="flex justify-between items-center px-4 py-4 bg-muted/40">
                <span className="font-bold text-sm">Total</span>
                <span className="text-xl font-bold text-primary">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By adding to cart you agree to our booking terms. Payment is collected at checkout.
            </p>
          </div>
        )

      default:
        return null
    }
  }

  const { ok: canGoNext } = canProceed()

  return (
    <div className="max-w-5xl mx-auto my-8 sm:my-12 glass-card rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[580px]">
      {/* Sidebar */}
      <StepSidebar currentStep={currentStep} />

      {/* Main */}
      <div className="flex-1 flex flex-col p-5 sm:p-8 overflow-hidden bg-cream-50/50">
        <div className="flex-1 overflow-y-auto min-h-0">
          {renderStep()}

          {/* Inline step error */}
          {stepError && (
            <Alert variant="destructive" className="mt-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{stepError}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-forest-900/10 gap-3">
          {currentStep > 1 ? (
            <Button variant="ghost" onClick={handleBack} className="gap-2 text-forest-600 hover:text-forest-800 hover:bg-forest-50">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {/* Progress dots */}
            <div className="hidden sm:flex gap-1.5 mr-2">
              {STEPS.map((s) => (
                <div
                  key={s.num}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s.num === currentStep ? "w-6 bg-forest-700" :
                    s.num < currentStep ? "w-3 bg-forest-400" : "w-3 bg-forest-200"
                  }`}
                />
              ))}
            </div>

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!canGoNext}
                className="gap-2 bg-forest-800 hover:bg-forest-700 text-cream-50 rounded px-7"
              >
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="gap-2 bg-forest-600 hover:bg-forest-500 text-cream-50 rounded px-7"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Cart drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-forest-900/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-sm glass-card h-full flex flex-col animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-4 border-b border-forest-900/10">
              <h2 className="font-bold flex items-center gap-2 text-forest-900">
                <ShoppingCart className="w-5 h-5 text-forest-600" /> Cart ({cartCount})
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="text-forest-900 hover:bg-forest-50">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <CartSummary onClose={() => setIsCartOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Floating cart button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg shadow-forest-900/20 bg-forest-800 hover:bg-forest-700 text-cream-50 flex items-center justify-center transition-colors z-40"
        aria-label={`Open cart (${cartCount} items)`}
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center border-2 border-white px-1">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </button>
    </div>
  )
}

// ─── Small shared components ──────────────────────────────────────────────────
function StepHeader({ title, subtitle }: { title: string; subtitle?: string | null }) {
  return (
    <div className="mb-1">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  )
}

function SummaryRow({
  label,
  value,
  valueClass,
}: {
  label: string
  value: React.ReactNode
  valueClass?: string
}) {
  return (
    <div className="flex justify-between items-start gap-4 px-4 py-3 border-b border-border last:border-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground shrink-0 pt-0.5">
        {label}
      </span>
      <span className={`text-sm text-right ${valueClass ?? ""}`}>{value}</span>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
      <AlertCircle className="w-8 h-8 mb-3 opacity-30" />
      <p className="text-sm max-w-xs">{message}</p>
    </div>
  )
}

function ServiceSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-border">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="w-14 h-5" />
        </div>
      ))}
    </div>
  )
}

// ─── Public export with Suspense ──────────────────────────────────────────────
export function AmeliaBookingForm() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto my-12 rounded-2xl bg-slate-100 animate-pulse h-[600px]" />
      }
    >
      <AmeliaBookingFormContent />
    </Suspense>
  )
}
