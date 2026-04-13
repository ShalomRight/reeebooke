"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarCard } from "@/components/SimpleBookingForm/CalendarCard"
import { DailyCapacityMap } from "@/components/SimpleBookingForm/useZapBookingForm"
import { ServiceSelection } from "@/components/SimpleBookingForm/ServiceSelection"
import { PhotoUpload } from "@/components/SimpleBookingForm/PhotoUpload"
import { TimeSelection } from "@/components/SimpleBookingForm/TimeSelection"
import type { CartItem } from "@/store/cartSlice"
import { DEFAULT_LEGACY_SLOT_TIMES, normalizeTimeTo24h } from "@/lib/booking/time"
import { Edit2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type Service = {
	id: string
	name: string
	price: number
	rating?: number
	ratingsCount?: number
}

type TimeSlot = {
	time: string
	displayLabel?: string
	available: boolean
	isBooked?: boolean
}

type BookingCount = {
	[key: number]: number
}

const defaultTimeSlots: TimeSlot[] = DEFAULT_LEGACY_SLOT_TIMES.map((s) => ({
	time: s.time,
	displayLabel: s.displayLabel,
	available: true,
}))

const generateCalendarDays = (month: number, year: number) => {
	const days: (number | null)[] = []
	const firstDayOfMonth = new Date(year, month - 1, 1).getDay()
	const daysInMonth = new Date(year, month, 0).getDate()
	for (let i = 0; i < firstDayOfMonth; i++) {
		days.push(null)
	}
	for (let day = 1; day <= daysInMonth; day++) {
		days.push(day)
	}
	return days
}

const parseSlotTimeToDate = (time24: string, date: Date) => {
	const [hours, minutes] = time24.split(":").map(Number)
	const timeDate = new Date(date)
	timeDate.setHours(hours, minutes, 0, 0)
	return timeDate
}

interface EditCartItemDialogProps {
	item: CartItem
	onUpdate: (id: string, updates: Partial<CartItem>) => Promise<void>
}

export function EditCartItemDialog({ item, onUpdate }: EditCartItemDialogProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [services, setServices] = useState<Service[]>([])
	const [selectedService, setSelectedService] = useState<string>(item.serviceId)
	const [selectedDate, setSelectedDate] = useState<number | null>(null)
	const [selectedTime, setSelectedTime] = useState<string>(() => {
		try {
			return normalizeTimeTo24h(item.time)
		} catch {
			return item.time
		}
	})
	const [photos, setPhotos] = useState<string[]>(item.photos || [])
	const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(defaultTimeSlots)
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
	const [bookingCounts, setBookingCounts] = useState<BookingCount>({})
	const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	const today = new Date()
	const todayYear = today.getFullYear()
	const todayMonth = today.getMonth() + 1
	const todayDay = today.getDate()
	const calendarDays = generateCalendarDays(currentMonth, currentYear)
	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

	// Initialize date from item
	useEffect(() => {
		if (item.date) {
			const dateObj = new Date(item.date)
			const itemYear = dateObj.getFullYear()
			const itemMonth = dateObj.getMonth() + 1
			const itemDay = dateObj.getDate()
			setCurrentYear(itemYear)
			setCurrentMonth(itemMonth)
			setSelectedDate(itemDay)
		}
	}, [item.date])

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await fetch("/api/v1/services?limit=1000")
				if (!response.ok) throw new Error("Failed to fetch services")
				const data = await response.json() as any
				setServices(data.services || [])
			} catch (err) {
				toast.error("Failed to load services")
			}
		}
		fetchServices()
	}, [])

	useEffect(() => {
		const fetchBookingCounts = async () => {
			try {
				const startDate = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
				const endDate = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${new Date(currentYear, currentMonth, 0).getDate()}`
				const response = await fetch(`/api/v1/bookings?startDate=${startDate}&endDate=${endDate}&limit=1000`)
				if (!response.ok) throw new Error("Failed to fetch bookings")
				const data = await response.json() as any
				const bookings = data.bookings ?? (Array.isArray(data) ? data : [])
				const counts: BookingCount = {}
				bookings.forEach((booking: { date: string }) => {
					const day = new Date(booking.date.includes("T") ? booking.date : `${booking.date}T12:00:00`).getDate()
					counts[day] = (counts[day] || 0) + 1
				})
				setBookingCounts(counts)
			} catch (err) {
				// Silently fail
			}
		}
		fetchBookingCounts()
	}, [currentMonth, currentYear])

	useEffect(() => {
		const fetchBookingsForDate = async () => {
			if (!selectedDate || !selectedService) {
				setTimeSlots(defaultTimeSlots.map((slot) => ({ ...slot, isBooked: false })))
				return
			}

			setIsLoadingTimeSlots(true)
			try {
				const date = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${selectedDate.toString().padStart(2, "0")}`
				const response = await fetch(`/api/v1/bookings?date=${date}&serviceId=${selectedService}&limit=1000`)
				if (!response.ok) throw new Error("Failed to fetch bookings")
				const data = await response.json() as any
				const bookings = data.bookings || []
				const bookedTimes = bookings.map((booking: { time: string }) => booking.time)

				let excludeNormalized: string | null = null
				if (item.date === date && item.serviceId === selectedService) {
					try {
						excludeNormalized = normalizeTimeTo24h(item.time)
					} catch {
						excludeNormalized = item.time
					}
				}
				const filteredBookedTimes = bookedTimes.filter((t: string) => t !== excludeNormalized)

				const isToday = selectedDate === todayDay && currentMonth === todayMonth && currentYear === todayYear
				const selectedDateTime = new Date(currentYear, currentMonth - 1, selectedDate)

				const updatedTimeSlots = defaultTimeSlots.map((slot) => {
					const isBooked = filteredBookedTimes.includes(slot.time)
					const slotTime = parseSlotTimeToDate(slot.time, selectedDateTime)
					if (isBooked) {
						return { ...slot, available: false, isBooked: true }
					}
					if (isToday && slotTime <= today) {
						return { ...slot, available: false, isBooked: false }
					}
					return { ...slot, available: true, isBooked: false }
				})

				setTimeSlots(updatedTimeSlots)
			} catch (err) {
				toast.error("Failed to load available time slots")
			} finally {
				setIsLoadingTimeSlots(false)
			}
		}
		fetchBookingsForDate()
	}, [selectedDate, selectedService, currentMonth, currentYear, item.date, item.serviceId, item.time, todayDay, todayMonth, todayYear])

	const handlePreviousMonth = () => {
		setSelectedDate(null)
		setSelectedTime("")
		if (currentMonth === 1) {
			setCurrentMonth(12)
			setCurrentYear(currentYear - 1)
		} else {
			setCurrentMonth(currentMonth - 1)
		}
	}

	const handleNextMonth = () => {
		setSelectedDate(null)
		setSelectedTime("")
		if (currentMonth === 12) {
			setCurrentMonth(1)
			setCurrentYear(currentYear + 1)
		} else {
			setCurrentMonth(currentMonth + 1)
		}
	}

	const selectedServiceData = selectedService ? services.find((s) => s.id === selectedService) : undefined

	const handleSave = async () => {
		if (!selectedService || !selectedDate || !selectedTime) {
			toast.error("Please complete all required fields")
			return
		}

		setIsSaving(true)
		try {
			const date = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${selectedDate.toString().padStart(2, "0")}`
			const updates: Partial<CartItem> = {
				serviceId: selectedService,
				serviceName: selectedServiceData?.name || item.serviceName,
				price: selectedServiceData?.price || item.price,
				date,
				time: selectedTime,
				photos,
			}

			await onUpdate(item.id, updates)
			toast.success("Cart item updated successfully")
			setIsOpen(false)
		} catch (error) {
			toast.error("Failed to update cart item")
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<button
					className="p-2 hover:bg-primary/10 rounded transition-colors opacity-70 hover:opacity-100"
					title="Edit item"
					aria-label={`Edit ${item.serviceName}`}
				>
					<Edit2 className="w-4 h-4 text-primary" />
				</button>
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] overflow-y-auto p-4 sm:p-6">
				<DialogHeader>
					<DialogTitle>Edit Cart Item</DialogTitle>
				</DialogHeader>
				<div className="space-y-6 py-4">
					{/* Service Selection */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Service</h3>
						<ServiceSelection
							services={services}
							selectedService={selectedService}
							setSelectedService={setSelectedService}
						/>
					</div>

					{/* Date Selection */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Date</h3>
							<CalendarCard
								currentMonth={currentMonth}
								currentYear={currentYear}
								handlePreviousMonth={handlePreviousMonth}
								handleNextMonth={handleNextMonth}
								calendarDays={calendarDays}
								weekDays={weekDays}
								selectedDate={selectedDate}
								setSelectedDate={setSelectedDate}
								dailyCapacities={Object.keys(bookingCounts).reduce((acc, day) => {
									const dayNum = Number(day);
									acc[dayNum] = { total: 6, available: Math.max(0, 6 - bookingCounts[dayNum]) };
									return acc;
								}, {} as DailyCapacityMap)}
								selectedService={selectedService}
								disabledDates={
									selectedService
										? Object.keys(bookingCounts)
											.filter((day) => bookingCounts[Number(day)] >= 6)
											.map(Number)
										: []
								}
							/>
						</div>

						{/* Time Selection */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Time</h3>
							<TimeSelection
								timeSlots={timeSlots}
								selectedTime={selectedTime}
								setSelectedTime={setSelectedTime}
								isLoading={isLoadingTimeSlots}
								disabled={!selectedService || !selectedDate}
							/>
						</div>

					{/* Photo Upload */}
					{selectedService && selectedDate && (
						<div>
							<h3 className="text-lg font-semibold mb-3">Photos (Optional)</h3>
							<PhotoUpload photos={photos} setPhotos={setPhotos} />
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex gap-3 justify-end pt-4 border-t">
						<Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSaving}>
							Cancel
						</Button>
						<Button onClick={handleSave} disabled={isSaving || !selectedService || !selectedDate || !selectedTime}>
							{isSaving ? "Saving..." : "Save Changes"}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

