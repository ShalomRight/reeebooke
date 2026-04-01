# 🔄 Restoration Plan — Revert to Prisma/PostgreSQL

If the Drizzle/D1 migration fails, follow these steps to restore the app to its pre-migration state.

## Quick Restore (Git)

```bash
cd /Users/shalomsutherland/Documents/Bookit/reebook/reebooking

# Reset ALL files to the pre-migration backup
git checkout master -- .

# Reinstall original dependencies
rm -rf node_modules
pnpm install

# Regenerate Prisma client
npx prisma generate

# Start the app
pnpm dev
```

## Manual Restore (if git fails)

### 1. Restore Dependencies

Edit `package.json` and re-add:
```json
"dependencies": {
  "@prisma/client": "^6.1.0",
  "@auth/prisma-adapter": "^2.11.1",
  "prisma": "^6.1.0"
}
```

Remove:
```json
"drizzle-orm", "better-sqlite3", "@auth/drizzle-adapter",
"drizzle-kit", "@types/better-sqlite3"
```

Then: `pnpm install && npx prisma generate`

### 2. Restore Database Config

Restore `lib/prisma.ts`:
```ts
import { PrismaClient } from "@prisma/client"
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

### 3. Restore Auth

In `lib/auth.ts`, change adapter back:
```ts
import { PrismaAdapter } from "@auth/prisma-adapter"
// ...
adapter: PrismaAdapter(prisma),
```

### 4. Restore .env

Ensure these are present:
```
DATABASE_URL="postgresql://shalomsutherland@localhost:5432/reebooking"
DIRECT_URL="postgresql://shalomsutherland@localhost:5432/reebooking"
```

### 5. Delete New Files

```bash
rm -rf src/db/
rm -f drizzle.config.ts
rm -f wrangler.jsonc
rm -rf drizzle/
rm -rf scripts/find-local-db.sh
rm -f reebooking.db
```

### 6. Verify

```bash
pnpm dev
# Visit http://localhost:3000 — should work with PostgreSQL
```

## Key Files That Were Changed

| File | Change | Restore From |
|------|--------|------------|
| `lib/prisma.ts` | Deleted | Git or manual above |
| `lib/auth.ts` | Adapter swapped | Git |
| `lib/error-handler.ts` | Prisma imports removed | Git |
| `lib/currentUserServer.ts` | Prisma → Drizzle | Git |
| `lib/referral-code-utils.ts` | Prisma → Drizzle | Git |
| `lib/referral-utils.ts` | Prisma → Drizzle | Git |
| `app/api/v1/**/*.ts` (37 files) | Prisma → Drizzle | Git |
| `package.json` | Dependencies changed | Git |
| `prisma/schema.prisma` | May be deleted | Git |
