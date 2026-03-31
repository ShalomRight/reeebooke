# Migrating from PostgreSQL → Cloudflare D1 with Prisma

## What changed in the schema

| Area | PostgreSQL (before) | D1 / SQLite (after) |
|---|---|---|
| `generator.provider` | `prisma-client-js` | `prisma-client` |
| `generator.runtime` | _(absent)_ | `"cloudflare"` |
| `datasource.provider` | `postgresql` | `sqlite` |
| `datasource.url` | `env("DATABASE_URL")` | _(removed — injected via D1 adapter)_ |
| `datasource.directUrl` | `env("DIRECT_URL")` | _(removed — not supported)_ |
| `Cart.expiresAt` default | `dbgenerated("now() + interval '24 hours'")` | `dbgenerated("(datetime('now', '+24 hours'))")` |
| `CartEmail.cartItems` | `Json` | `String` (SQLite stores JSON as TEXT) |
| New indexes added | — | Booking, Photo, CartEmail, User, Service, DiscountCode, PromotionSubscriber, PointsRedemption |

---

## Step 1 — Install dependencies

```bash
npm install @prisma/client @prisma/adapter-d1 dotenv
npm install --save-dev prisma
```

---

## Step 2 — Create your D1 database

```bash
npx wrangler@latest d1 create booking-app-prod
```

Copy the output and paste into `wrangler.jsonc` (see provided file).

---

## Step 3 — Set up local environment

Create `.env` in your project root:

```
DATABASE_URL="file:./prisma/dev.db"
```

Create `.dev.vars` (for `wrangler dev` — add any Worker-specific vars here, D1 binding is auto-injected):

```
# No DATABASE_URL needed here — D1 binding comes from wrangler.jsonc
```

---

## Step 4 — Generate your first migration

```bash
mkdir -p prisma/migrations

npx prisma migrate diff \
  --from-empty \
  --to-schema prisma/schema.prisma \
  --script > prisma/migrations/0001_init.sql
```

Inspect `prisma/migrations/0001_init.sql` to verify it looks correct — it should contain all your `CREATE TABLE` and `CREATE INDEX` statements.

---

## Step 5 — Apply migration to D1

```bash
# Local D1 (for `wrangler dev`)
npx wrangler d1 execute booking-app-prod \
  --local \
  --file="./prisma/migrations/0001_init.sql"

# Remote D1 (production)
npx wrangler d1 execute booking-app-prod \
  --remote \
  --file="./prisma/migrations/0001_init.sql"
```

---

## Step 6 — Generate Prisma Client

```bash
npx prisma generate
```

This outputs the D1-compatible client to `src/generated/prisma/`.

---

## Step 7 — Run PRAGMA optimize (after first migration)

After applying your migration, run this once against both local and remote D1 to warm up the query planner:

```bash
npx wrangler d1 execute booking-app-prod --local  --command "PRAGMA optimize;"
npx wrangler d1 execute booking-app-prod --remote --command "PRAGMA optimize;"
```

---

## Step 8 — Use the client in your Worker

```ts
// src/index.ts
import { getDb, withRetry, Env } from "./lib/db";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const db = getDb(env);

    // Wrap reads/writes in withRetry for D1 transient error resilience
    const bookings = await withRetry(() =>
      db.booking.findMany({
        where: { status: "PENDING" },
        include: { service: true },
        orderBy: { createdAt: "desc" },
        take: 20,
      })
    );

    ctx.waitUntil(db.$disconnect());
    return Response.json(bookings);
  },
};
```

---

## Future schema changes

For every subsequent schema change:

```bash
# 1. Edit prisma/schema.prisma

# 2. Generate the diff (from your current local D1 state)
npx prisma migrate diff \
  --from-local-d1 \
  --to-schema prisma/schema.prisma \
  --script > prisma/migrations/0002_your_change.sql

# 3. Apply locally first
npx wrangler d1 execute booking-app-prod --local --file="./prisma/migrations/0002_your_change.sql"

# 4. Regenerate client
npx prisma generate

# 5. Test locally with wrangler dev, then apply to production
npx wrangler d1 execute booking-app-prod --remote --file="./prisma/migrations/0002_your_change.sql"
```

---

## D1 limits to keep in mind

| Limit | Value |
|---|---|
| Max DB size | 10 GB (paid) / 500 MB (free) |
| Max query result size | 1 MB |
| Max batch size | 100 statements |
| Max rows read / day | 25 billion (paid) |
| Concurrent write transactions | 1 (SQLite single-writer) |

> **Tip:** D1 has [Global Read Replication (beta)](https://developers.cloudflare.com/d1/best-practices/read-replication/) which routes read queries to the nearest replica — great for your booking app's read-heavy listing/availability pages.
