export const runtime = 'edge'

// app/api/admin/schedules/[scheduleId]/route.ts
// DELETE /api/admin/schedules/:scheduleId

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/src/db"
import { schedules, schedulePeriods } from "@/src/db/schema"
import { eq } from "drizzle-orm"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ scheduleId: string }> }
) {
  try {
    const db = getDb()
    const { scheduleId } = await params

    // Delete periods first (FK constraint in SQLite without CASCADE)
    await db.delete(schedulePeriods).where(eq(schedulePeriods.scheduleId, scheduleId))
    await db.delete(schedules).where(eq(schedules.id, scheduleId))

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[Admin Schedules DELETE]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
