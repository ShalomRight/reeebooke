// app/api/admin/schedules/route.ts
// GET /api/admin/schedules?serviceId=xxx
// Returns all schedules + their periods for a given service

import { NextRequest, NextResponse } from "next/server"
import { db } from "@/src/db"
import { schedules, schedulePeriods } from "@/src/db/schema"
import { eq, and } from "drizzle-orm"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const serviceId = searchParams.get("serviceId")

    if (!serviceId) {
      return NextResponse.json({ error: "serviceId is required" }, { status: 400 })
    }

    // Fetch all schedules for this service
    const allSchedules = await db.query.schedules.findMany({
      where: and(
        eq(schedules.resourceType, "service"),
        eq(schedules.resourceId, serviceId)
      ),
      with: { periods: true },
      // newest first
    })

    // Sort by created_at descending
    allSchedules.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return NextResponse.json({ schedules: allSchedules })
  } catch (error: any) {
    console.error("[Admin Schedules GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
