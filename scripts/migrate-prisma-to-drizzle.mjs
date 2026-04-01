/**
 * Prisma → Drizzle Migration Script
 * 
 * Converts all API route files from Prisma ORM calls to Drizzle ORM.
 * Run: node scripts/migrate-prisma-to-drizzle.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const API_DIR = path.join(ROOT, 'app', 'api');

// Find all route.ts files under app/api
function findRouteFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findRouteFiles(fullPath));
    } else if (entry.name === 'route.ts') {
      results.push(fullPath);
    }
  }
  return results;
}

// Map Prisma model names to Drizzle schema table names
const MODEL_MAP = {
  'user': 'users',
  'booking': 'bookings',
  'service': 'services',
  'cart': 'carts',
  'photo': 'photos',
  'favorite': 'favorites',
  'rating': 'ratings',
  'referralCode': 'referralCodes',
  'referralReward': 'referralRewards',
  'discountCode': 'discountCodes',
  'discountUsage': 'discountUsages',
  'promotionSubscriber': 'promotionSubscribers',
  'pointsRedemption': 'pointsRedemptions',
  'cartEmail': 'cartEmails',
  'verificationToken': 'verificationTokens',
  'account': 'accounts',
  'session': 'sessions',
};

function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Skip if already converted
  if (content.includes('from "@/src/db"') || content.includes("from '@/src/db'")) {
    return { path: filePath, status: 'skipped', reason: 'already converted' };
  }
  
  // Skip if doesn't use prisma
  if (!content.includes('prisma') && !content.includes('@/lib/prisma')) {
    return { path: filePath, status: 'skipped', reason: 'no prisma usage' };
  }

  // Collect which schema tables are used
  const usedModels = new Set();
  for (const [prismaModel, drizzleTable] of Object.entries(MODEL_MAP)) {
    const regex = new RegExp(`prisma\\.${prismaModel}\\.`, 'g');
    if (regex.test(content)) {
      usedModels.add(drizzleTable);
    }
  }

  // 1. Replace prisma import with db import + schema imports
  const schemaImports = usedModels.size > 0 
    ? `\nimport { ${Array.from(usedModels).join(', ')} } from "@/src/db/schema"`
    : '';
  
  // Check if we need eq, and, or, etc.
  const needsEq = content.includes('where:') || content.includes('.findUnique') || content.includes('.findFirst') || content.includes('.update') || content.includes('.delete');
  const needsAnd = content.includes('AND:') || content.includes('AND :');
  const needsOr = content.includes('OR:') || content.includes('OR :');
  const needsCount = content.includes('.count(');
  const needsSql = content.includes('increment:') || content.includes('decrement:');
  const needsDesc = content.includes('"desc"') || content.includes("'desc'");
  const needsAsc = content.includes('"asc"') || content.includes("'asc'");
  const needsGte = content.includes('gte:');
  const needsLte = content.includes('lte:');
  const needsLt = content.includes('lt:');
  const needsNot = content.includes('not:') || content.includes('{ not:');
  const needsIn = content.includes('in:');
  
  let drizzleImports = [];
  if (needsEq) drizzleImports.push('eq');
  if (needsAnd) drizzleImports.push('and');
  if (needsOr) drizzleImports.push('or');
  if (needsCount) drizzleImports.push('count');
  if (needsSql) drizzleImports.push('sql');
  if (needsDesc) drizzleImports.push('desc');
  if (needsAsc) drizzleImports.push('asc');
  if (needsGte || needsLte || needsLt) drizzleImports.push('gte', 'lte', 'lt');
  if (needsNot) drizzleImports.push('ne');
  if (needsIn) drizzleImports.push('inArray');
  
  // Remove duplicates
  drizzleImports = [...new Set(drizzleImports)];
  
  const drizzleOrmImport = drizzleImports.length > 0
    ? `\nimport { ${drizzleImports.join(', ')} } from "drizzle-orm"`
    : '';

  // Replace the prisma import line
  content = content.replace(
    /import\s*\{\s*prisma\s*\}\s*from\s*["']@\/lib\/prisma["']\s*;?\s*\n?/g,
    `import { db } from "@/src/db"${schemaImports}${drizzleOrmImport}\n`
  );
  
  // Also handle: import { prisma } from "@/lib/prisma" patterns with other imports on same line
  content = content.replace(
    /import\s*\{\s*prisma\s*\}\s*from\s*["']@\/lib\/prisma["']/g,
    `import { db } from "@/src/db"`
  );

  // 2. Replace Prisma operations with Drizzle equivalents
  // This is done via pattern-based replacement — handles the most common patterns
  
  // Remove Prisma-specific patterns from error handler
  content = content.replace(
    /import\s*\{[^}]*Prisma[^}]*\}\s*from\s*["']@prisma\/client["']\s*;?\s*\n?/g,
    ''
  );

  // Replace await prisma.$connect() — not needed in Drizzle
  content = content.replace(/\s*await\s+prisma\.\$connect\(\)\s*;?\s*\n?/g, '\n');
  
  // Simple findMany → db.query.model.findMany
  for (const [prismaModel, drizzleTable] of Object.entries(MODEL_MAP)) {
    // prisma.model.findMany({ ... }) → db.query.table.findMany({ ... })
    const findManyRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.findMany\\(`, 'g');
    content = content.replace(findManyRegex, `db.query.${drizzleTable}.findMany(`);
    
    // prisma.model.findFirst({ ... }) → db.query.table.findFirst({ ... })
    const findFirstRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.findFirst\\(`, 'g');
    content = content.replace(findFirstRegex, `db.query.${drizzleTable}.findFirst(`);
    
    // prisma.model.findUnique({ ... }) → db.query.table.findFirst({ ... })
    const findUniqueRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.findUnique\\(`, 'g');
    content = content.replace(findUniqueRegex, `db.query.${drizzleTable}.findFirst(`);
    
    // prisma.model.count({ ... }) → db.query.table.findMany({ ... }).length (simplified)
    const countRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.count\\(([^)]*)\\)`, 'g');
    content = content.replace(countRegex, (match, args) => {
      if (args.trim()) {
        return `db.query.${drizzleTable}.findMany(${args}).length`;
      }
      return `db.query.${drizzleTable}.findMany().length`;
    });
    
    // prisma.model.create({ data: ... }) → db.insert(table).values({ id: crypto.randomUUID(), ... }).returning().get()
    const createRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.create\\(`, 'g');
    content = content.replace(createRegex, `db.insert(${drizzleTable}).values(`);
    
    // prisma.model.update({ where: ..., data: ... }) → db.update(table).set(...).where(...).returning().get()
    const updateRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.update\\(`, 'g');
    content = content.replace(updateRegex, `db.update(${drizzleTable}).set(`);
    
    // prisma.model.delete({ where: ... }) → db.delete(table).where(...).run()
    const deleteRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.delete\\(`, 'g');
    content = content.replace(deleteRegex, `db.delete(${drizzleTable}).where(`);
    
    // prisma.model.deleteMany({ where: ... }) → db.delete(table).where(...).run()
    const deleteManyRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.deleteMany\\(`, 'g');
    content = content.replace(deleteManyRegex, `db.delete(${drizzleTable}).where(`);
    
    // prisma.model.upsert → manual find + insert/update
    const upsertRegex = new RegExp(`(?:await\\s+)?prisma\\.${prismaModel}\\.upsert\\(`, 'g');
    content = content.replace(upsertRegex, `/* TODO: Convert upsert */ db.insert(${drizzleTable}).values(`);
  }

  // Replace 'include:' with 'with:' for relational queries  
  content = content.replace(/\binclude\s*:\s*\{/g, 'with: {');
  
  // Replace 'select:' in sub-relations with 'columns:'
  // This is tricky - only replace select inside 'with' blocks for relations
  // We'll handle this manually for complex cases

  // Replace 'where: { email: value }' patterns with Drizzle eq()
  // This requires more complex AST-level changes, so we'll mark for manual review
  
  // Add TODO markers for complex patterns that need manual attention
  if (content.includes('where:') && !content.includes('/* TODO')) {
    // Add a note at the top if complex where clauses exist
    if (content.includes('OR:') || content.includes('AND:') || content.includes('gte:') || content.includes('orderBy:')) {
      const hasComment = content.includes('// TODO: Review Drizzle query conversions');
      if (!hasComment) {
        content = '// TODO: Review Drizzle query conversions — complex where/orderBy patterns need manual adjustment\n' + content;
      }
    }
  }

  if (content === originalContent) {
    return { path: filePath, status: 'unchanged', reason: 'no replacements made' };
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  return { path: filePath, status: 'converted', models: Array.from(usedModels) };
}

// Main
const routeFiles = findRouteFiles(API_DIR);
console.log(`Found ${routeFiles.length} route files\n`);

const results = {
  converted: [],
  skipped: [],
  unchanged: [],
};

for (const file of routeFiles) {
  const result = convertFile(file);
  const relPath = path.relative(ROOT, result.path);
  
  if (result.status === 'converted') {
    results.converted.push(relPath);
    console.log(`✅ ${relPath} — models: ${result.models.join(', ')}`);
  } else if (result.status === 'skipped') {
    results.skipped.push(relPath);
    console.log(`⏭️  ${relPath} — ${result.reason}`);
  } else {
    results.unchanged.push(relPath);
    console.log(`➖ ${relPath} — ${result.reason}`);
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Converted: ${results.converted.length}`);
console.log(`   Skipped:   ${results.skipped.length}`);
console.log(`   Unchanged: ${results.unchanged.length}`);
console.log(`\n⚠️  Files with TODO markers need manual review for complex query patterns.`);
