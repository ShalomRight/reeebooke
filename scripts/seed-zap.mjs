import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DB_PATH = path.join(ROOT, 'reebooking.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function now() {
  return new Date().toISOString();
}

console.log('⚡️ Seeding Zap Schedules...\n');

try {
  // First, find an existing service
  const service = db.prepare(`SELECT id, name FROM services LIMIT 1`).get();
  
  if (!service) {
    console.error("❌ No services found! Run `node scripts/seed.mjs` first.");
    process.exit(1);
  }

  console.log(`📌 Target Service: ${service.name} (${service.id})`);

  // Clear existing schedules for this service to avoid duplicates
  db.prepare(`DELETE FROM schedules WHERE resource_id = ?`).run(service.id);

  // 1. Create a Weekly availability schedule (Wed, Fri) from 09:00 to 13:00
  const availabilityId = randomUUID();
  db.prepare(`
    INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    availabilityId,
    "Standard Weekly Availability",
    "availability",
    "service",
    service.id,
    "weekly",
    JSON.stringify({ days: ["wednesday", "friday"] }),
    1,
    now(),
    now()
  );

  db.prepare(`
    INSERT INTO schedule_periods (id, schedule_id, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `).run(randomUUID(), availabilityId, "09:00", "13:00");
  
  console.log(`✅ Created Availability: Wed, Fri (09:00-13:00)`);

  // 2. Create a one-off blocked schedule (Let's say tomorrow from 09:00 to 11:00)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const blockedId = randomUUID();
  db.prepare(`
    INSERT INTO schedules (id, name, type, resource_type, resource_id, start_date, end_date, active, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    blockedId,
    "Emergency Maintenance",
    "blocked",
    "service",
    service.id,
    tomorrowStr,
    tomorrowStr,
    1,
    now(),
    now()
  );

  db.prepare(`
    INSERT INTO schedule_periods (id, schedule_id, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `).run(randomUUID(), blockedId, "09:00", "11:00");

  console.log(`✅ Created Blocked Period: ${tomorrowStr} (09:00-11:00)`);

  console.log('\n✓ Zap Schedule seeding complete! Test ZapBookingForm on the UI.');
} catch (error) {
  console.error("❌ Seeding failed:", error);
}

db.close();
