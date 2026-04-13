import { getBookableSlots } from "@/lib/zap/engine"
import { getDb } from "@/src/db"
import { schedules } from "@/src/db/schema"
import { and, eq } from "drizzle-orm"

const DEFAULT_DURATION_MIN = 60
const DEFAULT_BUFFER_MIN = 0

async function serviceHasActiveSchedules(serviceId: string): Promise<boolean> {
	const db = getDb()
	const rows = await db.query.schedules.findMany({
		where: and(eq(schedules.resourceType, "service"), eq(schedules.resourceId, serviceId), eq(schedules.active, true)),
		columns: { id: true },
		limit: 1,
	})
	return rows.length > 0
}

/**
 * Returns true if the slot still appears bookable via Zap rules (availability minus existing bookings).
 * If no active schedules exist for the service, returns true so non-Zap / legacy setups keep working.
 * Call immediately before insert to reduce double-book risk (pair with DB constraint when available).
 */
export async function isZapSlotBookable(
	serviceId: string,
	dateYmd: string,
	time24: string,
	durationMinutes: number = DEFAULT_DURATION_MIN,
	bufferMinutes: number = DEFAULT_BUFFER_MIN
): Promise<boolean> {
	if (!(await serviceHasActiveSchedules(serviceId))) {
		return true
	}
	const slots = await getBookableSlots("service", serviceId, dateYmd, durationMinutes, bufferMinutes)
	return slots.some((s) => s.start_time === time24 && s.is_available)
}
