module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}),
"[project]/src/db/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/db/schema.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle ORM schema — Cloudflare D1 (SQLite)
// Converted from Prisma (PostgreSQL) schema.
//
// Key differences from Prisma:
//   - Relations are explicit foreign-key columns + relation helpers (no magic)
//   - JSON columns → text() with runtime JSON.parse/stringify helpers
//   - Timestamps → integer() (Unix epoch) for fast indexing, or text() for ISO
//   - Indexes declared inline using index() / uniqueIndex()
//   - Transactions work properly via db.batch([]) or db.transaction()
// ─────────────────────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "accounts",
    ()=>accounts,
    "accountsRelations",
    ()=>accountsRelations,
    "bookings",
    ()=>bookings,
    "bookingsRelations",
    ()=>bookingsRelations,
    "cartEmails",
    ()=>cartEmails,
    "carts",
    ()=>carts,
    "cartsRelations",
    ()=>cartsRelations,
    "discountCodes",
    ()=>discountCodes,
    "discountCodesRelations",
    ()=>discountCodesRelations,
    "discountUsages",
    ()=>discountUsages,
    "discountUsagesRelations",
    ()=>discountUsagesRelations,
    "favorites",
    ()=>favorites,
    "favoritesRelations",
    ()=>favoritesRelations,
    "photos",
    ()=>photos,
    "photosRelations",
    ()=>photosRelations,
    "pointsRedemptions",
    ()=>pointsRedemptions,
    "pointsRedemptionsRelations",
    ()=>pointsRedemptionsRelations,
    "promotionSubscribers",
    ()=>promotionSubscribers,
    "promotionSubscribersRelations",
    ()=>promotionSubscribersRelations,
    "ratings",
    ()=>ratings,
    "ratingsRelations",
    ()=>ratingsRelations,
    "referralCodes",
    ()=>referralCodes,
    "referralCodesRelations",
    ()=>referralCodesRelations,
    "referralRewards",
    ()=>referralRewards,
    "referralRewardsRelations",
    ()=>referralRewardsRelations,
    "schedulePeriods",
    ()=>schedulePeriods,
    "schedulePeriodsRelations",
    ()=>schedulePeriodsRelations,
    "schedules",
    ()=>schedules,
    "schedulesRelations",
    ()=>schedulesRelations,
    "services",
    ()=>services,
    "servicesRelations",
    ()=>servicesRelations,
    "sessions",
    ()=>sessions,
    "sessionsRelations",
    ()=>sessionsRelations,
    "users",
    ()=>users,
    "usersRelations",
    ()=>usersRelations,
    "verificationTokens",
    ()=>verificationTokens
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/relations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/text.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/indexes.js [app-route] (ecmascript)");
;
;
// ─── Helpers ─────────────────────────────────────────────────────────────────
/** ISO-8601 timestamp stored as TEXT. Sortable and human-readable. */ const timestamp = (name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])(name).notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`);
/** Nullable ISO-8601 timestamp */ const timestampNullable = (name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])(name);
const accounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("accounts", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("type").notNull(),
    provider: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("provider").notNull(),
    providerAccountId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("provider_account_id").notNull(),
    refreshToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("refresh_token"),
    accessToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("access_token"),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("expires_at"),
    tokenType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("token_type"),
    scope: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("scope"),
    idToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id_token"),
    sessionState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("session_state")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("accounts_provider_account_idx").on(t.provider, t.providerAccountId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("accounts_user_id_idx").on(t.userId)
    ]);
const sessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("sessions", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    sessionToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("session_token").notNull().unique(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull(),
    expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("expires").notNull()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("sessions_user_id_idx").on(t.userId)
    ]);
const verificationTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("verification_tokens", {
    identifier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("identifier").notNull(),
    token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("token").notNull().unique(),
    expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("expires").notNull()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("verification_tokens_identifier_token_idx").on(t.identifier, t.token)
    ]);
const users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("users", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("name"),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("email").notNull().unique(),
    emailVerified: timestampNullable("email_verified"),
    password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("password"),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("role").notNull().default("CLIENT"),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("phone"),
    image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("image"),
    resetToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("reset_token"),
    resetTokenExpiry: timestampNullable("reset_token_expiry"),
    referralCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("referral_code").unique(),
    referredById: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("referred_by_id"),
    referralPoints: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("referral_points").notNull().default(0),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("users_role_idx").on(t.role),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("users_referred_by_id_idx").on(t.referredById)
    ]);
const services = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("services", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("price").notNull(),
    stripePriceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("stripe_price_id"),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`)
});
const bookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("bookings", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    serviceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("service_id").notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id"),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("date").notNull(),
    time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("time").notNull(),
    paymentMethod: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("payment_method").notNull(),
    mobileProvider: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("mobile_provider"),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("email"),
    userName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_name").notNull(),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("phone").notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("status").notNull().default("PENDING"),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("bookings_service_id_idx").on(t.serviceId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("bookings_user_id_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("bookings_status_idx").on(t.status),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("bookings_date_idx").on(t.date),
        // Composite: admin "pending bookings for a service" query
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("bookings_service_id_status_idx").on(t.serviceId, t.status)
    ]);
const photos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("photos", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    bookingId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("booking_id").notNull(),
    url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("url").notNull(),
    createdAt: timestamp("created_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("photos_booking_id_idx").on(t.bookingId)
    ]);
const carts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("carts", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id"),
    serviceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("service_id").notNull(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("date").notNull(),
    time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("time").notNull(),
    quantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("quantity").notNull().default(1),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`),
    // SQLite-compatible: 24-hour expiry set at insert time
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("expires_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now', '+24 hours'))`)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("carts_user_id_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("carts_service_id_idx").on(t.serviceId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("carts_expires_at_idx").on(t.expiresAt)
    ]);
const cartEmails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("cart_emails", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id"),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("email").notNull(),
    // JSON stored as TEXT — use JSON.stringify/parse in application code
    cartItems: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("cart_items").notNull(),
    sent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("sent", {
        mode: "boolean"
    }).notNull().default(false),
    sentAt: timestampNullable("sent_at"),
    createdAt: timestamp("created_at"),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("expires_at").notNull()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("cart_emails_user_id_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("cart_emails_email_idx").on(t.email),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("cart_emails_sent_expires_idx").on(t.sent, t.expiresAt)
    ]);
const favorites = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("favorites", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull(),
    serviceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("service_id").notNull(),
    createdAt: timestamp("created_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("favorites_user_id_service_id_idx").on(t.userId, t.serviceId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("favorites_user_id_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("favorites_service_id_idx").on(t.serviceId)
    ]);
const ratings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("ratings", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull(),
    serviceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("service_id").notNull(),
    rating: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("rating").notNull(),
    comment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("comment"),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("status").notNull().default("PENDING"),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("ratings_user_id_service_id_idx").on(t.userId, t.serviceId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("ratings_service_id_idx").on(t.serviceId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("ratings_user_id_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("ratings_status_idx").on(t.status),
        // Composite: approved ratings for a service (public display page)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("ratings_service_id_status_idx").on(t.serviceId, t.status)
    ]);
const referralCodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("referral_codes", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    code: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("code").notNull().unique(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull(),
    pointsPerReferral: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("points_per_referral").notNull().default(100),
    usageCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("usage_count").notNull().default(0),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("referral_codes_user_id_idx").on(t.userId)
    ]);
const referralRewards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("referral_rewards", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    referrerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("referrer_id").notNull(),
    referredId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("referred_id").notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id"),
    points: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("points").notNull(),
    bookingId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("booking_id"),
    createdAt: timestamp("created_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("referral_rewards_referrer_id_idx").on(t.referrerId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("referral_rewards_referred_id_idx").on(t.referredId)
    ]);
const promotionSubscribers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("promotion_subscribers", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("email").notNull().unique(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("name"),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("phone"),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id"),
    subscribed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("subscribed", {
        mode: "boolean"
    }).notNull().default(true),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("promotion_subscribers_user_id_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("promotion_subscribers_subscribed_idx").on(t.subscribed)
    ]);
const pointsRedemptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("points_redemptions", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull(),
    points: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("points").notNull(),
    discountAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("discount_amount").notNull(),
    bookingId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("booking_id"),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("status").notNull().default("PENDING"),
    createdAt: timestamp("created_at"),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("expires_at").notNull()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("points_redemptions_user_id_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("points_redemptions_status_expires_idx").on(t.status, t.expiresAt)
    ]);
const discountCodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("discount_codes", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    code: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("code").notNull().unique(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("type").notNull(),
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("value").notNull(),
    minAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("min_amount"),
    maxUses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("max_uses"),
    usedCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("used_count").notNull().default(0),
    expiresAt: timestampNullable("expires_at"),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("active", {
        mode: "boolean"
    }).notNull().default(true),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("discount_codes_code_idx").on(t.code),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("discount_codes_active_idx").on(t.active)
    ]);
const discountUsages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("discount_usages", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    discountCodeId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("discount_code_id").notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id"),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("email"),
    userName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_name"),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("phone"),
    discountAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("discount_amount").notNull(),
    cartTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("cart_total").notNull(),
    finalTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("final_total").notNull(),
    bookingId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("booking_id"),
    createdAt: timestamp("created_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("discount_usages_discount_code_id_idx").on(t.discountCodeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("discount_usages_user_id_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("discount_usages_email_idx").on(t.email)
    ]);
const schedules = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("schedules", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("type").notNull(),
    resourceType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("resource_type").notNull(),
    resourceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("resource_id").notNull(),
    startDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("start_date"),
    endDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("end_date"),
    frequency: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("frequency"),
    frequencyData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("frequency_data"),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("active", {
        mode: "boolean"
    }).notNull().default(true),
    allowOverlap: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("allow_overlap", {
        mode: "boolean"
    }).notNull().default(false),
    noWeekends: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("no_weekends", {
        mode: "boolean"
    }).notNull().default(false),
    maxDurationMinutes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("max_duration_minutes"),
    workingHoursStart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("working_hours_start"),
    workingHoursEnd: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("working_hours_end"),
    metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("metadata"),
    createdAt: timestamp("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("updated_at").notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`(datetime('now'))`)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("schedules_resource_type_idx").on(t.resourceType),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("schedules_resource_id_idx").on(t.resourceId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("schedules_active_idx").on(t.active)
    ]);
const schedulePeriods = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sqliteTable"])("schedule_periods", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),
    scheduleId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("schedule_id").notNull(),
    startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("start_time").notNull(),
    endTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("end_time").notNull()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("schedule_periods_schedule_id_idx").on(t.scheduleId)
    ]);
const usersRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(users, ({ one, many })=>({
        referredBy: one(users, {
            fields: [
                users.referredById
            ],
            references: [
                users.id
            ],
            relationName: "referrals"
        }),
        referrals: many(users, {
            relationName: "referrals"
        }),
        accounts: many(accounts),
        sessions: many(sessions),
        bookings: many(bookings),
        carts: many(carts),
        favorites: many(favorites),
        ratings: many(ratings),
        referralCodes: many(referralCodes),
        referralRewards: many(referralRewards),
        promotionSubscribers: many(promotionSubscribers),
        pointsRedemptions: many(pointsRedemptions),
        discountUsages: many(discountUsages)
    }));
const accountsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(accounts, ({ one })=>({
        user: one(users, {
            fields: [
                accounts.userId
            ],
            references: [
                users.id
            ]
        })
    }));
const sessionsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(sessions, ({ one })=>({
        user: one(users, {
            fields: [
                sessions.userId
            ],
            references: [
                users.id
            ]
        })
    }));
const servicesRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(services, ({ many })=>({
        bookings: many(bookings),
        carts: many(carts),
        favorites: many(favorites),
        ratings: many(ratings)
    }));
const bookingsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(bookings, ({ one, many })=>({
        service: one(services, {
            fields: [
                bookings.serviceId
            ],
            references: [
                services.id
            ]
        }),
        user: one(users, {
            fields: [
                bookings.userId
            ],
            references: [
                users.id
            ]
        }),
        photos: many(photos)
    }));
const photosRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(photos, ({ one })=>({
        booking: one(bookings, {
            fields: [
                photos.bookingId
            ],
            references: [
                bookings.id
            ]
        })
    }));
const cartsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(carts, ({ one })=>({
        user: one(users, {
            fields: [
                carts.userId
            ],
            references: [
                users.id
            ]
        }),
        service: one(services, {
            fields: [
                carts.serviceId
            ],
            references: [
                services.id
            ]
        })
    }));
const favoritesRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(favorites, ({ one })=>({
        user: one(users, {
            fields: [
                favorites.userId
            ],
            references: [
                users.id
            ]
        }),
        service: one(services, {
            fields: [
                favorites.serviceId
            ],
            references: [
                services.id
            ]
        })
    }));
const ratingsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(ratings, ({ one })=>({
        user: one(users, {
            fields: [
                ratings.userId
            ],
            references: [
                users.id
            ]
        }),
        service: one(services, {
            fields: [
                ratings.serviceId
            ],
            references: [
                services.id
            ]
        })
    }));
const referralCodesRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(referralCodes, ({ one })=>({
        user: one(users, {
            fields: [
                referralCodes.userId
            ],
            references: [
                users.id
            ]
        })
    }));
const referralRewardsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(referralRewards, ({ one })=>({
        user: one(users, {
            fields: [
                referralRewards.userId
            ],
            references: [
                users.id
            ]
        })
    }));
const promotionSubscribersRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(promotionSubscribers, ({ one })=>({
        user: one(users, {
            fields: [
                promotionSubscribers.userId
            ],
            references: [
                users.id
            ]
        })
    }));
const pointsRedemptionsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(pointsRedemptions, ({ one })=>({
        user: one(users, {
            fields: [
                pointsRedemptions.userId
            ],
            references: [
                users.id
            ]
        })
    }));
const discountCodesRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(discountCodes, ({ many })=>({
        usages: many(discountUsages)
    }));
const discountUsagesRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(discountUsages, ({ one })=>({
        discountCode: one(discountCodes, {
            fields: [
                discountUsages.discountCodeId
            ],
            references: [
                discountCodes.id
            ]
        }),
        user: one(users, {
            fields: [
                discountUsages.userId
            ],
            references: [
                users.id
            ]
        })
    }));
const schedulesRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(schedules, ({ many })=>({
        periods: many(schedulePeriods)
    }));
const schedulePeriodsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(schedulePeriods, ({ one })=>({
        schedule: one(schedules, {
            fields: [
                schedulePeriods.scheduleId
            ],
            references: [
                schedules.id
            ]
        })
    }));
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/db/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// src/db/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Drizzle ORM client for Reebooking — Next.js local development.
//
// Uses better-sqlite3 for local dev (pnpm dev).
// For Cloudflare Pages production, swap to D1 binding via getCloudflareContext().
// ─────────────────────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "applyDiscountCode",
    ()=>applyDiscountCode,
    "createBookingWithPhotos",
    ()=>createBookingWithPhotos,
    "db",
    ()=>db,
    "getDb",
    ()=>getDb,
    "purgeExpiredCarts",
    ()=>purgeExpiredCarts
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$better$2d$sqlite3$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/better-sqlite3/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
;
;
// ─────────────────────────────────────────────────────────────────────────────
// Singleton DB instance for development
// ─────────────────────────────────────────────────────────────────────────────
const globalForDb = globalThis;
function createDb() {
    const dbPath = process.env.LOCAL_DB_PATH || __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "reebooking.db");
    const sqlite = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](dbPath);
    // Enable WAL mode for better concurrent read performance
    sqlite.pragma("journal_mode = WAL");
    // Enable foreign keys
    sqlite.pragma("foreign_keys = ON");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$better$2d$sqlite3$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzle"])(sqlite, {
        schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
    });
}
function getDb() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Singleton in dev — prevents HMR from opening many connections
    if (!globalForDb._db) {
        globalForDb._db = createDb();
    }
    return globalForDb._db;
}
const db = getDb();
async function createBookingWithPhotos(database, booking, photoUrls) {
    const bookingId = crypto.randomUUID();
    // Use a transaction for atomicity
    const createdBooking = database.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"]).values({
        ...booking,
        id: bookingId
    }).returning().get();
    const createdPhotos = photoUrls.map((url)=>database.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["photos"]).values({
            id: crypto.randomUUID(),
            bookingId,
            url
        }).returning().get());
    return {
        booking: createdBooking,
        photos: createdPhotos
    };
}
async function applyDiscountCode(database, { discountCodeId, userId, email, userName, phone, discountAmount, cartTotal, finalTotal, bookingId }) {
    const usageId = crypto.randomUUID();
    // Atomic increment + insert
    database.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["discountCodes"]).set({
        usedCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["discountCodes"].usedCount} + 1`
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["discountCodes"].id, discountCodeId)).run();
    database.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["discountUsages"]).values({
        id: usageId,
        discountCodeId,
        userId,
        email,
        userName,
        phone,
        discountAmount,
        cartTotal,
        finalTotal,
        bookingId
    }).run();
}
async function purgeExpiredCarts(database) {
    const now = new Date().toISOString();
    return database.delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["carts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["lt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["carts"].expiresAt, now)).run();
}
;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/validations/schemas.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCartSchema",
    ()=>addToCartSchema,
    "applyDiscountSchema",
    ()=>applyDiscountSchema,
    "bulkBookingSchema",
    ()=>bulkBookingSchema,
    "cartItemSchema",
    ()=>cartItemSchema,
    "changePasswordSchema",
    ()=>changePasswordSchema,
    "checkoutSchema",
    ()=>checkoutSchema,
    "createBookingSchema",
    ()=>createBookingSchema,
    "createDiscountSchema",
    ()=>createDiscountSchema,
    "createRatingSchema",
    ()=>createRatingSchema,
    "createServiceSchema",
    ()=>createServiceSchema,
    "forgotPasswordSchema",
    ()=>forgotPasswordSchema,
    "getBookingsQuerySchema",
    ()=>getBookingsQuerySchema,
    "getRatingsQuerySchema",
    ()=>getRatingsQuerySchema,
    "getServicesQuerySchema",
    ()=>getServicesQuerySchema,
    "getUserQuerySchema",
    ()=>getUserQuerySchema,
    "guestSignupSchema",
    ()=>guestSignupSchema,
    "registerUserSchema",
    ()=>registerUserSchema,
    "resetPasswordSchema",
    ()=>resetPasswordSchema,
    "searchQuerySchema",
    ()=>searchQuerySchema,
    "sendWhatsAppSchema",
    ()=>sendWhatsAppSchema,
    "updateCartItemSchema",
    ()=>updateCartItemSchema,
    "updateDiscountSchema",
    ()=>updateDiscountSchema,
    "updateServiceSchema",
    ()=>updateServiceSchema,
    "updateUserSchema",
    ()=>updateUserSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
// Common validation helpers
const phoneRegex = /^\+?[0-9]{7,15}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const createBookingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    serviceIds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Service ID cannot be empty")).min(1, "At least one service is required"),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().refine((val)=>dateRegex.test(val) || !isNaN(Date.parse(val)), {
        message: "Date must be in YYYY-MM-DD format or a valid ISO date string"
    }),
    time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Time is required"),
    paymentMethod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "cash",
        "stripe",
        "mobile"
    ], {
        errorMap: ()=>({
                message: "Invalid payment method"
            })
    }),
    mobileProvider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    photoUrls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url("Invalid photo URL")).optional(),
    userName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Name is required").max(255, "Name is too long"),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(phoneRegex, "Invalid phone number format").max(20, "Phone number is too long"),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email format").optional()
});
const getBookingsQuerySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    startDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    endDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    serviceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().default(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().max(1000).default(10),
    sort: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "date-desc",
        "date-asc",
        "price-desc",
        "price-asc"
    ]).default("date-desc"),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "ALL",
        "PENDING",
        "CONFIRMED",
        "COMPLETED",
        "CANCELLED"
    ]).default("ALL")
});
const cartItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    serviceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    serviceName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive(),
    photos: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()).optional()
});
const checkoutSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    cartItems: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(cartItemSchema).min(1, "Cart is empty"),
    totalPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Total price must be positive"),
    userName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(255),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(20),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email().optional(),
    bookingFor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "self",
        "other"
    ]).optional(),
    discountCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    discountAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    finalPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive().optional(),
    referralCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const createRatingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    serviceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid("Invalid service ID"),
    rating: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).max(5, "Rating must be between 1 and 5"),
    comment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(1000).optional()
});
const getRatingsQuerySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    serviceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().default(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().max(100).default(10)
});
const createServiceSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Name is required").max(255),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Price must be positive"),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(5000).optional(),
    duration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional()
});
const updateServiceSchema = createServiceSchema.partial();
const getServicesQuerySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    sort: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    sortBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "name",
        "price",
        "createdAt"
    ]).optional(),
    sortOrder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "asc",
        "desc"
    ]).optional(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().default(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().max(1000).default(10)
}).transform((data)=>{
    // Handle legacy "sort" parameter (e.g., "name-asc", "price-desc")
    if (data.sort && !data.sortBy) {
        const [sortBy, sortOrder] = data.sort.split("-");
        return {
            ...data,
            sortBy: sortBy === "name" || sortBy === "price" || sortBy === "createdAt" ? sortBy : "name",
            sortOrder: sortOrder === "asc" || sortOrder === "desc" ? sortOrder : "asc"
        };
    }
    return {
        sortBy: data.sortBy || "name",
        sortOrder: data.sortOrder || "asc",
        search: data.search,
        page: data.page,
        limit: data.limit,
        sort: data.sort
    };
});
const applyDiscountSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Code is required"),
    cartTotal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Cart total must be positive")
});
const createDiscountSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(50),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "PERCENT",
        "FIXED"
    ]),
    value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive(),
    minAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    maxUses: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    expiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().optional(),
    active: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true)
});
const updateDiscountSchema = createDiscountSchema.partial();
const getUserQuerySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "CLIENT",
        "STAFF",
        "ADMIN",
        "SUPER_ADMIN"
    ]).optional(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().default(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().max(100).default(10),
    sortBy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "name",
        "email",
        "createdAt",
        "role"
    ]).default("createdAt"),
    sortOrder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "asc",
        "desc"
    ]).default("desc")
});
const searchQuerySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    q: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Search query is required"),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "all",
        "bookings",
        "users",
        "services",
        "discounts",
        "referrals"
    ]).default("all"),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().default(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().max(100).default(10)
});
const addToCartSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    serviceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    photos: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()).optional()
});
const updateCartItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    photos: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()).optional()
});
const bulkBookingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    cartItems: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(cartItemSchema).min(1, "Cart is empty"),
    userName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Name is required").max(255, "Name is too long"),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(phoneRegex, "Invalid phone number format").max(20, "Phone number is too long"),
    paymentMethod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "cash",
        "mobile"
    ], {
        errorMap: ()=>({
                message: "Invalid payment method"
            })
    }),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email format").optional(),
    bookingFor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "self",
        "other"
    ]).optional(),
    discountCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    discountAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    totalPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Total price must be positive").optional(),
    finalPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Final price must be positive").optional(),
    referralCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const registerUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email format").min(1, "Email is required"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6, "Password must be at least 6 characters").max(100, "Password is too long"),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Name is required").max(255, "Name is too long"),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(phoneRegex, "Invalid phone number format").max(20, "Phone number is too long").optional(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "CLIENT",
        "STAFF",
        "ADMIN",
        "SUPER_ADMIN"
    ]).default("CLIENT"),
    referralCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const updateUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(255).optional(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(phoneRegex).max(20).optional(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email().optional(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "CLIENT",
        "STAFF",
        "ADMIN",
        "SUPER_ADMIN"
    ]).optional()
});
const forgotPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email format").min(1, "Email is required")
});
const resetPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email format").min(1, "Email is required"),
    token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Token is required"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6, "Password must be at least 6 characters").max(100, "Password is too long")
});
const changePasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    currentPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Current password is required"),
    newPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6, "New password must be at least 6 characters").max(100, "Password is too long")
});
const sendWhatsAppSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    userName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Name is required").max(255),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(phoneRegex, "Invalid phone number format").max(20),
    serviceName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Service name is required"),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(dateRegex, "Date must be in YYYY-MM-DD format"),
    time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Time is required"),
    totalPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Price must be positive")
});
const guestSignupSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Name is required").max(255),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email format").min(1, "Email is required"),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(phoneRegex, "Invalid phone number format").max(20).optional()
});
}),
"[project]/lib/validations/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateRequest",
    ()=>validateRequest,
    "validationErrorResponse",
    ()=>validationErrorResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validations/schemas.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
;
;
function validateRequest(schema, data) {
    const result = schema.safeParse(data);
    if (result.success) {
        return {
            success: true,
            data: result.data
        };
    }
    return {
        success: false,
        error: result.error
    };
}
function validationErrorResponse(error) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Validation failed",
        details: error.errors.map((err)=>({
                path: err.path.join("."),
                message: err.message
            }))
    }, {
        status: 400
    });
}
}),
"[project]/lib/error-handler.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppError",
    ()=>AppError,
    "handleError",
    ()=>handleError,
    "withErrorHandling",
    ()=>withErrorHandling
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js [app-route] (ecmascript)");
;
;
class AppError extends Error {
    statusCode;
    message;
    code;
    details;
    constructor(statusCode, message, code, details){
        super(message), this.statusCode = statusCode, this.message = message, this.code = code, this.details = details;
        this.name = "AppError";
    }
}
function logError(error, context) {
    const isDevelopment = ("TURBOPACK compile-time value", "development") === "development";
    const errorLog = {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        ...error instanceof Error && isDevelopment && {
            stack: error.stack
        },
        ...context && {
            ...context
        }
    };
    if (error instanceof AppError) {
        errorLog.code = error.code;
        errorLog.details = error.details;
    } else if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"]) {
        errorLog.details = error.errors;
    } else if (error instanceof Error) {
        // Handle SQLite/Drizzle errors
        const msg = error.message.toLowerCase();
        if (msg.includes("unique constraint") || msg.includes("unique_constraint")) {
            errorLog.code = "SQLITE_CONSTRAINT_UNIQUE";
        } else if (msg.includes("foreign key") || msg.includes("foreign_key")) {
            errorLog.code = "SQLITE_CONSTRAINT_FOREIGNKEY";
        } else if (msg.includes("not null constraint")) {
            errorLog.code = "SQLITE_CONSTRAINT_NOTNULL";
        }
    }
    // In production, you might want to send this to a logging service
    console.error("[ERROR]", JSON.stringify(errorLog, null, 2));
}
function handleError(error, context) {
    // Log the error
    logError(error, context);
    // Zod validation errors
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Validation failed",
            details: error.errors.map((err)=>({
                    path: err.path.join("."),
                    message: err.message
                }))
        }, {
            status: 400
        });
    }
    // SQLite/Drizzle errors
    if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        // Unique constraint violation
        if (msg.includes("unique constraint") || msg.includes("unique_constraint")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "A record with this value already exists",
                code: "SQLITE_CONSTRAINT_UNIQUE"
            }, {
                status: 409
            });
        }
        // Foreign key constraint
        if (msg.includes("foreign key") || msg.includes("foreign_key")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid reference",
                code: "SQLITE_CONSTRAINT_FOREIGNKEY"
            }, {
                status: 400
            });
        }
        // Not found (used by Drizzle when no rows match)
        if (msg.includes("no result") || msg.includes("not found")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Record not found",
                code: "NOT_FOUND"
            }, {
                status: 404
            });
        }
    }
    // Custom AppError
    if (error instanceof AppError) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message,
            code: error.code,
            details: error.details
        }, {
            status: error.statusCode
        });
    }
    // Generic Error
    if (error instanceof Error) {
        // Don't expose internal error messages in production
        const isDevelopment = ("TURBOPACK compile-time value", "development") === "development";
        // Check for common error types
        if (error.name === "TypeError" && error.message.includes("Cannot read")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid request data"
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable",
            ...isDevelopment && {
                stack: error.stack
            }
        }, {
            status: 500
        });
    }
    // Unknown error
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "An unexpected error occurred"
    }, {
        status: 500
    });
}
async function withErrorHandling(handler, context) {
    try {
        const result = await handler();
        return result instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"] ? result : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        return handleError(error, context);
    }
}
}),
"[project]/lib/api-wrapper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createApiHandler",
    ()=>createApiHandler,
    "createDeleteHandler",
    ()=>createDeleteHandler,
    "createGetHandler",
    ()=>createGetHandler,
    "createPatchHandler",
    ()=>createPatchHandler,
    "createPostHandler",
    ()=>createPostHandler,
    "createPutHandler",
    ()=>createPutHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/error-handler.ts [app-route] (ecmascript)");
;
;
function createApiHandler(handler, options = {}) {
    const { rateLimit: rateLimiter, requireAuth = false, allowedMethods } = options;
    return async (req, context)=>{
        // Check allowed methods
        if (allowedMethods && !allowedMethods.includes(req.method)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Method ${req.method} not allowed`
            }, {
                status: 405,
                headers: {
                    Allow: allowedMethods.join(", ")
                }
            });
        }
        // Apply rate limiting
        if (rateLimiter) {
            const rateLimitResponse = await rateLimiter(req);
            if (rateLimitResponse) {
                return rateLimitResponse;
            }
        }
        // Execute handler with error handling
        const url = new URL(req.url);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withErrorHandling"])(async ()=>{
            const result = await handler(req, context);
            return result;
        }, {
            path: url.pathname,
            method: req.method
        });
    };
}
function createGetHandler(handler, options = {}) {
    return createApiHandler(handler, {
        ...options,
        allowedMethods: [
            "GET"
        ]
    });
}
function createPostHandler(handler, options = {}) {
    return createApiHandler(handler, {
        ...options,
        allowedMethods: [
            "POST"
        ]
    });
}
function createPutHandler(handler, options = {}) {
    return createApiHandler(handler, {
        ...options,
        allowedMethods: [
            "PUT"
        ]
    });
}
function createPatchHandler(handler, options = {}) {
    return createApiHandler(handler, {
        ...options,
        allowedMethods: [
            "PATCH"
        ]
    });
}
function createDeleteHandler(handler, options = {}) {
    return createApiHandler(handler, {
        ...options,
        allowedMethods: [
            "DELETE"
        ]
    });
}
}),
"[project]/lib/rate-limit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiRateLimit",
    ()=>apiRateLimit,
    "authRateLimit",
    ()=>authRateLimit,
    "bookingRateLimit",
    ()=>bookingRateLimit,
    "checkoutRateLimit",
    ()=>checkoutRateLimit,
    "rateLimit",
    ()=>rateLimit,
    "ratingRateLimit",
    ()=>ratingRateLimit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
;
// In-memory store (for production, use Redis or similar)
const store = {};
// Clean up expired entries every 5 minutes
setInterval(()=>{
    const now = Date.now();
    Object.keys(store).forEach((key)=>{
        if (store[key].resetTime < now) {
            delete store[key];
        }
    });
}, 5 * 60 * 1000);
function rateLimit(options) {
    const { windowMs, maxRequests, message = "Too many requests, please try again later", skipSuccessfulRequests = false, skipFailedRequests = false } = options;
    return async (req)=>{
        // Get identifier (IP address or user ID)
        const identifier = getIdentifier(req);
        const now = Date.now();
        const record = store[identifier];
        // Initialize or reset if window expired
        if (!record || record.resetTime < now) {
            store[identifier] = {
                count: 1,
                resetTime: now + windowMs
            };
            return null // No rate limit exceeded
            ;
        }
        // Increment count
        record.count++;
        // Check if limit exceeded
        if (record.count > maxRequests) {
            const retryAfter = Math.ceil((record.resetTime - now) / 1000);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: message,
                retryAfter
            }, {
                status: 429,
                headers: {
                    "Retry-After": retryAfter.toString(),
                    "X-RateLimit-Limit": maxRequests.toString(),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": new Date(record.resetTime).toISOString()
                }
            });
        }
        return null // No rate limit exceeded
        ;
    };
}
function getIdentifier(req) {
    // Try to get user ID from session/token first
    // For now, use IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip") || "unknown";
    return ip;
}
const apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    maxRequests: 100
});
const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
    message: "Too many authentication attempts, please try again later"
});
const checkoutRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    message: "Too many checkout attempts, please try again later"
});
const bookingRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    maxRequests: 20,
    message: "Too many booking attempts, please try again later"
});
const ratingRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    message: "Too many rating submissions, please try again later"
});
}),
"[project]/app/api/v1/bookings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/validations/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validations/schemas.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$wrapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-wrapper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limit.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function handleGetBookings(req) {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validateRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBookingsQuerySchema"], queryParams);
    if (!validation.success) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validationErrorResponse"])(validation.error);
    }
    const { date, startDate, endDate, userId, serviceId, page = 1, limit = 10, sort = "date-desc", status = "ALL" } = validation.data;
    const skip = (page - 1) * limit;
    if (startDate && endDate) {
        const allBookings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.bookings.findMany({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gte"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].date, new Date(startDate).toISOString()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["lt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].date, new Date(endDate).toISOString())),
            columns: {
                date: true,
                time: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(allBookings, {
            status: 200
        });
    }
    // Build conditions array
    const conditions = [];
    if (date) {
        const dateStr = new Date(date).toISOString().split('T')[0];
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextDateStr = nextDate.toISOString().split('T')[0];
        conditions.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gte"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].date, dateStr));
        conditions.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["lt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].date, nextDateStr));
    }
    if (serviceId) {
        conditions.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].serviceId, serviceId));
    }
    if (userId) {
        conditions.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].userId, userId));
    }
    if (status !== "ALL") {
        conditions.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].status, status));
    }
    const whereClause = conditions.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["and"])(...conditions) : undefined;
    let orderByClause = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].date)
    ];
    if (sort === "date-asc") {
        orderByClause = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].date)
        ];
    }
    const allBookings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.bookings.findMany({
        where: whereClause,
        with: {
            service: true,
            photos: true,
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    role: true
                }
            }
        },
        orderBy: orderByClause,
        limit: limit,
        offset: skip
    });
    const total = (await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.bookings.findMany({
        where: whereClause
    })).length;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        bookings: allBookings,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }, {
        status: 200
    });
}
async function handleCreateBooking(req) {
    const body = await req.json();
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validateRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createBookingSchema"], body);
    if (!validation.success) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validationErrorResponse"])(validation.error);
    }
    const { serviceIds, date, time, paymentMethod, mobileProvider, photoUrls, userName, phone } = validation.data;
    // Create bookings for each selected service
    const createdBookings = await Promise.all(serviceIds.map(async (serviceId)=>{
        const bookingId = crypto.randomUUID();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"]).values({
            id: bookingId,
            serviceId,
            date: new Date(date).toISOString(),
            time,
            paymentMethod,
            mobileProvider,
            userName,
            phone
        }).run();
        // Create photos for this booking
        for (const url of photoUrls || []){
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["photos"]).values({
                id: crypto.randomUUID(),
                bookingId,
                url
            }).run();
        }
        // Fetch the complete booking with relations
        const fullBooking = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.bookings.findFirst({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].id, bookingId),
            with: {
                service: true,
                photos: true
            }
        });
        return fullBooking;
    }));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(createdBookings, {
        status: 201
    });
}
const GET = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$wrapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGetHandler"])(handleGetBookings, {
    rateLimit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiRateLimit"]
});
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$wrapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPostHandler"])(handleCreateBooking, {
    rateLimit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiRateLimit"]
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5345ff16._.js.map