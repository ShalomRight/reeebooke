import { db } from "@/src/db"
import { schedules, schedulePeriods } from "@/src/db/schema"

import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resourceType: string; resourceId: string; type: string }> }
) {
  try {
    const { resourceType, resourceId, type: typeSegment } = await params
    
    // Reverse map from zap.ts typeSegment() to actual internal type if necessary
    // But Zap Payload actually includes payload.type, so we can just extract from the body!
    const payload = await req.json()

    // 1. Insert into schedules
    const scheduleId = crypto.randomUUID()
    
    await db.insert(schedules).values({
      id: scheduleId,
      name: payload.name,
      type: payload.type,
      resourceType,
      resourceId,
      startDate: payload.start_date || null,
      endDate: payload.end_date || null,
      frequency: payload.frequency || null,
      frequencyData: payload.frequency_data ? JSON.stringify(payload.frequency_data) : null,
      active: payload.active ?? true,
      allowOverlap: payload.allow_overlap ?? false,
      noWeekends: payload.no_weekends ?? false,
      maxDurationMinutes: payload.max_duration_minutes || null,
      workingHoursStart: payload.working_hours_start || null,
      workingHoursEnd: payload.working_hours_end || null,
      metadata: payload.metadata ? JSON.stringify(payload.metadata) : null,
    })

    // 2. Insert mapped periods
    if (payload.periods && payload.periods.length > 0) {
      for (const p of payload.periods) {
         await db.insert(schedulePeriods).values({
           id: crypto.randomUUID(),
           scheduleId,
           startTime: p.start_time,
           endTime: p.end_time,
         })
      }
    }

    // Since this is SQLite D1 context, no nested relation returns exist easily on flat inserts.
    // So we just return success map
    return NextResponse.json({
      data: {
        schedule: {
          id: scheduleId,
          ...payload,
          resource_type: resourceType,
          resource_id: resourceId
        }
      }
    }, { status: 201 })
    
  } catch (error: any) {
    console.error("[Zap POST] Error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
