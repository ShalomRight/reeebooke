/**
 * Fix .findMany().length → (await .findMany()).length across all API routes
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function findTs(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) results.push(...findTs(p));
    else if (e.name.endsWith('.ts') || e.name.endsWith('.tsx')) results.push(p);
  }
  return results;
}

const dirs = [
  path.join(ROOT, 'app', 'api'),
  path.join(ROOT, 'lib'),
];

let totalFixed = 0;

for (const dir of dirs) {
  for (const f of findTs(dir)) {
    let c = fs.readFileSync(f, 'utf-8');
    const orig = c;

    // Fix: db.query.X.findMany(...).length → (await db.query.X.findMany(...)).length
    // Pattern: either "await db.query.X.findMany(...).length" or "db.query.X.findMany(...).length"
    c = c.replace(/(?:await\s+)?db\.query\.(\w+)\.(findMany|findFirst)\(([^)]*)\)\.length/g,
      (m, table, method, args) => `(await db.query.${table}.${method}(${args})).length`
    );

    if (c !== orig) {
      fs.writeFileSync(f, c, 'utf-8');
      console.log('Fixed:', path.relative(ROOT, f));
      totalFixed++;
    }
  }
}

console.log(`\nTotal files fixed: ${totalFixed}`);
