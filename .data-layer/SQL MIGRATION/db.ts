// src/lib/db.ts
// ─────────────────────────────────────────────────────────────────────────────
// Prisma client factory for Cloudflare Workers + D1.
//
// Usage in any Worker handler:
//
//   import { getDb } from "@/lib/db";
//
//   export default {
//     async fetch(request: Request, env: Env, ctx: ExecutionContext) {
//       const db = getDb(env);
//
//       const bookings = await db.booking.findMany({
//         where: { status: "PENDING" },
//         include: { service: true, user: true },
//       });
//
//       ctx.waitUntil(db.$disconnect());
//       return Response.json(bookings);
//     },
//   };
//
// ─────────────────────────────────────────────────────────────────────────────

import { PrismaClient } from "../generated/prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

export interface Env {
  DB: D1Database;
}

/**
 * Creates a PrismaClient instance backed by the D1 binding.
 *
 * Important: always call `ctx.waitUntil(db.$disconnect())` after your handler
 * so Cloudflare waits for the connection to close before freezing the Worker.
 * Failing to do this can cause memory leaks over time.
 */
export function getDb(env: Env): PrismaClient {
  const adapter = new PrismaD1(env.DB);
  return new PrismaClient({ adapter });
}

// ─────────────────────────────────────────────────────────────────────────────
// D1-aware query helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wraps a Prisma query with automatic retry on D1's transient "network errors".
 *
 * D1 is a distributed edge database. Occasionally a query may fail with a
 * retriable network error, especially under cold-start or high-load conditions.
 * D1 best practices recommend retrying with exponential back-off.
 *
 * @see https://developers.cloudflare.com/d1/best-practices/retry-queries/
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  {
    maxAttempts = 3,
    baseDelayMs = 100,
  }: { maxAttempts?: number; baseDelayMs?: number } = {}
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastError = err;

      const message =
        err instanceof Error ? err.message.toLowerCase() : String(err);

      // Only retry on transient D1 / network errors, not application errors
      const isRetriable =
        message.includes("network") ||
        message.includes("connection") ||
        message.includes("timeout") ||
        message.includes("d1_error");

      if (!isRetriable || attempt === maxAttempts) {
        throw err;
      }

      // Exponential back-off: 100ms, 200ms, 400ms …
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Example: paginate bookings using keyset / cursor pagination.
 *
 * D1 best-practice: avoid OFFSET on large tables (it scans and discards rows).
 * Cursor pagination is O(log n) via index instead of O(n).
 *
 * @see https://developers.cloudflare.com/d1/best-practices/query-d1/
 */
export async function getBookingsPage(
  db: PrismaClient,
  {
    cursor,
    limit = 20,
    status,
  }: {
    cursor?: { createdAt: Date; id: string };
    limit?: number;
    status?: string;
  }
) {
  return db.booking.findMany({
    take: limit,
    // Prisma cursor pagination — translates to a keyset WHERE clause,
    // which uses the @@index([date]) and @@index([status]) we defined.
    ...(cursor && {
      cursor: { id: cursor.id },
      skip: 1, // skip the cursor row itself
    }),
    where: status ? { status } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      service: { select: { id: true, name: true, price: true } },
      user: { select: { id: true, name: true, email: true } },
    },
  });
}
