"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ArrowDownRight } from "lucide-react"
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  isToday,
  isBefore,
  startOfDay
} from "date-fns"

import { cn } from "@/lib/utils"

export type AvailabilityLevel = "available" | "filling-up" | "almost-full" | "full"

interface AvailabilityCalendarProps {
  value?: Date
  onChange?: (date: Date) => void
  /** Mapping of YYYY-MM-DD date string to availability level */
  availabilityMap?: Record<string, AvailabilityLevel>
  /** Called when the user navigates to a different month */
  onMonthChange?: (year: number, month: number) => void
  className?: string
  disabled?: boolean
}

export function AvailabilityCalendar({ value, onChange, availabilityMap = {}, onMonthChange, className, disabled }: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(value || new Date())

  const handlePrevMonth = () => {
    const next = subMonths(currentMonth, 1)
    setCurrentMonth(next)
    onMonthChange?.(next.getFullYear(), next.getMonth() + 1)
  }
  const handleNextMonth = () => {
    const next = addMonths(currentMonth, 1)
    setCurrentMonth(next)
    onMonthChange?.(next.getFullYear(), next.getMonth() + 1)
  }

  // Calculate grid days
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }) // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const dateFormat = "d"
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  // Mock pseudo-random availability if missing (for demo purposes)
  const getAvailability = (date: Date): AvailabilityLevel => {
    const key = format(date, "yyyy-MM-dd")
    if (availabilityMap[key]) return availabilityMap[key]
    
    // Fallback pseudo-random pattern for demonstration based on day of month
    if (isBefore(startOfDay(date), startOfDay(new Date()))) return "full"
    const daySeed = date.getDate() + date.getMonth()
    if (daySeed % 5 === 0) return "almost-full"
    if (daySeed % 3 === 0) return "available"
    if (daySeed % 2 === 0) return "filling-up"
    return "available"
  }

  const handleSelect = (day: Date) => {
    if (disabled) return
    const avail = getAvailability(day)
    if (onChange && !isBefore(startOfDay(day), startOfDay(new Date())) && avail !== "full") {
      onChange(day)
    }
  }

  return (
    <div className={cn("p-4 bg-white rounded-xl shadow-xs", className)}>
      
      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between mb-4">
        {/* Month/Year "dropdown" styling */}
        <div className="flex items-center gap-2">
           <div className="border rounded-md px-3 py-1.5 flex items-center justify-between min-w-[110px] text-sm font-medium hover:bg-slate-50 cursor-pointer">
             {format(currentMonth, "MMMM")}
             <svg className="w-4 h-4 ml-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
           </div>
           <div className="border rounded-md px-3 py-1.5 flex items-center justify-between w-[80px] text-sm font-medium hover:bg-slate-50 cursor-pointer">
             {format(currentMonth, "yyyy")}
             <svg className="w-4 h-4 ml-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
           </div>
        </div>

        {/* Previous / Next Month */}
        <div className="flex items-center gap-1">
          <button type="button" onClick={handlePrevMonth} className="p-1.5 border rounded-md hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button type="button" onClick={handleNextMonth} className="p-1.5 border rounded-md hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2 text-xs">
        <label className="text-slate-500 mr-2">Status</label>
        <div className="flex gap-2 flex-wrap">
            <div className="px-3 py-1 bg-[#ebf8f0] text-[#1e8b4e] font-medium rounded-sm border border-[#c1e8d4]">Available</div>
            <div className="px-3 py-1 bg-[#eff6ff] text-[#2c5ebc] font-medium rounded-sm border border-[#c0dbfe]">Filling up</div>
            <div className="px-3 py-1 bg-[#fef2f2] text-[#b91c1c] font-medium rounded-sm border border-[#fecaca]">Almost full</div>
            <div className="px-3 py-1 bg-slate-100 text-slate-500 font-medium rounded-sm border border-slate-200">Full</div>
        </div>
      </div>

      {/* WEEKLY HEADER */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-[11px] font-semibold text-slate-400">
            {day}
          </div>
        ))}
      </div>

      {/* DAYS GRID */}
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day, i) => {
          const isSelected = value ? isSameDay(day, value) : false
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isPast = isBefore(startOfDay(day), startOfDay(new Date()))
          const avail = getAvailability(day)
          
          let colorConfig = ""
          let arrowColor = ""

          if (isPast) {
             colorConfig = "bg-slate-100 border-slate-200 text-slate-400 opacity-60"
             arrowColor = "hidden"
          } else if (!isCurrentMonth) {
             // Out of month styling
             colorConfig = "bg-slate-50 border-slate-100 text-slate-300"
             arrowColor = "hidden"
          } else {
             // In month styling based on availability
             if (avail === "available") {
                 colorConfig = "bg-[#ebf8f0] border-[#c1e8d4] text-[#1e8b4e] hover:bg-[#d8eedf]"
                 arrowColor = "text-[#3bb56d]"
             } else if (avail === "filling-up") {
                 colorConfig = "bg-[#eff6ff] border-[#c0dbfe] text-[#2c5ebc] hover:bg-[#dfeefe]"
                 arrowColor = "text-[#679bf1]"
             } else if (avail === "almost-full") {
                 colorConfig = "bg-[#fef2f2] border-[#fecaca] text-[#b91c1c] hover:bg-[#fee2e2]"
                 arrowColor = "text-[#f87171]"
             } else {
                 colorConfig = "bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed"
                 arrowColor = "hidden"
             }
          }

          if (isSelected) {
              colorConfig = "bg-blue-600 border-blue-700 text-white shadow-inner"
              arrowColor = "text-blue-300"
          }

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => handleSelect(day)}
              disabled={isPast || avail === "full" || disabled}
              className={cn(
                "relative h-10 w-full rounded-md border-b-4 flex items-center justify-center text-sm font-semibold transition-all active:translate-y-1 active:border-b-0",
                colorConfig,
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Top-left arrow indicator for 3D UI match */}
              {arrowColor !== "hidden" && !isSelected && (
                <ArrowDownRight className={cn("absolute top-0.5 left-0.5 w-2.5 h-2.5", arrowColor)} />
              )}
              {format(day, dateFormat)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
