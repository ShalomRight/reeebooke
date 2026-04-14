// drizzle.config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle Kit configuration.
//
// LOCAL  (no CLOUDFLARE_D1_TOKEN): targets the local Wrangler SQLite file.
// REMOTE (CLOUDFLARE_D1_TOKEN set): targets the live Cloudflare D1 database
//   via the D1 HTTP API.  Required env vars:
//     CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, CLOUDFLARE_D1_TOKEN
//
// NOTE: For future schema changes, apply migrations with:
//   pnpm db:migrate:remote   (uses wrangler — correct, DB tracks via d1_migrations)
// Do NOT use `drizzle-kit migrate` against the live D1 — it uses a separate
// __drizzle_migrations table and will conflict with the wrangler-managed history.
// ─────────────────────────────────────────────────────────────────────────────

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });
config({ path: ".env" });

const token = process.env.CLOUDFLARE_D1_TOKEN;

export default defineConfig(
  token
    ? {
        schema: "./src/db/schema.ts",
        out: "./drizzle/migrations",
        dialect: "sqlite",
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
          token,
        },
      }
    : {
        schema: "./src/db/schema.ts",
        out: "./drizzle/migrations",
        dialect: "sqlite",
        dbCredentials: {
          url:
            process.env.LOCAL_DB_PATH ||
            "./.wrangler/state/v3/d1/reebooking_db/local.sqlite",
        },
      }
);
