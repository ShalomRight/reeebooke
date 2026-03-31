# 🧪 Phase 1: System Audit Report — Reebooking

**Date:** 2026-03-31  
**Status:** Complete — Read-only audit, no code changes made

---

## System Overview

Reebooking is a service appointment booking system by Reevix. It provides a full-stack booking experience for customers, with admin/staff dashboards for management. The system supports service listings, cart/checkout, multiple payment methods (cash & Stripe), referrals, discount codes, ratings, favorites, and AI-powered recommendations.

---

## Architecture Summary

| Layer | Technology | Details |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | React 19, TypeScript |
| **Styling** | TailwindCSS v4 + shadcn/ui (Radix) | Custom fonts: Space Grotesk, DM Sans |
| **Database** | PostgreSQL via Prisma ORM | 16 models, UUID PKs |
| **Auth** | NextAuth v4 (JWT strategy) | Credentials + Google OAuth |
| **State** | Redux Toolkit + redux-persist | Cart only, persisted to localStorage |
| **Payments** | Stripe | Checkout sessions + webhooks |
| **Notifications** | Twilio (WhatsApp), Resend (email) | Optional integrations |
| **AI** | OpenAI | Recommendations & availability |
| **Analytics** | Vercel Analytics | Injected in root layout |
| **Image Upload** | Cloudinary | Via next-cloudinary |
| **PDF** | Puppeteer-core + @sparticuz/chromium | Receipt generation |

### Routing Structure

```
app/
├── page.tsx                    # Homepage (booking form)
├── signin/                     # Auth
├── signup/                     # Registration
├── cart/                       # Cart view
├── checkout/                   # Checkout flow
├── demo/                       # Demo page
├── docs/                       # In-app docs
├── (dashboard)/                # Route group (protected)
│   ├── admin/                  # Admin dashboard
│   │   ├── discount/           # Discount management
│   │   ├── roles/              # Role management
│   │   └── super/              # Super admin
│   ├── dashboard/              # User dashboard
│   ├── profile/                # User profile
│   ├── settings/               # Settings
│   └── staff/                  # Staff view
└── api/
    └── v1/                     # 40 API routes
        ├── admin/              # Admin APIs (users, ratings, referrals, discounts)
        ├── bookings/           # CRUD + stats + bulk + receipt
        ├── services/           # CRUD
        ├── cart/               # CRUD + sync + cleanup + clear
        ├── checkout/           # Checkout flow
        ├── ratings/            # Ratings
        ├── favorites/          # Favorites toggle
        ├── discount/           # Discount application
        ├── search/             # Global search
        ├── user/               # Profile, settings, register, referral, points, password
        ├── ai/                 # Recommendations + availability
        ├── webhook/stripe/     # Stripe webhook handler
        ├── send-whatsapp/      # WhatsApp notifications
        ├── cloudinary/         # Image upload
        └── payment-intent/     # Stripe payment intent
```

### Database Access Layer

- **ORM:** Prisma Client (`@prisma/client ^6.1.0`)
- **Singleton:** `lib/prisma.ts` — single PrismaClient instance with dev global caching
- **Validations:** Zod schemas in `lib/validations/` for request validation
- **Error Handling:** Centralized in `lib/error-handler.ts` (Prisma, Zod, AppError, generic)
- **API Wrapper:** `lib/api-wrapper.ts` provides rate limiting + error handling wrappers

### Auth System

- **NextAuth v4** with JWT strategy (30-day sessions)
- **Providers:** Credentials (bcryptjs), Google OAuth
- **Middleware:** [middleware.ts](file:///Users/shalomsutherland/Documents/Bookit/reebook/reebooking/middleware.ts) — protects `/admin`, `/staff`, `/dashboard` routes
- **RBAC:** [lib/rbac.ts](file:///Users/shalomsutherland/Documents/Bookit/reebook/reebooking/lib/rbac.ts) — 4-level hierarchy (SUPER_ADMIN > ADMIN > STAFF > CLIENT)
- **Mobile Support:** Bearer token verification in middleware via `jsonwebtoken`

---

## Working Features ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Homepage / Booking Form | ✅ | Services list, calendar, time slots, photo upload |
| Signin Page | ✅ | Credentials + Google + demo quick-login buttons |
| Signup Page | ✅ | Full registration form |
| Services API (GET) | ✅ | Public, paginated, includes ratings |
| Bookings API | ✅ | Full CRUD with validation, filtering, pagination |
| Cart System | ✅ | Redux-persist + server-side cart sync |
| RBAC System | ✅ | Role hierarchy + permissions defined |
| Admin Components | ✅ | 15+ management panels (Bookings, Services, Users, Staff, Analytics, etc.) |
| Discount Code System | ✅ | Create/manage codes, apply at checkout |
| Referral System | ✅ | Code generation, tracking, points |
| Rating System | ✅ | Submit/approve/reject with moderation |
| Favorites | ✅ | Toggle favorite services |
| Global Search | ✅ | Search across entities |
| Receipt Generation | ✅ | PDF via Puppeteer |
| Error Handling | ✅ | Comprehensive Prisma/Zod/AppError handling |
| Rate Limiting | ✅ | Applied to API routes |

---

## Broken / Risky Features ⚠️

### 🔴 CRITICAL: Admin Dashboard Accessible Without Authentication

> [!CAUTION]
> During browser testing, the admin dashboard at `/admin` was accessible **without logging in**. Admin metrics, services list with Edit/Delete options, and sub-pages were all visible.

**Root Cause Analysis:** The middleware config `matcher: ["/dashboard/:path*", "/admin/:path*", "/staff/:path*"]` should be protecting these routes. However, the middleware may not be executing properly in development, or there's a caching/hydration issue where the server-side redirect isn't applied before the page renders client-side.

**Impact:** High — unauthenticated users could view sensitive business data and potentially modify services/bookings.

---

### ⚠️ Schema Divergence: Production vs Data-Layer

Two Prisma schema files exist:
- [prisma/schema.prisma](file:///Users/shalomsutherland/Documents/Bookit/reebook/reebooking/prisma/schema.prisma) — **Active** (used by app)
- [.data-layer/schema.prisma](file:///Users/shalomsutherland/Documents/Bookit/reebook/reebooking/.data-layer/schema.prisma) — **Aspirational** (improved but not applied)

Key differences in the aspirational schema:
- Uses Prisma enums (`UserRole`, `BookingStatus`, `RatingStatus`, etc.) instead of strings
- Adds soft deletes via `deletedAt` on User, Service, Booking
- Replaces `date`+`time` split with `startsAt`+`endsAt` DateTime fields
- Adds lifecycle timestamps (`confirmedAt`, `cancelledAt`, `completedAt`)
- Better indexing strategies

### ⚠️ Stripe Placeholder Key

[lib/stripe.ts](file:///Users/shalomsutherland/Documents/Bookit/reebook/reebooking/lib/stripe.ts) falls back to `"sk_test_placeholder"` when `STRIPE_SECRET_KEY` is empty. This will cause Stripe API calls to fail silently or throw. The `.env` has empty Stripe keys.

### ⚠️ Booking API Missing Auth Check

The POST handler in [bookings/route.ts](file:///Users/shalomsutherland/Documents/Bookit/reebook/reebooking/app/api/v1/bookings/route.ts) does **not** verify the user session before creating bookings. While guest bookings may be intentional, there's no user association being set on the booking.

### ⚠️ Cart Expiry Uses PostgreSQL-Specific Syntax

```prisma
expiresAt DateTime @default(dbgenerated("now() + interval '24 hours'"))
```

This `interval` syntax is PostgreSQL-specific and will break on SQLite (relevant for Phase 2).

---

## Code Quality Issues

| Issue | Severity | File(s) |
|-------|----------|---------|
| Typo: `SingninForm` → `SigninForm` | Low | [signin/page.tsx](file:///Users/shalomsutherland/Documents/Bookit/reebook/reebooking/app/signin/page.tsx#L4) |
| `any` type usage in API routes | Medium | bookings/route.ts, services/route.ts |
| Commented-out code in schema | Low | prisma/schema.prisma L64 |
| Services GET calls `prisma.$connect()` unnecessarily | Low | services/route.ts L24 |
| `api-wrapper.ts` has `requireAuth` option but never implements it | Medium | [api-wrapper.ts](file:///Users/shalomsutherland/Documents/Bookit/reebook/reebooking/lib/api-wrapper.ts) |
| Mixed line endings (CRLF in some files, LF in others) | Low | api-wrapper.ts, error-handler.ts |
| No test files found anywhere in the project | High | — |
| `next.config.mjs` has `images.unoptimized: true` | Low | May hurt production performance |
| `suppressHydrationWarning` on `<html>` and `<body>` | Low | layout.tsx — may hide real issues |
| Duplicate `STRIPE_SECRET_KEY` in `.env` | Low | Lines 18 and 21 |

---

## Database Structure Summary

### Active Schema (16 Models)

| Model | Purpose | Key Fields |
|-------|---------|------------|
| **User** | All user roles | id, email, password, role (string), referralCode, referralPoints |
| **Account** | OAuth accounts | userId, provider, providerAccountId |
| **Session** | Auth sessions | sessionToken, userId, expires |
| **VerificationToken** | Email verification | identifier, token, expires |
| **Service** | Bookable services | name, price (int), stripePriceId |
| **Booking** | Appointments | serviceId, userId?, date, time, status, paymentMethod |
| **Photo** | Booking photos | bookingId, url |
| **Cart** | Shopping cart | userId?, serviceId, date, time, quantity, expiresAt |
| **CartEmail** | Abandoned cart emails | email, cartItems (JSON), sent, expiresAt |
| **Favorite** | User favorites | userId + serviceId (unique) |
| **ReferralCode** | Referral codes | code, userId, pointsPerReferral, usageCount |
| **ReferralReward** | Referral rewards | referrerId, referredId, points, bookingId? |
| **PromotionSubscriber** | Newsletter subs | email, userId?, subscribed |
| **PointsRedemption** | Points usage | userId, points, discountAmount, status |
| **DiscountCode** | Promo codes | code, type, value, minAmount?, maxUses?, expiresAt? |
| **DiscountUsage** | Discount usage log | discountCodeId, userId?, discountAmount, cartTotal, finalTotal |
| **Rating** | Service ratings | userId, serviceId, rating (1-5), comment?, status |

### Key Relationships
- User → many Bookings, Carts, Favorites, Ratings, ReferralCodes, PointsRedemptions
- Service → many Bookings, Carts, Favorites, Ratings
- Booking → many Photos; belongs to Service + optional User
- User self-referral: referredBy ↔ referrals

---

## External Dependencies

| Dependency | Version | Purpose | Status |
|-----------|---------|---------|--------|
| next | 16.0.1 | Framework | ✅ Active |
| react / react-dom | 19.0.0 | UI | ✅ Active |
| @prisma/client | ^6.1.0 | ORM | ✅ Active |
| next-auth | ^4.24.13 | Auth | ✅ Active |
| stripe | ^17.3.1 | Payments | ⚠️ No keys configured |
| twilio | ^5.3.5 | WhatsApp | ⚠️ No keys configured |
| openai | ^4.68.0 | AI features | ⚠️ No key configured |
| resend | ^4.0.1 | Email | ⚠️ No key configured |
| next-cloudinary | ^6.17.4 | Image upload | ⚠️ No keys configured |
| puppeteer-core | ^24.30.0 | PDF receipts | ✅ Active |
| @reduxjs/toolkit | ^2.3.0 | State | ✅ Active |
| recharts | ^2.15.0 | Charts | ✅ Active |
| swr | ^2.2.5 | Data fetching | ✅ Active |
| sonner | ^1.7.1 | Toast notifications | ✅ Active |
| tailwindcss | ^4.1.17 | Styling | ✅ Active |

---

## Recommended Fixes (DO NOT APPLY YET)

### Priority 1 — Security
1. **Investigate admin auth bypass** — Verify middleware execution, check if it's a dev-only issue or production vulnerability
2. **Add auth check to POST /api/v1/bookings** — Even for guest bookings, validate and sanitize inputs

### Priority 2 — Data Integrity
3. **Apply aspirational schema enums** — Replace string-based roles/statuses with Prisma enums for type safety
4. **Fix Cart `expiresAt` to be DB-agnostic** — Replace `dbgenerated()` with application-level default (critical for D1 migration)

### Priority 3 — Code Quality
5. **Remove `prisma.$connect()` from services GET** — Unnecessary; Prisma auto-connects
6. **Implement `requireAuth` in api-wrapper** — Currently declared but not used
7. **Fix `SingninForm` typo** in signin page import
8. **Remove duplicate `STRIPE_SECRET_KEY`** from `.env`
9. **Add test infrastructure** — No tests exist; recommend Vitest + Playwright
10. **Normalize line endings** — Set `.gitattributes` to enforce LF

### Priority 4 — D1 Migration Prep
11. **Replace UUID generation** — SQLite doesn't have native `uuid()`, use `cuid()` or application-level UUID
12. **Remove `dbgenerated()` calls** — Not supported in D1/SQLite
13. **Handle JSON column** — `CartEmail.cartItems` uses `Json` type; SQLite stores as TEXT
14. **Audit `@updatedAt`** — Verify Prisma supports this on SQLite adapter

---

## Browser Testing Recording

![Homepage and admin browsing session](/Users/shalomsutherland/.gemini/antigravity/brain/e06c954f-6a2b-428f-988b-fb0ccdac231f/homepage_browse_1774958291366.webp)
