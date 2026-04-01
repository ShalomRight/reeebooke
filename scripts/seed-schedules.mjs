/**
 * scripts/seed-schedules.mjs
 * 
 * Seeds Zap availability schedules for all services using the Zap builder
 * via the Next.js API (server must be running on localhost:3000).
 * 
 * Run: node scripts/seed-schedules.mjs
 */

const BASE = "http://localhost:3000"

const SERVICES = [
  { id: "6df611ef-3b0f-4bfa-9e85-56dd56c33b89", name: "Classic Manicure" },
  { id: "7ba91ae0-0f21-4a55-902d-a1bc05610726", name: "Gel Manicure" },
  { id: "a6a088db-5e2a-4250-bc52-e83917afaf60", name: "Acrylic Full Set" },
  { id: "bfc8909e-590c-46c9-9bac-a48c08c55994", name: "Spa Pedicure" },
  { id: "55b3330e-4a37-427d-b293-7570952f33ca", name: "Nail Art Design" },
  { id: "cf3b2ff6-8d0c-49a9-a73b-ca78ee696d16", name: "Classic Pedicure" },
]

async function postSchedule(serviceId, payload) {
  const typeMap = { availability: "availability", blocked: "blocked", appointment: "appointments" }
  const segment = typeMap[payload.type] ?? payload.type
  const url = `${BASE}/api/schedules/service/${serviceId}/${segment}`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`POST ${url} failed (${res.status}): ${JSON.stringify(err)}`)
  }
  return res.json()
}

async function seedService(service) {
  console.log(`\n── Seeding: ${service.name} (${service.id})`)

  // ── Tue/Wed/Thu/Fri availability: 09:00–13:00 (morning block)
  await postSchedule(service.id, {
    name: `${service.name} — Weekday Morning Availability`,
    type: "availability",
    frequency: "weekly",
    frequency_data: { days: ["tuesday", "wednesday", "thursday", "friday"] },
    active: true,
    allow_overlap: true,
    periods: [
      { start_time: "09:00", end_time: "13:00" },
    ],
  })
  console.log("  ✓ Weekday morning (Tue–Fri, 09:00–13:00)")

  // ── Tue/Thu afternoon session 14:00–18:00
  await postSchedule(service.id, {
    name: `${service.name} — Afternoon Availability`,
    type: "availability",
    frequency: "weekly",
    frequency_data: { days: ["tuesday", "thursday"] },
    active: true,
    allow_overlap: true,
    periods: [
      { start_time: "14:00", end_time: "18:00" },
    ],
  })
  console.log("  ✓ Afternoon (Tue+Thu, 14:00–18:00)")

  // ── Saturday half-day
  await postSchedule(service.id, {
    name: `${service.name} — Saturday Availability`,
    type: "availability",
    frequency: "weekly",
    frequency_data: { days: ["saturday"] },
    active: true,
    allow_overlap: true,
    periods: [
      { start_time: "09:00", end_time: "14:00" },
    ],
  })
  console.log("  ✓ Saturday (09:00–14:00)")

  console.log(`  ✅ ${service.name} done`)
}

async function main() {
  console.log("🗓  Seeding Zap schedules for all services...\n")

  // Clear existing schedules first
  const { default: Database } = await import("better-sqlite3")
  const db = new Database("./reebooking.db")
  const deleted = db.prepare("DELETE FROM schedule_periods").run()
  const deletedSch = db.prepare("DELETE FROM schedules").run()
  console.log(`🗑  Cleared ${deletedSch.changes} schedules, ${deleted.changes} periods`)
  db.close()

  for (const service of SERVICES) {
    await seedService(service)
  }

  console.log("\n🎉 All schedules seeded successfully!")
  console.log("\nExpected slots per service (60-min, 0 buffer):")
  console.log("  Tue: 09:00, 10:00, 11:00, 12:00  (morning) + 14:00, 15:00, 16:00, 17:00 (afternoon) = 8 slots")
  console.log("  Wed: 09:00, 10:00, 11:00, 12:00  = 4 slots")
  console.log("  Thu: 09:00, 10:00, 11:00, 12:00 + 14:00, 15:00, 16:00, 17:00 = 8 slots")
  console.log("  Fri: 09:00, 10:00, 11:00, 12:00  = 4 slots")
  console.log("  Sat: 09:00, 10:00, 11:00, 12:00, 13:00 = 5 slots")
}

main().catch(err => {
  console.error("❌ Seeding failed:", err.message)
  process.exit(1)
})
