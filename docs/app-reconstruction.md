# Reebooking → Universal Booking Platform: Reconstruction Document

> **Generated**: June 2025
> **Source**: Full codebase reverse-engineering of the `reebooking` salon booking application
> **Target**: Reusable, multi-client, multi-industry booking platform on **Next.js (App Router) + TypeScript + Neon/Postgres + Vercel**

---

## Table of Contents

1. [Application Overview](#1-application-overview)
2. [Data Layer — Current Schema Analysis](#2-data-layer--current-schema-analysis)
3. [Data Layer — Proposed Neon/Postgres Schema](#3-data-layer--proposed-neonpostgres-schema)
4. [Routing & API Layer](#4-routing--api-layer)
5. [UI Architecture](#5-ui-architecture)
6. [Core Booking System](#6-core-booking-system)
7. [Messaging System](#7-messaging-system)
8. [Platform Abstraction](#8-platform-abstraction)
9. [New Architecture Proposal](#9-new-architecture-proposal)
10. [Neon/Postgres Migration Plan](#10-neonpostgres-migration-plan)
11. [Data Flow Maps](#11-data-flow-maps)
12. [Assumptions & Unknowns](#12-assumptions--unknowns)

---

## 1. Application Overview

### What Exists Today

A **salon-specific booking application** built for a single hair salon ("Luxury Nail Spa" / "Reebooking"). It handles:

- Service catalog browsing
- Multi-service cart with checkout
- Date/time slot availability with a custom scheduling engine ("Zap")
- Stripe, cash, and mobile payment methods
- Admin dashboard with booking management, service CRUD, discount codes, referrals, ratings, and analytics
- Contact/messaging system with admin inbox
- Photo uploads via Cloudinary
- Email notifications via Resend
- RBAC: `SUPER_ADMIN`, `ADMIN`, `STAFF`, `CLIENT`

### Current Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14+ (App Router, `app/` directory) |
| **Language** | TypeScript |
| **Database** | Cloudflare D1 (SQLite) via Drizzle ORM |
| **DB Client** | `drizzle-orm/sqlite-proxy` (prod) / `better-sqlite3` (local) |
| **Auth** | NextAuth v4 (JWT strategy, Credentials + Google OAuth) |
| **Payments** | Stripe (with stub fallback when unconfigured) |
| **State** | Redux Toolkit (persisted cart) + SWR (data fetching) |
| **Styling** | Tailwind CSS + custom design tokens (Playfair Display + Inter fonts) |
| **UI** | shadcn/ui components, Sonner toasts, Lucide icons |
| **Email** | Resend |
| **Storage** | Cloudinary (photo uploads) |
| **Deployment** | Vercel |
| **Rate Limiting** | In-memory (needs Redis for production scale) |

### Salon-Specific Hardcoding

These items **must be abstracted** for multi-industry reuse:

| Location | Hardcoded Value |
|---|---|
| `lib/email-service.ts` | "Luxury Nail Spa", "Your Beauty, Our Passion", `bookings@luxurynailspa.com` |
| `lib/constants/services.ts` | Categories: "Natural Hair", "Locs", "Color & Chemical" |
| `lib/constants/services.ts` | `Service.imagePrompt` field (salon-specific AI prompts) |
| `app/layout.tsx` | "Reebooking - Botanical Salon Interface" |
| Email templates | Purple gradient branding, salon-specific footer text |
| `app/api/v1/services/route.ts` | Stripe product description: "Spa Service: {name}" |
| `app/api/v1/checkout/route.ts` | "Welcome to Luxury Nail Spa" email subject |

---

## 2. Data Layer — Current Schema Analysis

### Source File

`src/db/schema.ts` — 620 lines, Drizzle ORM with `sqliteTable` definitions.

### Current Tables

| Table | Purpose | Row Estimate | Notes |
|---|---|---|---|
| `users` | All user accounts | Core | Has `role`, `referralCode`, `referralPoints` |
| `accounts` | OAuth provider links (NextAuth) | Auth | Standard NextAuth adapter table |
| `sessions` | Session tokens (NextAuth) | Auth | Standard NextAuth adapter table |
| `verification_tokens` | Email verification (NextAuth) | Auth | Standard NextAuth adapter table |
| `services` | Bookable service catalog | Core | Has `stripePriceId`, `category`, `mediaUrl` |
| `bookings` | Confirmed/pending appointments | Core | Links user ↔ service, stores date/time/payment |
| `photos` | Images attached to bookings | Core | Cloudinary URLs |
| `carts` | Server-side cart items | Core | Has `expiresAt` (24h TTL) |
| `cart_emails` | Abandoned cart email queue | Marketing | JSON `cartItems` stored as TEXT |
| `favorites` | User's favorite services | Engagement | Unique per user+service |
| `ratings` | Service reviews | Engagement | 1–5 stars, PENDING/APPROVED/REJECTED moderation |
| `referral_codes` | Per-user referral codes | Loyalty | Points per referral |
| `referral_rewards` | Referral transaction log | Loyalty | Links referrer ↔ referred |
| `promotion_subscribers` | Email list subscribers | Marketing | Opt-in/out |
| `points_redemptions` | Points-to-discount conversions | Loyalty | PENDING/APPLIED/EXPIRED |
| `discount_codes` | Promo codes (% or fixed) | Marketing | Max uses, min amount, expiry |
| `discount_usages` | Discount usage log | Marketing | Audit trail |
| `schedules` | Availability/block/appointment rules | Scheduling | Zap engine — polymorphic `resourceType`/`resourceId` |
| `schedule_periods` | Time windows for schedules | Scheduling | Start/end time pairs |
| `messages` | Contact + support messages | Messaging | Threading via `parentId`, intent classification |
| `message_notes` | Admin internal notes on messages | Messaging | Private annotations |

### Schema Strengths

1. **Zap scheduling is already generic** — uses `resourceType`/`resourceId` polymorphism, supports multiple recurrence patterns
2. **Messaging schema supports threading** — `parentId`, `isFromAdmin`, intent classification
3. **Good indexing** — composite indexes on hot query paths (status+createdAt, service+status)
4. **Partial unique index** on bookings (`service_id`, `date`, `time` WHERE status != 'CANCELLED') prevents double-booking at DB level

### Schema Weaknesses

1. **No multi-tenant support** — no `tenant_id` / `organization_id` on any table
2. **No `providers` table** — services belong to the platform, not to individual service providers
3. **No `duration` field on services** — the booking form doesn't enforce duration; the Zap engine defaults to 60min
4. **Bookings lack `provider_id`** — can't assign a booking to a specific staff member/provider
5. **Timestamps as TEXT** — ISO strings stored as `text()`, not native timestamps; acceptable in SQLite but wasteful in Postgres
6. **JSON-as-TEXT columns** (`tags`, `cartItems`, `frequencyData`, `metadata`) — Postgres has native `jsonb`
7. **No `timezone` awareness** — dates stored as bare `YYYY-MM-DD` strings with no timezone context
8. **In-memory rate limiting** — `lib/rate-limit.ts` uses a JS object; lost on serverless cold starts
9. **Cart table duplicates Redux state** — dual client (Redux persist) + server (carts table) state creates sync complexity
10. **No audit log** — no generic event/audit table for tracking changes

---

## 3. Data Layer — Proposed Neon/Postgres Schema

### Design Principles

- **Tenant isolation** via `organization_id` on all business tables
- **Provider assignment** for bookings (staff member who performs the service)
- **Native PG types**: `timestamptz`, `jsonb`, `uuid`, `interval`, `tstzrange`
- **Row-Level Security (RLS)** ready — `organization_id` on every tenant-scoped table
- **Duration-aware services** — `duration_minutes` and `buffer_minutes` columns
- **Timezone-aware scheduling** — organization has a `timezone` column; all timestamps are `timestamptz`

### New Core Tables

```sql
-- ═══════════════════════════════════════════════════════════════════
-- MULTI-TENANCY
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE organizations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,           -- URL-safe identifier
  industry        TEXT NOT NULL DEFAULT 'general', -- 'salon', 'medical', 'fitness', 'consulting', etc.
  timezone        TEXT NOT NULL DEFAULT 'UTC',     -- IANA timezone (e.g., 'America/New_York')
  currency        TEXT NOT NULL DEFAULT 'USD',
  locale          TEXT NOT NULL DEFAULT 'en-US',
  logo_url        TEXT,
  primary_color   TEXT DEFAULT '#7c3aed',
  secondary_color TEXT DEFAULT '#6d28d9',
  contact_email   TEXT,
  contact_phone   TEXT,
  website_url     TEXT,
  stripe_account_id TEXT,                         -- Stripe Connect account for this org
  settings        JSONB NOT NULL DEFAULT '{}',    -- Flexible org-level config
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_organizations_slug ON organizations (slug);
CREATE INDEX idx_organizations_industry ON organizations (industry);

-- Junction: which users belong to which orgs (and in what role)
CREATE TABLE organization_members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role            TEXT NOT NULL DEFAULT 'CLIENT', -- 'OWNER', 'ADMIN', 'STAFF', 'CLIENT'
  joined_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, user_id)
);

CREATE INDEX idx_org_members_org ON organization_members (organization_id);
CREATE INDEX idx_org_members_user ON organization_members (user_id);
CREATE INDEX idx_org_members_role ON organization_members (organization_id, role);

-- ═══════════════════════════════════════════════════════════════════
-- AUTH (NextAuth compatible — unchanged structure, PG types)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT,
  email           TEXT NOT NULL UNIQUE,
  email_verified  TIMESTAMPTZ,
  password        TEXT,                           -- bcrypt hash (null for OAuth-only users)
  phone           TEXT,
  image           TEXT,
  reset_token     TEXT,
  reset_token_expiry TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Note: `role` moves to organization_members (per-org role)
-- Global platform admins can be tracked via a `is_platform_admin BOOLEAN DEFAULT FALSE` column if needed.

CREATE TABLE accounts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type                TEXT NOT NULL,
  provider            TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token       TEXT,
  access_token        TEXT,
  expires_at          INTEGER,
  token_type          TEXT,
  scope               TEXT,
  id_token            TEXT,
  session_state       TEXT,
  UNIQUE (provider, provider_account_id)
);

CREATE INDEX idx_accounts_user ON accounts (user_id);

CREATE TABLE sessions (
  session_token TEXT PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires       TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_sessions_user ON sessions (user_id);

CREATE TABLE verification_tokens (
  identifier TEXT NOT NULL,
  token      TEXT NOT NULL UNIQUE,
  expires    TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- ═══════════════════════════════════════════════════════════════════
-- SERVICE CATALOG
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE service_categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL,
  description     TEXT,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, slug)
);

CREATE INDEX idx_svc_cat_org ON service_categories (organization_id);

CREATE TABLE services (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  category_id       UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  name              TEXT NOT NULL,
  description       TEXT,
  media_url         TEXT,
  price             INTEGER NOT NULL,              -- cents
  duration_minutes  INTEGER NOT NULL DEFAULT 60,
  buffer_minutes    INTEGER NOT NULL DEFAULT 0,    -- gap after appointment
  max_concurrent    INTEGER NOT NULL DEFAULT 1,    -- how many parallel bookings
  stripe_price_id   TEXT,
  active            BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order        INTEGER NOT NULL DEFAULT 0,
  metadata          JSONB NOT NULL DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_services_org ON services (organization_id);
CREATE INDEX idx_services_category ON services (category_id);
CREATE INDEX idx_services_org_active ON services (organization_id, active);

-- ═══════════════════════════════════════════════════════════════════
-- PROVIDERS (staff who deliver services)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE providers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES users(id) ON DELETE SET NULL,  -- linked user account (optional)
  name            TEXT NOT NULL,
  email           TEXT,
  phone           TEXT,
  image           TEXT,
  bio             TEXT,
  active          BOOLEAN NOT NULL DEFAULT TRUE,
  metadata        JSONB NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_providers_org ON providers (organization_id);
CREATE INDEX idx_providers_user ON providers (user_id);

-- Which providers can perform which services
CREATE TABLE provider_services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  service_id  UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  UNIQUE (provider_id, service_id)
);

-- ═══════════════════════════════════════════════════════════════════
-- BOOKINGS
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  service_id      UUID NOT NULL REFERENCES services(id),
  provider_id     UUID REFERENCES providers(id),       -- assigned staff
  user_id         UUID REFERENCES users(id),           -- customer
  -- Denormalized contact info (for guest bookings or "booking for other")
  customer_name   TEXT NOT NULL,
  customer_email  TEXT,
  customer_phone  TEXT NOT NULL,
  -- Time
  date            DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,                       -- computed from service.duration_minutes
  -- Status & payment
  status          TEXT NOT NULL DEFAULT 'PENDING',     -- PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW
  payment_method  TEXT NOT NULL,                       -- 'stripe', 'cash', 'mobile', 'free'
  payment_status  TEXT NOT NULL DEFAULT 'UNPAID',      -- UNPAID, PAID, REFUNDED, PARTIALLY_REFUNDED
  mobile_provider TEXT,
  stripe_session_id TEXT,
  price_charged   INTEGER,                             -- actual price in cents
  -- Metadata
  notes           TEXT,                                -- customer notes
  internal_notes  TEXT,                                -- staff-only notes
  metadata        JSONB NOT NULL DEFAULT '{}',
  cancelled_at    TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prevent double-booking for same provider at same time
CREATE UNIQUE INDEX idx_bookings_provider_slot
  ON bookings (provider_id, date, start_time)
  WHERE status NOT IN ('CANCELLED', 'NO_SHOW');

-- Prevent double-booking for same service at same time (when no provider assigned)
CREATE UNIQUE INDEX idx_bookings_service_slot
  ON bookings (organization_id, service_id, date, start_time)
  WHERE provider_id IS NULL AND status NOT IN ('CANCELLED', 'NO_SHOW');

CREATE INDEX idx_bookings_org ON bookings (organization_id);
CREATE INDEX idx_bookings_service ON bookings (service_id);
CREATE INDEX idx_bookings_provider ON bookings (provider_id);
CREATE INDEX idx_bookings_user ON bookings (user_id);
CREATE INDEX idx_bookings_status ON bookings (organization_id, status);
CREATE INDEX idx_bookings_date ON bookings (organization_id, date);
CREATE INDEX idx_bookings_org_date_status ON bookings (organization_id, date, status);

CREATE TABLE booking_photos (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_booking_photos_booking ON booking_photos (booking_id);

-- ═══════════════════════════════════════════════════════════════════
-- SCHEDULING (Zap engine — migrated from SQLite)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE schedules (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id     UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  type                TEXT NOT NULL,              -- 'availability', 'appointment', 'blocked', 'custom'
  resource_type       TEXT NOT NULL,              -- 'provider', 'service', 'room', 'equipment'
  resource_id         UUID NOT NULL,              -- references providers.id, services.id, etc.
  start_date          DATE,
  end_date            DATE,
  frequency           TEXT,                       -- 'daily', 'weekly', 'weekly_odd', 'weekly_even', 'biweekly', etc.
  frequency_data      JSONB,                      -- { "days": ["monday","wednesday"], "anchor_date": "2025-01-06" }
  active              BOOLEAN NOT NULL DEFAULT TRUE,
  allow_overlap       BOOLEAN NOT NULL DEFAULT FALSE,
  no_weekends         BOOLEAN NOT NULL DEFAULT FALSE,
  max_duration_minutes INTEGER,
  working_hours_start TIME,
  working_hours_end   TIME,
  metadata            JSONB,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_schedules_org ON schedules (organization_id);
CREATE INDEX idx_schedules_resource ON schedules (resource_type, resource_id);
CREATE INDEX idx_schedules_active ON schedules (organization_id, active);

CREATE TABLE schedule_periods (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL
);

CREATE INDEX idx_schedule_periods_schedule ON schedule_periods (schedule_id);

-- ═══════════════════════════════════════════════════════════════════
-- CART
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE carts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES users(id),
  session_token   TEXT,                           -- for guest carts
  service_id      UUID NOT NULL REFERENCES services(id),
  provider_id     UUID REFERENCES providers(id),
  date            DATE NOT NULL,
  time            TIME NOT NULL,
  quantity        INTEGER NOT NULL DEFAULT 1,
  expires_at      TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours'),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_carts_org ON carts (organization_id);
CREATE INDEX idx_carts_user ON carts (user_id);
CREATE INDEX idx_carts_expires ON carts (expires_at);

-- ═══════════════════════════════════════════════════════════════════
-- FAVORITES & RATINGS
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE favorites (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_id      UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, service_id)
);

CREATE INDEX idx_favorites_user ON favorites (user_id);
CREATE INDEX idx_favorites_service ON favorites (service_id);

CREATE TABLE ratings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id),
  service_id      UUID NOT NULL REFERENCES services(id),
  provider_id     UUID REFERENCES providers(id),  -- optional: rate the provider too
  booking_id      UUID REFERENCES bookings(id),   -- which booking prompted this review
  rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment         TEXT,
  status          TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, service_id)                    -- one rating per user per service
);

CREATE INDEX idx_ratings_service ON ratings (service_id);
CREATE INDEX idx_ratings_org_status ON ratings (organization_id, status);
CREATE INDEX idx_ratings_service_status ON ratings (service_id, status);

-- ═══════════════════════════════════════════════════════════════════
-- REFERRALS & LOYALTY
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE referral_codes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id     UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id             UUID NOT NULL REFERENCES users(id),
  code                TEXT NOT NULL,
  points_per_referral INTEGER NOT NULL DEFAULT 100,
  usage_count         INTEGER NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code)
);

CREATE INDEX idx_referral_codes_user ON referral_codes (user_id);

CREATE TABLE referral_rewards (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  referrer_id UUID NOT NULL REFERENCES users(id),
  referred_id UUID NOT NULL REFERENCES users(id),
  points      INTEGER NOT NULL,
  booking_id  UUID REFERENCES bookings(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_referral_rewards_referrer ON referral_rewards (referrer_id);
CREATE INDEX idx_referral_rewards_referred ON referral_rewards (referred_id);

-- ═══════════════════════════════════════════════════════════════════
-- DISCOUNTS
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE discount_codes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  code            TEXT NOT NULL,
  type            TEXT NOT NULL,                  -- 'PERCENT', 'FIXED'
  value           INTEGER NOT NULL,
  min_amount      INTEGER,
  max_uses        INTEGER,
  used_count      INTEGER NOT NULL DEFAULT 0,
  expires_at      TIMESTAMPTZ,
  active          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code)
);

CREATE INDEX idx_discount_codes_org_active ON discount_codes (organization_id, active);

CREATE TABLE discount_usages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  discount_code_id UUID NOT NULL REFERENCES discount_codes(id),
  user_id         UUID REFERENCES users(id),
  email           TEXT,
  customer_name   TEXT,
  phone           TEXT,
  discount_amount INTEGER NOT NULL,
  cart_total      INTEGER NOT NULL,
  final_total     INTEGER NOT NULL,
  booking_id      UUID REFERENCES bookings(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_discount_usages_code ON discount_usages (discount_code_id);
CREATE INDEX idx_discount_usages_user ON discount_usages (user_id);

-- ═══════════════════════════════════════════════════════════════════
-- MESSAGING / SUPPORT
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE conversations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  -- Initiator
  user_id         UUID REFERENCES users(id),      -- null for guests
  guest_email     TEXT,                            -- for unauthenticated contact forms
  guest_name      TEXT,
  -- Classification
  source          TEXT NOT NULL,                   -- 'contact_form', 'authenticated_user', 'booking_auto', 'system'
  intent          TEXT NOT NULL DEFAULT 'general', -- 'general', 'booking_inquiry', 'service_question', 'cancellation_request', 'complaint', 'feedback'
  subject         TEXT,
  -- Booking context
  booking_id      UUID REFERENCES bookings(id),
  service_id      UUID REFERENCES services(id),
  requested_date  DATE,
  requested_time_range TEXT,
  -- Status
  status          TEXT NOT NULL DEFAULT 'open',    -- 'open', 'awaiting_reply', 'resolved', 'archived'
  priority        TEXT NOT NULL DEFAULT 'normal',  -- 'low', 'normal', 'high', 'urgent'
  assigned_to     UUID REFERENCES users(id),       -- admin/staff assigned
  tags            JSONB NOT NULL DEFAULT '[]',
  -- Timestamps
  last_message_at TIMESTAMPTZ,
  resolved_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_conversations_org ON conversations (organization_id);
CREATE INDEX idx_conversations_user ON conversations (user_id);
CREATE INDEX idx_conversations_status ON conversations (organization_id, status);
CREATE INDEX idx_conversations_assigned ON conversations (assigned_to);
CREATE INDEX idx_conversations_org_status_last ON conversations (organization_id, status, last_message_at DESC);

CREATE TABLE conversation_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       UUID REFERENCES users(id),      -- null for guest messages
  sender_name     TEXT,
  sender_email    TEXT,
  is_from_staff   BOOLEAN NOT NULL DEFAULT FALSE,
  body            TEXT NOT NULL,
  attachments     JSONB NOT NULL DEFAULT '[]',     -- [{url, type, name}]
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_conv_messages_conv ON conversation_messages (conversation_id);
CREATE INDEX idx_conv_messages_conv_created ON conversation_messages (conversation_id, created_at);

CREATE TABLE conversation_notes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  author_id       UUID NOT NULL REFERENCES users(id),
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_conv_notes_conv ON conversation_notes (conversation_id);

-- ═══════════════════════════════════════════════════════════════════
-- PROMOTIONS & NOTIFICATIONS
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE promotion_subscribers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES users(id),
  email           TEXT NOT NULL,
  name            TEXT,
  phone           TEXT,
  subscribed      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, email)
);

CREATE INDEX idx_promo_subs_org ON promotion_subscribers (organization_id, subscribed);

-- ═══════════════════════════════════════════════════════════════════
-- AUDIT LOG
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  user_id         UUID REFERENCES users(id),
  action          TEXT NOT NULL,                   -- 'booking.created', 'booking.cancelled', 'service.updated', etc.
  entity_type     TEXT NOT NULL,                   -- 'booking', 'service', 'user', etc.
  entity_id       UUID,
  changes         JSONB,                           -- { before: {...}, after: {...} }
  ip_address      TEXT,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_org ON audit_log (organization_id);
CREATE INDEX idx_audit_entity ON audit_log (entity_type, entity_id);
CREATE INDEX idx_audit_action ON audit_log (organization_id, action);
CREATE INDEX idx_audit_created ON audit_log (created_at);
```

### Key Schema Changes Summary

| Change | Rationale |
|---|---|
| `organizations` table | Multi-tenancy — every business entity gets its own org |
| `organization_members` | Per-org roles (replaces single `role` on users) |
| `providers` table | Decouple "who does the work" from "who books" |
| `provider_services` | Many-to-many: which staff can do which services |
| `service_categories` | Normalize categories (was a text string) |
| `duration_minutes` on services | Required for accurate slot generation |
| `end_time` on bookings | Explicit end time for calendar rendering |
| `conversations` + `conversation_messages` | Proper conversation model (replaces flat `messages` with self-referencing `parentId`) |
| `audit_log` | Track all mutations for compliance and debugging |
| Native PG types | `DATE`, `TIME`, `TIMESTAMPTZ`, `JSONB`, `UUID`, `BOOLEAN` |
| `payment_status` on bookings | Separate booking lifecycle from payment lifecycle |

---

## 4. Routing & API Layer

### Current Route Map

#### Pages (App Router)

| Route | Type | Auth | Description |
|---|---|---|---|
| `/` | Public | No | Landing page (Hero, ServicesPreview, BookingSection, About, Testimonials, Gallery, CTA) |
| `/services` | Public | No | Full service catalog with filtering and sorting |
| `/booking` | Public | No | Dedicated booking page with `AmeliaBookingForm` |
| `/contact` | Public | No | Split layout: hero image + contact form |
| `/signup` | Public | No | Split layout: hero image + registration form |
| `/signin` | Public | No | Login page |
| `/about` | Public | No | About page |
| `/gallery` | Public | No | Photo gallery |
| `/cart` | Auth | Yes | Cart page |
| `/checkout` | Auth | Yes | Stripe checkout flow |
| `/(dashboard)/dashboard` | Auth | Yes | User dashboard |
| `/(dashboard)/profile` | Auth | Yes | User profile |
| `/(dashboard)/settings` | Auth | Yes | User settings |
| `/(dashboard)/admin` | Auth | ADMIN+ | Admin dashboard hub |
| `/(dashboard)/admin/services` | Auth | ADMIN+ | Service CRUD |
| `/(dashboard)/admin/messages` | Auth | ADMIN+ | Message inbox |
| `/(dashboard)/admin/discount` | Auth | ADMIN+ | Discount management |
| `/(dashboard)/admin/roles` | Auth | ADMIN+ | Role management |
| `/(dashboard)/admin/super` | Auth | SUPER_ADMIN | Super admin panel |
| `/(dashboard)/staff` | Auth | STAFF+ | Staff view |
| `/demo` | Public | No | Demo pages |

#### API Routes

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/[...nextauth]` | * | — | NextAuth handler |
| `/api/v1/services` | GET | No | List services (paginated, sorted) |
| `/api/v1/services` | POST | ADMIN | Create service (+ Stripe product) |
| `/api/v1/services/[id]` | PATCH/DELETE | ADMIN | Update/delete service |
| `/api/v1/bookings` | GET | Mixed | Public: slot check; Auth: user's bookings; Admin: all |
| `/api/v1/bookings` | POST | No | Create booking (with Zap slot guard) |
| `/api/v1/bookings/[id]` | GET/PATCH | Auth | Get/update booking |
| `/api/v1/bookings/[id]/receipt` | GET | Auth | Generate PDF receipt |
| `/api/v1/bookings/bulk` | POST | No | Bulk booking (cash/mobile) |
| `/api/v1/bookings/stats` | GET | ADMIN | Booking statistics |
| `/api/v1/cart` | GET/POST/DELETE | Mixed | Server-side cart CRUD |
| `/api/v1/cart/sync` | POST | Auth | Sync guest cart → user cart |
| `/api/v1/cart/clear` | DELETE | Auth | Clear cart |
| `/api/v1/cart/cleanup` | POST | System | Purge expired carts |
| `/api/v1/checkout` | POST | Auth | Stripe checkout session |
| `/api/v1/messages` | GET/POST | Mixed | List/create messages |
| `/api/v1/messages/[id]` | GET/PATCH | ADMIN | Get/update message |
| `/api/v1/messages/[id]/reply` | POST | ADMIN | Reply to message |
| `/api/v1/messages/[id]/notes` | GET/POST | ADMIN | Message notes |
| `/api/v1/ratings` | GET/POST | Mixed | List/create ratings |
| `/api/v1/favorites` | GET/POST/DELETE | Auth | User favorites |
| `/api/v1/discount` | POST | No | Apply discount code |
| `/api/v1/search` | GET | ADMIN | Global search |
| `/api/v1/user/*` | Various | Auth | Profile, password, referrals |
| `/api/v1/admin/*` | Various | ADMIN | Admin-only operations |
| `/api/v1/ai/*` | POST | Auth | AI features (OpenAI) |
| `/api/v1/cloudinary` | POST | Auth | Image upload signature |
| `/api/v1/payment-intent` | POST | Auth | Stripe payment intent |
| `/api/v1/send-whatsapp` | POST | Auth | WhatsApp integration |
| `/api/v1/webhook` | POST | No | Stripe webhook |
| `/api/schedules/[resourceType]/[resourceId]/slots` | GET | No | Zap: get available slots |
| `/api/schedules/[resourceType]/[resourceId]/month-slots` | GET | No | Zap: month view slots |
| `/api/schedules/[resourceType]/[resourceId]/[type]` | GET/POST | ADMIN | Zap: manage schedules |
| `/api/admin/schedules` | GET/POST | ADMIN | Admin schedule management |

### API Layer Strengths

1. **Versioned endpoints** (`/api/v1/`) — ready for breaking changes
2. **Wrapper pattern** (`createGetHandler`, `createPostHandler`) — consistent error handling + rate limiting
3. **Zod validation** on all inputs — type-safe request parsing
4. **Separation of concerns** — slot availability (public) vs booking data (auth-required)

### API Layer Weaknesses

1. **No org-scoping** — APIs operate on global data, not per-organization
2. **Inconsistent auth checks** — some routes check `user.role` inline, others use the `currentUserServer()` helper
3. **No middleware-based auth** — each route reimplements session fetching
4. **Rate limiter is in-memory** — lost on every cold start in serverless (Vercel)
5. **Missing pagination on messages** — admin GET returns all messages
6. **No API key support** — can't integrate with external systems
7. **Mixed scheduling endpoints** — `/api/schedules/` and `/api/admin/schedules/` overlap

### Proposed API Changes for Platform

1. **Add `X-Organization-Id` header** or `/api/v1/orgs/:orgId/` prefix for all tenant-scoped endpoints
2. **Create auth middleware** at `middleware.ts` for session + org resolution
3. **Replace in-memory rate limit** with Vercel KV / Upstash Redis
4. **Unify schedule routes** under `/api/v1/schedules/`
5. **Add API key auth** for machine-to-machine integrations
6. **Add pagination to all list endpoints**

---

## 5. UI Architecture

### Component Hierarchy

```
app/layout.tsx
├── ThemeProvider (next-themes)
├── ScrollProvider (scroll state)
├── SessionProvider (NextAuth)
├── ReduxProvider (Redux Toolkit + persist)
└── children
    ├── Public pages (Navbar + content + Footer)
    └── (dashboard)/ (authenticated layout)
        ├── Admin pages
        ├── Staff pages
        └── User pages
```

### Key Component Groups

| Directory | Components | Purpose |
|---|---|---|
| `components/SimpleBookingForm/` | 15 files (AmeliaBookingForm, ZapBookingForm, CalendarCard, ServiceSelection, TimeSelection, etc.) | Multi-step booking form with two variants: legacy (Amelia) and Zap-based |
| `components/admin/` | 72 items (BookingsManagement, ServicesManagement, ScheduleManagement, DiscountManagement, etc.) | Full admin dashboard |
| `components/messaging/` | 13 files (MessagesInbox, FilterColumn, MessageListColumn, ConversationColumn, etc.) | 3-column messaging UI |
| `components/sections/` | 7 files (Hero, ServicesPreview, BookingSection, AboutSection, Testimonials, GalleryPreview, CTASection) | Landing page sections |
| `components/layout/` | 10 files (Navbar, Footer, Sidebar, etc.) | Layout chrome |
| `components/ui/` | 62 files | shadcn/ui base components |
| `components/checkout/` | 5 files | Checkout flow components |
| `components/cart/` | 1 file | Cart display |
| `components/ratings/` | 3 files | Rating UI |

### State Management

| System | Scope | Technology |
|---|---|---|
| **Cart** | Client + Server | Redux Toolkit (persisted to localStorage) + server-side `carts` table + sync endpoint |
| **Data Fetching** | Client | SWR hooks (`lib/swr/hooks/`) for bookings, services, users |
| **Auth** | Client + Server | NextAuth session via `useSession()` (client) and `getServerSession()` (server) |
| **Scroll** | Client | Custom ScrollProvider context |
| **Booking Form** | Client | `useBookingForm` / `useZapBookingForm` hooks with local state |

### UI Strengths

1. **Two booking form variants** — legacy and Zap-based, togglable via `BookingFormToggle`
2. **Responsive messaging UI** — 3-column desktop, single-column mobile with drawer navigation
3. **Rich admin dashboard** — analytics, calendar view, service management
4. **shadcn/ui foundation** — consistent component library

### UI Weaknesses

1. **No design system tokens** — colors/fonts defined in `globals.css` and `tailwind.config`, not in a theme config
2. **Salon-specific sections** — Hero images, service descriptions all hardcoded
3. **No white-labeling** — logo, colors, content not configurable per organization
4. **Dual booking forms** — `AmeliaBookingForm` (22KB) and `ZapBookingForm` (15KB) have significant overlap
5. **No loading skeletons** — `Suspense` wraps the entire app with `fallback={null}`

---

## 6. Core Booking System

### Booking Flow (Current)

```
User selects service(s)
  ↓
User picks date on calendar
  ↓
System fetches booked slots for that date+service
  (GET /api/v1/bookings?date=X&serviceId=Y → returns occupied times)
  ↓
User selects available time slot
  ↓
(Optional) User uploads reference photos → Cloudinary
  ↓
User enters contact info (name, phone, email)
  ↓
User selects payment method:
  ├── Stripe → POST /api/v1/checkout → Stripe Checkout Session → redirect
  ├── Cash/Mobile → POST /api/v1/bookings (or /api/v1/bookings/bulk)
  └── (Future: mobile money providers)
  ↓
POST /api/v1/bookings:
  1. Validate input (Zod schema)
  2. Normalize date → YYYY-MM-DD, time → HH:mm
  3. For each serviceId:
     a. isZapSlotBookable(serviceId, date, time) → check Zap engine
     b. If not available → 409 Conflict
  4. Insert booking(s) + photo(s) in transaction
  5. Return created bookings
  ↓
Booking confirmation displayed
```

### Zap Scheduling Engine

**Location**: `lib/zap/` (4 files, ~58KB total)

The Zap engine is a **fluent builder API** modeled after Laravel's scheduling system. It supports:

| Feature | Implementation |
|---|---|
| **Availability windows** | `schedule.type = 'availability'` with periods (e.g., 09:00–12:00, 14:00–17:00) |
| **Blocked times** | `schedule.type = 'blocked'` — vacation, breaks, holidays |
| **Recurrence** | `daily`, `weekly`, `weekly_odd`, `weekly_even`, `biweekly` |
| **Frequency data** | JSON: `{ "days": ["monday", "wednesday", "friday"] }` |
| **Slot generation** | `getBookableSlots()` → merges availability, subtracts blockouts + existing bookings |
| **Slot guard** | `isZapSlotBookable()` → pre-insert check for double-booking prevention |

**Slot Generation Algorithm** (`lib/zap/engine.ts`):

1. Fetch active schedules for resource (type + id)
2. Filter to schedules matching the target date (recurrence evaluation)
3. Extract availability intervals from matching schedules
4. Merge overlapping availability intervals
5. Collect blockout intervals (blocked schedules + existing bookings)
6. Generate slots at `durationMinutes + bufferMinutes` intervals
7. Filter out slots overlapping blockouts or in the past

### Booking System Strengths

1. **Partial unique index** prevents DB-level double-booking
2. **Pre-insert Zap check** provides user-friendly "slot taken" messages before hitting the constraint
3. **Generic resource scheduling** — Zap already supports arbitrary `resourceType`/`resourceId`
4. **Multi-service cart** — users can book multiple services in one checkout

### Booking System Weaknesses

| Issue | Impact | Fix |
|---|---|---|
| No `duration_minutes` on services | Engine hardcodes 60min default | Add to services table |
| No `end_time` on bookings | Can't render accurate calendar blocks | Compute from `start_time + duration` |
| No provider assignment | Can't schedule multiple stylists in parallel | Add `provider_id` to bookings |
| No timezone handling | Breaks for businesses in non-UTC timezones | Store org timezone, use `date-fns-tz` |
| Transaction wrapper inconsistency | `db.transaction()` called differently for D1 vs better-sqlite3 | Standardize with Drizzle PG transactions |
| `DEFAULT_LEGACY_SLOT_TIMES` fallback | When no Zap schedules exist, shows hardcoded 6 slots | Should return empty or org-configured defaults |
| No waitlist | If slot is full, user has no recourse | Add waitlist table + notification |
| No recurring bookings | Each booking is one-off | Add recurrence support to bookings |
| Cart/booking separation | Cart stores `date`/`time` as strings, not validated against real availability until checkout | Validate on add-to-cart |

---

## 7. Messaging System

### Current Implementation

**Schema**: Single `messages` table with self-referencing `parentId` for threading.

**Components**:
- `MessagesInbox` — Unified 3-column layout (filters | message list | conversation)
- `FilterColumn` — Category, intent, and status filters
- `MessageListColumn` — Searchable, sortable message list with unread indicators
- `ConversationColumn` — Thread view with reply input and status actions

**API Endpoints**:
- `GET /api/v1/messages` — Admin: all with filters; User: own threads
- `POST /api/v1/messages` — Create message (public contact form or authenticated)
- `GET/PATCH /api/v1/messages/[id]` — Get/update message (admin)
- `POST /api/v1/messages/[id]/reply` — Admin reply (creates child message)
- `GET/POST /api/v1/messages/[id]/notes` — Admin internal notes

**Intents**: `general`, `booking_inquiry`, `service_question`, `cancellation_request`
**Statuses**: `unread`, `read`, `replied`, `archived`
**Sources**: `contact_form`, `authenticated_user`

### Messaging Strengths

1. **Intent classification** — messages tagged by purpose for routing
2. **Threading** — `parentId` creates conversation trees
3. **Admin notes** — private annotations separate from visible messages
4. **Booking context** — messages can reference a service, date, and time range

### Messaging Weaknesses & Proposed Improvements

| Current | Proposed |
|---|---|
| Flat `messages` table with self-joins | Split into `conversations` + `conversation_messages` (proper parent-child) |
| No assignment | Add `assigned_to` on conversations for routing to specific staff |
| No priority | Add `priority` field (low/normal/high/urgent) |
| No real-time | Add WebSocket/SSE for live message delivery |
| Single status for whole thread | Conversation-level status + per-message read receipts |
| `isFromAdmin` as integer (0/1) | `is_from_staff` boolean, allowing any staff member to reply |
| No canned responses | Add `canned_responses` table for quick replies |
| No auto-responses | Add org-configurable auto-reply rules |
| `source: 'admin_reply'` not in enum | Extend source types: `'contact_form' | 'authenticated_user' | 'staff_reply' | 'system' | 'booking_auto'` |
| No SLA tracking | Add `first_response_at`, `resolution_time` metrics |

---

## 8. Platform Abstraction

### Abstraction Strategy

Transform the salon-specific app into a **configurable booking platform** by:

1. **Tenant isolation** — every data query scoped by `organization_id`
2. **Configurable branding** — logo, colors, fonts, email templates driven by org settings
3. **Generic service model** — categories, durations, and metadata defined per org
4. **Provider model** — support multiple service providers per org
5. **Industry presets** — starter templates for salon, medical, fitness, consulting, etc.

### Abstraction Map

| Salon-Specific | Abstracted |
|---|---|
| "Natural Hair", "Locs", "Color & Chemical" | `service_categories` table per org |
| "Luxury Nail Spa" | `organizations.name` |
| Purple gradient branding | `organizations.primary_color`, `secondary_color` |
| `bookings@luxurynailspa.com` | `organizations.contact_email` |
| "Your Beauty, Our Passion" | `organizations.settings.tagline` |
| Hardcoded 6 time slots | Zap-generated slots per org schedule |
| Single Stripe account | Stripe Connect with `organizations.stripe_account_id` |
| Single user role | Per-org role via `organization_members` |
| USD currency | `organizations.currency` |
| English locale | `organizations.locale` |

### Email Template Abstraction

Current: Hardcoded HTML in `lib/email-service.ts` with "Luxury Nail Spa" branding.

Proposed: Template engine with org-configurable tokens:

```typescript
interface EmailContext {
  org: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    contactEmail: string;
    website: string;
    tagline: string;
  };
  // ... template-specific data
}
```

### Industry Presets

```typescript
const INDUSTRY_PRESETS = {
  salon: {
    defaultCategories: ['Haircuts', 'Color', 'Treatments', 'Styling'],
    defaultDuration: 60,
    defaultBuffer: 15,
    features: ['photos', 'favorites', 'ratings'],
  },
  medical: {
    defaultCategories: ['Consultation', 'Follow-up', 'Procedure', 'Lab Work'],
    defaultDuration: 30,
    defaultBuffer: 10,
    features: ['provider_assignment', 'intake_forms', 'insurance'],
  },
  fitness: {
    defaultCategories: ['Personal Training', 'Group Class', 'Assessment'],
    defaultDuration: 45,
    defaultBuffer: 15,
    features: ['recurring_bookings', 'class_capacity', 'waitlist'],
  },
  consulting: {
    defaultCategories: ['Strategy', 'Review', 'Workshop'],
    defaultDuration: 60,
    defaultBuffer: 0,
    features: ['video_call', 'documents', 'invoicing'],
  },
};
```

---

## 9. New Architecture Proposal

### Folder Structure

```
reebooking/
├── app/
│   ├── (marketing)/              # Public pages (landing, about, gallery)
│   │   ├── page.tsx              # Landing page
│   │   ├── about/
│   │   ├── contact/
│   │   └── signup/
│   ├── (booking)/                # Booking flow
│   │   ├── services/
│   │   ├── booking/
│   │   ├── cart/
│   │   └── checkout/
│   ├── (dashboard)/              # Authenticated area
│   │   ├── layout.tsx            # Dashboard shell with sidebar
│   │   ├── dashboard/
│   │   ├── bookings/
│   │   ├── messages/
│   │   ├── profile/
│   │   └── settings/
│   ├── (admin)/                  # Admin area (separate layout)
│   │   ├── layout.tsx
│   │   ├── admin/
│   │   │   ├── bookings/
│   │   │   ├── services/
│   │   │   ├── providers/
│   │   │   ├── schedules/
│   │   │   ├── messages/
│   │   │   ├── analytics/
│   │   │   ├── discounts/
│   │   │   ├── users/
│   │   │   └── settings/
│   │   └── super/                # Platform super-admin
│   ├── api/
│   │   ├── auth/
│   │   └── v2/                   # New versioned API
│   │       ├── organizations/
│   │       ├── services/
│   │       ├── bookings/
│   │       ├── providers/
│   │       ├── schedules/
│   │       ├── conversations/
│   │       ├── ratings/
│   │       ├── cart/
│   │       ├── checkout/
│   │       ├── discounts/
│   │       └── webhooks/
│   ├── layout.tsx
│   └── globals.css
├── src/
│   └── db/
│       ├── schema/               # Split schema into domain modules
│       │   ├── auth.ts
│       │   ├── organizations.ts
│       │   ├── services.ts
│       │   ├── bookings.ts
│       │   ├── scheduling.ts
│       │   ├── messaging.ts
│       │   ├── loyalty.ts
│       │   ├── marketing.ts
│       │   └── index.ts          # Re-exports all
│       ├── index.ts              # getDb() — Neon connection
│       ├── migrate.ts            # Migration runner
│       └── seed.ts               # Seed data per industry preset
├── lib/
│   ├── auth.ts                   # NextAuth config
│   ├── middleware/
│   │   ├── org-resolver.ts       # Resolve org from subdomain/header/session
│   │   ├── auth-guard.ts         # Role-based route protection
│   │   └── rate-limit.ts         # Upstash Redis rate limiter
│   ├── booking/
│   │   ├── slot-guard.ts
│   │   ├── time.ts
│   │   └── availability.ts       # Replaces Zap engine with PG-optimized queries
│   ├── scheduling/
│   │   ├── engine.ts             # Core slot generation (PG-native)
│   │   ├── recurrence.ts         # Recurrence evaluation
│   │   └── builder.ts            # Fluent API (Zap builder)
│   ├── email/
│   │   ├── service.ts            # Resend wrapper
│   │   ├── templates/            # Handlebars/React Email templates
│   │   └── renderer.ts           # Org-branded template renderer
│   ├── payments/
│   │   ├── stripe.ts
│   │   └── stripe-connect.ts     # Multi-org Stripe Connect
│   ├── platform/
│   │   ├── config.ts             # Org config resolver
│   │   ├── presets.ts            # Industry presets
│   │   └── branding.ts           # Dynamic theme/branding
│   ├── validations/
│   ├── swr/
│   ├── hooks/
│   └── utils.ts
├── components/
│   ├── booking/                  # Unified booking form (merge Amelia + Zap)
│   ├── admin/
│   ├── messaging/
│   ├── dashboard/
│   ├── layout/
│   ├── sections/                 # Landing page sections (configurable)
│   ├── providers/
│   └── ui/                       # shadcn/ui
├── store/
│   ├── store.ts
│   └── cartSlice.ts
├── drizzle/
│   └── migrations/
├── middleware.ts                  # Next.js middleware: auth + org resolution
├── drizzle.config.ts
├── next.config.mjs
├── package.json
└── tsconfig.json
```

### Domain Boundaries

| Domain | Tables | API Prefix | Key Files |
|---|---|---|---|
| **Auth** | users, accounts, sessions, verification_tokens | `/api/auth/` | `lib/auth.ts`, `middleware.ts` |
| **Organization** | organizations, organization_members | `/api/v2/organizations/` | `lib/platform/config.ts` |
| **Catalog** | services, service_categories, providers, provider_services | `/api/v2/services/`, `/api/v2/providers/` | `src/db/schema/services.ts` |
| **Booking** | bookings, booking_photos, carts | `/api/v2/bookings/`, `/api/v2/cart/` | `lib/booking/`, `lib/scheduling/` |
| **Scheduling** | schedules, schedule_periods | `/api/v2/schedules/` | `lib/scheduling/engine.ts` |
| **Messaging** | conversations, conversation_messages, conversation_notes | `/api/v2/conversations/` | `components/messaging/` |
| **Loyalty** | referral_codes, referral_rewards, discount_codes, discount_usages | `/api/v2/discounts/` | `src/db/schema/loyalty.ts` |
| **Engagement** | favorites, ratings | `/api/v2/ratings/` | `src/db/schema/services.ts` |
| **Marketing** | promotion_subscribers | — | `src/db/schema/marketing.ts` |
| **Audit** | audit_log | — | `lib/middleware/` |

---

## 10. Neon/Postgres Migration Plan

### Phase 1: Infrastructure Setup

1. **Create Neon project** with production and dev branches
2. **Update Drizzle config** to use `drizzle-orm/neon-http` (serverless) or `drizzle-orm/neon-serverless` (WebSocket)
3. **Replace `getDb()`** function:

```typescript
// src/db/index.ts — Neon version
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}

export type Database = ReturnType<typeof getDb>;
```

4. **Update `drizzle.config.ts`**:

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### Phase 2: Schema Migration

1. **Generate initial PG migration** from the new Drizzle schema definitions
2. **Write data migration script** to transform D1 export → Neon import:
   - UUID generation: D1 UUIDs are already `text` → cast to PG `uuid`
   - Timestamps: ISO text → `timestamptz`
   - JSON text → `jsonb`
   - Boolean integers (0/1) → PG `boolean`
   - Date strings → PG `date`
   - Time strings → PG `time`

### Phase 3: Schema Rewrite in Drizzle

Convert all tables from `sqliteTable` → `pgTable`:

```typescript
// Example: services table (before → after)

// BEFORE (SQLite)
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const services = sqliteTable('services', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  // ...
});

// AFTER (Postgres)
import { pgTable, uuid, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').references(() => serviceCategories.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  description: text('description'),
  mediaUrl: text('media_url'),
  price: integer('price').notNull(),
  durationMinutes: integer('duration_minutes').notNull().default(60),
  bufferMinutes: integer('buffer_minutes').notNull().default(0),
  maxConcurrent: integer('max_concurrent').notNull().default(1),
  stripePriceId: text('stripe_price_id'),
  active: boolean('active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  metadata: jsonb('metadata').notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
```

### Phase 4: Code Updates

| File/Module | Change Required |
|---|---|
| `src/db/index.ts` | Replace D1 proxy with Neon connection |
| `src/db/schema.ts` | Split into domain modules, convert to `pgTable` |
| `drizzle.config.ts` | Change dialect to `postgresql`, update credentials |
| `lib/booking/slot-guard.ts` | No change (Drizzle query API is the same) |
| `lib/zap/engine.ts` | Update `sql` helpers for PG syntax if needed |
| All API routes | Add `organizationId` scoping to queries |
| `lib/auth.ts` | Update DrizzleAdapter for PG tables |
| `wrangler.jsonc` | Remove D1 binding (no longer needed) |
| `.env.local` | Add `DATABASE_URL` for Neon |
| `package.json` | Add `@neondatabase/serverless`, remove `better-sqlite3` |

### Phase 5: Neon-Specific Optimizations

| Feature | Implementation |
|---|---|
| **Connection pooling** | Use Neon's built-in connection pooler endpoint |
| **Branching** | Dev/staging branches from production data |
| **Autoscaling** | Neon scales compute to zero when idle |
| **Read replicas** | Point read-heavy queries (availability, catalog) to read replica |
| **pg_cron** | Schedule cart cleanup, expired discount pruning |
| **Full-text search** | Use PG `tsvector`/`tsquery` for service search instead of client-side filtering |
| **Row-Level Security** | Enable RLS on tenant-scoped tables, set `organization_id` in session |

### Environment Variables (New)

```env
# Neon
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/reebooking?sslmode=require

# Remove these:
# CLOUDFLARE_ACCOUNT_ID
# CLOUDFLARE_DATABASE_ID
# CLOUDFLARE_D1_TOKEN
# LOCAL_DB_PATH
```

---

## 11. Data Flow Maps

### Booking Flow (Proposed)

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Browse Services                                              │
│     GET /api/v2/services?orgId=X                                │
│     → Returns services with categories, durations, ratings       │
│                                                                  │
│  2. Select Service → Pick Date                                   │
│     GET /api/v2/schedules/:resourceType/:resourceId/slots       │
│       ?date=2025-07-15&duration=60&buffer=15                    │
│     → Returns available TimeSlot[] from Zap engine               │
│                                                                  │
│  3. Select Time → (Optional) Pick Provider                       │
│     GET /api/v2/providers?serviceId=X&date=Y&time=Z             │
│     → Returns available providers for that slot                  │
│                                                                  │
│  4. Add to Cart                                                  │
│     POST /api/v2/cart                                            │
│     → Validates slot availability, reserves temporarily          │
│     → Redux dispatch(addToCart) for UI state                     │
│                                                                  │
│  5. Checkout                                                     │
│     ├── Stripe: POST /api/v2/checkout → Stripe Session → redirect│
│     └── Cash:   POST /api/v2/bookings/bulk → confirm immediately │
│                                                                  │
│  6. Post-Checkout                                                │
│     Webhook: POST /api/v2/webhooks/stripe                       │
│     → Update booking.status = 'CONFIRMED'                       │
│     → Update booking.payment_status = 'PAID'                    │
│     → Send confirmation email (org-branded)                      │
│     → Create audit_log entry                                     │
│     → Award referral points (if applicable)                      │
└─────────────────────────────────────────────────────────────────┘
```

### Messaging Flow (Proposed)

```
┌─────────────────────────────────────────────────────────────────┐
│                        GUEST / USER                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  A. Contact Form (guest)                                         │
│     POST /api/v2/conversations                                  │
│     { source: 'contact_form', email, name, subject, body }      │
│     → Creates conversation + first message                       │
│     → Auto-assigns based on org routing rules                    │
│     → Sends auto-acknowledgment email                            │
│                                                                  │
│  B. Authenticated Message                                        │
│     POST /api/v2/conversations                                  │
│     { source: 'authenticated_user', intent, body, bookingId }   │
│     → Creates conversation linked to booking/service             │
│                                                                  │
│  C. Booking Auto-Message                                         │
│     (System-generated on booking events)                         │
│     { source: 'booking_auto', bookingId, body: "Your booking    │
│       for [service] on [date] at [time] has been confirmed" }   │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                        ADMIN / STAFF                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  D. View Inbox                                                   │
│     GET /api/v2/conversations?status=open&orgId=X               │
│     → 3-column UI: filters | list | thread                      │
│                                                                  │
│  E. Reply                                                        │
│     POST /api/v2/conversations/:id/messages                     │
│     { body, isFromStaff: true }                                  │
│     → Conversation status → 'awaiting_reply'                    │
│     → Email notification to customer                             │
│                                                                  │
│  F. Internal Note                                                │
│     POST /api/v2/conversations/:id/notes                        │
│     { content }                                                  │
│     → Private, not visible to customer                           │
│                                                                  │
│  G. Resolve / Archive                                            │
│     PATCH /api/v2/conversations/:id                             │
│     { status: 'resolved' }                                       │
│     → Sets resolved_at timestamp                                 │
│     → Audit log entry                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Assumptions & Unknowns

### Assumptions

1. **Single-database multi-tenancy** — all orgs share one Neon database, isolated by `organization_id` columns and RLS
2. **Vercel deployment** remains the target (serverless functions, edge middleware)
3. **NextAuth v4** stays as the auth provider (upgrade to v5/Auth.js is optional follow-up)
4. **Stripe Connect** will be used for multi-org payment processing
5. **No real-time requirements yet** — messaging uses polling/SWR; WebSocket/SSE is a future phase
6. **Cart sync complexity is acceptable** — dual client+server cart model continues but with better validation

### Unknowns

| Unknown | Impact | Mitigation |
|---|---|---|
| **Existing D1 data volume** | Affects migration timeline | Run `SELECT count(*) FROM bookings` to assess |
| **Stripe Connect onboarding** | Each org needs Stripe Connect setup | Phase: start with platform account, add Connect later |
| **Email sending domain** | Each org may want branded `from` address | Use Resend with domain verification per org |
| **Subdomain vs path routing** | `salon.reebooking.com` vs `reebooking.com/salon` | Start with path-based, add subdomain support via middleware |
| **Zap engine PG performance** | Recurrence evaluation is currently in-memory JS | May benefit from PG materialized views for hot slots |
| **Mobile app requirements** | API-first design supports mobile but UI is web-only | API v2 is mobile-ready; native app is separate project |
| **Data residency** | Some industries (medical) require regional data storage | Neon supports multi-region; configure per org if needed |
| **Concurrent booking pressure** | Current partial unique index may not scale under high load | Add optimistic locking or PG advisory locks |

### Next Steps (Priority Order)

1. **Set up Neon project** and create the PG schema
2. **Rewrite `src/db/` module** — new schema files + Neon connection
3. **Add `organizations` and `organization_members`** tables + seed data
4. **Add `providers` table** and link to services/bookings
5. **Migrate Zap engine** to work with PG types
6. **Add `organization_id` scoping** to all API routes
7. **Split `messages`** into `conversations` + `conversation_messages`
8. **Abstract email templates** with org-configurable branding
9. **Merge booking form variants** (Amelia + Zap → unified)
10. **Add `audit_log`** to track mutations
11. **Replace in-memory rate limiter** with Upstash Redis
12. **Write data migration script** (D1 → Neon)
13. **Update deployment pipeline** (remove Wrangler, update Vercel env vars)

---

*End of reconstruction document.*
