# Prisma (PostgreSQL) → Drizzle ORM (Cloudflare D1) Migration Guide

## Why Drizzle over Prisma for D1

| Problem with Prisma on D1 | Drizzle solution |
|---|---|
| Transactions silently dropped — `booking + photos` is not atomic | `db.batch([...])` is truly atomic on D1 |
| ~2 MB bundle — breaks Cloudflare free tier (1 MB limit) | Tiny bundle, zero runtime engine |
| `prisma migrate dev/deploy` don't work natively | `drizzle-kit generate` + `wrangler d1 migrations apply` |
| Local dev pushes to remote DB | Works against Wrangler's local SQLite file |
| No Sessions API / read replication support | Full D1 API access |

---

## File overview

```
.
├── src/
│   └── db/
│       ├── schema.ts      ← All table + index definitions (converted from schema.prisma)
│       └── index.ts       ← getDb(), withRetry(), createBookingWithPhotos(), pagination
├── drizzle/
│   └── migrations/        ← Auto-generated SQL migration files (drizzle-kit generate)
├── scripts/
│   └── find-local-db.sh   ← Locates Wrangler's local SQLite file for Drizzle Kit
├── drizzle.config.ts      ← Drizzle Kit config (local SQLite or D1 HTTP API)
├── package.scripts.json   ← npm scripts reference — merge into your package.json
└── wrangler.jsonc         ← (unchanged from before)
```

---

## Step 1 — Install dependencies

```bash
npm install drizzle-orm
npm install -D drizzle-kit dotenv tsx
```

Remove Prisma packages:
```bash
npm uninstall @prisma/client @prisma/adapter-d1 prisma
```

---

## Step 2 — Set up environment variables

Create `.dev.vars` (Cloudflare's convention for Worker env vars, git-ignored):

```bash
# .dev.vars

# Cloudflare credentials — for drizzle-kit remote commands and wrangler dev
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_DATABASE_ID=your_d1_database_id_here
CLOUDFLARE_D1_TOKEN=your_d1_api_token_here

# LOCAL_DB_PATH is set dynamically by scripts/find-local-db.sh
# Do not set it here manually
```

> **Get your D1 token:** Cloudflare Dashboard → My Profile → API Tokens → Create Token → Custom Token → D1 Edit permissions.

---

## Step 3 — Generate your first migration

```bash
npx drizzle-kit generate
```

This reads `src/db/schema.ts` and creates `drizzle/migrations/0000_init.sql`.  
Inspect it — it should contain all your `CREATE TABLE` and `CREATE INDEX` statements.

---

## Step 4 — Apply migration to D1

```bash
# Local (for wrangler dev)
npx wrangler d1 migrations apply YOUR_DB_NAME --local

# Remote (production)
npx wrangler d1 migrations apply YOUR_DB_NAME --remote
```

Replace `YOUR_DB_NAME` with the `database_name` from your `wrangler.jsonc`.

---

## Step 5 — Run PRAGMA optimize

After applying the migration, warm up D1's query planner:

```bash
npx wrangler d1 execute YOUR_DB_NAME --local  --command "PRAGMA optimize;"
npx wrangler d1 execute YOUR_DB_NAME --remote --command "PRAGMA optimize;"
```

---

## Step 6 — Update your Worker code

### Before (Prisma)
```ts
import { PrismaClient } from "./generated/prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const prisma = new PrismaClient({ adapter: new PrismaD1(env.DB) });

const bookings = await prisma.booking.findMany({
  where: { status: "PENDING" },
  include: { service: true },
});

ctx.waitUntil(prisma.$disconnect());
```

### After (Drizzle)
```ts
import { getDb } from "./db";
import { eq } from "drizzle-orm";
import { bookings } from "./db/schema";

const db = getDb(env);

const results = await db.query.bookings.findMany({
  where: eq(bookings.status, "PENDING"),
  with: { service: true },
});

// No disconnect needed — Drizzle is stateless
```

---

## Common query patterns — Prisma → Drizzle

### Find one by ID
```ts
// Prisma
await prisma.user.findUnique({ where: { id } });

// Drizzle
await db.query.users.findFirst({ where: eq(users.id, id) });
```

### Find many with relation
```ts
// Prisma
await prisma.booking.findMany({
  where: { status: "PENDING" },
  include: { service: true, user: true },
});

// Drizzle
await db.query.bookings.findMany({
  where: eq(bookings.status, "PENDING"),
  with: { service: true, user: true },
});
```

### Create
```ts
// Prisma
await prisma.booking.create({ data: { ... } });

// Drizzle
await db.insert(bookings).values({ id: crypto.randomUUID(), ... });
```

### Update
```ts
// Prisma
await prisma.booking.update({ where: { id }, data: { status: "CONFIRMED" } });

// Drizzle
await db.update(bookings)
  .set({ status: "CONFIRMED" })
  .where(eq(bookings.id, id));
```

### Delete
```ts
// Prisma
await prisma.booking.delete({ where: { id } });

// Drizzle
await db.delete(bookings).where(eq(bookings.id, id));
```

### Atomic batch (Drizzle only — not possible safely with Prisma on D1)
```ts
// Create booking + photos in a single atomic D1 batch
import { createBookingWithPhotos } from "./db";

const { booking, photos } = await createBookingWithPhotos(db, bookingData, [
  "https://cdn.example.com/photo1.jpg",
  "https://cdn.example.com/photo2.jpg",
]);
```

---

## Local development with Drizzle Studio

```bash
# 1. Start wrangler dev to initialise the local SQLite file
npx wrangler dev

# 2. In a second terminal, find and export the local DB path
source scripts/find-local-db.sh

# 3. Open Drizzle Studio pointing at your local D1
npx drizzle-kit studio
```

---

## Future schema changes workflow

```bash
# 1. Edit src/db/schema.ts

# 2. Generate a new migration file
npx drizzle-kit generate
# → creates drizzle/migrations/0001_your_change.sql

# 3. Apply locally and test
npx wrangler d1 migrations apply YOUR_DB_NAME --local

# 4. Test with wrangler dev

# 5. Apply to production
npx wrangler d1 migrations apply YOUR_DB_NAME --remote
```

---

## Key schema differences — Prisma vs Drizzle

| | Prisma schema | Drizzle schema |
|---|---|---|
| **Table definition** | `model User { ... }` | `export const users = sqliteTable('users', { ... })` |
| **Primary key** | `@id @default(uuid())` | `text('id').primaryKey().$defaultFn(() => crypto.randomUUID())` |
| **Relations** | Magic `@relation()` — no FK column needed | Explicit FK column + `relations()` helper |
| **JSON column** | `Json` type | `text()` — you JSON.stringify/parse manually |
| **Boolean** | `Boolean` | `integer({ mode: "boolean" })` |
| **Timestamps** | `DateTime` | `text()` with ISO-8601 strings or `integer()` for Unix epoch |
| **Default now()** | `@default(now())` | `.default(sql\`(datetime('now'))\`)` |
| **Indexes** | `@@index([col])` | `index('name').on(t.col)` inside table definition |
| **Unique** | `@@unique([col])` | `uniqueIndex('name').on(t.col)` |
| **Type inference** | `Prisma.UserGetPayload<...>` | `typeof users.$inferSelect` |

---

## D1 limits reminder

| Limit | Value |
|---|---|
| Max DB size | 10 GB (paid) / 500 MB (free) |
| Max query result | 1 MB |
| Max batch statements | 100 |
| Concurrent writes | 1 (SQLite single-writer) |
| Bundle size (Drizzle) | ~few KB ✅ |
