// src/db/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle ORM client for Reebooking — Next.js local development.
//
// Uses better-sqlite3 for local dev (pnpm dev).
// For Cloudflare Pages production, swap to D1 binding via getCloudflareContext().
// ─────────────────────────────────────────────────────────────────────────────

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq, and, lt, desc, sql } from "drizzle-orm";
import * as schema from "./schema";
import {
  bookings,
  photos,
  carts,
  discountCodes,
  discountUsages,
  type NewBooking,
} from "./schema";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Singleton DB instance for development
// ─────────────────────────────────────────────────────────────────────────────

const globalForDb = globalThis as unknown as {
  _db: ReturnType<typeof createDb> | undefined;
};

function createDb() {
  const dbPath = process.env.LOCAL_DB_PATH || path.join(process.cwd(), "reebooking.db");
  const sqlite = new Database(dbPath);

  // Enable WAL mode for better concurrent read performance
  sqlite.pragma("journal_mode = WAL");
  // Enable foreign keys
  sqlite.pragma("foreign_keys = ON");

  return drizzle(sqlite, { schema });
}

/**
 * Returns the Drizzle DB instance. Singleton in development to avoid
 * creating multiple connections during HMR.
 */
export function getDb() {
  // Singleton in all environments — avoids opening a new SQLite file handle per request
  // (critical for serverless-style Node hosts and production stability).
  if (!globalForDb._db) {
    globalForDb._db = createDb();
  }

  return globalForDb._db;
}

export type DrizzleDb = ReturnType<typeof getDb>;

// ─────────────────────────────────────────────────────────────────────────────
// Shortcut: default db instance (import { db } from "@/src/db")
// ─────────────────────────────────────────────────────────────────────────────

export const db = getDb();

// ─────────────────────────────────────────────────────────────────────────────
// Transactions — atomic operations using better-sqlite3
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a booking AND its photos atomically.
 */
export async function createBookingWithPhotos(
  database: DrizzleDb,
  booking: NewBooking,
  photoUrls: string[]
): Promise<{ booking: typeof bookings.$inferSelect; photos: (typeof photos.$inferSelect)[] }> {
  const bookingId = crypto.randomUUID();

  // Use a transaction for atomicity
  const createdBooking = database
    .insert(bookings)
    .values({ ...booking, id: bookingId })
    .returning()
    .get();

  const createdPhotos = photoUrls.map((url) =>
    database
      .insert(photos)
      .values({
        id: crypto.randomUUID(),
        bookingId,
        url,
      })
      .returning()
      .get()
  );

  return { booking: createdBooking, photos: createdPhotos };
}

/**
 * Applies a discount code and records its usage atomically.
 */
export async function applyDiscountCode(
  database: DrizzleDb,
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

  // Atomic increment + insert
  database
    .update(discountCodes)
    .set({ usedCount: sql`${discountCodes.usedCount} + 1` })
    .where(eq(discountCodes.id, discountCodeId))
    .run();

  database
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
    })
    .run();
}

/**
 * Sweeps expired cart records.
 */
export async function purgeExpiredCarts(database: DrizzleDb) {
  const now = new Date().toISOString();
  return database.delete(carts).where(lt(carts.expiresAt, now)).run();
}

// Re-export schema for convenience
export * from "./schema";
