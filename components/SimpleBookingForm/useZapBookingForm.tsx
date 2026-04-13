"use client"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useServices } from "@/lib/swr/hooks/services"
import useSWR from "swr"
import { format24hTo12hLabel } from "@/lib/booking/time"

// Standard SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json() as any);

type Service = { id: string; name: string; price: number; stripePriceId?: string; rating?: number; ratingsCount?: number }
type TimeSlot = { time: string; displayLabel?: string; available: boolean; isBooked?: boolean }
export type DailyCapacityMap = Record<number, { total: number; available: number }>

const generateCalendarDays = (month: number, year: number) => {
	const days: (number | null)[] = []
	const first = new Date(year, month - 1, 1).getDay(), total = new Date(year, month, 0).getDate()
	for (let i = 0; i < first; i++) days.push(null)
	for (let d = 1; d <= total; d++) days.push(d)
	return days
}

export const useZapBookingForm = (initialServiceId?: string) => {
	const { data: session } = useSession(), today = new Date()
	const [selectedService, setSelectedService] = useState(initialServiceId || "")
	const [selectedDate, setSelectedDate] = useState<number | null>(null)
	const [selectedTime, setSelectedTime] = useState("")
	const [photos, setPhotos] = useState<string[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
	const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1)
	const [currentYear, setCurrentYear] = useState(today.getFullYear())
	const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false)

	const { data: servicesData, error: servicesError, isLoading: isLoadingServices } = useServices({ limit: 1000 })
	const services = servicesData?.services || []
    
    // Fetch monthly availability bounds
	const monthQueryUrl = selectedService 
        ? `/api/schedules/service/${selectedService}/month-slots?year=${currentYear}&month=${currentMonth}&duration=60&buffer=0`
        : null

	const { data: monthSlotsData } = useSWR(monthQueryUrl, fetcher, { revalidateOnFocus: false })
	const dailyCapacities: DailyCapacityMap = monthSlotsData?.data?.capacities || {}

	const selectedDateString = selectedDate && selectedService
		? `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
		: null

    // Fetch dynamic Zap slots based on duration (assuming 60 mins default for services unless configured)
	const zapQueryUrl = selectedDateString && selectedService 
        ? `/api/schedules/service/${selectedService}/slots?date=${selectedDateString}&duration=60&buffer=0`
        : null

    const { data: zapSlotsData, isLoading: isLoadingZapSlots } = useSWR(
        zapQueryUrl, 
        fetcher,
        {
            revalidateOnFocus: false
        }
    )

	const todayYear = today.getFullYear(), todayMonth = today.getMonth() + 1, todayDay = today.getDate()
	const calendarDays = generateCalendarDays(currentMonth, currentYear)
	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

	useEffect(() => { if (servicesError) toast.error("Failed to load services") }, [servicesError])

	useEffect(() => {
		if (initialServiceId && services.length && !selectedService) {
			const service = services.find(s => s.id === initialServiceId)
			if (service) setSelectedService(initialServiceId)
		}
	}, [initialServiceId, services, selectedService])

	useEffect(() => {
		if (currentMonth === todayMonth && currentYear === todayYear) setSelectedDate(todayDay)
	}, [currentMonth, currentYear, todayDay, todayMonth, todayYear])

	useEffect(() => {
		if (!selectedDate || !selectedService) {
			setTimeSlots([])
			setIsLoadingTimeSlots(false)
			return
		}
		
		setIsLoadingTimeSlots(isLoadingZapSlots)

		// Clear stale slots immediately while new ones are loading
		if (isLoadingZapSlots) {
			setTimeSlots([])
			return
		}
		
		if (zapSlotsData?.data?.slots) {
			const slots = zapSlotsData.data.slots.map((s: { start_time: string; is_available: boolean }) => ({
				time: s.start_time,
				displayLabel: format24hTo12hLabel(s.start_time),
				available: s.is_available,
				isBooked: !s.is_available,
			}))
			setTimeSlots(slots)
            
            // Auto deselect if the current selectedTime is no longer in the list or is not available
            const selectedSlotIsAvailable = slots.some((s: any) => s.time === selectedTime && s.available)
            if (selectedTime && !selectedSlotIsAvailable) {
                setSelectedTime("")
            }
		}
	}, [zapSlotsData, selectedDate, selectedService, selectedTime, isLoadingZapSlots])

	const selectedServiceData = selectedService ? services.find(s => s.id === selectedService) : undefined
	const totalPrice = selectedServiceData?.price || 0

	const setMonth = (next = true) => {
		setSelectedTime("")
		let newMonth = next ? (currentMonth === 12 ? 1 : currentMonth + 1) : (currentMonth === 1 ? 12 : currentMonth - 1)
		let newYear = next
			? (currentMonth === 12 ? currentYear + 1 : currentYear)
			: (currentMonth === 1 ? currentYear - 1 : currentYear)
		setCurrentMonth(newMonth)
		setCurrentYear(newYear)
		setSelectedDate((newMonth === todayMonth && newYear === todayYear) ? todayDay : null)
	}
	const handlePreviousMonth = () => setMonth(false)
	const handleNextMonth = () => setMonth(true)

	const removePhoto = useCallback(
		(idx: number) => setPhotos(photos => photos.filter((_, i) => i !== idx)), []
	)

	const handleSubmit = async () => {
		if (!selectedService || !selectedDate || !selectedTime)
			return toast.error("Please complete all required fields")
		setIsSubmitting(true)
		setError(null)
		try {
			const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
			const digits = session?.user?.phone?.replace(/\D/g, "") ?? ""
			const phone =
				digits.length >= 7 && digits.length <= 15
					? `+${digits}`
					: ""
			if (!session?.user?.name?.trim() || !phone) {
				toast.error("Please sign in and add your name and phone on your profile before booking.")
				return
			}
			const bookingData = {
				serviceIds: [selectedService],
				date: dateStr,
				time: selectedTime,
				paymentMethod: "cash" as const,
				userName: session.user.name.trim(),
				phone,
				email: session.user.email ?? undefined,
				photoUrls: photos,
			}
			const res = await fetch("/api/v1/bookings", {
				method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(bookingData)
			})
			const body = await res.json().catch(() => ({})) as any
			if (!res.ok) {
				const msg = typeof body?.error === "string" ? body.error : "Failed to create booking"
				throw new Error(msg)
			}

			toast.success("Booking confirmed!")
			setSelectedService(""); setSelectedDate(null); setSelectedTime(""); setPhotos([]); setError(null)
		} catch (err: any) {
			const msg = err?.message || "An error occurred"
			setError(msg)
			toast.error(msg)
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		services, selectedService, setSelectedService, selectedDate, setSelectedDate, selectedTime, setSelectedTime,
		photos, setPhotos, currentMonth, currentYear, handlePreviousMonth, handleNextMonth,
		calendarDays, weekDays, timeSlots, dailyCapacities, error, isSubmitting,
		handleSubmit, totalPrice, selectedServiceData, removePhoto, isLoadingTimeSlots, isLoadingServices,
	}
}
