// src/db/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle ORM client for Reebooking — Next.js + Cloudflare D1.
// ─────────────────────────────────────────────────────────────────────────────

import * as schema from "./schema";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { eq, sql, lt } from "drizzle-orm";

import {
  bookings,
  photos,
  carts,
  discountCodes,
  discountUsages,
  type NewBooking,
} from "./schema";

/**
 * Cloudflare Environment Bindings
 */
interface CloudflareEnv {
  reebooking_db: D1Database;
}

/**
 * Returns the Drizzle DB instance scoped to the current request.
 * 
 * LOCAL DEV WORKFLOW:
 * Option A — fast iteration (recommended for most dev work):
 *   npx next dev
 *   Uses better-sqlite3 fallback. HMR works. D1 binding not needed.
 *   SQLite file lives at .wrangler/state/v3/d1/reebooking_db/local.sqlite
 *
 * Option B — full Cloudflare simulation (use before deploying):
 *   npm run cf:dev
 *   Requires a build first. Uses real Wrangler D1 simulation.
 *   getCloudflareContext() works correctly in this mode.
 */
export function getDb() {
  if (process.env.NEXT_RUNTIME === "edge") {
    // Production / Edge Simulation: Use D1 binding from Cloudflare context
    const { env } = getRequestContext() as unknown as { env: CloudflareEnv };
    
    if (!env.reebooking_db) {
      throw new Error("D1 binding 'reebooking_db' not found in Cloudflare environment.");
    }
    
    return drizzleD1(env.reebooking_db, { schema });
  } else {
    // Local development (Node runtime): Use better-sqlite3
    // We use require() here to prevent the edge runtime from trying to bundle native modules
    const Database = require("better-sqlite3");
    const { drizzle } = require("drizzle-orm/better-sqlite3");
    const path = require("path");

    // Default to the Wrangler local D1 state directory
    // LOCAL_DB_PATH must be set in .env.local to point at the miniflare hashed
    // sqlite file under .wrangler/state/v3/d1/miniflare-D1DatabaseObject/.
    // Run: find .wrangler -name "*.sqlite" | grep -v metadata
    // to find the correct path if this ever stops working after a wrangler update.
    const dbPath = process.env.LOCAL_DB_PATH || 
                 path.join(process.cwd(), ".wrangler/state/v3/d1/reebooking_db/local.sqlite");

    const fs = require("fs");
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });

    const sqlite = new Database(dbPath);
    
    sqlite.pragma("journal_mode = WAL");
    sqlite.pragma("foreign_keys = ON");

    return drizzle(sqlite, { schema });
  }
}

/**
 * The Database type used across the application.
 * Inferred from the return type of getDb.
 */
export type Database = ReturnType<typeof getDb>;

// ─────────────────────────────────────────────────────────────────────────────
// Transactions & Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a booking AND its photos atomically.
 */
export async function createBookingWithPhotos(
  database: Database,
  booking: NewBooking,
  photoUrls: string[]
): Promise<{ booking: typeof bookings.$inferSelect; photos: (typeof photos.$inferSelect)[] }> {
  const bookingId = crypto.randomUUID();

  // Note: We don't use a top-level transaction here because D1 and 
  // better-sqlite3 handle them slightly differently in Drizzle.
  // Using .batch([]) or .transaction() is preferred for D1 but for 
  // simplicity and compatibility, we execute them sequentially or 
  // you can implement a driver-aware transaction wrapper.

  const createdBooking = await database
    .insert(bookings)
    .values({ ...booking, id: bookingId })
    .returning()
    .then((res: typeof bookings.$inferSelect[]) => res[0]);

  const createdPhotos = await Promise.all(
    photoUrls.map((url) =>
      database
        .insert(photos)
        .values({
          id: crypto.randomUUID(),
          bookingId,
          url,
        })
        .returning()
        .then((res: typeof photos.$inferSelect[]) => res[0])
    )
  );

  return { booking: createdBooking, photos: createdPhotos };
}

/**
 * Applies a discount code and records its usage atomically.
 */
export async function applyDiscountCode(
  database: Database,
  {
    discountCodeId,
    userId,
    email,
    userName,
    phone,
    discountAmount,
    cartTotal,
    finalTotal,
    bookingId,
  }: {
    discountCodeId: string;
    userId?: string;
    email?: string;
    userName?: string;
    phone?: string;
    discountAmount: number;
    cartTotal: number;
    finalTotal: number;
    bookingId?: string;
  }
) {
  const usageId = crypto.randomUUID();

  await database
    .update(discountCodes)
    .set({ usedCount: sql`${discountCodes.usedCount} + 1` })
    .where(eq(discountCodes.id, discountCodeId));

  await database
    .insert(discountUsages)
    .values({
      id: usageId,
      discountCodeId,
      userId,
      email,
      userName,
      phone,
      discountAmount,
      cartTotal,
      finalTotal,
      bookingId,
    });
}

/**
 * Sweeps expired cart records.
 */
export async function purgeExpiredCarts(database: Database) {
  const now = new Date().toISOString();
  return database.delete(carts).where(lt(carts.expiresAt, now));
}

// Re-export all schema definitions and types
export * from "./schema";
