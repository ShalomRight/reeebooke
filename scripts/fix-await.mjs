/**
 * Fix missing `await` on db.query.* calls in all API route files.
 * With better-sqlite3 + drizzle-orm, the relational query API is async.
 * 
 * Run: node scripts/fix-await.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const API_DIR = path.join(ROOT, 'app', 'api');
const LIB_DIR = path.join(ROOT, 'lib');

function findTsFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findTsFiles(fullPath));
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Add await before db.query.*.findMany/findFirst/findMany where missing
  // Pattern: (const x = ) db.query.something.findX( → (const x = ) await db.query.something.findX(
  content = content.replace(
    /(?<!await\s)(?<!\bawait\b\s+)\b(db\.query\.\w+\.(findMany|findFirst)\()/g,
    'await $1'
  );

  // Also fix: return db.query.* → return await db.query.*
  content = content.replace(
    /return\s+db\.query\.\w+\.(findMany|findFirst)\(/g,
    (m) => m.replace('return db', 'return await db')
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    const rel = path.relative(ROOT, filePath);
    const count = (content.match(/await db\.query/g) || []).length;
    return { path: rel, fixed: true, awaitCount: count };
  }
  return { path: path.relative(ROOT, filePath), fixed: false };
}

const files = [...findTsFiles(API_DIR), ...findTsFiles(LIB_DIR)];
console.log(`Scanning ${files.length} TypeScript files...\n`);

let fixedCount = 0;
for (const file of files) {
  const result = fixFile(file);
  if (result.fixed) {
    fixedCount++;
    console.log(`✅ Fixed: ${result.path} (${result.awaitCount} awaits)`);
  }
}

console.log(`\n✓ Fixed ${fixedCount} files`);
