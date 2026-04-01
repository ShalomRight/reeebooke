// drizzle.config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle Kit configuration for local SQLite development.
// For Cloudflare D1 remote, add d1-http credentials.
// ─────────────────────────────────────────────────────────────────────────────

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

const localDbPath = process.env.LOCAL_DB_PATH || "./reebooking.db";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: localDbPath,
  },
});
