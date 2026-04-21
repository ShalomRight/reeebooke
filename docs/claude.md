# Reebooking — Universal Booking Platform

## Project Identity

You are building a **universal, multi-tenant booking platform** by refactoring an existing salon booking app. The current codebase (`reebooking`) is the **reference implementation** — study it for patterns, code samples, and domain logic, then abstract and improve it into a platform that can serve any appointment-based industry (salons, medical, fitness, consulting, etc.).

> **Architecture blueprint**: `docs/app-reconstruction.md` — read this FIRST for every major task. It contains the full schema, API map, flow diagrams, migration plan, and prioritized next steps.

> **Design context**: `.impeccable.md` — the current salon brand direction. The platform must support **configurable branding per organization**, not just this one aesthetic.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Next.js 16+ (App Router) | `app/` directory routing, React Server Components where possible |
| **Language** | TypeScript (strict mode) | All new code must be fully typed — no `any` unless interfacing with untyped libs |
| **Database** | **Neon (Postgres)** via Drizzle ORM | Migrating FROM Cloudflare D1 (SQLite). Use `drizzle-orm/neon-http` or `drizzle-orm/neon-serverless` |
| **Auth** | NextAuth v4 (JWT strategy) | Credentials + Google OAuth. Per-org roles via `organization_members` table |
| **Payments** | Stripe (+ Stripe Connect for multi-org) | Stub fallback when unconfigured (`lib/stripe.ts`) |
| **State** | Redux Toolkit (cart) + SWR (data fetching) | Cart is persisted to localStorage + server-synced |
| **Styling** | Tailwind CSS v4 + shadcn/ui (New York style) | Use `components.json` config. Lucide icons. |
| **Email** | Resend | Templates must be org-branded, not hardcoded |
| **Storage** | Cloudinary (photo uploads) | Via `next-cloudinary` |
| **Deployment** | Vercel | pnpm as package manager. Node >= 20 |
| **Validation** | Zod | All API inputs validated with Zod schemas (`lib/validations/`) |
| **Animation** | Framer Motion + GSAP | Respect `prefers-reduced-motion` |

---

## Agents & Skills

This project uses **Windsurf skills** to assist with building. The following are already installed (see `skills-lock.json`) and should be invoked when relevant:

### Design & UI Skills
- **`impeccable`** — High-quality frontend generation. Use for building new pages and components.
- **`shadcn`** — shadcn/ui component management. Use when adding/searching/composing UI components.
- **`ui-ux-pro-max`** — UI/UX design intelligence. Use for layout, color, typography, and interaction decisions.
- **`critique`** / **`audit`** — Design review and accessibility/performance checks.
- **`polish`** / **`delight`** — Final quality passes and adding micro-interactions.
- **`layout`** / **`typeset`** / **`colorize`** — Targeted fixes for spacing, typography, and color.
- **`adapt`** — Responsive design across breakpoints and devices.
- **`animate`** / **`overdrive`** — Motion design from subtle to ambitious.
- **`bolder`** / **`quieter`** / **`distill`** — Tuning visual intensity up or down.
- **`clarify`** — Improving UX copy, labels, and error messages.

### Technical Skills
- **`next-best-practices`** — Next.js file conventions, RSC boundaries, data patterns, metadata, error handling.
- **`vercel-react-best-practices`** — React/Next.js performance optimization from Vercel Engineering.
- **`typescript-expert`** — Type-level programming, performance, migration strategies.
- **`cloudflare`** — Reference only (we are migrating AWAY from D1, but some patterns may be useful).
- **`optimize`** — Performance diagnostics (loading, rendering, bundle size).

### Planning Skills
- **`shape`** — UX/UI planning before code. Run discovery → produce design brief.

### Installing Additional Skills
As the project grows, we will install more agents and skills to assist with specific domains. When a task would benefit from a skill that is not yet installed, **suggest it** and we will add it. Look for skills covering:
- Database migration tooling
- Testing (Playwright, Vitest)
- API documentation generation
- CI/CD pipeline configuration
- Monitoring and observability

---

## Reference Codebase

The existing `reebooking` app is your **reference implementation**. Use it for code samples and pattern guidance, but **do not copy salon-specific hardcoding**. Key reference files:

### Database & ORM
- `src/db/schema.ts` — Current SQLite schema (620 lines). Study table structures and relations.
- `src/db/index.ts` — `getDb()` function. **Will be replaced** with Neon connection.
- `drizzle.config.ts` — Drizzle Kit config. **Will change** to `dialect: 'postgresql'`.

### Scheduling Engine (Zap)
- `lib/zap/zap.ts` — Fluent builder API for schedules (730 lines). **Keep and adapt**.
- `lib/zap/engine.ts` — Slot generation algorithm. Core booking availability logic.
- `lib/booking/slot-guard.ts` — Pre-insert double-booking check.
- `lib/booking/time.ts` — Time normalization utilities (24h format, date formatting).

### Auth & RBAC
- `lib/auth.ts` — NextAuth configuration with DrizzleAdapter.
- `lib/rbac.ts` — Role hierarchy and permissions (SUPER_ADMIN > ADMIN > STAFF > CLIENT).

### API Patterns
- `lib/api-wrapper.ts` — `createGetHandler()`, `createPostHandler()` wrappers with error handling + rate limiting.
- `lib/validations/schemas.ts` — All Zod schemas for API validation.
- `lib/validations/messages.ts` — Message-specific schemas and type exports.
- `lib/rate-limit.ts` — In-memory rate limiter (**replace with Upstash Redis**).
- `lib/error-handler.ts` — Centralized error handling.

### Booking Flow
- `app/api/v1/bookings/route.ts` — Booking CRUD with slot conflict checks.
- `app/api/v1/checkout/route.ts` — Stripe checkout integration.
- `components/SimpleBookingForm/` — 15-file booking form (Amelia + Zap variants). **Merge into one unified form**.
- `hooks/use-redux-cart.ts` — Cart state management with guest→user sync.
- `store/cartSlice.ts` — Redux cart state.

### Messaging
- `app/api/v1/messages/route.ts` — Message CRUD with threading.
- `components/messaging/` — 3-column inbox UI (FilterColumn, MessageListColumn, ConversationColumn).

### UI Components
- `components/ui/` — 62 shadcn/ui components (base library).
- `components/admin/` — 72 admin dashboard components.
- `components/sections/` — Landing page sections (Hero, ServicesPreview, etc.).
- `components/layout/Navbar.tsx` — Main navigation with responsive mobile menu.

---

## Critical Rules

### Multi-Tenancy
- **Every business table MUST have `organization_id`**. No exceptions.
- All queries must scope by `organization_id` — never return data across orgs.
- Org resolution happens in middleware via subdomain, header, or session context.
- User roles are **per-organization** (via `organization_members`), not global on the `users` table.

### Database (Neon/Postgres)
- Use native PG types: `uuid`, `timestamptz`, `date`, `time`, `jsonb`, `boolean`.
- All timestamps must be `TIMESTAMPTZ` (timezone-aware).
- Use `gen_random_uuid()` for primary keys (not application-side `crypto.randomUUID()`).
- Define indexes for every foreign key and common query pattern.
- Use partial unique indexes for business rules (e.g., no double-booking).
- Schema definitions go in `src/db/schema/` split by domain (auth, organizations, services, bookings, scheduling, messaging, loyalty, marketing).

### API Design
- Version all endpoints under `/api/v2/` (v1 is the legacy salon API).
- All inputs validated with Zod schemas before processing.
- Use the `createApiHandler` wrapper pattern for consistent error handling.
- Return proper HTTP status codes (201 for creation, 409 for conflicts, 422 for validation).
- Paginate all list endpoints. Default `limit=20`, max `limit=100`.

### Code Style
- Imports at the top of the file, never inline.
- Use `@/` path aliases for all imports.
- Server-only code must import `"server-only"` at the top.
- Client components marked with `"use client"` directive.
- Prefer React Server Components. Use client components only when hooks/interactivity are needed.
- Follow existing patterns in the codebase — study before creating.

### No Hardcoded Branding
- **Never** hardcode business names, colors, email addresses, or industry-specific terms.
- All branding comes from the `organizations` table or org settings.
- Email templates receive org context as parameters.
- Landing page sections are data-driven, not static.

---

## Key Abstractions

### Organization Config
```typescript
// Pattern: resolve org context from request
interface OrgContext {
  id: string;
  name: string;
  slug: string;
  industry: string;
  timezone: string;
  currency: string;
  settings: Record<string, unknown>;
}
```

### Service Duration
```typescript
// Every service MUST define duration and buffer
interface ServiceConfig {
  durationMinutes: number;  // how long the service takes
  bufferMinutes: number;    // gap after (cleanup, prep for next)
  maxConcurrent: number;    // parallel bookings allowed
}
```

### Provider Assignment
```typescript
// Bookings can optionally be assigned to a provider (staff member)
interface BookingWithProvider {
  serviceId: string;
  providerId?: string;  // null = any available provider
  date: string;         // DATE
  startTime: string;    // TIME
  endTime: string;      // TIME (computed from service.durationMinutes)
}
```

---

## Feature Expansion Notes

This platform will grow beyond the current salon feature set. When implementing, design for extensibility in these areas:

- **Recurring bookings** — weekly, biweekly, monthly appointment series
- **Waitlist** — when a slot is full, allow users to join a waitlist with notifications
- **Intake forms** — configurable per-service forms (medical history, preferences)
- **Video consultations** — virtual appointment support
- **Multi-location** — organizations with multiple physical locations
- **Staff scheduling** — provider availability management (already partially in Zap)
- **Invoicing** — beyond single-payment checkout
- **Notifications** — push, SMS (Twilio already in deps), WhatsApp, email
- **Analytics** — per-org dashboards with booking trends, revenue, ratings
- **Public API** — API keys for third-party integrations
- **Mobile app** — API-first design must support native clients

Do not build these now, but **do not design in ways that prevent them**. When making architectural decisions, consider whether the choice blocks future expansion.

---

## File & Folder Conventions

```
app/
  (marketing)/          # Public-facing pages (no auth)
  (booking)/            # Booking flow pages
  (dashboard)/          # Authenticated user area
  (admin)/              # Admin/staff area (separate layout)
  api/v2/               # New versioned API routes

src/db/
  schema/               # Drizzle schema split by domain
  index.ts              # Neon connection + getDb()

lib/
  middleware/            # Auth guards, org resolver, rate limiting
  booking/              # Slot guard, time utils, availability
  scheduling/           # Zap engine (migrated to PG)
  email/                # Resend + org-branded templates
  payments/             # Stripe + Stripe Connect
  platform/             # Org config, industry presets, branding
  validations/          # Zod schemas
  swr/                  # SWR data fetching hooks

components/
  booking/              # Unified booking form
  admin/                # Admin components
  messaging/            # Messaging/support UI
  dashboard/            # User dashboard
  layout/               # Navbar, Footer, Sidebar
  sections/             # Configurable landing page sections
  ui/                   # shadcn/ui base
```

---

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm db:generate      # Generate Drizzle migrations
pnpm db:studio        # Open Drizzle Studio (DB browser)
pnpm lint             # ESLint
```

After Neon migration, these will replace the D1 commands:
```bash
pnpm db:push          # Push schema changes to Neon (dev)
pnpm db:migrate       # Run migrations against Neon
```

---

## Current State

The app is deployed to Vercel with the existing D1/SQLite backend. The reconstruction document (`docs/app-reconstruction.md`) defines 13 prioritized next steps. We are beginning the migration from salon-specific → universal platform, starting with the database layer (Neon/Postgres).

**Priority order**:
1. Set up Neon project + rewrite `src/db/` module
2. Add `organizations` and `organization_members` tables
3. Add `providers` table and link to services/bookings
4. Migrate Zap engine to PG types
5. Add `organization_id` scoping to all API routes
6. Split messaging into `conversations` + `conversation_messages`
7. Abstract email templates
8. Merge booking form variants
9. Add `audit_log`
10. Replace in-memory rate limiter with Redis
11. Write D1 → Neon data migration script
12. Update deployment pipeline
13. New features (recurring bookings, waitlist, intake forms, etc.)
