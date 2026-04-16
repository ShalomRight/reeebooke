/**
 * scripts/seed-service-schedules.mjs
 *
 * Generates drizzle/schedule-data-migration.sql with availability schedules
 * for all hair studio services — reads service data from D1 via wrangler CLI.
 *
 *   Natural Hair & Color & Chemical: Monday–Thursday, 09:00–17:00
 *   Locs: Friday 09:00–17:00 + Saturday 09:00–15:00
 *
 * Run:
 *   node scripts/seed-service-schedules.mjs
 *
 * Then apply:
 *   pnpm wrangler d1 execute reebooking-db --local  --file=drizzle/schedule-data-migration.sql
 *   pnpm wrangler d1 execute reebooking-db --remote --file=drizzle/schedule-data-migration.sql
 */

import { execSync } from "child_process"
import { randomUUID } from "crypto"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SQL_OUTPUT = path.join(ROOT, "drizzle", "schedule-data-migration.sql")

function esc(val) {
  if (val === null || val === undefined) return "NULL"
  return `'${String(val).replace(/'/g, "''")}'`
}

function now() {
  return new Date().toISOString()
}

// ── Fetch services from local D1 via wrangler ─────────────────────────────────

console.log("🔍 Reading services from D1 (local)...\n")

let services
try {
  const raw = execSync(
    `pnpm wrangler d1 execute reebooking-db --local --json --command="SELECT id, name, category FROM services ORDER BY category, name"`,
    { cwd: ROOT }
  ).toString()
  const parsed = JSON.parse(raw)
  services = parsed[0]?.results ?? []
} catch (err) {
  console.error("❌ Failed to query D1:", err.message)
  process.exit(1)
}

if (services.length === 0) {
  console.error("❌ No services found in D1.")
  process.exit(1)
}

console.log(`📋 Found ${services.length} services\n`)

// ── Build SQL ─────────────────────────────────────────────────────────────────

const ts = now()
const sqlRows = []

for (const service of services) {
  const isLocs = service.category === "Locs"

  if (isLocs) {
    // Friday 09:00–17:00
    const friId = randomUUID()
    const friPeriodId = randomUUID()
    sqlRows.push({
      scheduleId: friId,
      periodId: friPeriodId,
      name: `${service.name} — Friday`,
      serviceId: service.id,
      freqData: JSON.stringify({ days: ["friday"] }),
      startTime: "09:00",
      endTime: "17:00",
    })

    // Saturday 09:00–15:00
    const satId = randomUUID()
    const satPeriodId = randomUUID()
    sqlRows.push({
      scheduleId: satId,
      periodId: satPeriodId,
      name: `${service.name} — Saturday`,
      serviceId: service.id,
      freqData: JSON.stringify({ days: ["saturday"] }),
      startTime: "09:00",
      endTime: "15:00",
    })

    console.log(`  ✓ [Locs]              ${service.name}`)
    console.log(`      Fri 09:00–17:00  |  Sat 09:00–15:00`)
  } else {
    // Monday–Thursday 09:00–17:00
    const wdId = randomUUID()
    const wdPeriodId = randomUUID()
    sqlRows.push({
      scheduleId: wdId,
      periodId: wdPeriodId,
      name: `${service.name} — Mon–Thu`,
      serviceId: service.id,
      freqData: JSON.stringify({ days: ["monday", "tuesday", "wednesday", "thursday"] }),
      startTime: "09:00",
      endTime: "17:00",
    })

    console.log(`  ✓ [${(service.category ?? "").padEnd(18)}]  ${service.name}`)
    console.log(`      Mon–Thu 09:00–17:00`)
  }
}

// ── Write SQL file ────────────────────────────────────────────────────────────

let sql = `-- Abby Hair Studio — Service Availability Schedules
-- Generated: ${ts}
-- 
-- Natural Hair & Color & Chemical: Mon–Thu 09:00–17:00
-- Locs: Fri 09:00–17:00 + Sat 09:00–15:00
--
-- Apply locally:  pnpm wrangler d1 execute reebooking-db --local  --file=drizzle/schedule-data-migration.sql
-- Apply remotely: pnpm wrangler d1 execute reebooking-db --remote --file=drizzle/schedule-data-migration.sql

DELETE FROM schedule_periods;
DELETE FROM schedules;

`

for (const r of sqlRows) {
  sql += `INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES (${esc(r.scheduleId)}, ${esc(r.name)}, 'availability', 'service', ${esc(r.serviceId)}, 'weekly', ${esc(r.freqData)}, 1, 1, 0, ${esc(ts)}, ${esc(ts)});\n`
  sql += `INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES (${esc(r.periodId)}, ${esc(r.scheduleId)}, ${esc(r.startTime)}, ${esc(r.endTime)});\n\n`
}

fs.writeFileSync(SQL_OUTPUT, sql)

const locsCount = services.filter(s => s.category === "Locs").length
const nonLocsCount = services.length - locsCount

console.log(`\n✅ SQL generated:`)
console.log(`   ${nonLocsCount} regular services  → ${nonLocsCount} schedules`)
console.log(`   ${locsCount} Locs services      → ${locsCount * 2} schedules (Fri + Sat each)`)
console.log(`   Total: ${sqlRows.length} schedules, ${sqlRows.length} periods`)
console.log(`\n📄 Written to drizzle/schedule-data-migration.sql`)
console.log(`\n👉 Next steps:`)
console.log(`   pnpm wrangler d1 execute reebooking-db --local  --file=drizzle/schedule-data-migration.sql`)
console.log(`   pnpm wrangler d1 execute reebooking-db --remote --file=drizzle/schedule-data-migration.sql`)
