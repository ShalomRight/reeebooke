"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { DailyCapacityMap } from "./useZapBookingForm"

interface CalendarCardProps {
  currentMonth: number
  currentYear: number
  handlePreviousMonth: () => void
  handleNextMonth: () => void
  calendarDays: (number | null)[]
  weekDays: string[]
  selectedDate: number | null
  setSelectedDate: (day: number | null) => void
  dailyCapacities: DailyCapacityMap
  selectedService?: string
  disabledDates?: number[]
}

// ─── Availability tier ────────────────────────────────────────────────────────
type AvailTier = "open" | "filling" | "almost" | "full" | "none"

function getTier(available: number, total: number, serviceSelected: boolean): AvailTier {
  if (!serviceSelected || total === 0) return "none"
  if (available === 0) return "full"
  
  const ratio = available / total
  if (ratio > 0.6) return "open" // Over 60% available
  if (ratio > 0.3) return "filling" // 30% - 60% available
  return "almost" // Less than 30% available
}

const tierStyles: Record<AvailTier, { pip: string; label: string }> = {
  open:    { pip: "bg-emerald-500",              label: "Available"   },
  filling: { pip: "bg-amber-400",                label: "Filling up"  },
  almost:  { pip: "bg-orange-500",               label: "Almost full" },
  full:    { pip: "bg-destructive",              label: "Full"        },
  none:    { pip: "bg-muted-foreground/20",      label: ""            },
}

// ─── Legend pill ──────────────────────────────────────────────────────────────
function LegendPill({ tier }: { tier: AvailTier }) {
  const { pip, label } = tierStyles[tier]
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${pip}`} />
      <span
        className="text-xs text-muted-foreground"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Slot pip row ─────────────────────────────────────────────────────────────
// Remaining slots are colored in the tier color; taken slots fade out.
function SlotPips({ available, total, tier }: { available: number; total: number; tier: AvailTier }) {
  if (total === 0 || tier === "none") return null
  
  // Cap at 8 pips visually so it doesn't spill out of the button box
  const pipCount = Math.min(total, 8)
  const scaledAvailable = Math.round((available / total) * pipCount)
  
  return (
    <div className="flex flex-wrap justify-center gap-[2px] mt-0.5 px-0.5 max-w-[32px]">
      {Array.from({ length: pipCount }).map((_, i) => (
        <span
          key={i}
          className={`block h-[3px] w-[5px] rounded-full transition-colors ${
            i < scaledAvailable ? tierStyles[tier].pip : "bg-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  )
}

// ─── Today "all hours passed" check ──────────────────────────────────────────
// We don't hardcode Zap slot times here — instead we simply check whether we're
// past 5 PM on today's date. Zap's engine already filters past-time slots on
// its own; this only gates the calendar day button itself.
function isTodayExhausted(
  day: number,
  currentMonth: number,
  currentYear: number,
  todayDay: number,
  todayMonth: number,
  todayYear: number
): boolean {
  if (day !== todayDay || currentMonth !== todayMonth || currentYear !== todayYear) return false
  const now = new Date()
  // Assume last slot window closes at 17:00; if past that, no point selecting today
  return now.getHours() >= 17
}

// ─── Component ────────────────────────────────────────────────────────────────
export function CalendarCard({
  currentMonth,
  currentYear,
  handlePreviousMonth,
  handleNextMonth,
  calendarDays,
  weekDays,
  selectedDate,
  setSelectedDate,
  dailyCapacities,
  selectedService,
  disabledDates = [],
}: CalendarCardProps) {
  const today        = new Date()
  const todayYear    = today.getFullYear()
  const todayMonth   = today.getMonth() + 1
  const todayDay     = today.getDate()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const serviceSelected = !!selectedService

  return (
    <div className="bg-card rounded-lg p-5 border border-border">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold text-card-foreground"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {monthNames[currentMonth - 1]} {currentYear}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={handlePreviousMonth}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Week-day headers ────────────────────────────────────────────────── */}
      <div className="mb-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* ── Day cells ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) return <div key={`empty-${index}`} />

            const isSelected  = selectedDate === day
            const isToday     = day === todayDay && currentMonth === todayMonth && currentYear === todayYear
            const isPast      = new Date(currentYear, currentMonth - 1, day) < new Date(todayYear, todayMonth - 1, todayDay)
            const capacity    = dailyCapacities[day] || { total: 0, available: 0 }
            const { total, available } = capacity
            
            const isFullyBooked    = total > 0 && available === 0
            const isNoAvailability = total === 0
            const exhaustedToday   = isTodayExhausted(day, currentMonth, currentYear, todayDay, todayMonth, todayYear)
            const isDisabledByProp = serviceSelected && disabledDates.includes(day)
            
            const isDisabled       = isPast || isFullyBooked || isNoAvailability || exhaustedToday || isDisabledByProp

            // Tier: past/exhausted/no-slots days stay "none" (just grey), fully-booked get "full"
            const tier: AvailTier =
              isPast || exhaustedToday ? "none"
              : !serviceSelected || isNoAvailability ? "none"
              : isFullyBooked          ? "full"
              : getTier(available, total, true)

            // Show pips when service picked AND day isn't in the past OR exhausted
            const showPips = serviceSelected && !isPast && !exhaustedToday && !isNoAvailability

            const tooltipText =
              isNoAvailability ? "No availability scheduled"
              : isFullyBooked  ? "All slots booked"
              : exhaustedToday ? "No more slots today"
              : isPast         ? "Date has passed"
              : serviceSelected && available > 0
                ? `${available} of ${total} slots remaining`
              : serviceSelected
                ? `${total} slots available`
              : ""

            return (
              <button
                key={day}
                onClick={() => !isDisabled && setSelectedDate(day)}
                disabled={Boolean(isDisabled)}
                style={{ fontFamily: "var(--font-dm-sans)", minHeight: "3rem" }}
                title={tooltipText}
                className={`
                  relative flex flex-col items-center justify-center rounded-lg
                  transition-all duration-150 py-1 px-0.5
                  ${isDisabled
                    ? "text-muted-foreground/30 cursor-not-allowed"
                    : isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : isToday
                        ? "border-2 border-primary text-card-foreground hover:bg-primary/10"
                        : "text-card-foreground hover:bg-muted"
                  }
                `}
              >
                {/* Date number */}
                <span className="text-sm font-semibold leading-none">{day}</span>

                {/* Pip bar — available + booked-out + semi-booked future days show pips */}
                {showPips && (
                  <SlotPips available={available} total={total} tier={tier} />
                )}

                {/* "FULL" label — future fully-booked days only */}
                {serviceSelected && isFullyBooked && !isPast && !exhaustedToday && (
                  <span
                    className={`mt-0.5 text-[9px] font-bold leading-none ${
                      isSelected ? "text-primary-foreground/80" : "text-destructive"
                    }`}
                  >
                    FULL
                  </span>
                )}

                {/* Selected underline accent */}
                {isSelected && showPips && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary-foreground/40" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Legend — only shown when a service is selected ─────────────────── */}
      {serviceSelected && (
        <div className="pt-3 border-t border-border">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <LegendPill tier="open"    />
            <LegendPill tier="filling" />
            <LegendPill tier="almost"  />
            <LegendPill tier="full"    />
          </div>
        </div>
      )}
    </div>
  )
}
