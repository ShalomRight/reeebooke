/**
 * Seed demo users with correct bcrypt hashes
 * Password for all demo accounts: 123456
 * Run: node scripts/seed-demo-users.mjs
 */
import Database from 'better-sqlite3';
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

// bcrypt hash of '123456'
const HASH_123456 = '$2a$10$MC.aznkwXV73gf38wEmeKe21QQTZajpwVkzeuMcdLoDn2p3aeVEHu';

const demoUsers = [
  { email: 'super@demo.com', name: 'Super Admin Demo', role: 'SUPER_ADMIN' },
  { email: 'admin@demo.com', name: 'Admin Demo', role: 'ADMIN' },
  { email: 'staff@demo.com', name: 'Staff Demo', role: 'STAFF' },
  { email: 'client@demo.com', name: 'Client Demo', role: 'CLIENT' },
];

console.log('🌱 Seeding demo users...\n');

for (const user of demoUsers) {
  // Delete existing if present (to reset)
  db.prepare(`DELETE FROM users WHERE email = ?`).run(user.email);
  
  const id = crypto.randomUUID();
  db.prepare(`
    INSERT INTO users (id, name, email, password, role, referral_points, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, user.name, user.email, HASH_123456, user.role, 0, now(), now());
  
  console.log(`✅ ${user.role}: ${user.email} / 123456`);
}

console.log('\n✓ Demo users seeded!');
db.close();
