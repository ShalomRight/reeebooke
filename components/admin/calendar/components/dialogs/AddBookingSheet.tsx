"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useZapBookingForm } from "@/components/SimpleBookingForm/useZapBookingForm"
import { ServiceSelection } from "@/components/SimpleBookingForm/ServiceSelection"
import { TimeSelection } from "@/components/SimpleBookingForm/TimeSelection"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AvailabilityCalendar } from "@/components/ui/availability-calendar"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2, User, Phone, Mail, Clock, CalendarIcon, Scissors } from "lucide-react"

// ─── Local Form Schema for Details Step ────────────────────────────────────────
const guestDetailsSchema = z.object({
  guestName: z.string().min(1, "Guest name is required"),
  guestEmail: z.string().email("Valid email is required").optional().or(z.literal("")),
  guestPhone: z.string().min(1, "Phone number is required"),
})

type GuestDetailsFormValues = z.infer<typeof guestDetailsSchema>

interface Props {
  children?: React.ReactNode
  initialDate?: Date
  initialTime?: { hour: number; minute: number }
}

export function AddBookingSheet({ children, initialDate, initialTime }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Use the Zap hook to fetch strict capabilities!
  const formState = useZapBookingForm()
  const {
    services, selectedService, setSelectedService,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    currentMonth, currentYear,
    timeSlots, dailyCapacities, totalPrice, selectedServiceData,
    isLoadingTimeSlots, isLoadingServices,
  } = formState

  const detailsForm = useForm<GuestDetailsFormValues>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
    },
  })

  // Reset/sync when open/close
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setSelectedService("")
      setSelectedDate(initialDate ? initialDate.getDate() : null)
      setSelectedTime(initialTime ? `${initialTime.hour%12||12}:${String(initialTime.minute).padStart(2,'0')} ${initialTime.hour>=12?'PM':'AM'}` : "")
      detailsForm.reset()
    }
  }, [isOpen, initialDate, initialTime, detailsForm])

  // Map backend capacity data to our 4-tier literal array for the Calendar
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
  const selectedDateObj = selectedDate ? new Date(currentYear, currentMonth - 1, selectedDate) : undefined

  // Step Navigation Engine
  const canProceed = () => {
    if (step === 1) return !!selectedService
    if (step === 2) return !!selectedDate
    if (step === 3) return !!selectedTime
    return true
  }

  const handleNext = () => {
    if (!canProceed()) return
    setStep((s) => (s + 1) as 1 | 2 | 3 | 4)
  }

  const handleBack = () => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)

  const onSubmit = async (values: GuestDetailsFormValues) => {
    if (!selectedService || !selectedDateObj || !selectedTime) return
    setIsSubmitting(true)
    try {
      const payload = {
        serviceIds: [selectedService],
        date: format(selectedDateObj, "yyyy-MM-dd"),
        time: selectedTime,
        paymentMethod: "cash",
        userName: values.guestName,
        email: values.guestEmail || undefined,
        phone: values.guestPhone,
      }

      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let errMsg = "Failed to create booking"
        try {
          const bodyJSON = await res.json()
          if (bodyJSON.error) errMsg = bodyJSON.error
        } catch (e) {}
        throw new Error(errMsg)
      }

      toast.success("Booking created! Blocked out on Zap calendar.")
      setIsOpen(false)
      window.location.reload()
    } catch (err: any) {
      toast.error(err.message || "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {children && (
        <div onClick={() => setIsOpen(true)} className="contents">
          {children}
        </div>
      )}
      <SheetContent className="sm:max-w-md w-full bg-slate-50 p-0 border-l overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b sticky top-0 z-10">
          <SheetHeader>
            <SheetTitle>Admin Booking Override</SheetTitle>
            <SheetDescription>This interface strictly adheres to Zap Calendar capacities.</SheetDescription>
          </SheetHeader>

          {/* Stepper Wizard Indicator */}
          <div className="flex items-center justify-between mt-5 pt-1 relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-slate-100 -z-10" />
            <div className="absolute left-0 top-1/2 h-[2px] bg-blue-600 transition-all duration-300" style={{ width: step === 1 ? '0%' : step === 2 ? '33%' : step === 3 ? '66%' : '100%' }} />
            
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors ${
                step > s ? 'bg-blue-600 border-blue-600 text-white' : 
                step === s ? 'bg-white border-blue-600 text-blue-600' : 'bg-white border-slate-200 text-slate-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-3.5 h-3.5" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-6 relative">
            
            {/* ─── STEP 1: Service ─── */}
            <div className={`space-y-6 transition-all duration-300 ${step === 1 ? 'block opacity-100' : 'hidden opacity-0'}`}>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5" /> 1. Select Service First
                  </Label>
                  <p className="text-xs text-muted-foreground pb-2">Picking a service loads real-time schedule capacities.</p>
                  
                  <ServiceSelection
                     services={services}
                     selectedService={selectedService}
                     setSelectedService={setSelectedService}
                     isLoading={isLoadingServices}
                  />
                </div>
              </div>
            </div>

            {/* ─── STEP 2: Date ─── */}
            <div className={`space-y-6 transition-all duration-300 ${step === 2 ? 'block opacity-100' : 'hidden opacity-0'}`}>
              <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5" /> 2. Pick a Capacity-Mined Date
                  </Label>
                  <AvailabilityCalendar
                    value={selectedDateObj}
                    onChange={date => setSelectedDate(date.getDate())}
                    availabilityMap={availabilityMap}
                    className="w-full shadow-sm"
                  />
              </div>
            </div>

            {/* ─── STEP 3: Time ─── */}
            <div className={`space-y-6 transition-all duration-300 ${step === 3 ? 'block opacity-100' : 'hidden opacity-0'}`}>
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <CalendarIcon className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-xs text-muted-foreground font-medium">Selected Date</p>
                    <p className="text-sm font-semibold">{selectedDateObj ? format(selectedDateObj, "EEEE, MMMM do, yyyy") : ""}</p>
                 </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> 3. Available Time Slots
                </Label>
                <div className="h-40 overflow-y-auto">
                    <TimeSelection
                       timeSlots={timeSlots}
                       selectedTime={selectedTime}
                       setSelectedTime={setSelectedTime}
                       isLoading={isLoadingTimeSlots}
                       disabled={false}
                    />
                </div>
              </div>
            </div>

            {/* ─── STEP 4: Details ─── */}
            <div className={`space-y-6 transition-all duration-300 ${step === 4 ? 'block opacity-100' : 'hidden opacity-0'}`}>
              
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6 text-sm">
                <h4 className="font-semibold text-slate-800 border-b pb-2 mb-2">Booking Summary</h4>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium text-right">{selectedServiceData?.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">When</span>
                  <span className="font-medium text-right">
                    {selectedDateObj && selectedTime ? 
                      `${format(selectedDateObj, "MMM do")} at ${selectedTime}` 
                      : ''}
                  </span>
                </div>
              </div>

              <form id="booking-sheet-form" onSubmit={detailsForm.handleSubmit(onSubmit)} className="space-y-4 pt-2">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Guest Details</h3>
                
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-muted-foreground" /> Full Name <span className="text-destructive">*</span></Label>
                  <Input 
                    {...detailsForm.register("guestName")} 
                    placeholder="John Doe" 
                    className="bg-white h-10 shadow-sm"
                  />
                  {detailsForm.formState.errors.guestName && <p className="text-destructive text-xs">{detailsForm.formState.errors.guestName.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-muted-foreground" /> Mobile Phone <span className="text-destructive">*</span></Label>
                  <Input 
                    {...detailsForm.register("guestPhone")} 
                    placeholder="+1 234 567 890" 
                    className="bg-white h-10 shadow-sm"
                  />
                  {detailsForm.formState.errors.guestPhone && <p className="text-destructive text-xs">{detailsForm.formState.errors.guestPhone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground" /> Email Address <span className="text-xs text-muted-foreground font-normal ml-1">(Optional, for reminders)</span></Label>
                  <Input 
                    {...detailsForm.register("guestEmail")} 
                    type="email"
                    placeholder="john@example.com" 
                    className="bg-white h-10 shadow-sm"
                  />
                  {detailsForm.formState.errors.guestEmail && <p className="text-destructive text-xs">{detailsForm.formState.errors.guestEmail.message}</p>}
                </div>
              </form>
            </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t sticky bottom-0 z-10 flex gap-2 justify-between items-center">
          {step > 1 ? (
             <Button type="button" variant="ghost" onClick={handleBack} className="gap-1 px-3">
               <ArrowLeft className="w-4 h-4" /> Back
             </Button>
          ) : (
             <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="px-3">Cancel</Button>
          )}

          {step < 4 ? (
             <Button type="button" onClick={handleNext} disabled={!canProceed()} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
               Next Step <ArrowRight className="w-4 h-4" />
             </Button>
          ) : (
             <Button type="submit" form="booking-sheet-form" disabled={isSubmitting} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md min-w-[140px]">
               {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
               Create Booking
             </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
