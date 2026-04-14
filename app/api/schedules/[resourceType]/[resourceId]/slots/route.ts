
import { NextRequest, NextResponse } from "next/server"
import { getBookableSlots } from "@/lib/zap/engine"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resourceType: string; resourceId: string }> }
) {
  try {
    const { resourceType, resourceId } = await params
    const { searchParams } = new URL(req.url)
    
    const date = searchParams.get("date")
    const durationParam = searchParams.get("duration")
    const bufferParam = searchParams.get("buffer")

    if (!date || !durationParam) {
      return NextResponse.json(
        { message: "Missing required query parameters: date, duration" },
        { status: 400 }
      )
    }

    const duration = parseInt(durationParam, 10)
    const buffer = parseInt(bufferParam || "0", 10)

    const slots = await getBookableSlots(resourceType, resourceId, date, duration, buffer)

    return NextResponse.json({
      data: {
        slots
      }
    })
  } catch (error: any) {
    console.error("[Zap] Slots Error:", error)
    return NextResponse.json({ message: error.message || "Internal server error", stack: error.stack }, { status: 500 })
  }
}
