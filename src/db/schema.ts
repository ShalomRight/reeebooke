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

import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** ISO-8601 timestamp stored as TEXT. Sortable and human-readable. */
const timestamp = (name: string) =>
  text(name).notNull().default(sql`(datetime('now'))`);

/** Nullable ISO-8601 timestamp */
const timestampNullable = (name: string) => text(name);

// ─── Auth ────────────────────────────────────────────────────────────────────

export const accounts = sqliteTable(
  "accounts",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId:            text("user_id").notNull(),
    type:              text("type").notNull(),
    provider:          text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token:     text("refresh_token"),
    access_token:      text("access_token"),
    expires_at:        integer("expires_at"),
    token_type:        text("token_type"),
    scope:             text("scope"),
    id_token:          text("id_token"),
    session_state:     text("session_state"),
  },
  (t) => [
    uniqueIndex("accounts_provider_account_idx").on(t.provider, t.providerAccountId),
    index("accounts_user_id_idx").on(t.userId),
  ]
);

export const sessions = sqliteTable(
  "sessions",
  {
    sessionToken: text("session_token").primaryKey(),
    userId:       text("user_id").notNull().references(() => users.id),
    expires:      integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (t) => [
    index("sessions_user_id_idx").on(t.userId),
  ]
);

export const verificationTokens = sqliteTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token:      text("token").notNull().unique(),
    expires:    integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (t) => [
    uniqueIndex("verification_tokens_identifier_token_idx").on(t.identifier, t.token),
  ]
);

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = sqliteTable(
  "users",
  {
    id:               text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name:             text("name"),
    email:            text("email").notNull().unique(),
    emailVerified:    integer("email_verified", { mode: "timestamp_ms" }),
    password:         text("password"),
    role:             text("role").notNull().default("CLIENT"),
    phone:            text("phone"),
    image:            text("image"),
    resetToken:       text("reset_token"),
    resetTokenExpiry: timestampNullable("reset_token_expiry"),
    referralCode:     text("referral_code").unique(),
    referredById:     text("referred_by_id"),
    referralPoints:   integer("referral_points").notNull().default(0),
    createdAt:        timestamp("created_at"),
    updatedAt:        text("updated_at").notNull().default(sql`(datetime('now'))`),
  },
  (t) => [
    index("users_role_idx").on(t.role),
    index("users_referred_by_id_idx").on(t.referredById),
  ]
);

// ─── Services ────────────────────────────────────────────────────────────────

export const services = sqliteTable("services", {
  id:            text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name:          text("name").notNull(),
  description:   text("description"),           // short description (optional)
  category:      text("category"),              // service category (e.g., 'Styling', 'Treatments')
  mediaUrl:      text("media_url"),              // optional image URL
  price:         integer("price").notNull(),
  stripePriceId: text("stripe_price_id"),
  createdAt:     timestamp("created_at"),
  updatedAt:     text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Bookings ────────────────────────────────────────────────────────────────

export const bookings = sqliteTable(
  "bookings",
  {
    id:             text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    serviceId:      text("service_id").notNull(),
    userId:         text("user_id"),
    date:           text("date").notNull(),     // ISO-8601 date string
    time:           text("time").notNull(),
    paymentMethod:  text("payment_method").notNull(),
    mobileProvider: text("mobile_provider"),
    email:          text("email"),
    userName:       text("user_name").notNull(),
    phone:          text("phone").notNull(),
    status:         text("status").notNull().default("PENDING"),
    createdAt:      timestamp("created_at"),
    updatedAt:      text("updated_at").notNull().default(sql`(datetime('now'))`),
  },
  (t) => [
    index("bookings_service_id_idx").on(t.serviceId),
    index("bookings_user_id_idx").on(t.userId),
    index("bookings_status_idx").on(t.status),
    index("bookings_date_idx").on(t.date),
    // Composite: admin "pending bookings for a service" query
    index("bookings_service_id_status_idx").on(t.serviceId, t.status),
  ]
);

export const photos = sqliteTable(
  "photos",
  {
    id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    bookingId: text("booking_id").notNull(),
    url:       text("url").notNull(),
    createdAt: timestamp("created_at"),
  },
  (t) => [
    index("photos_booking_id_idx").on(t.bookingId),
  ]
);

// ─── Cart ────────────────────────────────────────────────────────────────────

export const carts = sqliteTable(
  "carts",
  {
    id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId:    text("user_id"),
    serviceId: text("service_id").notNull(),
    date:      text("date").notNull(),
    time:      text("time").notNull(),
    quantity:  integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at"),
    updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
    // SQLite-compatible: 24-hour expiry set at insert time
    expiresAt: text("expires_at").notNull().default(sql`(datetime('now', '+24 hours'))`),
  },
  (t) => [
    index("carts_user_id_idx").on(t.userId),
    index("carts_service_id_idx").on(t.serviceId),
    index("carts_expires_at_idx").on(t.expiresAt),
  ]
);

export const cartEmails = sqliteTable(
  "cart_emails",
  {
    id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId:    text("user_id"),
    email:     text("email").notNull(),
    // JSON stored as TEXT — use JSON.stringify/parse in application code
    cartItems: text("cart_items").notNull(),
    sent:      integer("sent", { mode: "boolean" }).notNull().default(false),
    sentAt:    timestampNullable("sent_at"),
    createdAt: timestamp("created_at"),
    expiresAt: text("expires_at").notNull(),
  },
  (t) => [
    index("cart_emails_user_id_idx").on(t.userId),
    index("cart_emails_email_idx").on(t.email),
    index("cart_emails_sent_expires_idx").on(t.sent, t.expiresAt),
  ]
);

// ─── Favorites ───────────────────────────────────────────────────────────────

export const favorites = sqliteTable(
  "favorites",
  {
    id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId:    text("user_id").notNull(),
    serviceId: text("service_id").notNull(),
    createdAt: timestamp("created_at"),
  },
  (t) => [
    uniqueIndex("favorites_user_id_service_id_idx").on(t.userId, t.serviceId),
    index("favorites_user_id_idx").on(t.userId),
    index("favorites_service_id_idx").on(t.serviceId),
  ]
);

// ─── Ratings ─────────────────────────────────────────────────────────────────

export const ratings = sqliteTable(
  "ratings",
  {
    id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId:    text("user_id").notNull(),
    serviceId: text("service_id").notNull(),
    rating:    integer("rating").notNull(), // 1–5
    comment:   text("comment"),
    status:    text("status").notNull().default("PENDING"), // PENDING | APPROVED | REJECTED
    createdAt: timestamp("created_at"),
    updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
  },
  (t) => [
    uniqueIndex("ratings_user_id_service_id_idx").on(t.userId, t.serviceId),
    index("ratings_service_id_idx").on(t.serviceId),
    index("ratings_user_id_idx").on(t.userId),
    index("ratings_status_idx").on(t.status),
    // Composite: approved ratings for a service (public display page)
    index("ratings_service_id_status_idx").on(t.serviceId, t.status),
  ]
);

// ─── Referrals ───────────────────────────────────────────────────────────────

export const referralCodes = sqliteTable(
  "referral_codes",
  {
    id:                text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    code:              text("code").notNull().unique(),
    userId:            text("user_id").notNull(),
    pointsPerReferral: integer("points_per_referral").notNull().default(100),
    usageCount:        integer("usage_count").notNull().default(0),
    createdAt:         timestamp("created_at"),
    updatedAt:         text("updated_at").notNull().default(sql`(datetime('now'))`),
  },
  (t) => [
    index("referral_codes_user_id_idx").on(t.userId),
  ]
);

export const referralRewards = sqliteTable(
  "referral_rewards",
  {
    id:         text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    referrerId: text("referrer_id").notNull(),
    referredId: text("referred_id").notNull(),
    userId:     text("user_id"),
    points:     integer("points").notNull(),
    bookingId:  text("booking_id"),
    createdAt:  timestamp("created_at"),
  },
  (t) => [
    index("referral_rewards_referrer_id_idx").on(t.referrerId),
    index("referral_rewards_referred_id_idx").on(t.referredId),
  ]
);

// ─── Promotions ──────────────────────────────────────────────────────────────

export const promotionSubscribers = sqliteTable(
  "promotion_subscribers",
  {
    id:         text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    email:      text("email").notNull().unique(),
    name:       text("name"),
    phone:      text("phone"),
    userId:     text("user_id"),
    subscribed: integer("subscribed", { mode: "boolean" }).notNull().default(true),
    createdAt:  timestamp("created_at"),
    updatedAt:  text("updated_at").notNull().default(sql`(datetime('now'))`),
  },
  (t) => [
    index("promotion_subscribers_user_id_idx").on(t.userId),
    index("promotion_subscribers_subscribed_idx").on(t.subscribed),
  ]
);

// ─── Points & Discounts ──────────────────────────────────────────────────────

export const pointsRedemptions = sqliteTable(
  "points_redemptions",
  {
    id:             text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId:         text("user_id").notNull(),
    points:         integer("points").notNull(),
    discountAmount: integer("discount_amount").notNull(),
    bookingId:      text("booking_id"),
    status:         text("status").notNull().default("PENDING"), // PENDING | APPLIED | EXPIRED
    createdAt:      timestamp("created_at"),
    expiresAt:      text("expires_at").notNull(),
  },
  (t) => [
    index("points_redemptions_user_id_idx").on(t.userId),
    index("points_redemptions_status_expires_idx").on(t.status, t.expiresAt),
  ]
);

export const discountCodes = sqliteTable(
  "discount_codes",
  {
    id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    code:      text("code").notNull().unique(),
    type:      text("type").notNull(),   // "PERCENT" | "FIXED"
    value:     integer("value").notNull(),
    minAmount: integer("min_amount"),
    maxUses:   integer("max_uses"),
    usedCount: integer("used_count").notNull().default(0),
    expiresAt: timestampNullable("expires_at"),
    active:    integer("active", { mode: "boolean" }).notNull().default(true),
    createdAt: timestamp("created_at"),
    updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
  },
  (t) => [
    index("discount_codes_code_idx").on(t.code),
    index("discount_codes_active_idx").on(t.active),
  ]
);

export const discountUsages = sqliteTable(
  "discount_usages",
  {
    id:             text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    discountCodeId: text("discount_code_id").notNull(),
    userId:         text("user_id"),
    email:          text("email"),
    userName:       text("user_name"),
    phone:          text("phone"),
    discountAmount: integer("discount_amount").notNull(),
    cartTotal:      integer("cart_total").notNull(),
    finalTotal:     integer("final_total").notNull(),
    bookingId:      text("booking_id"),
    createdAt:      timestamp("created_at"),
  },
  (t) => [
    index("discount_usages_discount_code_id_idx").on(t.discountCodeId),
    index("discount_usages_user_id_idx").on(t.userId),
    index("discount_usages_email_idx").on(t.email),
  ]
);

// ─── Zap Scheduling ──────────────────────────────────────────────────────────

export const schedules = sqliteTable(
  "schedules",
  {
    id:                 text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name:               text("name").notNull(),
    type:               text("type").notNull(),          // 'availability', 'appointment', 'blocked', 'custom'
    resourceType:       text("resource_type").notNull(), // e.g. 'doctor', 'service', 'room'
    resourceId:         text("resource_id").notNull(),
    startDate:          text("start_date"), // YYYY-MM-DD
    endDate:            text("end_date"),
    frequency:          text("frequency"),  // 'daily', 'weekly', etc.
    frequencyData:      text("frequency_data"), // JSON
    active:             integer("active", { mode: "boolean" }).notNull().default(true),
    allowOverlap:       integer("allow_overlap", { mode: "boolean" }).notNull().default(false),
    noWeekends:         integer("no_weekends", { mode: "boolean" }).notNull().default(false),
    maxDurationMinutes: integer("max_duration_minutes"),
    workingHoursStart:  text("working_hours_start"), // "09:00"
    workingHoursEnd:    text("working_hours_end"),   // "17:00"
    metadata:           text("metadata"),            // JSON
    createdAt:          timestamp("created_at"),
    updatedAt:          text("updated_at").notNull().default(sql`(datetime('now'))`),
  },
  (t) => [
    index("schedules_resource_type_idx").on(t.resourceType),
    index("schedules_resource_id_idx").on(t.resourceId),
    index("schedules_active_idx").on(t.active),
  ]
);

export const schedulePeriods = sqliteTable(
  "schedule_periods",
  {
    id:         text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    scheduleId: text("schedule_id").notNull(),
    startTime:  text("start_time").notNull(), // "09:00"
    endTime:    text("end_time").notNull(),   // "17:00"
  },
  (t) => [
    index("schedule_periods_schedule_id_idx").on(t.scheduleId),
  ]
);

// ─────────────────────────────────────────────────────────────────────────────
// Relations — used by Drizzle's relational query API (db.query.*)
// These do NOT add columns or constraints; they just teach Drizzle how
// tables relate so you can use the typed .findMany({ with: { ... } }) API.
// ─────────────────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one, many }) => ({
  referredBy:           one(users, { fields: [users.referredById], references: [users.id], relationName: "referrals" }),
  referrals:            many(users, { relationName: "referrals" }),
  accounts:             many(accounts),
  sessions:             many(sessions),
  bookings:             many(bookings),
  carts:                many(carts),
  favorites:            many(favorites),
  ratings:              many(ratings),
  referralCodes:        many(referralCodes),
  referralRewards:      many(referralRewards),
  promotionSubscribers: many(promotionSubscribers),
  pointsRedemptions:    many(pointsRedemptions),
  discountUsages:       many(discountUsages),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  bookings:  many(bookings),
  carts:     many(carts),
  favorites: many(favorites),
  ratings:   many(ratings),
  schedules: many(schedules, { relationName: "serviceSchedules" }),
}));

export const schedulesServicesRelations = relations(schedules, ({ one }) => ({
  service: one(services, {
    fields: [schedules.resourceId],
    references: [services.id],
    relationName: "serviceSchedules",
  }),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  service: one(services, { fields: [bookings.serviceId], references: [services.id] }),
  user:    one(users, { fields: [bookings.userId], references: [users.id] }),
  photos:  many(photos),
}));

export const photosRelations = relations(photos, ({ one }) => ({
  booking: one(bookings, { fields: [photos.bookingId], references: [bookings.id] }),
}));

export const cartsRelations = relations(carts, ({ one }) => ({
  user:    one(users, { fields: [carts.userId], references: [users.id] }),
  service: one(services, { fields: [carts.serviceId], references: [services.id] }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user:    one(users, { fields: [favorites.userId], references: [users.id] }),
  service: one(services, { fields: [favorites.serviceId], references: [services.id] }),
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
  user:    one(users, { fields: [ratings.userId], references: [users.id] }),
  service: one(services, { fields: [ratings.serviceId], references: [services.id] }),
}));

export const referralCodesRelations = relations(referralCodes, ({ one }) => ({
  user: one(users, { fields: [referralCodes.userId], references: [users.id] }),
}));

export const referralRewardsRelations = relations(referralRewards, ({ one }) => ({
  user: one(users, { fields: [referralRewards.userId], references: [users.id] }),
}));

export const promotionSubscribersRelations = relations(promotionSubscribers, ({ one }) => ({
  user: one(users, { fields: [promotionSubscribers.userId], references: [users.id] }),
}));

export const pointsRedemptionsRelations = relations(pointsRedemptions, ({ one }) => ({
  user: one(users, { fields: [pointsRedemptions.userId], references: [users.id] }),
}));

export const discountCodesRelations = relations(discountCodes, ({ many }) => ({
  usages: many(discountUsages),
}));

export const discountUsagesRelations = relations(discountUsages, ({ one }) => ({
  discountCode: one(discountCodes, { fields: [discountUsages.discountCodeId], references: [discountCodes.id] }),
  user:         one(users, { fields: [discountUsages.userId], references: [users.id] }),
}));

export const schedulesRelations = relations(schedules, ({ many }) => ({
  periods: many(schedulePeriods),
}));

export const schedulePeriodsRelations = relations(schedulePeriods, ({ one }) => ({
  schedule: one(schedules, { fields: [schedulePeriods.scheduleId], references: [schedules.id] }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// Type exports — inferred from schema for use in your application
// ─────────────────────────────────────────────────────────────────────────────

export type User                 = typeof users.$inferSelect;
export type NewUser              = typeof users.$inferInsert;
export type Service              = typeof services.$inferSelect;
export type NewService           = typeof services.$inferInsert;
export type Booking              = typeof bookings.$inferSelect;
export type NewBooking           = typeof bookings.$inferInsert;
export type Photo                = typeof photos.$inferSelect;
export type NewPhoto             = typeof photos.$inferInsert;
export type Cart                 = typeof carts.$inferSelect;
export type NewCart              = typeof carts.$inferInsert;
export type CartEmail            = typeof cartEmails.$inferSelect;
export type Favorite             = typeof favorites.$inferSelect;
export type Rating               = typeof ratings.$inferSelect;
export type NewRating            = typeof ratings.$inferInsert;
export type ReferralCode         = typeof referralCodes.$inferSelect;
export type ReferralReward       = typeof referralRewards.$inferSelect;
export type PromotionSubscriber  = typeof promotionSubscribers.$inferSelect;
export type PointsRedemption     = typeof pointsRedemptions.$inferSelect;
export type DiscountCode         = typeof discountCodes.$inferSelect;
export type DiscountUsage        = typeof discountUsages.$inferSelect;
export type Schedule             = typeof schedules.$inferSelect;
export type NewSchedule          = typeof schedules.$inferInsert;
export type SchedulePeriod       = typeof schedulePeriods.$inferSelect;
export type NewSchedulePeriod    = typeof schedulePeriods.$inferInsert;
