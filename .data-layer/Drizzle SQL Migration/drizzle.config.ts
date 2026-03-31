// drizzle.config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle Kit configuration for Cloudflare D1.
//
// Two modes:
//   LOCAL  — used when LOCAL_DB_PATH is set (points Kit at Wrangler's SQLite)
//   REMOTE — used otherwise (hits D1 HTTP API with your Cloudflare credentials)
//
// Set credentials in .dev.vars:
//   CLOUDFLARE_ACCOUNT_ID=...
//   CLOUDFLARE_DATABASE_ID=...
//   CLOUDFLARE_D1_TOKEN=...
//   LOCAL_DB_PATH=...   (optional — see scripts/find-local-db.sh)
// ─────────────────────────────────────────────────────────────────────────────

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load from .dev.vars (Cloudflare's convention) or .env as fallback
config({ path: ".dev.vars" });
config({ path: ".env" });

const localDbPath = process.env.LOCAL_DB_PATH;

export default localDbPath
  ? // ── Local mode: point directly at Wrangler's SQLite file ───────────────
    defineConfig({
      schema:  "./src/db/schema.ts",
      out:     "./drizzle/migrations",
      dialect: "sqlite",
      dbCredentials: {
        url: localDbPath,
      },
    })
  : // ── Remote mode: use D1 HTTP API ────────────────────────────────────────
    defineConfig({
      schema:  "./src/db/schema.ts",
      out:     "./drizzle/migrations",
      dialect: "sqlite",
      driver:  "d1-http",
      dbCredentials: {
        accountId:  process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token:      process.env.CLOUDFLARE_D1_TOKEN!,
      },
    });
