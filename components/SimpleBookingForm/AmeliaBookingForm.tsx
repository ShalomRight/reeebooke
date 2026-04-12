"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-redux-cart"
import { Check, ShoppingCart, ArrowLeft, ArrowRight, X } from "lucide-react"
import { toast } from "sonner"

import { useZapBookingForm } from "./useZapBookingForm"
import { ServiceSelection } from "./ServiceSelection"
import { TimeSelection } from "./TimeSelection"
import { PhotoUpload } from "./PhotoUpload"
import { CartSummary } from "./CartSummary"
import { AvailabilityCalendar } from "@/components/ui/availability-calendar"

const STEPS = [
  { num: 1, label: "Service" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Photos" },
  { num: 4, label: "Checkout" },
]

function AmeliaBookingFormContent() {
  const searchParams = useSearchParams()
  const serviceIdFromUrl = searchParams.get("serviceId") || undefined

  const form = useZapBookingForm(serviceIdFromUrl)
  const {
    services, selectedService, setSelectedService,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    photos, setPhotos, currentMonth, currentYear,
    timeSlots, dailyCapacities, totalPrice, selectedServiceData,
    isLoadingTimeSlots, isLoadingServices,
  } = form

  const { addToCart, cartCount } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [readyToAdd, setReadyToAdd] = useState(false)

  // Auto-add to cart when ready
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
      setReadyToAdd(false)
      setCurrentStep(1)
      setSelectedService("")
      setSelectedDate(null)
      setSelectedTime("")
      setPhotos([])
    }
  }, [readyToAdd, addToCart, currentMonth, currentYear, photos, selectedDate, selectedService, selectedServiceData?.name, selectedTime, setPhotos, setSelectedDate, setSelectedService, setSelectedTime, totalPrice])

  const canProceed = () => {
    if (currentStep === 1) return !!selectedService
    if (currentStep === 2) return !!selectedDate && !!selectedTime
    return true
  }

  const handleNext = () => {
    if (currentStep === 4) setReadyToAdd(true)
    else setCurrentStep(s => Math.min(s + 1, 4))
  }

  const handleBack = () => setCurrentStep(s => Math.max(s - 1, 1))

  // Mapping availability metric for AvailabilityCalendar based on Zap dailyCapacities
  const getAvailabilityMap = () => {
    const map: Record<string, "available" | "filling-up" | "almost-full" | "full"> = {}
    Object.entries(dailyCapacities).forEach(([day, cap]) => {
       const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
       if (cap.total === 0) {
          map[dateStr] = "full"
       } else if (cap.available === 0) {
          map[dateStr] = "full"
       } else if (cap.available <= 2) {
          map[dateStr] = "almost-full"
       } else if (cap.available > cap.total * 0.6) {
          map[dateStr] = "available"
       } else {
          map[dateStr] = "filling-up"
       }
    })
    return map
  }

  const availabilityMap = getAvailabilityMap()

  // Derive Date object for AvailabilityCalendar
  const selectedDateObj = selectedDate 
    ? new Date(currentYear, currentMonth - 1, selectedDate)
    : undefined

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-in fade-in space-y-4">
            <div>
               <h2 className="text-xl font-bold">Service</h2>
               <p className="text-muted-foreground text-sm">Select a nail service.</p>
            </div>
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
          <div className="animate-in fade-in space-y-6">
             <div className="flex items-center gap-4 border-b pb-4">
                <Button variant="ghost" size="icon" onClick={handleBack}><ArrowLeft className="w-4 h-4" /></Button>
                <h2 className="text-xl font-bold">Date & Time</h2>
             </div>
             
             {/* Left side calendar, right side time slots (or stacked on mobile) */}
             <div className="flex flex-col lg:flex-row gap-6">
                 <div className="flex-1">
                    <AvailabilityCalendar 
                        value={selectedDateObj}
                        onChange={(d) => {
                           // Set the form state date
                           // Note: AvailabilityCalendar currently manages its own month internally, 
                           // but emits real Date objects.
                           form.setSelectedDate(d.getDate())
                        }}
                        availabilityMap={availabilityMap}
                    />
                 </div>
                 
                 <div className="w-full lg:w-64 bg-[#FDFCFB] p-4 rounded-xl border border-[#E2E0D9] h-[380px] overflow-y-auto">
                    <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                       {selectedDateObj ? selectedDateObj.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }) : "Pick a date first"}
                    </h3>
                    
                    {!selectedDateObj ? (
                       <p className="text-sm text-slate-400">Select a date from the calendar to see available slots.</p>
                    ) : (
                       <TimeSelection
                          timeSlots={timeSlots}
                          selectedTime={selectedTime}
                          setSelectedTime={setSelectedTime}
                          isLoading={isLoadingTimeSlots}
                          disabled={false}
                       />
                    )}
                 </div>
             </div>
          </div>
        )
      case 3:
        return (
          <div className="animate-in fade-in space-y-4">
            <div className="flex items-center gap-4 border-b pb-4">
               <Button variant="ghost" size="icon" onClick={handleBack}><ArrowLeft className="w-4 h-4" /></Button>
               <h2 className="text-xl font-bold">Inspiration Photos</h2>
            </div>
            <PhotoUpload photos={photos} setPhotos={setPhotos} />
          </div>
        )
      case 4:
        return (
          <div className="animate-in fade-in space-y-6">
            <div className="flex items-center gap-4 border-b pb-4">
               <Button variant="ghost" size="icon" onClick={handleBack}><ArrowLeft className="w-4 h-4" /></Button>
               <h2 className="text-xl font-bold">Checkout Summary</h2>
            </div>
            <div className="bg-[#FDFCFB] border border-[#E2E0D9] rounded-xl p-5 space-y-3 shadow-sm">
                <div className="flex justify-between border-b pb-3">
                   <span className="text-[#1A2421]/60">Service</span>
                   <span className="font-semibold text-[#1A2421]">{selectedServiceData?.name ?? "—"}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                   <span className="text-[#1A2421]/60">Date</span>
                   <span className="font-semibold text-[#1A2421]">
                      {selectedDateObj ? selectedDateObj.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" }) : "—"}
                   </span>
                </div>
                <div className="flex justify-between border-b pb-3">
                   <span className="text-[#1A2421]/60">Time</span>
                   <span className="font-semibold text-[#1A2421]">{selectedTime || "—"}</span>
                </div>
                <div className="flex justify-between pt-2">
                   <span className="text-[#1A2421] font-bold">Total Price</span>
                   <span className="font-bold text-[#BD9354] text-lg">${totalPrice.toLocaleString()}</span>
                </div>
            </div>
          </div>
        )
      default: return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto my-12 bg-white rounded-2xl shadow-xl border overflow-hidden flex flex-col md:flex-row min-h-[600px]">
       
       {/* SIDEBAR (The Amelia UI style) */}
       <div className="w-full md:w-[260px] bg-[#3E4D45] text-[#FDFCFB] p-6 md:p-8 flex flex-col shrink-0">
          <h2 className="text-lg font-bold mb-10 opacity-90 tracking-wide text-center md:text-left">Booking Config</h2>
          
          <div className="space-y-6 flex-1">
             {STEPS.map(step => {
                const isActive = currentStep === step.num
                const isDone = currentStep > step.num
                return (
                   <div key={step.num} className="flex items-center gap-4 cursor-default">
                      <div className={`text-sm font-medium transition-colors ${isActive ? 'text-[#FDFCFB]' : isDone ? 'text-[#FDFCFB]/60' : 'text-[#FDFCFB]/40'} flex-1`}>
                         {step.label}
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                         isDone ? 'bg-[#5B7065] border-[#5B7065] text-[#FDFCFB]' :
                         isActive ? 'border-[#C8B9A6] ring-2 ring-[#C8B9A6] ring-offset-2 ring-offset-[#3E4D45] bg-[#3E4D45]' :
                         'border-[#FDFCFB]/20 text-transparent'
                      }`}>
                         {isDone ? <Check className="w-3.5 h-3.5 stroke-3" /> : <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#C8B9A6]' : 'bg-transparent'}`} />}
                      </div>
                   </div>
                )
             })}
          </div>

          <div className="mt-8 text-center md:text-left text-xs text-white/50 space-y-1">
             <p>Need help?</p>
             <p>support@reebooking.com</p>
          </div>
       </div>

       {/* MAIN CONTENT AREA */}
       <div className="flex-1 p-6 md:p-10 flex flex-col bg-white overflow-x-hidden">
          <div className="flex-1">
             {renderContent()}
          </div>
          
          <div className="mt-8 flex justify-end">
             {currentStep < 4 ? (
                <Button onClick={handleNext} disabled={!canProceed()} className="gap-2 bg-[#3E4D45] hover:bg-[#2D3930] text-white rounded-lg px-8">
                   Next Step <ArrowRight className="w-4 h-4" />
                </Button>
             ) : (
                <Button onClick={handleNext} disabled={!canProceed()} className="gap-2 bg-[#BD9354] hover:bg-[#A67C45] text-white rounded-lg px-8 shadow-md">
                   <ShoppingCart className="w-4 h-4" />
                   Add to Cart
                </Button>
             )}
          </div>
       </div>

       {/* Cart Sidebar Modal (Reused from existing logic) */}
       {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
             <div className="fixed inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
             <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <h2 className="font-bold flex items-center gap-2">
                       <ShoppingCart className="w-5 h-5 text-indigo-600" />
                       Cart ({cartCount})
                   </h2>
                   <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                      <X className="w-5 h-5" />
                   </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                   <CartSummary onClose={() => setIsCartOpen(false)} />
                </div>
             </div>
          </div>
       )}

       {/* Floating Cart Trigger */}
       <Button onClick={() => setIsCartOpen(true)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-[#3E4D45] hover:bg-[#2D3930]">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                {cartCount}
             </span>
          )}
       </Button>

    </div>
  )
}

export function AmeliaBookingForm() {
  return (
    <Suspense fallback={<div className="h-[600px] w-full max-w-5xl mx-auto rounded-2xl bg-slate-100 animate-pulse my-12" />}>
       <AmeliaBookingFormContent />
    </Suspense>
  )
}
