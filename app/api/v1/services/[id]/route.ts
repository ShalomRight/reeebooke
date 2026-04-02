import { authOptions } from "@/lib/auth"
import { db } from "@/src/db"
import { services } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const service = await db.query.services.findFirst({
      where: eq(services.id, id),
    })

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { name, price, description, mediaUrl } = body

    const userRole = (session.user as any).role

    if (!["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    db.update(services)
      .set({
        name,
        price,
        description: description ?? null,
        mediaUrl: mediaUrl ?? null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(services.id, id))
      .run()

    const service = await db.query.services.findFirst({
      where: eq(services.id, id),
    })

    return NextResponse.json(service, { status: 200 })
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const service = await db.query.services.findFirst({
      where: eq(services.id, id),
    })

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    const userRole = (session.user as any).role

    if (!["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    db.delete(services).where(eq(services.id, id)).run()

    return NextResponse.json({ message: "Service deleted" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
