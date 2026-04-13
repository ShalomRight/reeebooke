export const runtime = 'edge'

import { NextRequest, NextResponse } from "next/server"
import { getBookableSlots } from "@/lib/zap/engine"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resourceType: string; resourceId: string }> }
) {
  try {
    const { resourceType, resourceId } = await params
    const { searchParams } = new URL(req.url)
    
    const yearParam = searchParams.get("year")
    const monthParam = searchParams.get("month")
    const durationParam = searchParams.get("duration")
    const bufferParam = searchParams.get("buffer")

    if (!yearParam || !monthParam || !durationParam) {
      return NextResponse.json(
        { message: "Missing required query parameters: year, month, duration" },
        { status: 400 }
      )
    }

    const year = parseInt(yearParam, 10)
    const month = parseInt(monthParam, 10) // 1-12
    const duration = parseInt(durationParam, 10)
    const buffer = parseInt(bufferParam || "0", 10)
    
    // Get total days in this month
    const daysInMonth = new Date(year, month, 0).getDate()
    
    // We will build a map of { [day: number]: { total: number, available: number } }
    const dailyCapacities: Record<number, { total: number, available: number }> = {}

    // Run queries in parallel for maximum speed (engine is optimized Drizzle memory filtering)
    // Actually wait, parallel querying `getBookableSlots` runs isolated `db.query` for bookings each time.
    // It is fast enough locally.
    
    const promises = []
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      
      promises.push(
        getBookableSlots(resourceType, resourceId, dateStr, duration, buffer).then(slots => {
          dailyCapacities[day] = {
            total: slots.length,
            available: slots.filter(s => s.is_available).length
          }
        })
      )
    }

    await Promise.all(promises)

    return NextResponse.json({
      data: {
        capacities: dailyCapacities
      }
    })
  } catch (error: any) {
    console.error("[Zap] Month Slots Error:", error)
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 })
  }
}
