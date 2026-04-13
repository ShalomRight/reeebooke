import { getDb } from "@/src/db"
import { schedules, schedulePeriods, bookings } from "@/src/db/schema"
import { eq, and, gte, lt, ne } from "drizzle-orm"
import { format, parseISO, getDay, getISOWeek, differenceInDays } from "date-fns"

export type TimeSlot = {
  start_time: string;
  end_time: string;
  is_available: boolean;
  buffer_minutes: number;
}

// Helper to convert "HH:mm" to minutes since midnight
function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

// Helper to convert minutes to "HH:mm"
function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60).toString().padStart(2, '0')
  const m = (mins % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

function parseFrequencyData(dataRaw: string | null): Record<string, any> {
  if (!dataRaw) return {}
  try {
    return JSON.parse(dataRaw)
  } catch (e) {
    return {}
  }
}

// ─── Recurrence Evaluation ──────────────────────────────────────────────────

function doesScheduleMatchDate(schedule: any, targetDateObj: Date): boolean {
  const targetDateStr = format(targetDateObj, "yyyy-MM-dd")
  
  if (!schedule.frequency) {
     if (schedule.startDate && targetDateStr < schedule.startDate) return false
     if (schedule.endDate && targetDateStr > schedule.endDate) return false
     return true
  }

  if (schedule.startDate && targetDateStr < schedule.startDate) return false
  if (schedule.endDate && targetDateStr > schedule.endDate) return false

  const dayOfWeekIndex = getDay(targetDateObj) // 0=Sun, 1=Mon, ..., 6=Sat
  const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const targetDayName = dayMap[dayOfWeekIndex]
  
  const freqData = parseFrequencyData(schedule.frequencyData)

  switch (schedule.frequency) {
    case "daily":
      return true
    case "weekly":
      return freqData.days?.includes(targetDayName) || false
    case "weekly_odd":
      return (getISOWeek(targetDateObj) % 2 !== 0) && (freqData.days?.includes(targetDayName) || false)
    case "weekly_even":
      return (getISOWeek(targetDateObj) % 2 === 0) && (freqData.days?.includes(targetDayName) || false)
    case "biweekly":
      if (freqData.anchor_date) {
        const anchor = parseISO(freqData.anchor_date)
        const diffWeeks = Math.floor(Math.abs(differenceInDays(targetDateObj, anchor)) / 7)
        return (diffWeeks % 2 === 0) && (freqData.days?.includes(targetDayName) || false)
      }
      return freqData.days?.includes(targetDayName) || false
    // Note: Enterprise level N-week / monthly logic can be expanded here.
    default:
      return false
  }
}

// ─── Slot Generation ────────────────────────────────────────────────────────

export async function getBookableSlots(
  resourceType: string,
  resourceId: string,
  dateStr: string, // YYYY-MM-DD
  durationMinutes: number,
  bufferMinutes: number = 0
): Promise<TimeSlot[]> {
  
  const targetDate = parseISO(dateStr)
  const db = getDb()

  const activeSchedules = await db.query.schedules.findMany({
    where: and(
      eq(schedules.resourceType, resourceType),
      eq(schedules.resourceId, resourceId),
      eq(schedules.active, true)
    ),
    with: { periods: true }
  })

  // 2. Filter schedules that apply to this date
  const matchedSchedules = activeSchedules.filter(sch => doesScheduleMatchDate(sch, targetDate))
  
  // 3. Extract availability bounds (Type = availability) in minutes
  let availableIntervals: { start: number; end: number }[] = []
  
  const availabilitySch = matchedSchedules.filter(s => s.type === "availability")
  for (const sch of availabilitySch) {
    for (const p of sch.periods) {
      availableIntervals.push({
        start: timeToMinutes(p.startTime),
        end: timeToMinutes(p.endTime)
      })
    }
  }

  // Fallback: If no explicit availability was found for this specific resource,
  // we could potentially inject a default 09:00 - 17:00 if desired. 
  // But Zap says no rules = no availability.
  
  if (availableIntervals.length === 0) {
    return []
  }

  // 4. Merge overlapping available intervals
  availableIntervals.sort((a, b) => a.start - b.start)
  const mergedAvailability: { start: number; end: number }[] = [availableIntervals[0]]
  for (let i = 1; i < availableIntervals.length; i++) {
    const cur = availableIntervals[i]
    const last = mergedAvailability[mergedAvailability.length - 1]
    if (cur.start <= last.end) {
      last.end = Math.max(last.end, cur.end)
    } else {
      mergedAvailability.push(cur)
    }
  }

  // 5. Gather blockouts (Blocked schedules OR Appointment schedules OR Booking rows)
  const blockedIntervals: { start: number; end: number }[] = []
  
  const blockedSch = matchedSchedules.filter(s => s.type === "blocked" || s.type === "appointment")
  for (const sch of blockedSch) {
    for (const p of sch.periods) {
      blockedIntervals.push({
        start: timeToMinutes(p.startTime),
        end: timeToMinutes(p.endTime)
      })
    }
  }

  // If resourceType === 'service', we should fetch Bookings on this date!
  if (resourceType === 'service') {
    // Determine the next day's string for a safe < range
    const nextDate = new Date(targetDate)
    nextDate.setDate(nextDate.getDate() + 1)
    
    const existingBookings = await db.query.bookings.findMany({
      where: and(
        eq(bookings.serviceId, resourceId),
        gte(bookings.date, dateStr),
        lt(bookings.date, format(nextDate, "yyyy-MM-dd")),
        ne(bookings.status, "CANCELLED")
      ),
      columns: { time: true } // "HH:mm"
    })
    
    // Convert existing bookings to blockout intervals.
    // Note: Bookings in this app simply have a 'time' (start time). We will assume 
    // it blocks out the exact `durationMinutes` requested, plus `bufferMinutes`.
    for (const b of existingBookings) {
      if (!b.time) continue
      const startMins = timeToMinutes(b.time)
      blockedIntervals.push({
        start: startMins,
        end: startMins + durationMinutes + bufferMinutes
      })
    }
  }

  // 6. Subtract blockouts from availability to get functional open windows
  // For simplicity: we will just generate chunked slots and then filter them!
  
  const generatedSlots: TimeSlot[] = []

  for (const window of mergedAvailability) {
    let currentStart = window.start

    while (currentStart + durationMinutes <= window.end) {
      const currentEnd = currentStart + durationMinutes
      
      // Does this prospect slot overlap with any blocked interval?
      let overlaps = false
      for (const block of blockedIntervals) {
        // Overlap condition:
        if (currentStart < block.end && currentEnd > block.start) {
          overlaps = true
          break
        }
      }

      // Past time check (if today)
      const isToday = dateStr === format(new Date(), "yyyy-MM-dd")
      if (isToday) {
        const nowMins = new Date().getHours() * 60 + new Date().getMinutes()
        if (currentStart <= nowMins) {
           overlaps = true
        }
      }

      if (!overlaps) {
        generatedSlots.push({
          start_time: minutesToTime(currentStart),
          end_time: minutesToTime(currentEnd),
          is_available: true,
          buffer_minutes: bufferMinutes
        })
      }

      // Step forward by duration + buffer
      currentStart += durationMinutes + bufferMinutes
    }
  }

  return generatedSlots
}
