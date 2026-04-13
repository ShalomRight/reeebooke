// src/db/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle ORM client for Reebooking — Next.js + Cloudflare D1.
// ─────────────────────────────────────────────────────────────────────────────

import * as schema from "./schema";
import {
  bookings,
  photos,
  carts,
  discountCodes,
  discountUsages,
  type NewBooking,
} from "./schema";

/**
 * Returns the Drizzle DB instance.
 * - Production (Cloudflare): Uses D1 binding from the environment.
 * - Development (Node): Uses better-sqlite3 locally.
 */
export async function getDb() {
  if (process.env.NEXT_RUNTIME === "edge" || process.env.NODE_ENV === "production") {
    // We're in the Cloudflare environment
    const { drizzle } = await import("drizzle-orm/d1");
    
    // In @cloudflare/next-on-pages, bindings are available on process.env
    // or via getCloudflareContext().
    const runtime = (globalThis as any).process?.env?.reebooking_db || (globalThis as any).reebooking_db;
    
    if (!runtime) {
      console.warn("D1 binding 'reebooking_db' not found. Falling back to console logging.");
    }
    
    return drizzle(runtime, { schema });
  } else {
    // Local development
    const Database = (await import("better-sqlite3")).default;
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const path = await import("path");

    const dbPath = process.env.LOCAL_DB_PATH || path.join(process.cwd(), "reebooking.db");
    const sqlite = new Database(dbPath);
    
    sqlite.pragma("journal_mode = WAL");
    sqlite.pragma("foreign_keys = ON");

    return drizzle(sqlite, { schema });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Standard DB instance (shortcut)
// ─────────────────────────────────────────────────────────────────────────────

// Note: In Next.js App Router (RSC), top-level await is supported.
// For compatibility with all layers, we export a helper.
export const db = await getDb();

// ─────────────────────────────────────────────────────────────────────────────
// Transactions & Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a booking AND its photos atomically.
 */
export async function createBookingWithPhotos(
  database: any, // Use any for cross-driver compatibility in helper types
  booking: NewBooking,
  photoUrls: string[]
): Promise<{ booking: typeof bookings.$inferSelect; photos: (typeof photos.$inferSelect)[] }> {
  const bookingId = crypto.randomUUID();

  const createdBooking = await database
    .insert(bookings)
    .values({ ...booking, id: bookingId })
    .returning()
    .then((res: any[]) => res[0]);

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
        .then((res: any[]) => res[0])
    )
  );

  return { booking: createdBooking, photos: createdPhotos };
}

/**
 * Applies a discount code and records its usage atomically.
 */
export async function applyDiscountCode(
  database: any,
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
  const { sql, eq } = await import("drizzle-orm");

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
export async function purgeExpiredCarts(database: any) {
  const { lt } = await import("drizzle-orm");
  const now = new Date().toISOString();
  return database.delete(carts).where(lt(carts.expiresAt, now));
}

export * from "./schema";
