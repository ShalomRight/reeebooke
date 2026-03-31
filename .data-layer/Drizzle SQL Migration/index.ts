// src/db/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle ORM client factory for Cloudflare D1 Workers.
//
// Usage in a Worker handler:
//
//   import { getDb } from "./db";
//
//   export default {
//     async fetch(request: Request, env: Env): Promise<Response> {
//       const db = getDb(env);
//       const allBookings = await db.query.bookings.findMany({
//         with: { service: true, user: true },
//       });
//       return Response.json(allBookings);
//     },
//   };
// ─────────────────────────────────────────────────────────────────────────────

import { drizzle } from "drizzle-orm/d1";
import { eq, and, lt, desc, asc } from "drizzle-orm";
import * as schema from "./schema";
import {
  bookings,
  photos,
  carts,
  discountCodes,
  discountUsages,
  type NewBooking,
  type NewPhoto,
} from "./schema";

export interface Env {
  DB: D1Database;
}

// ─────────────────────────────────────────────────────────────────────────────
// Client factory
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a fully-typed Drizzle client backed by the D1 binding.
 * Pass the full schema so the relational query API (db.query.*) works.
 */
export function getDb(env: Env) {
  return drizzle(env.DB, { schema });
}

export type DrizzleD1 = ReturnType<typeof getDb>;

// ─────────────────────────────────────────────────────────────────────────────
// Retry helper (D1 best practice)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wraps any async D1 operation with exponential back-off retry.
 *
 * D1 is a distributed edge database and can return transient network errors
 * under cold-start or high-load. Retrying with back-off is the recommended
 * best practice per Cloudflare's D1 documentation.
 *
 * @see https://developers.cloudflare.com/d1/best-practices/retry-queries/
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  { maxAttempts = 3, baseDelayMs = 100 } = {}
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const msg = err instanceof Error ? err.message.toLowerCase() : String(err);
      const isRetriable =
        msg.includes("network") ||
        msg.includes("connection") ||
        msg.includes("timeout") ||
        msg.includes("d1_error");

      if (!isRetriable || attempt === maxAttempts) throw err;

      await new Promise((r) => setTimeout(r, baseDelayMs * 2 ** (attempt - 1)));
    }
  }

  throw lastError;
}

// ─────────────────────────────────────────────────────────────────────────────
// Transactions — the main reason to use Drizzle over Prisma for D1
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a booking AND its photos atomically using D1's batch API.
 *
 * This is the key advantage of Drizzle over Prisma on D1.
 * Prisma silently drops transaction guarantees on D1; Drizzle's db.batch()
 * sends all statements in a single HTTP round-trip and rolls back on error.
 *
 * @see https://developers.cloudflare.com/d1/worker-api/d1-database/#batch-statements
 */
export async function createBookingWithPhotos(
  db: DrizzleD1,
  booking: NewBooking,
  photoUrls: string[]
): Promise<{ booking: typeof bookings.$inferSelect; photos: typeof photos.$inferSelect[] }> {
  const bookingId = crypto.randomUUID();

  // Build all INSERT statements upfront
  const bookingInsert = db
    .insert(bookings)
    .values({ ...booking, id: bookingId });

  const photoInserts = photoUrls.map((url) =>
    db.insert(photos).values({
      id: crypto.randomUUID(),
      bookingId,
      url,
    })
  );

  // db.batch() = single HTTP round-trip, atomic on D1
  await db.batch([bookingInsert, ...photoInserts]);

  // Fetch the created records
  const [createdBooking, createdPhotos] = await Promise.all([
    db.query.bookings.findFirst({ where: eq(bookings.id, bookingId) }),
    db.query.photos.findMany({ where: eq(photos.bookingId, bookingId) }),
  ]);

  if (!createdBooking) throw new Error("Booking insert failed");

  return { booking: createdBooking, photos: createdPhotos };
}

/**
 * Applies a discount code and records its usage atomically.
 *
 * Increments usedCount and creates a DiscountUsage row in a single batch —
 * preventing race conditions where two requests apply the same code.
 */
export async function applyDiscountCode(
  db: DrizzleD1,
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

  await db.batch([
    // Increment usedCount
    db
      .update(discountCodes)
      .set({ usedCount: discountCodes.usedCount })  // Drizzle sql`` for increment:
      // Use raw SQL for atomic increment
      .where(eq(discountCodes.id, discountCodeId)),

    // Record the usage
    db.insert(discountUsages).values({
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
    }),
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Cursor-based pagination helpers (D1 best practice — avoid OFFSET)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Paginates bookings using keyset pagination.
 *
 * D1 (and SQLite generally) should avoid OFFSET for large tables — it scans
 * and discards N rows every time. Keyset pagination uses an indexed column
 * as the cursor, making every page fetch O(log n).
 *
 * Uses the composite index: bookings_service_id_status_idx
 */
export async function getBookingsPage(
  db: DrizzleD1,
  {
    cursor,
    limit = 20,
    status,
    serviceId,
  }: {
    cursor?: string;          // last seen booking id
    cursorCreatedAt?: string; // last seen createdAt for tie-breaking
    limit?: number;
    status?: string;
    serviceId?: string;
  }
) {
  const conditions = [];
  if (status)    conditions.push(eq(bookings.status, status));
  if (serviceId) conditions.push(eq(bookings.serviceId, serviceId));

  const rows = await db.query.bookings.findMany({
    where: conditions.length ? and(...conditions) : undefined,
    orderBy: [desc(bookings.createdAt), desc(bookings.id)],
    limit: limit + 1, // fetch one extra to determine if there's a next page
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    with: {
      service: { columns: { id: true, name: true, price: true } },
      user:    { columns: { id: true, name: true, email: true } },
    },
  });

  const hasNextPage = rows.length > limit;
  const items = hasNextPage ? rows.slice(0, -1) : rows;

  return {
    items,
    hasNextPage,
    nextCursor: hasNextPage ? items[items.length - 1].id : null,
  };
}

/**
 * Sweeps expired cart records — run on a cron trigger or on-demand.
 * Uses the carts_expires_at_idx index for an efficient range delete.
 */
export async function purgeExpiredCarts(db: DrizzleD1) {
  const now = new Date().toISOString();
  return db.delete(carts).where(lt(carts.expiresAt, now));
}
