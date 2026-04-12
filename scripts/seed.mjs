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
import fs from 'fs';

console.log('🌱 Seeding database...\n');

// ── Clear existing seed data ──────────────────────────────────────────────────
try {
  db.prepare(`DELETE FROM services`).run();
  console.log('🗑️  Cleared existing services');
} catch(e) {}

// ── Services ─────────────────────────────────────────────────────────────────
const servicesJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'services.json'), 'utf8'));

const insertService = db.prepare(`
  INSERT INTO services (id, name, description, price, media_url, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const serviceIds = [];
for (const s of servicesJson) {
  const id = uuid();
  serviceIds.push(id);
  // Construct a consistent image path based on category and name
  const categoryPath = s.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  const fileName = s.name.toLowerCase().replace(/ /g, '-').replace(/\+/g, 'plus').replace(/\//g, '-').replace(/[()]/g, '') + '.webp';
  const imageUrl = `/images/services/${categoryPath}/${fileName}`;
  
  insertService.run(id, s.name, s.description, s.priceMin, imageUrl, now(), now());
  console.log(`✅ Service: ${s.name} — $${(s.priceMin/100).toFixed(2)}`);
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
