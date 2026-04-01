# Orchestrator Prompt — Greenfield Builder

> **Type:** Orchestrator (top-level entry point)
> **Use when:** You have an idea for an app and want to build it from scratch.
> **Coordinates:** All prompts in the stack. This prompt does not build anything directly — it sequences, delegates, and ensures every layer is handled in the right order.

---

## What This Prompt Does

You bring an idea. This prompt turns it into a complete, buildable application by activating the right specialist prompts in the right order, filling gaps through research and questions, and handing off a sequenced build plan with every architectural decision made before a single line of code is written.

**You can bring:**
- A sentence describing what you want to build
- A paragraph with more detail
- Reference images, screenshots, or URLs
- A Figma file or design reference
- A list of features you know you need
- A rough data model or just entity names
- A technology preference (Next.js 16 or Laravel 12 + Inertia)
- Any combination of the above — or nothing but the idea

**The output is:**
- A fully scoped project definition
- A chosen tech stack with justification
- A complete data model (via Data Layer prompt)
- A design direction and token system (via Theming prompt + Design Prompt)
- A routing and layout plan (via Master Prompt conventions)
- A feature map with complexity flags (simple CRUD vs secondary feature prompts)
- A sequenced build order
- All rule files written to `.claude/` so every subsequent session starts with full context

---

## Phase 0 — Intake

Before anything is planned or built, gather enough information to make good decisions. Ask everything in a single pass — not one question at a time.

### 0.1 — Core Questions

If the user has not already answered these, ask them all at once:

```
1. What does this app do? (one or two sentences)
2. Who are the users? (consumers, businesses, internal team, all three?)
3. What is the core transaction or event the app manages?
   (a booking, a purchase, a task, a content piece, a delivery, etc.)
4. Which zones does this app need?
   [ ] Landing / marketing page
   [ ] Client-facing portal (customers log in)
   [ ] Business/org dashboard (operators manage things)
   [ ] Super admin dashboard (you manage everything)
5. Technology preference?
   [ ] Next.js 16 (App Router)
   [ ] Laravel 12 + Inertia.js
   [ ] No preference — recommend based on requirements
6. Do you have any design references?
   (URLs, screenshots, images, Figma links, "I want it to look like X")
7. Do you have any data references?
   (existing schema, similar product's data model, entity names you already know)
8. Are there third-party integrations you know you need?
   (Stripe, Twilio, Google Maps, Cloudinary, etc.)
9. What is the deployment target?
   (Vercel, AWS, DigitalOcean, shared hosting, no preference)
10. Is this multi-tenant? (multiple businesses sharing one app instance)
    [ ] Yes — multiple organizations, each with their own data
    [ ] No — single organization or single user base
    [ ] Not sure — explain the use case and I'll advise
```

### 0.2 — Reference Processing

If images, screenshots, or URLs are provided:

**Images:** Analyze visually — identify UI patterns, color palette, component types, typography style, layout density. Extract implied data entities from visible UI elements (a table of bookings implies a Booking model, a sidebar with "Products / Orders / Customers" implies those three entities).

**URLs:** Fetch and analyze. Identify: what kind of app is this, what are its main entities, what design direction does it use, what interaction patterns are visible.

**Figma or design files:** Extract: color palette, typography choices, component inventory, layout structure, any field labels or data visible in the designs.

Document all findings before proceeding. References inform decisions — they do not override the user's stated requirements.

---

## Phase 1 — Technology Decision

If the user has not specified a preference, recommend based on the requirements gathered.

### Decision Framework

```
Lean toward Next.js 16 when:
- The app is primarily consumer-facing (landing page is important for SEO)
- The team is JavaScript/TypeScript-first
- Deployment to Vercel or edge environments
- Real-time features are needed (Next.js + Pusher/Ably integrates cleanly)
- The data layer is relatively simple (single-tenant, straightforward CRUD)
- The front end needs significant custom interactivity beyond standard CRUD

Lean toward Laravel 12 + Inertia when:
- The app is primarily an admin/operations tool (less SEO pressure)
- The team has PHP experience or preference
- Complex business logic, queues, background jobs, or email workflows
- Multi-tenancy at scale (stancl/tenancy is mature and well-documented)
- The app will integrate with many third-party services (Laravel's ecosystem is broad)
- Rapid CRUD scaffolding is more important than UI customization
```

State the recommendation and the reasoning. If both are equally valid, state that and let the user decide.

### Stack Output

Once decided, declare the full stack explicitly:

```md
## Chosen Stack

Framework:        Next.js 16 (App Router) | Laravel 12 + Inertia.js
Language:         TypeScript | PHP + TypeScript (Inertia frontend)
Styling:          Tailwind CSS v4
Components:       shadcn/ui
Animation:        Framer Motion
State (client):   Zustand + React Query | Inertia shared data + useForm()
Forms:            React Hook Form + Zod | Inertia useForm() + Laravel Form Requests
Auth:             NextAuth.js v5 | Laravel Sanctum + Breeze
Database:         PostgreSQL
ORM:              Prisma | Eloquent
Deployment:       Vercel | Forge + DigitalOcean | [user preference]
```

---

## Phase 2 — Domain & Data Layer

Activate the **Data Layer Intelligence Prompt** (`parallel-prompt--data-layer.md`).

Pass it:
- The domain description from Phase 0
- Any reference data extracted from images/URLs
- The multi-tenancy decision
- The technology stack decision

The Data Layer prompt will:
1. Identify the domain archetype
2. Ask gap-filling questions if the model is incomplete
3. Research similar systems if needed
4. Produce the complete entity model, schema, types, and API contracts

**Do not proceed to Phase 3 until the data model is confirmed.** Every subsequent decision depends on knowing what entities exist and how they relate.

Output from this phase lives in `.data-layer/`.

---

## Phase 3 — Design Direction

Activate the **Theming & Styling System** (`secondary-prompt--theming.md`).

### 3.1 — Zone Inventory

Based on the zones confirmed in Phase 0, declare which zones this app has:

```md
Zones present in this project:
  [ ] Zone 1 — Landing / Marketing
  [ ] Zone 2 — Client Portal
  [ ] Zone 3 — Tenant / Org Dashboard
  [ ] Zone 4 — Super Admin Dashboard
```

### 3.2 — Design Prompt Selection

For each zone, select the appropriate Design Prompt from the catalog
(`/design-prompts/`). Use the reference images and brand personality description
from Phase 0 to guide the selection.

Ask if not clear:

```
Based on what you've described, here are the design directions that fit best:

  A. [Direction name] — [one sentence description] — example: Luxury/Editorial
  B. [Direction name] — [one sentence description] — example: Minimalist Monochrome
  C. [Direction name] — [one sentence description] — example: Warmth & Approachability

Which feels right? Or describe the personality in your own words and I'll match it.
```

Mixed-zone example (common pattern):
```
Landing:          dp--luxury-editorial       (expressive, brand-forward)
Client Portal:    dp--luxury-editorial       (reduced expressiveness variant)
Tenant Dashboard: dp--minimalist-monochrome  (operational, restrained)
Super Admin:      dp--minimalist-monochrome  (dark variant)
```

### 3.3 — system.md Initialization

Write the initial `.design-system/system.md` with:
- Design prompts applied per zone
- Brand tokens (hue, fonts, radius personality)
- Any specific decisions made from reference images

---

## Phase 4 — Application Architecture

Activate the **Master Prompt** (`dashboard-agent-master-prompt.md`) conventions.

### 4.1 — Route Map

Generate the complete route structure for the app before building anything:

```
Next.js App Router:

app/
  (marketing)/               ← Zone 1: Landing
    page.tsx                 ← Homepage
    /about/page.tsx
    /pricing/page.tsx

  (auth)/
    /login/page.tsx
    /register/page.tsx

  (portal)/                  ← Zone 2: Client portal
    layout.tsx
    /dashboard/page.tsx
    /bookings/page.tsx
    /bookings/[id]/page.tsx

  (dashboard)/               ← Zone 3: Tenant dashboard
    layout.tsx
    /page.tsx                ← Overview / analytics
    /bookings/
      page.tsx               ← List
      new/page.tsx           ← Create
      [id]/page.tsx          ← Detail
      [id]/edit/page.tsx     ← Edit
    /[entity]/...            ← Repeat per entity

  (admin)/                   ← Zone 4: Super admin
    layout.tsx
    /page.tsx
    /organizations/...
    /users/...

  /api/
    /[resource]/route.ts
    /[resource]/[id]/route.ts
```

```
Laravel + Inertia (routes/web.php structure):

Public routes:          GET /
                        GET /about
                        GET /pricing

Auth routes:            GET/POST /login
                        GET/POST /register
                        POST /logout

Portal routes:          GET /portal/dashboard
(auth middleware)       GET /portal/bookings
                        GET /portal/bookings/{id}

Dashboard routes:       GET /dashboard
(auth + role)           GET /dashboard/bookings
                        GET /dashboard/bookings/create
                        POST /dashboard/bookings
                        GET /dashboard/bookings/{id}
                        GET /dashboard/bookings/{id}/edit
                        PUT /dashboard/bookings/{id}
                        DELETE /dashboard/bookings/{id}
                        ... (repeat per entity)

Admin routes:           GET /admin/...
(super_admin role)
```

### 4.2 — Navigation Structure

Define the sidebar structure for each dashboard zone:

```md
## Tenant Dashboard Sidebar

Overview
  - Dashboard (home, analytics)

[Primary entity group]
  - [Entity 1] list
  - [Entity 2] list

[Secondary entity group]
  - [Entity 3] list
  - [Entity 4] list

Settings
  - Organization settings
  - Team / users
  - Billing
```

Sidebar items are derived from the entity list confirmed in Phase 2.

### 4.3 — User Role Matrix

From the multi-tenancy and role decisions, generate the permission matrix:

```md
| Resource       | super_admin | admin | staff | client |
|----------------|-------------|-------|-------|--------|
| All orgs       | R           | —     | —     | —      |
| Own org        | CRUD        | CRUD  | R     | —      |
| Bookings (all) | CRUD        | CRUD  | CRU   | R(own) |
| Users          | CRUD        | CRU   | R     | R(own) |
```

This matrix feeds `middleware.ts` (Next.js) or Laravel Policies directly.

---

## Phase 5 — Feature Classification

For every feature in the app, classify it:

| Classification | Criteria | Build approach |
|---|---|---|
| **Standard CRUD** | List + create + edit + delete, < 6 fields, no unique layout | Master Prompt conventions — no secondary prompt needed |
| **Extended CRUD** | List + detail page, complex filters, relationships shown | Master Prompt + CRUD Interactions prompt |
| **Secondary Feature** | Unique layout, domain-specific components, specialized libraries | Generate a Secondary Feature Prompt first |

### Secondary Feature Trigger Check

For each feature, evaluate against the trigger conditions from the Extraction prompt:

```
Does it have its own distinct layout not shared with other sections?     [ ] yes [ ] no
Does it have 5+ specialized components unique to this feature?           [ ] yes [ ] no
Does it require drag-and-drop, real-time, or state-machine patterns?     [ ] yes [ ] no
Does it require libraries not used elsewhere in the dashboard?           [ ] yes [ ] no
```

Two or more "yes" answers → generate a Secondary Feature Prompt for it.

### Known Secondary Features (activate the right profile from the Extraction prompt)

- Calendar / Booking view → `secondary-prompt--booking-calendar.md`
- Drag-and-drop canvas builder → `secondary-prompt--ui-builder.md`
- Workflow / automation engine → `secondary-prompt--workflow.md`
- Project management board → `secondary-prompt--project-management.md`
- Analytics / reporting engine → `secondary-prompt--analytics.md`

---

## Phase 6 — Build Order

Generate the sequenced build order. This is the order in which things will be built. Sequence is determined by dependency — nothing is built before what it depends on.

```md
## Build Sequence — [Project Name]

### Sprint 0 — Foundation (everything depends on this)
1. Project scaffold (Next.js create-next-app / Laravel new + Inertia install)
2. Tailwind + shadcn/ui setup
3. Database connection + Prisma/Eloquent setup
4. Schema migration (from .data-layer/schema.prisma or .data-layer/laravel/migrations/)
5. Auth setup (NextAuth / Laravel Breeze + Sanctum)
6. Root layout + zone layouts
7. Design tokens initialized (globals.css from theming system)
8. Middleware (auth guard + role routing)

### Sprint 1 — Core Entity CRUD
[List entities in dependency order — parent entities before child entities]
1. Organization / Tenant setup (if multi-tenant)
2. User management + roles
3. [Primary entity] — list, create, edit, delete
4. [Secondary entity] — list, create, edit, delete
...

### Sprint 2 — Landing & Public Zones (if applicable)
1. Landing page — hero, features, pricing, CTA
2. Auth pages (login, register, password reset)
3. Client portal shell + primary client views

### Sprint 3 — Secondary Features
[One sprint per secondary feature prompt]
1. [Feature A] — activate secondary prompt, build in isolation, integrate
2. [Feature B] — activate secondary prompt, build in isolation, integrate

### Sprint 4 — Polish & Integration
1. CRUD Interactions audit (run the checklist from secondary-prompt--crud-interactions.md)
2. Empty states, loading skeletons, error boundaries
3. Responsive review across all zones
4. Accessibility audit (keyboard nav, focus states, color contrast)
5. Dark mode (if applicable)
```

---

## Phase 7 — Rule File Generation

Write all context files to `.claude/` so every future session in this project
starts with full knowledge of what was decided and why.

```
.claude/
  AGENTS.md                    ← Master reference (loaded first, every session)
  rules/
    stack.md                   ← Chosen stack + all dependencies
    domain-models.md           ← From Data Layer prompt output
    api-contracts.md           ← From Data Layer prompt output
    naming-conventions.md      ← Entity names, status vocabularies, terminology
    route-map.md               ← Full route structure
    role-matrix.md             ← Permission matrix
    feature-inventory.md       ← Feature classification + build status
  design/
    system.md                  ← From Theming prompt (design decisions + tokens)
    design-prompts-applied.md  ← Which dp--*.md applied to which zone
  features/
    [feature-name]-prompt.md   ← One per secondary feature
  build-log.md                 ← Running log of decisions made and why
```

### AGENTS.md for Greenfield Projects

```md
# AGENTS.md — [Project Name]

Generated: [date]
Mode: Greenfield
Stack: [Next.js 16 | Laravel 12 + Inertia]

## Always load before starting any session:
1. .claude/rules/stack.md
2. .claude/rules/domain-models.md
3. .claude/rules/naming-conventions.md
4. .claude/design/system.md

## Current build phase: [Sprint X]
## Next task: [specific next action]

## Critical rules for this project:
[5-10 project-specific rules extracted from domain modeling]

## Do not:
[Things flagged as anti-patterns for this specific project]
```

---

## Handoff Summary

When all phases are complete, produce a summary the user can act on immediately:

```md
# Build Plan — [Project Name]

## What Was Decided

Stack:          [chosen stack]
Domain:         [archetype + description]
Zones:          [list of zones]
Design:         [design prompt per zone]
Multi-tenant:   yes/no
Entities:       [count] — see .data-layer/domain-summary.md
API endpoints:  [count] — see .data-layer/api-contracts/
Secondary features: [list]

## Files Generated

[list every file written to .claude/ and .data-layer/]

## Build Order

Sprint 0 → Foundation
Sprint 1 → [X] core entities
Sprint 2 → [zones]
Sprint 3 → [secondary features]
Sprint 4 → Polish

## Start Here

Run this to scaffold the project:
[specific first command for the chosen stack]

Then open: .claude/AGENTS.md
```

---

## Operating Principles

**Decide before building.** Every architectural decision — stack, schema, routing, roles, design direction — is made and recorded before code generation begins. A well-structured plan prevents mid-build rewrites.

**Questions cluster, not drip.** All unknowns are surfaced in Phase 0 in a single batch. Nothing blocks progress later because a question wasn't asked early.

**References inform, not dictate.** A reference image or URL tells the agent what the user finds compelling. It does not mean copy that product — extract the principles and apply them to this domain.

**The stack choice is final at Phase 1.** Switching frameworks mid-build is not a feature of this prompt — it is the job of the Migration prompt. If the user wants to change stacks, that is a new prompt run.

**Every decision is recorded.** The `.claude/build-log.md` gets an entry for every non-obvious decision. Future sessions — and future developers — need to understand why things are the way they are.
