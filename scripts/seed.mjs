/**
 * Seed script — creates admin user and test services in the SQLite database
 * Run: node scripts/seed.mjs
 */
import Database from 'better-sqlite3';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DB_PATH = path.join(ROOT, 'reebooking.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function uuid() {
  return crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

// Simple password hash (bcrypt would need a worker, use fixed hash for seeding)
// Password: "admin123" — bcrypt hash pre-computed
const ADMIN_PASSWORD_HASH = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

console.log('🌱 Seeding database...\n');

// ── Clear existing seed data ──────────────────────────────────────────────────
try {
  db.prepare(`DELETE FROM services WHERE name LIKE 'Test%' OR name LIKE 'Gel%' OR name LIKE 'Manicure%' OR name LIKE 'Pedicure%' OR name LIKE 'Nail%' OR name LIKE 'Classic%' OR name LIKE 'Acrylic%' OR name LIKE 'Spa%'`).run();
} catch(e) {}

// ── Services ─────────────────────────────────────────────────────────────────
const serviceData = [
  { name: 'Classic Manicure', price: 2500 },
  { name: 'Gel Manicure', price: 4500 },
  { name: 'Acrylic Full Set', price: 7000 },
  { name: 'Spa Pedicure', price: 5500 },
  { name: 'Nail Art Design', price: 3500 },
  { name: 'Classic Pedicure', price: 3000 },
];

const insertService = db.prepare(`
  INSERT OR IGNORE INTO services (id, name, price, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?)
`);

const serviceIds = [];
for (const s of serviceData) {
  const id = uuid();
  serviceIds.push(id);
  insertService.run(id, s.name, s.price, now(), now());
  console.log(`✅ Service: ${s.name} — $${(s.price/100).toFixed(2)}`);
}

// ── Admin User ────────────────────────────────────────────────────────────────
const existingAdmin = db.prepare(`SELECT id FROM users WHERE email = ?`).get('admin@reebooking.com');

if (!existingAdmin) {
  const adminId = uuid();
  db.prepare(`
    INSERT INTO users (id, name, email, password, role, referral_points, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(adminId, 'Admin User', 'admin@reebooking.com', ADMIN_PASSWORD_HASH, 'ADMIN', 0, now(), now());
  console.log(`\n✅ Admin user: admin@reebooking.com / admin123`);
} else {
  console.log(`\n⏭️  Admin user already exists`);
}

// ── Test Client User ──────────────────────────────────────────────────────────
const existingClient = db.prepare(`SELECT id FROM users WHERE email = ?`).get('client@reebooking.com');

if (!existingClient) {
  const clientId = uuid();
  db.prepare(`
    INSERT INTO users (id, name, email, password, role, referral_points, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(clientId, 'Test Client', 'client@reebooking.com', ADMIN_PASSWORD_HASH, 'CLIENT', 0, now(), now());
  console.log(`✅ Client user: client@reebooking.com / admin123`);
} else {
  console.log(`⏭️  Client user already exists`);
}

console.log('\n✓ Seed complete!');
console.log('   Services:', serviceIds.length);
db.close();
