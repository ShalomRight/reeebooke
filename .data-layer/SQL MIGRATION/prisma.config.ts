// prisma.config.ts
// ─────────────────────────────────────────────────────────────────────────────
// This file is used by the Prisma CLI only (not at runtime).
// It tells Prisma where the *local* SQLite file is when running:
//   - prisma migrate diff   (generate migration SQL)
//   - prisma studio         (browse your local DB)
//
// At runtime in Cloudflare Workers, the D1 binding (env.DB) is passed directly
// to PrismaD1 — no DATABASE_URL is needed there.
// ─────────────────────────────────────────────────────────────────────────────

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Points to your local .sqlite file for CLI commands.
    // Set DATABASE_URL="file:./prisma/dev.db" in your .env file.
    url: env("DATABASE_URL"),
  },
});
