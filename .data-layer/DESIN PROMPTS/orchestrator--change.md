# Orchestrator Prompt — Change

> **Type:** Orchestrator (top-level entry point)
> **Use when:** You have an existing, working app and want to change, extend, or improve it — without migrating to a different stack.
> **Coordinates:** All specialist prompts, activated selectively based on what is changing.
> **Does not:** Migrate to a different framework (that is the Migration prompt). Does not build from scratch (that is the Greenfield prompt).

---

## What This Prompt Does

You bring a working application and a description of what you want to change.
This prompt analyzes the existing codebase, understands what is already there,
scopes the change precisely, activates only the specialist prompts that are
relevant, and produces a surgical plan that touches only what needs to change —
leaving everything else exactly as it is.

**The guiding principle:** A change that breaks something that was working is
worse than no change at all. Every modification is scoped, sequenced, and
verified in isolation before being integrated.

---

## Types of Changes This Prompt Handles

Changes fall into four categories. A single session can address multiple
categories simultaneously — they will be sequenced correctly.

### Category 1 — View Layer Changes
The backend, data model, and business logic stay completely intact.
Only the frontend changes.

Examples:
- Laravel + Blade → Laravel + Inertia (same controllers, same routes, new views)
- Rebuild UI with a new design direction (same data, same routes, new components)
- Migrate from a custom CSS system to Tailwind + shadcn
- Upgrade from Pages Router to App Router in Next.js
- Apply a new design prompt (rebrand an existing dashboard)

### Category 2 — API & Backend Extension
The existing API and database stay intact.
New endpoints, new capabilities, or new integrations are added on top.

Examples:
- Add a public API layer on top of an internal one
- Add webhooks for existing events (order placed, booking confirmed)
- Add a new integration (Stripe, Twilio, S3) that didn't exist before
- Add background job processing for operations that were synchronous
- Add rate limiting, API keys, or versioning to an existing API

### Category 3 — Feature Addition
The existing app stays intact.
A new self-contained feature is added to it.

Examples:
- Add a drag-and-drop page builder to an existing CMS
- Add a calendar/booking view to an app that currently shows only a list
- Add a workflow/automation engine to an app that currently does manual steps
- Add multi-tenancy to an app that was single-tenant
- Add a template system with selectable themes

### Category 4 — Data Model Extension
The existing schema is extended.
New entities, new fields, new relationships — without breaking what already exists.

Examples:
- Add a `variants` system to a product that currently has no variants
- Add soft delete to models that currently use hard delete
- Add audit logging / activity history to existing models
- Add multi-currency support to a system that was single-currency
- Promote a single-tenant app to multi-tenant (tenantId everywhere)

---

## Phase 0 — Change Intake

Ask all of these in a single pass:

```
1. What is the existing stack?
   Framework:    [ ] Next.js 16  [ ] Next.js (older)  [ ] Laravel + Blade
                 [ ] Laravel + Inertia  [ ] Other: ___
   Database:     [ ] PostgreSQL  [ ] MySQL  [ ] MongoDB  [ ] Other: ___
   ORM:          [ ] Prisma  [ ] Drizzle  [ ] Eloquent  [ ] Other: ___

2. Describe the app in one or two sentences.
   (What does it do? Who uses it?)

3. What do you want to change? Be as specific or as vague as you like —
   we will scope it together.

4. What must NOT change?
   (List anything that is working correctly and must stay exactly as-is)

5. Are there active users on this app right now?
   [ ] Yes — changes must be backward-compatible or phased
   [ ] No — can make breaking changes if needed

6. Do you have a test suite?
   [ ] Yes — changes must pass all existing tests
   [ ] No — we will note tests that should be added for the changed areas

7. Is there a design reference for the changes?
   (Images, Figma, URLs, "I want it to look like X")
   Or should the existing design be preserved?

8. For feature additions: are there reference implementations you admire?
   (A product, a repo, a demo that shows what the feature should feel like)
```

---

## Phase 1 — Codebase Understanding

Before scoping any change, build a precise mental model of what already exists.

Activate the **Extraction & Migration Prompt**
(`parallel-prompt--extraction-migration.md`) in **read-only extraction mode** —
not migration mode. The goal is understanding, not transformation.

Extract and document:

```
.claude/rules/current-state/
  domain-models.md         ← What entities exist, their fields and relationships
  api-contracts.md         ← What endpoints exist and what they do
  feature-inventory.md     ← What features exist and how they are built
  naming-conventions.md    ← Terminology already in use
  tech-debt.md             ← Known issues, inconsistencies, things to avoid touching
```

### What the Extraction Must Specifically Identify

For change work, the extraction has a tighter focus than for migration:

**Boundary mapping** — For each area the user wants to change, identify exactly
where that area begins and ends in the codebase:

```md
## Boundary: Booking creation flow

Touches these files:
  app/Http/Controllers/BookingController.php  (store method)
  app/Http/Requests/CreateBookingRequest.php
  resources/views/bookings/create.blade.php  ← VIEW LAYER CHANGE TARGET
  routes/web.php (POST /bookings)
  app/Models/Booking.php
  app/Services/AvailabilityService.php

Does NOT touch:
  app/Models/User.php
  app/Http/Controllers/UserController.php
  anything in resources/views/users/
```

**Dependency mapping** — What else depends on the area being changed:

```md
## Dependencies on Booking creation flow

Other features that call into this:
  - Admin dashboard bulk booking creation
  - API endpoint POST /api/v1/bookings (external consumers)
  - Email notification in BookingObserver (fires after create)

If we change the booking creation flow, these must be verified:
  - Admin bulk create still works
  - API endpoint still returns expected response shape
  - Confirmation email still fires
```

**Risk zones** — Areas that are fragile, heavily coupled, or undocumented:

```md
## Risk Zones

HIGH RISK — do not touch unless specifically required:
  app/Services/PaymentService.php  (complex Stripe integration, no tests)
  database/migrations/             (existing migrations — never modify, only add)

MEDIUM RISK — touch carefully, verify thoroughly:
  app/Http/Middleware/CheckOrganizationAccess.php (used by 12 routes)

LOW RISK — isolated, well-tested:
  app/Http/Controllers/BookingController.php
```

---

## Phase 2 — Change Scoping

With the codebase understood, define the precise scope of each change.
This is the most important phase — an incorrectly scoped change either
does too much (breaking things) or too little (leaving the work incomplete).

### 2.1 — Change Decomposition

Break the user's stated change into discrete atomic units. Each unit:
- Can be built and tested independently
- Has a clear before-state and after-state
- Touches a bounded set of files
- Does not depend on another unit being complete first (unless sequenced)

```md
## Change Decomposition: "Change UI from Blade to Inertia + add page builder"

This is actually three separate changes:

Change A — Frontend swap (Category 1: View Layer)
  Scope:    All Blade views → Inertia React components
  Touches:  resources/views/ (replaced), resources/js/ (new), vite.config.js
  Does NOT touch: Controllers, routes, models, migrations, services
  Depends on: Inertia installed and configured (prerequisite step)

Change B — Page builder feature (Category 3: Feature Addition)
  Scope:    New self-contained feature — canvas, component panel, properties panel
  Touches:  New controller, new routes, new React components, new DB tables
  Does NOT touch: Any existing feature
  Depends on: Change A complete (needs Inertia running before adding Inertia features)
  Secondary prompt: secondary-prompt--ui-builder.md

Change C — Design direction update (Category 1: View Layer, within Change A)
  Scope:    New design tokens, new component styling, new typography
  Touches:  globals.css, tailwind.config.ts, component files rebuilt in Change A
  Does NOT touch: Anything backend
  Depends on: Change A (components must exist before they can be styled)
  Specialist: Theming prompt + Design Prompt selection
```

### 2.2 — Change Type Matrix

For each decomposed change, select the category and confirm the scope:

| Change | Category | Specialist prompt needed | Backend touched | DB touched |
|---|---|---|---|---|
| Blade → Inertia | 1 — View | None (Master Prompt conventions) | No | No |
| New design direction | 1 — View | Theming + Design Prompt | No | No |
| Add public API | 2 — API Extension | Data Layer (contracts) | Yes | No |
| Add page builder | 3 — Feature Addition | Secondary Feature Prompt | Yes | Yes |
| Add multi-tenancy | 4 — Data Model Extension | Data Layer prompt | Yes | Yes |

### 2.3 — Conflict Detection

Before any change is planned, check for conflicts:

```md
## Conflict Check

Change A modifies: resources/views/ (all Blade files)
Change B adds:     resources/js/Pages/Builder/ (new Inertia pages)
Conflict:          None — A replaces Blade files, B adds new Inertia files

Change B adds:     database/migrations/create_page_builder_tables.php
Change D (later):  database/migrations/add_tenancy_to_all_tables.php
Conflict:          Potential — if Change D adds organizationId to page builder
                   tables, Change B must include organizationId from the start.
Resolution:        Build Change D's schema decisions first, then scaffold
                   Change B's tables with organizationId already included.
```

---

## Phase 3 — Specialist Prompt Activation

Activate only the specialist prompts relevant to what is actually changing.

### Decision Table

| What is changing | Activate |
|---|---|
| Visual layer / design tokens / component styling | `secondary-prompt--theming.md` + appropriate `dp--*.md` |
| Forms, CRUD interactions, feedback patterns | `secondary-prompt--crud-interactions.md` |
| Data model (new fields, new entities, new relationships) | `parallel-prompt--data-layer.md` |
| API surface (new endpoints, new contracts) | `parallel-prompt--data-layer.md` (API contracts section) |
| Complex new feature (calendar, canvas, workflow, etc.) | Appropriate secondary feature prompt |
| Framework-level patterns (routing, layouts, auth) | `dashboard-agent-master-prompt.md` conventions |

**Do not activate prompts for areas that are not changing.** If the data model
is not changing, the Data Layer prompt does not run. If the design is not
changing, the Theming prompt does not run.

### Category 1 — View Layer Change Plan

When only the view layer changes, the activation is narrow:

```md
## View Layer Change: Laravel + Blade → Laravel + Inertia

Prerequisites:
  composer require inertiajs/inertia-laravel
  npm install @inertiajs/react react react-dom
  Configure HandleInertiaRequests middleware
  Update app.blade.php to Inertia root template

For each Blade view file:
  1. Identify the controller method that renders it
  2. Note the data passed: return view('bookings.index', ['bookings' => $bookings])
  3. Change to: return Inertia::render('Bookings/Index', ['bookings' => $bookings])
  4. Create React component at resources/js/Pages/Bookings/Index.tsx
  5. Props interface matches exactly what the controller passes
  6. Verify: page loads, data displays, links work, forms submit

Process every view in this order:
  1. Layouts first (app.blade.php → Inertia root + persistent layout component)
  2. Auth pages (login, register, password reset)
  3. Dashboard home
  4. One entity at a time (list → detail → create → edit)
  5. Settings pages last
```

### Category 2 — API Extension Plan

When extending the API:

```md
## API Extension: Add public API layer on top of existing internal API

Activate: Data Layer prompt — API contracts section only

Steps:
  1. Audit existing internal API endpoints:
     - Which ones are safe to expose publicly?
     - Which ones must remain internal-only?
     - What data shapes are returned? (may need to be trimmed for public)

  2. Define the public API surface:
     - New route prefix: /api/v1/ (versioned from the start)
     - Authentication: API keys (not session — public API requires token auth)
     - Rate limiting: define per-endpoint limits
     - Response format: consistent envelope { data, meta?, error? }

  3. For each new public endpoint:
     Source:  existing internal controller method or service
     New:     dedicated API controller that calls the same service
     Auth:    API key middleware (new — does not touch session auth)
     Docs:    OpenAPI annotation or comment block

  4. Do NOT:
     - Modify existing internal endpoints — add new ones alongside
     - Change response shapes of existing endpoints — consumers may depend on them
     - Expose fields that contain internal IDs or sensitive data
```

### Category 3 — Feature Addition Plan

When adding a new feature, activate the correct secondary feature prompt and
treat it as a self-contained greenfield build within the existing app.

```md
## Feature Addition: Drag-and-drop page builder

Activate: secondary-prompt--ui-builder.md

Integration contract (how it connects to the existing app):
  Entry point:     New sidebar nav item "Page Builder" at /dashboard/builder
  Auth:            Uses existing auth middleware (no new auth logic)
  Data:            New tables only — does not modify existing tables
  Permissions:     Admin role can access (uses existing role system)
  Shared services: May call existing MediaService for image uploads (read-only)

Self-contained scope:
  New routes:      GET/POST /dashboard/builder, /dashboard/builder/{page}
  New controllers: PageBuilderController
  New models:      Page, PageBlock, PageTemplate
  New migrations:  create_pages_table, create_page_blocks_table
  New components:  Builder shell, component panel, canvas, properties panel

Does NOT touch:
  Any existing controller, model, or migration
  Any existing route
  Any existing component outside the builder
```

### Category 4 — Data Model Extension Plan

When extending the schema, activate the Data Layer prompt in extension mode —
not from scratch:

```md
## Data Model Extension: Add multi-tenancy

Activate: Data Layer prompt — extension mode

This is the highest-risk change category. Every step is additive first.

Step 1 — Audit current single-tenant data:
  Identify every table that will need organizationId
  Identify every query that will need to be scoped
  Identify every relationship that changes (global → org-scoped)

Step 2 — Create Organization model first:
  New migration: create_organizations_table
  New model: Organization
  Seed: create a default organization for all existing data

Step 3 — Add organizationId additively to each table:
  New migration: add_organization_id_to_[table]
  Column: nullable initially (existing rows get default org in next step)
  Index: add @@index([organizationId]) on each table

Step 4 — Backfill existing data:
  New migration or seeder: assign all existing rows to default organization
  Verify: every row has an organizationId before proceeding

Step 5 — Make organizationId non-nullable:
  New migration: alter column to NOT NULL
  This step only runs after Step 4 is verified complete

Step 6 — Add query scoping:
  Every repository/service method gets organizationId parameter
  Global admin queries bypass scoping explicitly
  Tests: verify no cross-tenant data leakage

Step 7 — Add tenant switcher (super admin):
  New UI: organization selector in super admin layout
  Session: store active organization context
  Middleware: inject organizationId into all requests from context
```

---

## Phase 4 — Sequencing

With all changes decomposed and specialist prompts selected, sequence them.

### Sequencing Rules

1. **Prerequisites before features.** Inertia must be installed before any
   Inertia component is built. A new table must exist before a controller
   uses it.

2. **Schema before application code.** Migrations run before models are updated.
   Models are updated before controllers use new fields.

3. **Isolated changes before integrated changes.** Build and verify a feature
   in isolation before connecting it to the rest of the app.

4. **Low-risk before high-risk.** View layer changes (no backend impact) before
   schema changes (high impact). Additive changes before modifications.

5. **Never modify existing migrations.** Always add new migration files.
   Existing migrations represent the history of the database and must not change.

### Sequenced Build Plan

```md
## Build Sequence — [Project Name] Changes

### Checkpoint 0 — Baseline Verification
Before any change begins:
  [ ] Current app builds without errors
  [ ] Existing tests pass
  [ ] Current app is committed to a clean branch
  [ ] A new branch is created for this change set: git checkout -b change/[description]

### Block 1 — Prerequisites
[Changes that must complete before any other work begins]
  1. Install Inertia (if Category 1 change)
  2. Add new dependency packages
  3. Run any prerequisite migrations

### Block 2 — Schema Changes (if any)
[Always before application code that uses the new schema]
  1. [New migration files, in order]
  2. Run migrations
  3. Verify schema with: npx prisma db pull / php artisan migrate:status
  4. Update type definitions (from Data Layer prompt output)

### Block 3 — Backend Changes (if any)
[New controllers, new services, new API routes]
  1. [New files only — never modify existing files without explicit scope]
  2. Verify: API endpoints return expected responses (curl / Postman)

### Block 4 — View Layer Changes
[Blade → Inertia, design updates, component rebuilds]
  Ordered by dependency (layouts first, then pages):
  1. Root layout
  2. Auth pages
  3. [Entity A] — list, detail, create, edit
  4. [Entity B] — list, detail, create, edit
  5. [...]
  For each: [ ] renders [ ] data loads [ ] form submits [ ] errors show

### Block 5 — New Features
[Each secondary feature as a self-contained unit]
  Feature: [Name]
  Activate: [secondary prompt name]
  Entry point: [route / nav item]
  Verify: [specific behaviors]

### Block 6 — Integration Verification
[Verify all change blocks work together]
  [ ] All existing functionality still works (regression check)
  [ ] New features integrate with existing features as planned
  [ ] All CRUD interaction checklist items pass for changed areas
  [ ] Permissions / roles work correctly for new features
  [ ] Third-party integrations unaffected

### Block 7 — Design Pass (if view layer changed)
  [ ] All zones use correct design tokens
  [ ] system.md updated with any new decisions
  [ ] Dark mode (if applicable) tested
  [ ] Mobile layout verified

### Merge
  [ ] All blocks verified
  [ ] build-log.md updated with decisions made
  [ ] PR / merge to main
```

---

## Phase 5 — The Fork Pattern

When the change is significant enough that you want to keep the original
version running while building the new one — the fork pattern.

This is the right approach when:
- You want to completely redesign the UI while keeping the backend unchanged
- You want to A/B test old vs new before fully committing
- The change is large enough that partial states would be confusing to users
- You need to validate the new version thoroughly before cutover

### How to Execute a Fork

```md
## Fork Pattern

Step 1 — Branch
  git checkout -b v2/[description]
  This branch is the new version. Main stays deployable throughout.

Step 2 — Establish the fork boundary
  Identify what is shared (backend, DB, migrations, services)
  Identify what is forked (views, frontend components, design tokens)

  Rule: The fork ONLY diverges in the forked layer.
  The backend on main and the backend on the fork branch must be identical.
  This is enforced by never committing backend changes to the fork branch
  unless they are also cherry-picked to main.

Step 3 — Build the new version
  Work entirely on the fork branch.
  Backend changes needed for new frontend features → commit to main first,
  then cherry-pick to fork branch.

Step 4 — Validation environment
  Deploy the fork branch to a staging environment.
  Run both old and new versions simultaneously.
  Validate the new version against the same database (read-only copy or staging DB).

Step 5 — Cutover
  When the new version is validated:
  Merge fork branch to main.
  Deploy.
  Old views/components are now replaced.
  Backend unchanged — no risk.

Step 6 — Cleanup
  Delete the old view files that are no longer used.
  Remove any compatibility shims added during the fork.
  Update .claude/AGENTS.md to reflect the new current state.
```

---

## Phase 6 — Rule File Updates

Unlike Greenfield and Migration, Change does not create new rule files from
scratch — it **updates** existing ones to reflect the current state.

```md
## Rule File Update Protocol

After every change block completes, update:

.claude/rules/current-state/feature-inventory.md
  → Mark completed changes as [done]
  → Add new features with their build approach documented

.claude/rules/current-state/api-contracts.md
  → Add new endpoints
  → Mark any endpoints that changed (response shape, auth, etc.)

.claude/rules/current-state/domain-models.md
  → Add new entities
  → Add new fields to existing entities
  → Never remove — mark deprecated fields with // DEPRECATED

.claude/design/system.md
  → Update if design tokens changed
  → Record new design prompts applied to zones

.claude/build-log.md
  → Add entry: [date] [change description] [decisions made] [files changed]
```

### AGENTS.md Update

After changes complete, update the project's `AGENTS.md`:

```md
## Last updated: [date]
## Change applied: [description]
## Current state: [what the app is now]

## What changed in this session:
- [file] — [what changed and why]
- [file] — [what changed and why]

## What did not change (verified):
- [area] — untouched, verified working
```

---

## Common Change Scenarios — Quick Reference

### Scenario: Blade → Inertia, same design

```
Category:   1 — View Layer
Touches:    resources/views/ (deleted), resources/js/Pages/ (new)
Does not touch: Controllers, routes, models, migrations, services
Specialist: None — Master Prompt conventions
Sequence:   Layouts → Auth → Entity by entity
Risk:       Low — backend entirely unchanged
```

### Scenario: Add a new design direction (rebrand)

```
Category:   1 — View Layer
Touches:    globals.css, tailwind.config.ts, component files
Does not touch: Backend, routing, data
Specialist: Theming prompt + new Design Prompt
Sequence:   Tokens → Layout components → Page by page
Risk:       Low — no behavioral changes
Fork?:      Yes, recommended for significant visual changes
```

### Scenario: Add a public API on top of existing internal API

```
Category:   2 — API Extension
Touches:    New routes, new API controllers, new middleware (API keys)
Does not touch: Existing controllers, existing routes, DB schema
Specialist: Data Layer prompt (API contracts section)
Sequence:   Auth (API keys) → Route prefix → Endpoints one by one
Risk:       Medium — new surface area, audit security carefully
```

### Scenario: Add drag-and-drop page builder

```
Category:   3 — Feature Addition
Touches:    New routes, new controllers, new models, new migrations, new components
Does not touch: Any existing feature
Specialist: secondary-prompt--ui-builder.md
Sequence:   Schema → Backend → Frontend (canvas, panels, properties)
Risk:       Low to existing app — isolated. Medium internally (complex feature).
```

### Scenario: Add multi-tenancy to single-tenant app

```
Category:   4 — Data Model Extension
Touches:    Every table (organizationId), every query (scoping), middleware
Does not touch: Business logic (same rules, scoped)
Specialist: Data Layer prompt (extension mode)
Sequence:   Create Organization → Add columns additively → Backfill → Non-nullable → Scope queries
Risk:       High — touches everything. Requires careful staging and rollback plan.
Live users: Additive migration pattern mandatory. Phased cutover required.
```

### Scenario: Add templates + per-company themes

```
Category:   3 + 4 — Feature Addition + Data Model Extension
Touches:    New Template/Theme models, new page builder integration, design token system per org
Does not touch: Core booking/order logic
Specialist: Theming prompt (per-org token system), Data Layer (new entities)
Sequence:   Schema (templates, themes) → Token system (per-org overrides) → Template UI → Builder integration
Note:       Per-org theming requires zone token overrides scoped to organizationId —
            extend the token architecture from the Theming prompt to support runtime org-level values
```

---

## Operating Principles

**Change only what you say you're changing.** Every file touched is justified
by the stated change scope. If a file is not in scope, it is not opened.
If something adjacent looks broken, it is flagged — not silently fixed.

**The existing app is the source of truth.** The change prompt reads what is
there before deciding what to do. It does not assume — it observes, then acts.

**Additive before destructive.** New files before deleting old ones. New columns
before removing old ones. New routes before deprecating old ones. Every change
that could break something is staged so the rollback is one step backward.

**The fork is not a rewrite.** A fork preserves the backend and diverges only
in the layer being changed. A fork that touches the backend without syncing to
main is a liability, not a safety net.

**Build-log honesty.** Every non-obvious decision made during a change session
gets an entry in `build-log.md`. Why was this approach chosen over alternatives?
What trade-offs were made? Future sessions — and future developers — need this.

**Tests are not optional for high-risk changes.** Category 4 changes (data model
extension) and multi-tenancy additions require tests before merge. If no test
suite exists, write the critical path tests as part of the change — not after.
