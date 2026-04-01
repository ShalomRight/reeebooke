#!/usr/bin/env bash
# scripts/find-local-db.sh
# ─────────────────────────────────────────────────────────────────────────────
# Locates the SQLite file Wrangler creates for local D1 development and
# exports its path as LOCAL_DB_PATH so Drizzle Kit can use it.
#
# Usage:
#   source scripts/find-local-db.sh          # sets LOCAL_DB_PATH in your shell
#   npx drizzle-kit studio                   # opens Drizzle Studio on local DB
#   npx drizzle-kit push                     # pushes schema to local DB
#
# Why this is needed:
#   Wrangler stores local D1 state at:
#     .wrangler/state/v3/d1/miniflare-D1DatabaseObject/<hash>.sqlite
#   The hash is derived from the binding's database_id and is not predictable.
#   This script finds it for you.
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

WRANGLER_STATE=".wrangler/state/v3/d1/miniflare-D1DatabaseObject"

if [ ! -d "$WRANGLER_STATE" ]; then
  echo "❌  Wrangler local D1 state not found at $WRANGLER_STATE"
  echo "   Run 'npx wrangler dev' at least once to create the local database."
  exit 1
fi

# Find the most recently modified .sqlite file (handles multiple bindings)
DB_FILE=$(find "$WRANGLER_STATE" -name "*.sqlite" ! -name "*-shm" ! -name "*-wal" \
  | sort -t/ -k1 | tail -n 1)

if [ -z "$DB_FILE" ]; then
  echo "❌  No .sqlite file found in $WRANGLER_STATE"
  echo "   Run 'npx wrangler dev' and make at least one request to initialise the DB."
  exit 1
fi

export LOCAL_DB_PATH="$DB_FILE"
echo "✅  LOCAL_DB_PATH=$LOCAL_DB_PATH"
