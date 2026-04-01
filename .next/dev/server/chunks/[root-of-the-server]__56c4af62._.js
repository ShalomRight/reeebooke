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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions,
    "getAuthSession",
    ()=>getAuthSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$auth$2b$drizzle$2d$adapter$40$1$2e$11$2e$1$2f$node_modules$2f40$auth$2f$drizzle$2d$adapter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@auth+drizzle-adapter@1.11.1/node_modules/@auth/drizzle-adapter/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$2$2e$4$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/bcryptjs@2.4.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.13_@auth+core@0.34.3_next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.13_@auth+core@0.34.3_next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.13_@auth+core@0.34.3_next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next-auth/providers/google.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
const authOptions = {
    adapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$auth$2b$drizzle$2d$adapter$40$1$2e$11$2e$1$2f$node_modules$2f40$auth$2f$drizzle$2d$adapter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DrizzleAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], {
        usersTable: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"],
        accountsTable: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"],
        sessionsTable: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessions"],
        verificationTokensTable: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verificationTokens"]
    }),
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            allowDangerousEmailAccountLinking: true
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
                    where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].email, credentials.email)
                });
                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }
                const isCorrectPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$2$2e$4$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.password);
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image ?? "",
                    phone: user.phone ?? "",
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async signIn ({ user, account, profile }) {
            // Handle Google OAuth sign in
            if (account?.provider === "google") {
                try {
                    // Check if user exists
                    const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
                        where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].email, user.email)
                    });
                    if (existingUser) {
                        // Update user with Google account info if needed
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).set({
                            name: user.name || existingUser.name,
                            image: user.image || existingUser.image,
                            updatedAt: new Date().toISOString()
                        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, existingUser.id)).run();
                    } else {
                        // Create new user from Google OAuth
                        const newUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).values({
                            id: crypto.randomUUID(),
                            email: user.email,
                            name: user.name || "",
                            image: user.image || null,
                            password: null,
                            role: "CLIENT"
                        }).returning().get();
                        // Generate referral code for new user
                        try {
                            const { ensureReferralCode } = await __turbopack_context__.A("[project]/lib/referral-code-utils.ts [app-route] (ecmascript, async loader)");
                            await ensureReferralCode(newUser.id, user.email);
                        } catch (err) {
                            console.error("Failed to generate referral code:", err);
                        }
                    }
                } catch (error) {
                    console.error("Error handling Google sign in:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt ({ token, user, account }) {
            if (user) {
                // Fetch user from database to get latest role and other fields
                const dbUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
                    where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].email, user.email)
                });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.image = dbUser.image;
                    token.email = dbUser.email;
                    token.phone = dbUser.phone;
                    token.role = dbUser.role;
                } else {
                    // Fallback to user object if not in DB
                    token.id = user.id;
                    token.name = user.name;
                    token.image = user.image;
                    token.email = user.email;
                    token.phone = user.phone;
                    token.role = user.role || "CLIENT";
                }
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.image = token.image;
                session.user.email = token.email;
                session.user.phone = token.phone;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: ("TURBOPACK compile-time value", "development") === "production"
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};
const getAuthSession = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(authOptions);
}),
"[project]/lib/email-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEmailTemplate",
    ()=>getEmailTemplate,
    "sendEmail",
    ()=>sendEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$resend$40$4$2e$8$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/resend@4.8.0_react-dom@19.2.4_react@19.2.4/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$resend$40$4$2e$8$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY || "re_cXUQzhtv_BvGgBRMF6TPfieu6SCpNRexr");
async function sendEmail({ to, subject, html, from = "bookings@luxurynailspa.com" }) {
    try {
        const result = await resend.emails.send({
            from,
            to: Array.isArray(to) ? to : [
                to
            ],
            subject,
            html
        });
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error("Email send error:", error);
        return {
            success: false,
            error
        };
    }
}
function getEmailTemplate(content, title) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title || "Luxury Nail Spa"}</title>
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			line-height: 1.6;
			color: #1f2937;
			background-color: #f9fafb;
		}
		.email-container {
			max-width: 600px;
			margin: 0 auto;
			background-color: #ffffff;
		}
		.email-header {
			background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
			color: white;
			padding: 40px 32px;
			text-align: center;
			border-radius: 8px 8px 0 0;
		}
		.email-header h1 {
			font-size: 28px;
			font-weight: 700;
			margin-bottom: 8px;
		}
		.email-header p {
			font-size: 14px;
			opacity: 0.95;
		}
		.email-body {
			padding: 32px;
		}
		.email-content {
			color: #374151;
			font-size: 16px;
			line-height: 1.7;
		}
		.email-button {
			display: inline-block;
			background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
			color: white;
			padding: 14px 32px;
			border-radius: 8px;
			text-decoration: none;
			font-weight: 600;
			font-size: 16px;
			margin: 24px 0;
			text-align: center;
		}
		.email-button:hover {
			opacity: 0.9;
		}
		.info-box {
			background: #f3f4f6;
			border-left: 4px solid #7c3aed;
			padding: 16px;
			border-radius: 6px;
			margin: 20px 0;
		}
		.info-box strong {
			color: #1f2937;
			display: block;
			margin-bottom: 8px;
		}
		.info-box p {
			margin: 4px 0;
			color: #6b7280;
			font-size: 14px;
		}
		.warning-box {
			background: #fef3c7;
			border-left: 4px solid #f59e0b;
			padding: 16px;
			border-radius: 6px;
			margin: 20px 0;
			color: #92400e;
		}
		.success-box {
			background: #d1fae5;
			border-left: 4px solid #10b981;
			padding: 16px;
			border-radius: 6px;
			margin: 20px 0;
			color: #065f46;
		}
		.email-footer {
			background-color: #f9fafb;
			padding: 24px 32px;
			text-align: center;
			border-radius: 0 0 8px 8px;
			border-top: 1px solid #e5e7eb;
		}
		.email-footer p {
			color: #6b7280;
			font-size: 12px;
			margin: 4px 0;
		}
		.email-footer a {
			color: #7c3aed;
			text-decoration: none;
		}
		.details-table {
			width: 100%;
			border-collapse: collapse;
			margin: 20px 0;
		}
		.details-table td {
			padding: 12px;
			border-bottom: 1px solid #e5e7eb;
		}
		.details-table td:first-child {
			font-weight: 600;
			color: #374151;
			width: 40%;
		}
		.details-table td:last-child {
			color: #6b7280;
		}
		@media only screen and (max-width: 600px) {
			.email-body {
				padding: 24px;
			}
			.email-header {
				padding: 32px 24px;
			}
			.email-header h1 {
				font-size: 24px;
			}
		}
	</style>
</head>
<body>
	<div style="padding: 20px;">
		<div class="email-container">
			<div class="email-header">
				<h1>${title || "Luxury Nail Spa"}</h1>
				<p>Your Beauty, Our Passion</p>
			</div>
			<div class="email-body">
				<div class="email-content">
					${content}
				</div>
			</div>
			<div class="email-footer">
				<p><strong>Luxury Nail Spa</strong></p>
				<p>Thank you for choosing us for your beauty needs</p>
				<p style="margin-top: 12px;">
					<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}">Visit Our Website</a>
				</p>
				<p style="margin-top: 16px; font-size: 11px; color: #9ca3af;">
					© ${new Date().getFullYear()} Luxury Nail Spa. All rights reserved.
				</p>
			</div>
		</div>
	</div>
</body>
</html>
	`;
}
}),
"[project]/lib/email-templates/bookings.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBookingCompletedEmail",
    ()=>getBookingCompletedEmail,
    "getBookingConfirmationEmail",
    ()=>getBookingConfirmationEmail,
    "getBookingReminderEmail",
    ()=>getBookingReminderEmail,
    "getBookingStatusUpdateEmail",
    ()=>getBookingStatusUpdateEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-service.ts [app-route] (ecmascript)");
;
function getBookingConfirmationEmail(booking) {
    const statusColor = booking.status === "CONFIRMED" ? "#10b981" : booking.status === "PENDING" ? "#f59e0b" : "#6b7280";
    const content = `
		<p>Hello <strong>${booking.userName}</strong>,</p>
		<p>Your appointment has been confirmed! We're excited to see you.</p>
		
		<div class="success-box">
			<p><strong>✅ Booking Confirmed</strong></p>
			<p style="color: ${statusColor}; font-weight: 600;">Status: ${booking.status}</p>
		</div>

		<table class="details-table">
			<tr>
				<td>Service</td>
				<td><strong>${booking.serviceName}</strong></td>
			</tr>
			<tr>
				<td>Date</td>
				<td>${new Date(booking.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })}</td>
			</tr>
			<tr>
				<td>Time</td>
				<td><strong>${booking.time}</strong></td>
			</tr>
			<tr>
				<td>Price</td>
				<td><strong>$${booking.price.toLocaleString()}</strong></td>
			</tr>
			${booking.paymentMethod ? `
			<tr>
				<td>Payment Method</td>
				<td>${booking.paymentMethod}</td>
			</tr>
			` : ""}
			<tr>
				<td>Booking ID</td>
				<td><code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${booking.bookingId}</code></td>
			</tr>
		</table>

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" class="email-button">View Booking Details</a>
		</div>

		<div class="info-box">
			<strong>📅 Reminder:</strong>
			<p>We'll send you a reminder 24 hours before your appointment. If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>
		</div>
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Booking Confirmed - Luxury Nail Spa");
}
function getBookingStatusUpdateEmail(booking, oldStatus) {
    const content = `
		<p>Hello <strong>${booking.userName}</strong>,</p>
		<p>Your booking status has been updated.</p>
		
		<div class="info-box">
			<strong>Status Change:</strong>
			<p>Previous Status: ${oldStatus}</p>
			<p>New Status: <strong>${booking.status}</strong></p>
		</div>

		<table class="details-table">
			<tr>
				<td>Service</td>
				<td><strong>${booking.serviceName}</strong></td>
			</tr>
			<tr>
				<td>Date</td>
				<td>${new Date(booking.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })}</td>
			</tr>
			<tr>
				<td>Time</td>
				<td><strong>${booking.time}</strong></td>
			</tr>
		</table>

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" class="email-button">View Booking</a>
		</div>

		${booking.status === "CANCELLED" ? `
		<div class="warning-box">
			<p><strong>Booking Cancelled</strong></p>
			<p>If you have any questions or would like to reschedule, please contact us.</p>
		</div>
		` : ""}
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Booking Status Updated");
}
function getBookingReminderEmail(booking) {
    const appointmentDate = new Date(booking.date);
    const isToday = appointmentDate.toDateString() === new Date().toDateString();
    const content = `
		<p>Hello <strong>${booking.userName}</strong>,</p>
		<p>This is a friendly reminder about your upcoming appointment.</p>
		
		<div class="info-box">
			<strong>📅 Appointment Reminder</strong>
			<p>${isToday ? "Your appointment is <strong>today</strong>!" : `Your appointment is in 24 hours`}</p>
		</div>

		<table class="details-table">
			<tr>
				<td>Service</td>
				<td><strong>${booking.serviceName}</strong></td>
			</tr>
			<tr>
				<td>Date</td>
				<td><strong>${appointmentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })}</strong></td>
			</tr>
			<tr>
				<td>Time</td>
				<td><strong>${booking.time}</strong></td>
			</tr>
			<tr>
				<td>Price</td>
				<td>$${booking.price.toLocaleString()}</td>
			</tr>
		</table>

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" class="email-button">View Booking</a>
		</div>

		<div class="info-box">
			<strong>💡 Tips for your visit:</strong>
			<p>• Please arrive 10 minutes early</p>
			<p>• Bring any reference photos or inspiration</p>
			<p>• If you need to reschedule, please do so as soon as possible</p>
		</div>
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Appointment Reminder - Luxury Nail Spa");
}
function getBookingCompletedEmail(booking) {
    const content = `
		<p>Hello <strong>${booking.userName}</strong>,</p>
		<p>Thank you for visiting Luxury Nail Spa! We hope you enjoyed your service.</p>
		
		<div class="success-box">
			<p><strong>✨ Service Completed</strong></p>
			<p>Your appointment has been marked as completed. We'd love to hear about your experience!</p>
		</div>

		<table class="details-table">
			<tr>
				<td>Service</td>
				<td><strong>${booking.serviceName}</strong></td>
			</tr>
			<tr>
				<td>Date</td>
				<td>${new Date(booking.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })}</td>
			</tr>
			<tr>
				<td>Amount Paid</td>
				<td><strong>$${booking.price.toLocaleString()}</strong></td>
			</tr>
		</table>

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" class="email-button">View Receipt</a>
		</div>

		<div class="info-box">
			<strong>💝 Special Offer:</strong>
			<p>Book your next appointment within 30 days and receive 10% off! Use code: <strong>RETURN10</strong></p>
		</div>

		<p>We appreciate your business and look forward to serving you again soon!</p>
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Thank You - Service Completed");
}
}),
"[project]/lib/email-templates/discounts.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDiscountAppliedEmail",
    ()=>getDiscountAppliedEmail,
    "getDiscountCodeEmail",
    ()=>getDiscountCodeEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-service.ts [app-route] (ecmascript)");
;
function getDiscountCodeEmail(name, discount) {
    const discountValue = discount.type === "PERCENT" ? `${discount.value}%` : `$${discount.value}`;
    const minAmountText = discount.minAmount ? ` (minimum order: $${discount.minAmount})` : "";
    const expiryText = discount.expiresAt ? ` Valid until ${new Date(discount.expiresAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })}` : "";
    const content = `
		<p>Hello <strong>${name}</strong>,</p>
		<p>We have an exclusive discount code just for you!</p>
		
		<div class="success-box" style="text-align: center; padding: 32px;">
			<p style="font-size: 14px; margin-bottom: 12px;">Use this code at checkout:</p>
			<p style="font-size: 36px; font-weight: 700; letter-spacing: 4px; margin: 16px 0;">${discount.code}</p>
			<p style="font-size: 18px; margin-top: 12px;">Save ${discountValue}${minAmountText}${expiryText}</p>
		</div>

		${discount.description ? `
		<div class="info-box">
			<strong>About this offer:</strong>
			<p>${discount.description}</p>
		</div>
		` : ""}

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}" class="email-button">Book Now & Save</a>
		</div>

		<div class="info-box">
			<strong>How to use:</strong>
			<p>1. Add services to your cart</p>
			<p>2. Proceed to checkout</p>
			<p>3. Enter code: <strong>${discount.code}</strong></p>
			<p>4. Enjoy your discount!</p>
		</div>

		${discount.expiresAt ? `
		<div class="warning-box">
			<p><strong>⏰ Limited Time Offer</strong></p>
			<p>This discount code expires on ${new Date(discount.expiresAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })}. Don't miss out!</p>
		</div>
		` : ""}
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Exclusive Discount - Luxury Nail Spa");
}
function getDiscountAppliedEmail(name, discount, savings, orderTotal) {
    const content = `
		<p>Hello <strong>${name}</strong>,</p>
		<p>Great news! Your discount code has been successfully applied to your order.</p>
		
		<div class="success-box">
			<p><strong>✅ Discount Applied</strong></p>
			<p>You saved <strong>$${savings.toLocaleString()}</strong> on your booking!</p>
		</div>

		<table class="details-table">
			<tr>
				<td>Discount Code</td>
				<td><strong>${discount.code}</strong></td>
			</tr>
			<tr>
				<td>Discount Amount</td>
				<td><strong>$${savings.toLocaleString()}</strong></td>
			</tr>
			<tr>
				<td>Order Total</td>
				<td><strong>$${orderTotal.toLocaleString()}</strong></td>
			</tr>
		</table>

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" class="email-button">View Booking</a>
		</div>

		<p>Thank you for choosing Luxury Nail Spa. We look forward to serving you!</p>
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Discount Applied - Thank You");
}
}),
"[project]/lib/email-templates/referrals.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getReferralRewardEmail",
    ()=>getReferralRewardEmail,
    "getReferralSignupEmail",
    ()=>getReferralSignupEmail,
    "getReferralWelcomeEmail",
    ()=>getReferralWelcomeEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-service.ts [app-route] (ecmascript)");
;
function getReferralWelcomeEmail(name, referralCode, referralLink) {
    const content = `
		<p>Hello <strong>${name}</strong>,</p>
		<p>Welcome to our Referral Program! Start earning rewards by sharing Luxury Nail Spa with your friends.</p>
		
		<div class="success-box">
			<p><strong>🎁 Your Referral Code</strong></p>
			<p style="font-size: 24px; font-weight: 700; letter-spacing: 2px; margin: 12px 0;">${referralCode}</p>
		</div>

		<div class="info-box">
			<strong>How it works:</strong>
			<p>• Share your referral code or link with friends</p>
			<p>• When they sign up and complete their first booking, you both earn rewards!</p>
			<p>• Earn points for every successful referral</p>
			<p>• Redeem points for discounts and exclusive services</p>
		</div>

		<div style="text-align: center; margin: 24px 0;">
			<p style="margin-bottom: 12px; color: #6b7280;">Your referral link:</p>
			<div style="background: #f3f4f6; padding: 12px; border-radius: 6px; word-break: break-all; font-size: 12px;">
				${referralLink}
			</div>
		</div>

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}/profile" class="email-button">Manage Referrals</a>
		</div>

		<div class="info-box">
			<strong>💡 Pro Tips:</strong>
			<p>• Share on social media for maximum reach</p>
			<p>• Tell friends about your great experience</p>
			<p>• Track your referrals in your dashboard</p>
		</div>
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Welcome to Our Referral Program");
}
function getReferralRewardEmail(name, referredByName, pointsEarned, totalPoints) {
    const content = `
		<p>Hello <strong>${name}</strong>,</p>
		<p>Congratulations! You've earned referral rewards!</p>
		
		<div class="success-box">
			<p><strong>🎉 Referral Successful!</strong></p>
			<p>${referredByName} signed up using your referral code and completed their first booking.</p>
		</div>

		<table class="details-table">
			<tr>
				<td>Points Earned</td>
				<td><strong>+${pointsEarned} points</strong></td>
			</tr>
			<tr>
				<td>Total Points</td>
				<td><strong>${totalPoints} points</strong></td>
			</tr>
		</table>

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" class="email-button">View Your Rewards</a>
		</div>

		<div class="info-box">
			<strong>💝 What's Next?</strong>
			<p>• Continue sharing your referral code to earn more points</p>
			<p>• Redeem points for discounts on future bookings</p>
			<p>• Climb the loyalty tiers for even better rewards</p>
		</div>

		<p>Keep sharing and earning! Thank you for being a valued member of our community.</p>
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Referral Reward Earned");
}
function getReferralSignupEmail(name, referrerName, referralCode) {
    const content = `
		<p>Hello <strong>${name}</strong>,</p>
		<p>Welcome to Luxury Nail Spa! You were referred by <strong>${referrerName}</strong>.</p>
		
		<div class="success-box">
			<p><strong>🎁 Special Welcome Bonus</strong></p>
			<p>Because you were referred, you'll receive special rewards when you complete your first booking!</p>
		</div>

		<div class="info-box">
			<strong>Referral Details:</strong>
			<p>Referred by: ${referrerName}</p>
			<p>Referral Code: ${referralCode}</p>
		</div>

		<div style="text-align: center;">
			<a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}" class="email-button">Book Your First Appointment</a>
		</div>

		<p>Complete your first booking to unlock your referral rewards and start earning loyalty points!</p>
	`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmailTemplate"])(content, "Welcome - You Were Referred");
}
}),
"[project]/lib/referral-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "awardReferralPointsOnPayment",
    ()=>awardReferralPointsOnPayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
;
;
;
async function awardReferralPointsOnPayment(userId, bookingId) {
    try {
        // Get the user who made the payment
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, userId),
            columns: {
                id: true,
                referredById: true,
                name: true
            }
        });
        if (!user || !user.referredById) {
            return null // User was not referred, no points to award
            ;
        }
        // Check if referral points have already been awarded for this user
        const existingReward = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.referralRewards.findFirst({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["referralRewards"].referredId, user.id)
        });
        if (existingReward) {
            return null // Points already awarded for this referral
            ;
        }
        // Get referral code configuration and referrer info
        const referralCode = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.referralCodes.findFirst({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["referralCodes"].userId, user.referredById)
        });
        const points = referralCode?.pointsPerReferral || 100;
        // Get referrer info for email
        const referrer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, user.referredById),
            columns: {
                name: true,
                email: true,
                referralPoints: true
            }
        });
        // Award points to the referrer
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).set({
            referralPoints: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].referralPoints} + ${points}`
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, user.referredById)).run();
        // Get updated referrer points
        const updatedReferrer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, user.referredById),
            columns: {
                referralPoints: true
            }
        });
        // Update referral code usage count
        if (referralCode) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["referralCodes"]).set({
                usageCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["referralCodes"].usageCount} + 1`
            }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["referralCodes"].id, referralCode.id)).run();
        }
        // Create referral reward record
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["referralRewards"]).values({
            id: crypto.randomUUID(),
            referrerId: user.referredById,
            referredId: user.id,
            points,
            bookingId: bookingId || null
        }).run();
        console.log(`Referral points awarded: ${points} points to user ${user.referredById} for referral ${user.id}`);
        // Return referrer info for email
        return {
            referrerEmail: referrer?.email || null,
            referrerName: referrer?.name || null,
            pointsEarned: points,
            totalPoints: updatedReferrer?.referralPoints || 0
        };
    } catch (error) {
        console.error("Failed to award referral points:", error);
        // Don't throw - referral rewards are not critical to payment flow
        return null;
    }
}
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
"[project]/app/api/v1/bookings/bulk/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$templates$2f$bookings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-templates/bookings.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$templates$2f$discounts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-templates/discounts.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$templates$2f$referrals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-templates/referrals.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$referral$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/referral-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$2$2e$4$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/bcryptjs@2.4.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$next$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.13_@auth+core@0.34.3_next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next-auth/next/index.js [app-route] (ecmascript)");
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
;
;
;
;
;
;
;
;
async function handleBulkBooking(req) {
    const body = await req.json();
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$next$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validateRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bulkBookingSchema"], body);
    if (!validation.success) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validationErrorResponse"])(validation.error);
    }
    const { cartItems, userName, phone, paymentMethod, userId, email, bookingFor, discountCode, discountAmount, totalPrice, finalPrice, referralCode } = validation.data;
    let finalUserId = userId || session?.user?.id || null;
    const finalEmail = email || session?.user?.email || null;
    // Determine referrer ID
    let referrerId = null;
    // If booking for someone else and logged-in user exists, automatically use their referral
    if (bookingFor === "other" && session?.user?.id) {
        referrerId = session.user.id;
        // Ensure the logged-in user has a referral code
        try {
            const { ensureReferralCode } = await __turbopack_context__.A("[project]/lib/referral-code-utils.ts [app-route] (ecmascript, async loader)");
            await ensureReferralCode(session.user.id, session.user.email || "");
        } catch (err) {
            console.error("Failed to ensure referral code for logged-in user:", err);
        // Continue even if referral code generation fails
        }
    }
    // Override with referral code from body if explicitly provided
    if (referralCode) {
        try {
            const referrer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
                where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].referralCode, referralCode.toUpperCase()),
                columns: {
                    id: true
                }
            });
            if (referrer) {
                // If user is logged in and wasn't referred before, link them to referrer
                if (finalUserId && finalUserId !== referrer.id) {
                    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
                        where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, finalUserId),
                        columns: {
                            referredById: true
                        }
                    });
                    if (user && !user.referredById) {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).set({
                            referredById: referrer.id
                        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, finalUserId));
                    }
                }
                referrerId = referrer.id;
            }
        } catch (err) {
            console.error("Failed to find referrer by code:", err);
        // Continue without referrer if lookup fails
        }
    }
    if (bookingFor === "other" && email && !userId) {
        try {
            // Check if user already exists
            const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
                where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].email, email)
            });
            if (!existingUser) {
                // Create new family member user with temporary password
                const tempPassword = Math.random().toString(36).slice(-12);
                const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$2$2e$4$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(tempPassword, 10);
                const [newUser] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).values({
                    name: userName,
                    email,
                    phone,
                    password: hashedPassword,
                    role: "CLIENT",
                    referredById: referrerId || null
                }).returning();
                finalUserId = newUser.id;
                // Generate referral code for new user
                try {
                    const { ensureReferralCode } = await __turbopack_context__.A("[project]/lib/referral-code-utils.ts [app-route] (ecmascript, async loader)");
                    await ensureReferralCode(newUser.id, email);
                } catch (err) {
                    console.error("Failed to generate referral code for family member:", err);
                // Don't fail user creation if referral code generation fails
                }
                try {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["promotionSubscribers"]).values({
                        email,
                        name: userName,
                        phone,
                        userId: newUser.id,
                        subscribed: true
                    });
                } catch (err) {
                // Ignore if already exists
                }
                if (referrerId) {
                    try {
                        const referralCodeRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.referralCodes.findFirst({
                            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["referralCodes"].userId, referrerId)
                        });
                        const points = referralCodeRecord?.pointsPerReferral || 100;
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).set({
                            referralPoints: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].referralPoints} + ${points}`
                        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, referrerId));
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["referralRewards"]).values({
                            referrerId,
                            referredId: newUser.id,
                            points
                        });
                    } catch (err) {
                        console.error("Failed to award referral points:", err);
                    }
                }
                // Send password reset email to family member
                const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
                const resetLink = `${appUrl}/auth/reset-password?email=${encodeURIComponent(email)}`;
                try {
                    const { getGuestSignupEmail } = await __turbopack_context__.A("[project]/lib/email-templates/auth.ts [app-route] (ecmascript, async loader)");
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
                        to: email,
                        subject: "Welcome to Luxury Nail Spa - Set Your Password",
                        html: getGuestSignupEmail(userName, email, phone, resetLink)
                    });
                } catch (emailError) {
                    console.error("Failed to send password reset email:", emailError);
                }
            } else {
                finalUserId = existingUser.id;
            }
        } catch (userCreationError) {
            console.error("Failed to create family member user:", userCreationError);
        }
    }
    // Create bookings for each item in cart
    const insertedBookings = [];
    for (const item of cartItems){
        const [insertedBooking] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"]).values({
            serviceId: item.serviceId,
            date: item.date,
            time: item.time,
            paymentMethod,
            userName,
            phone,
            email: finalEmail,
            userId: finalUserId || null
        }).returning();
        if (item.photos && item.photos.length > 0) {
            await Promise.all(item.photos.map((photoUrl)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["photos"]).values({
                    bookingId: insertedBooking.id,
                    url: photoUrl
                })));
        }
        const fullBooking = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.bookings.findFirst({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookings"].id, insertedBooking.id),
            with: {
                service: true,
                photos: true
            }
        });
        if (fullBooking) {
            insertedBookings.push(fullBooking);
        }
    }
    // Record discount usage if a discount code was applied
    if (discountCode && discountAmount && totalPrice && finalPrice) {
        try {
            const discountCodeRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.discountCodes.findFirst({
                where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["discountCodes"].code, discountCode.toUpperCase())
            });
            if (discountCodeRecord) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["discountUsages"]).values({
                    discountCodeId: discountCodeRecord.id,
                    userId: finalUserId || null,
                    email: finalEmail || null,
                    userName: userName || null,
                    phone: phone || null,
                    discountAmount: discountAmount,
                    cartTotal: totalPrice,
                    finalTotal: finalPrice,
                    bookingId: insertedBookings[0]?.id || null
                });
                // Send discount applied email
                if (finalEmail) {
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
                            to: finalEmail,
                            subject: "Discount Applied - Thank You",
                            html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$templates$2f$discounts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDiscountAppliedEmail"])(userName, {
                                code: discountCodeRecord.code,
                                type: discountCodeRecord.type,
                                value: discountCodeRecord.value,
                                minAmount: discountCodeRecord.minAmount || undefined,
                                expiresAt: discountCodeRecord.expiresAt?.toString()
                            }, discountAmount, finalPrice)
                        });
                    } catch (emailError) {
                        console.error("Failed to send discount applied email:", emailError);
                    }
                }
            }
        } catch (discountError) {
            console.error("Failed to record discount usage:", discountError);
        // Don't fail the booking if discount tracking fails
        }
    }
    // Clear cart for authenticated users
    if (session?.user?.email) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].query.users.findFirst({
            where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].email, session.user.email)
        });
        if (user) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["carts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["carts"].userId, user.id));
        }
    }
    // Send WhatsApp confirmations for each booking
    for (const booking of insertedBookings){
        try {
            await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/v1/send-whatsapp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName,
                    phone,
                    serviceName: booking.service.name,
                    date: booking.date,
                    time: booking.time,
                    totalPrice: booking.service.price
                })
            });
        } catch (err) {
            console.error("Failed to send WhatsApp confirmation:", err);
        }
    }
    // Award referral points if user was referred (only on first payment)
    if (finalUserId) {
        try {
            const referralResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$referral$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardReferralPointsOnPayment"])(finalUserId, insertedBookings[0]?.id);
            // Send referral reward email to referrer
            if (referralResult?.referrerEmail && referralResult.referrerName && referralResult.pointsEarned && referralResult.totalPoints) {
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
                        to: referralResult.referrerEmail,
                        subject: "Referral Reward Earned - Luxury Nail Spa",
                        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$templates$2f$referrals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getReferralRewardEmail"])(referralResult.referrerName, userName, referralResult.pointsEarned, referralResult.totalPoints)
                    });
                } catch (emailError) {
                    console.error("Failed to send referral reward email:", emailError);
                }
            }
        } catch (err) {
            console.error("Failed to award referral points:", err);
        // Don't fail booking if referral reward fails
        }
    }
    // Send booking confirmation emails
    if (finalEmail) {
        for (const booking of insertedBookings){
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
                    to: finalEmail,
                    subject: "Booking Confirmed - Luxury Nail Spa",
                    html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$templates$2f$bookings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBookingConfirmationEmail"])({
                        bookingId: booking.id,
                        serviceName: booking.service.name,
                        date: booking.date,
                        time: booking.time,
                        price: booking.service.price,
                        status: booking.status,
                        userName: booking.userName,
                        phone: booking.phone || undefined,
                        paymentMethod: booking.paymentMethod || undefined
                    })
                });
            } catch (emailError) {
                console.error("Failed to send booking confirmation email:", emailError);
            }
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(insertedBookings, {
        status: 201
    });
}
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$wrapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPostHandler"])(handleBulkBooking, {
    rateLimit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookingRateLimit"]
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__56c4af62._.js.map