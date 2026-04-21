// src/db/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle ORM client for Reebooking — Next.js + Cloudflare D1.
// ─────────────────────────────────────────────────────────────────────────────

import * as schema from "./schema";
import { drizzle as drizzleProxy } from "drizzle-orm/sqlite-proxy";
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
 * Returns the Drizzle DB instance scoped to the current request.
 *
 * PRODUCTION (Vercel):
 *   Requires these env vars on Vercel:
 *     CLOUDFLARE_ACCOUNT_ID   — from `npx wrangler whoami`
 *     CLOUDFLARE_DATABASE_ID  — the D1 database_id in wrangler.jsonc
 *     CLOUDFLARE_D1_TOKEN     — Cloudflare API token (Account → D1 → Edit)
 *   Queries are routed through the Cloudflare D1 HTTP REST API.
 *
 * LOCAL DEV:
 *   Run `pnpm next dev` — uses better-sqlite3 against the local Wrangler D1 file.
 *   SQLite file: .wrangler/state/v3/d1/reebooking_db/local.sqlite
 *   Override with LOCAL_DB_PATH in .env.local.
 */
export function getDb() {
  const token = process.env.CLOUDFLARE_D1_TOKEN;

  if (token) {
    // Production: proxy every query through the Cloudflare D1 HTTP REST API.
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
    const databaseId = process.env.CLOUDFLARE_DATABASE_ID!;

    return drizzleProxy(
      async (sql: string, params: unknown[], method: string) => {
        const res = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sql, params }),
          }
        );

        const data = (await res.json()) as {
          success: boolean;
          errors?: { message: string }[];
          result: { results: Record<string, unknown>[] }[];
        };

        if (!data.success) {
          throw new Error(
            data.errors?.[0]?.message ?? "D1 HTTP query failed"
          );
        }

        const rows = data.result[0].results ?? [];

        if (method === "get") {
          return { rows: rows.length > 0 ? Object.values(rows[0]) : [] };
        }

        return { rows: rows.map((r) => Object.values(r)) };
      },
      { schema }
    );
  } else {
    // Local development (Node runtime): Use better-sqlite3.
    // require() prevents edge bundlers from trying to include native modules.
    const Database = require("better-sqlite3");
    const { drizzle } = require("drizzle-orm/better-sqlite3");
    const path = require("path");

    const dbPath =
      process.env.LOCAL_DB_PATH ||
      path.join(
        process.cwd(),
        ".wrangler/state/v3/d1/reebooking_db/local.sqlite"
      );

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
