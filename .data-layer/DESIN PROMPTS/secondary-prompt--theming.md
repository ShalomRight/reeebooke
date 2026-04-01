# Secondary Prompt — Theming & Styling System

> **Extends:** `dashboard-agent-master-prompt.md`
> **Scope:** Visual identity, theme architecture, design tokens, and styling conventions across all four application layers.
> Always load the Master Prompt first. This prompt adds theming rules on top — it does not replace any master conventions.

---

## Core Philosophy

Design decisions compound. A spacing value chosen once becomes a pattern. A depth strategy becomes an identity. **Consistency beats perfection** — a coherent system with imperfect values beats a scattered interface with "correct" ones.

The goal is not generic polish. The goal is a system that feels **intentionally designed for this product** — one that someone could look at and describe in a sentence. Before writing a single line of CSS, you must commit to a design direction. Not a vague mood, a committed direction that governs every decision that follows.

**Avoid:** Inter + purple gradient + rounded cards + white background. That is not a design, that is a default. Every choice that "feels obvious" is a signal to stop and deliberately explore alternatives.

---

## Design Prompt System — How Styles Plug In

This theming system is intentionally style-agnostic. It defines the **architecture** — zones, token layers, `system.md`, component contracts, progressive disclosure rules, semantic color — but it does not prescribe what those tokens should actually *be*. That is the job of a **Design Prompt**.

A Design Prompt is a self-contained style definition that plugs into this chassis. It specifies:
- The exact color palette and hue strategy
- The typography pairing (fonts, scale, weights, tracking)
- The border radius personality (sharp vs. round)
- The depth approach (shadows vs. borders vs. flat)
- The motion timing and easing character
- The texture and pattern system
- The "non-negotiable" signature elements that make the style recognizable

### The Relationship

```
dashboard-agent-master-prompt.md      ← Stack, routing, CRUD, RBAC, API conventions
  └── secondary-prompt--theming.md    ← Zone architecture, token layers, semantic color rules
        └── design-prompt--[style].md ← Actual token values, typography, motion, bold factors
```

The Design Prompt is always the **innermost** layer. It populates the variables that the theming system defined. It does not override the zone architecture or the token naming — it fills them in.

### Available Design Prompts

| Style | File | Character | Best Zone Fit |
|---|---|---|---|
| **Minimalist Monochrome** | `dp--minimalist-monochrome.md` | Stark, editorial, typographic, zero color | Dashboard + Admin |
| **Luxury / Editorial** | `dp--luxury-editorial.md` | Warm, cinematic, gold accents, serif-forward | Landing + Portal |
| **Terminal / CLI** | `dp--terminal-cli.md` | Dark, phosphor-green, monospace, hacker | Admin + Dev tools |
| **Maximalism / Dopamine** | `dp--maximalism-dopamine.md` | Multi-color, kinetic, pattern-dense, Y2K | Landing + Consumer portal |
| **[More from designprompts.dev]** | `dp--[style].md` | — | — |

### How to Select a Design Prompt

Answer these questions before loading one:

1. **What is the primary audience?** Consumer-facing → expressive styles (Luxury, Maximalism). Internal tooling → restrained styles (Monochrome, Terminal).
2. **What is the brand personality?** Describe it in three adjectives. Match those adjectives to the style's emotional keywords.
3. **Which zones exist in this project?** Some styles are not appropriate for all zones — Terminal/CLI should never be a client portal style, for example.
4. **Will one style serve all zones, or will zones have different styles?** If different, each zone loads its own Design Prompt but they must share `:root` brand tokens (hue, font family) so the zones feel related.

### Applying a Design Prompt to the Zone Token System

When a Design Prompt is loaded, its tokens map directly into the zone CSS architecture:

```css
/* The theming system defines the slots */
[data-zone="landing"] {
  --bg:           /* ← Design Prompt fills this */
  --surface:      /* ← Design Prompt fills this */
  --accent:       /* ← Design Prompt fills this */
  --border:       /* ← Design Prompt fills this */
  --text-primary: /* ← Design Prompt fills this */
  --radius-md:    /* ← Design Prompt fills this (0px for Monochrome, 24px for Maximalism) */
  --depth-strategy: borders | shadows | flat | glow; /* ← Design Prompt declares this */
}
```

The theming system's `system.md` file must record which Design Prompt was applied to which zone, so subsequent sessions stay consistent:

```md
## Design Prompts Applied
Landing:          dp--luxury-editorial
Client Portal:    dp--luxury-editorial (reduced expressiveness variant)
Tenant Dashboard: dp--minimalist-monochrome
Super Admin:      dp--minimalist-monochrome (inverted/dark variant)
```

---

## The Four Application Zones

Every project built on this stack may have up to four distinct UI surfaces, each with its own character. Understand which zones exist before establishing any tokens.

```
Zone 1 — Landing / Marketing        ← Public-facing. Brand-forward. Expressive.
Zone 2 — Client Portal              ← Authenticated but lightweight. Approachable.
Zone 3 — Tenant / Org Dashboard     ← Operational. Clear hierarchy. Efficient.
Zone 4 — Super Admin Dashboard      ← Dense. Powerful. Trusted.
```

These zones do **not** need identical aesthetics. They need a **coherent relationship** — shared DNA with intentional variation. Think of it like a brand system: the logo appears in all four places, but the visual weight and expressiveness differ by context.

| Zone | Expression level | Motion | Color expressiveness | Layout density |
|---|---|---|---|---|
| Landing | High | Rich, scroll-triggered | Full brand palette | Open, editorial |
| Client Portal | Medium | Subtle transitions | Brand accent + neutral | Comfortable |
| Tenant Dashboard | Low-medium | Functional micro-interactions | Restrained, accent-only | Moderate |
| Super Admin | Low | Minimal, purposeful | Near-monochrome + accent | Dense |

### Semantic Color — Color Carries Meaning, Not Just Magnitude

Color must communicate *direction*, not just intensity. This is the most commonly missed principle in dashboard design. A red badge on a revenue number that went up is good news. A red badge on an overdue order is a problem. If both get the same treatment because they are both "high values," the user has to mentally translate every number they see.

**The rule:** Before assigning a color to a data point, ask — is this color reflecting what the value *means in this context*, or just how large it is?

Define semantic color roles explicitly in your token system, not ad hoc:

```css
:root {
  /* Semantic roles — these are meaning-first, not aesthetic */
  --color-positive:   hsl(142 60% 40%);   /* good outcome, healthy metric */
  --color-warning:    hsl(38  90% 48%);   /* needs attention, approaching threshold */
  --color-danger:     hsl(4   80% 52%);   /* problem, breach, overdue */
  --color-neutral:    hsl(220 10% 55%);   /* expected / baseline / no signal */
  --color-info:       hsl(210 70% 50%);   /* informational, no action needed */
}
```

Apply these roles with directionality in mind:

| Metric type | Low value color | High value color | Reasoning |
|---|---|---|---|
| Overdue tasks | `--color-neutral` | `--color-danger` | High = bad |
| Revenue | `--color-neutral` | `--color-positive` | High = good |
| Error rate | `--color-neutral` | `--color-danger` | High = bad |
| Test coverage | `--color-warning` | `--color-positive` | Low = bad |
| Scenario realism | `--color-warning` | `--color-neutral` | Low = questionable |

**Never** assign semantic roles by magnitude alone. A chart where "high = red" and "low = green" is actively harmful if the metric is one where high is the goal. Always invert the color scale to match the semantic direction of the data.

---

## How Theming Maps to Next.js Layouts

The **layout file** is the theme boundary. CSS custom properties scoped to a layout selector cascade to all children within that segment — and nowhere else. This is the correct mental model:

```
app/
  layout.tsx                  ← :root tokens — universal (fonts, base radius, etc.)

  (marketing)/
    layout.tsx                ← [data-zone="landing"] tokens override
    page.tsx

  (portal)/
    layout.tsx                ← [data-zone="portal"] tokens override
    dashboard/
      layout.tsx              ← [data-zone="dashboard"] tokens (further refined)

  (admin)/
    layout.tsx                ← [data-zone="admin"] tokens override
```

Each layout wraps its `children` in a `<div data-zone="...">` (or a semantic equivalent). Zone-specific CSS targets that attribute. Nothing bleeds across zones unless it is defined at `:root`.

### What lives at `:root` (global)

These are the tokens that must be consistent everywhere. They form the brand's DNA:

- Font family (display + body)
- Base border radius scale (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`)
- Core brand colors as raw HSL values (not utility classes — raw values so they can be composed)
- Shadow scale
- Z-index scale
- Motion duration scale (`--duration-fast`, `--duration-base`, `--duration-slow`)
- Focus ring style

### What lives at zone level

These tokens can differ per zone:

- Surface colors (background, card, sidebar)
- Text contrast levels
- Spacing density multiplier
- Border expressiveness (heavy borders in landing vs hairline borders in admin)
- Accent color variation (same hue, different saturation/lightness per zone)
- Animation intensity

---

## Token Architecture

Use CSS custom properties as the single source of truth. Tailwind config reads from these variables. shadcn/ui is already configured this way — extend it, never override it with raw values.

### globals.css structure

```css
/* ─── UNIVERSAL BRAND TOKENS ─── */
:root {
  /* Typography */
  --font-display: 'YourDisplayFont', serif;
  --font-body: 'YourBodyFont', sans-serif;

  /* Radius system — set the personality here */
  --radius-sm:  4px;   /* sharp product = 2px / playful product = 8px */
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-full: 9999px;

  /* Brand hue (raw, so zones can compose) */
  --brand-h: 220;
  --brand-s: 85%;

  /* Motion */
  --duration-fast:   120ms;
  --duration-base:   200ms;
  --duration-slow:   350ms;
  --ease-standard:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ─── LANDING ZONE ─── */
[data-zone="landing"] {
  --bg:           hsl(var(--brand-h) 10% 98%);
  --surface:      hsl(var(--brand-h) 8% 96%);
  --text-primary: hsl(var(--brand-h) 15% 12%);
  --text-muted:   hsl(var(--brand-h) 10% 45%);
  --accent:       hsl(var(--brand-h) var(--brand-s) 50%);
  --border:       hsl(var(--brand-h) 10% 88%);
  /* Landing gets the most expressive treatment */
}

/* ─── CLIENT PORTAL ZONE ─── */
[data-zone="portal"] {
  --bg:           hsl(var(--brand-h) 8% 97%);
  --surface:      hsl(0 0% 100%);
  --accent:       hsl(var(--brand-h) calc(var(--brand-s) - 15%) 48%);
  /* Slightly pulled back from landing */
}

/* ─── TENANT DASHBOARD ZONE ─── */
[data-zone="dashboard"] {
  --bg:           hsl(var(--brand-h) 6% 95%);
  --surface:      hsl(0 0% 100%);
  --sidebar-bg:   hsl(var(--brand-h) 12% 14%);
  --sidebar-text: hsl(var(--brand-h) 8% 72%);
  --accent:       hsl(var(--brand-h) calc(var(--brand-s) - 20%) 52%);
  --border:       hsl(var(--brand-h) 6% 90%);
  /* Operational — restrained palette */
}

/* ─── SUPER ADMIN ZONE ─── */
[data-zone="admin"] {
  --bg:           hsl(220 15% 10%);
  --surface:      hsl(220 13% 14%);
  --sidebar-bg:   hsl(220 18% 8%);
  --sidebar-text: hsl(220 8% 65%);
  --accent:       hsl(var(--brand-h) 70% 55%);
  --border:       hsl(220 10% 22%);
  /* Near-monochrome with a single sharp accent */
}
```

### Tailwind Integration

Extend `tailwind.config.ts` to consume these variables:

```ts
theme: {
  extend: {
    colors: {
      bg:      'hsl(var(--bg))',
      surface: 'hsl(var(--surface))',
      accent:  'hsl(var(--accent))',
      border:  'hsl(var(--border))',
      'text-primary': 'hsl(var(--text-primary))',
      'text-muted':   'hsl(var(--text-muted))',
    },
    borderRadius: {
      sm:   'var(--radius-sm)',
      md:   'var(--radius-md)',
      lg:   'var(--radius-lg)',
      full: 'var(--radius-full)',
    },
    transitionDuration: {
      fast: 'var(--duration-fast)',
      base: 'var(--duration-base)',
      slow: 'var(--duration-slow)',
    },
    fontFamily: {
      display: ['var(--font-display)', 'serif'],
      body:    ['var(--font-body)', 'sans-serif'],
    },
  },
}
```

Now `bg-accent`, `rounded-lg`, `font-display` all follow the zone token, not hardcoded values.

---

## Component-Level Styling

Each component lives in its own folder. The preferred structure is:

```
/components/dashboard/stat-card/
  index.tsx          ← Component logic + JSX
  stat-card.css      ← Component-specific overrides (rare)
  types.ts           ← Props interface
```

**Rule:** A component's CSS file should only exist if the styling cannot be expressed cleanly in Tailwind utility classes. The overwhelming majority of components should have zero `.css` files — they use utility classes that read from the zone token system. Component-specific files are reserved for:

- Complex pseudo-element work (`::before`, `::after` patterns)
- `@keyframes` animations specific to this component
- CSS that requires runtime computed values (`calc()` with JS-derived values)

**Never** write hardcoded hex values or pixel sizes in component files. Everything references a token.

### Component Variant Pattern

Use `cva` (class-variance-authority, ships with shadcn) to express variants:

```ts
const card = cva('rounded-md border border-border bg-surface p-4 transition-shadow duration-base', {
  variants: {
    density: {
      comfortable: 'p-6',
      compact:     'p-3',
    },
    elevated: {
      true:  'shadow-md hover:shadow-lg',
      false: 'shadow-none',
    },
  },
  defaultVariants: { density: 'comfortable', elevated: false },
});
```

This means a card in the admin zone automatically gets the admin surface color, and a card in the landing zone gets the landing surface color — same component, zero extra code.

---

## Choosing a Design Direction

Before any tokens are written, answer these questions and commit to a direction. Once committed, do not second-guess mid-build.

### Step 1 — Personality

Pick **one** from each axis:

| Axis | Options |
|---|---|
| Spatial density | Open & editorial ↔ Tight & dense |
| Edge language | Sharp & precise ↔ Round & soft |
| Surface treatment | Flat & bordered ↔ Layered & shadowed |
| Color conviction | Restrained, single-accent ↔ Expressive, full palette |
| Type character | Neutral, functional ↔ Characterful, opinionated |

These five choices define your `system.md` (see below). They also define how you set the `:root` variables above. A "fun, rounded" product gets `--radius-lg: 20px` and `--radius-md: 14px`. A "precision" product gets `--radius-sm: 2px` and `--radius-md: 4px`.

### Step 2 — Direction Label

Match the project to one of these directions and use it as the north star throughout:

| Direction | Character | Typical Application |
|---|---|---|
| **Precision & Density** | Tight spacing, borders-only depth, cool monochrome | Developer tools, admin dashboards |
| **Warmth & Approachability** | Generous spacing, soft shadows, round corners | Collaborative tools, consumer SaaS |
| **Sophistication & Trust** | Cool tones, layered depth, refined type | Finance, enterprise, legal |
| **Boldness & Clarity** | High contrast, dramatic spatial moves, strong accents | Marketing, modern dashboards |
| **Utility & Function** | Muted palette, zero decoration, raw structure | Developer tools, documentation |
| **Data & Analysis** | Chart-optimized palette, numbers-first hierarchy | Analytics, BI |
| **Playful & Expressive** | Round everything, saturated accents, motion-rich | Consumer apps, social tools |

---

## The system.md Pattern

Adapted from the interface-design methodology: after the first design session, save all token decisions to `.design-system/system.md` at the project root. This file is the living record of every design decision and must be referenced at the start of every subsequent session.

```md
# Design System

## Direction
Personality: Warmth & Approachability
Edge language: Round (--radius-md: 14px)
Depth: Soft shadows (not borders-only)
Color conviction: Single brand accent + neutrals

## Brand Tokens
--brand-h: 245
--brand-s: 72%

## Typography
Display: "Instrument Serif" — loaded via next/font
Body:    "Plus Jakarta Sans" — loaded via next/font

## Zone Summaries
Landing:   Full brand expression, mesh gradient hero, display type prominent
Portal:    Comfortable spacing, white surfaces, accent for CTAs only
Dashboard: Restrained, dark sidebar, hairline borders
Admin:     Near-monochrome dark, single sharp accent

## Spacing Grid
Base: 4px
Scale used: 4, 8, 12, 16, 24, 32, 48, 64

## Component Patterns
Button primary: h-10, px-5, rounded-full, bg-accent, font-medium
Card default:   rounded-lg, border border-border, p-6, shadow-sm
Badge:          rounded-full, px-2.5, py-0.5, text-xs, font-medium
```

Any new component added must be checked against this file. Any new token must be added to this file.

---

## Typography Rules

Typography carries more of a design's identity than color does. Do not default to Inter, Roboto, or system fonts — these signal default thinking.

- **Display font:** Used for headings, hero text, large numerals. Should be characterful. Examples: Instrument Serif, Fraunces, Cabinet Grotesk, Syne, Bricolage Grotesque.
- **Body font:** Optimized for reading at small sizes. Examples: Plus Jakarta Sans, DM Sans, Geist, Nunito.
- **Monospace:** Use for code, IDs, timestamps, table numerals. Examples: Geist Mono, JetBrains Mono.

Load all fonts via `next/font/google` or `next/font/local` — never a `<link>` tag in `layout.tsx`. Assign them as CSS variables so Tailwind can consume them.

### Hierarchy rules per zone

| Zone | H1 | H2 | Body | Labels |
|---|---|---|---|---|
| Landing | Display font, expressive size | Display or body font, medium | Body font, generous leading | Small, spaced caps |
| Portal | Body font, confident size | Body font | Body font | Body font, muted |
| Dashboard | Body font, functional | Body font | Body font, compact leading | Body font, xs, muted |
| Admin | Body font, dense | Body font | Body font, dense | Monospace for IDs and keys |

---

## Motion Rules by Zone

Framer Motion is available globally, but its usage intensity must match the zone.

| Zone | Motion budget | Approved patterns |
|---|---|---|
| Landing | High | Scroll-triggered reveals, staggered hero entrance, parallax, hover lifts |
| Portal | Medium | Page fade-in, modal slide, button hover states |
| Dashboard | Low | Skeleton → content fade, sidebar spring open/close, toast slide-in |
| Admin | Minimal | Functional only — loading state, toast, no decorative motion |

**Universal rule:** Never animate anything that blocks interactivity. Animations must be `pointer-events: none` during play. Use `prefers-reduced-motion` media query to disable all non-essential motion.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Dark Mode

If dark mode is required, implement it as a data attribute on the root HTML element, not a CSS class (this prevents FOUC in Next.js):

```tsx
// app/layout.tsx
<html lang="en" data-theme={theme}>
```

Each zone's tokens must have a corresponding dark variant. Use `[data-theme="dark"] [data-zone="dashboard"]` selectors to compose dark-mode zone tokens. Do not use Tailwind's `dark:` prefix — it creates specificity conflicts with zone tokens.

### Dark mode is not an inverted palette — it is a parallel emotional register

The most common mistake in dark mode implementation is treating it as a mechanical inversion: swap the background from `hsl(0 0% 98%)` to `hsl(0 0% 10%)` and call it done. This produces a dark mode that feels cold, clinical, or accidental.

A dark theme must maintain the **same emotional quality** as its light counterpart. If the light theme is warm and approachable, the dark theme must also be warm and approachable — just in a darker register. If the light theme is precise and technical, the dark theme should feel equally sharp, not murky.

Practical rules:

- **Don't go pure black.** True `#000000` or `hsl(0 0% 0%)` backgrounds feel harsh and fake. Use dark surfaces with a slight hue lean matching the brand — `hsl(220 15% 10%)` for a cool product, `hsl(30 10% 10%)` for a warm one.
- **Warm your dark neutrals.** Surfaces in dark mode should carry a hint of the brand hue, not be neutral grey. `hsl(220 12% 14%)` reads as intentional. `hsl(0 0% 14%)` reads as default.
- **Reduce contrast slightly.** Pure white text on dark backgrounds is harsh over long sessions. Use `hsl(220 15% 90%)` instead of `hsl(0 0% 100%)` for primary text — same readability, less eye strain.
- **Shadows disappear in dark mode.** Replace elevation shadows with border-based depth — a slightly lighter border on an elevated card reads as lifted without needing a visible shadow.
- **Accent colors often need adjustment.** A saturated accent that reads well on a light background may feel neon in dark mode. Desaturate slightly and increase lightness. Test both modes explicitly.

```css
[data-theme="dark"] [data-zone="dashboard"] {
  --bg:           hsl(220 15% 10%);   /* warm-tinted dark, not pure black */
  --surface:      hsl(220 12% 14%);
  --surface-raised: hsl(220 10% 18%);
  --text-primary: hsl(220 15% 90%);   /* off-white, not pure white */
  --text-muted:   hsl(220 10% 55%);
  --border:       hsl(220 10% 22%);
  --accent:       hsl(var(--brand-h) 65% 60%); /* slightly lighter than light-mode accent */
}
```

---

## Progressive Disclosure as a Structural Principle

Progressive disclosure is not just a UI pattern for individual components — it is an architectural principle that should govern how entire zones are designed relative to each other.

**The rule:** A simpler user role should get a structurally simpler interface — not the same interface with things grayed out or hidden.

A client portal is not a dashboard with restricted access. It is a different surface built for a different context of use. If you find yourself designing the tenant dashboard and then hiding half the nav items for the client portal, you are doing it wrong. The client portal should be designed from scratch with only what that user actually needs — fewer nav items, simpler data views, tighter focus.

Apply this principle at three levels:

### Zone level — structural simplicity scales with role
| Zone | Structural complexity | Navigation depth | Data density |
|---|---|---|---|
| Landing | Single scroll or minimal pages | Flat | Zero — pure presentation |
| Client Portal | Shallow — one or two levels | 3–5 nav items max | Low — only their own data |
| Tenant Dashboard | Moderate — grouped sections | 8–15 nav items, grouped | Medium — operational |
| Super Admin | Deep — cross-tenant traversal | Full nav, tenant switcher | High — aggregate views |

### Component level — reveal on demand
Within any zone, layer complexity progressively:
- Show the essential action first; destructive or advanced actions live behind `...` menus
- Forms show required fields first; optional fields in a collapsible "Advanced" section
- Tables show key columns by default; additional columns behind a column visibility toggle
- Detail views show the summary panel first; raw data / logs / audit trail in a secondary tab

### Color and visual weight scale with importance
Not everything deserves equal visual weight. Reserve strong color, large type, and prominent placement for the highest-priority information. Secondary and tertiary information should recede — muted text, smaller size, less contrast. The visual hierarchy should make it obvious where to look first without the user having to read everything.

```tsx
// Example: form with progressive disclosure
<form>
  {/* Required fields — always visible */}
  <Field name="title" required />
  <Field name="status" required />

  {/* Optional — collapsed by default */}
  <Collapsible>
    <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
    <CollapsibleContent>
      <Field name="slug" />
      <Field name="publishedAt" />
      <Field name="metaDescription" />
    </CollapsibleContent>
  </Collapsible>
</form>
```

---

## Anti-Generic Checklist

Before shipping any UI, verify:

- [ ] No Inter, Roboto, Arial, or system fonts used as the primary typeface
- [ ] No purple gradient on white background as the hero
- [ ] No identical card grid layouts with equal-weight borders on every card
- [ ] No generic CTA button (blue, slightly rounded, "Get Started")
- [ ] No color palette with 5+ equally-weighted colors
- [ ] Every zone has a visually distinct character — a screenshot of zone 1 and zone 4 should not look interchangeable
- [ ] The border radius choice is consistent and intentional — not a mix of `4px` and `full` by accident
- [ ] Depth strategy is committed (borders-only OR shadows — not both randomly)
- [ ] Typography has a clear display/body pairing — not one font for everything
- [ ] Spacing follows the 4px grid — no arbitrary `13px`, `17px`, `22px` values
- [ ] Semantic color roles are defined and applied by meaning, not just magnitude — every color has a direction
- [ ] Dark mode (if present) maintains the emotional character of the light theme — not just an inverted palette
- [ ] Dark surfaces use a brand-hue tint, not neutral grey — no pure `#000` or `hsl(0 0% N%)` backgrounds
- [ ] Client portal and tenant dashboard are architecturally distinct — the portal is not just the dashboard with things hidden
- [ ] Progressive disclosure is applied at the form, component, and zone level — simple roles get structurally simple interfaces

---

## Kickoff Addendum — Theming Questions

Add these to the master prompt's kickoff checklist:

- [ ] What is the brand personality? (e.g., "fun and rounded" / "precise and technical" / "trustworthy and refined")
- [ ] Which zones exist for this project? (Landing / Portal / Tenant Dashboard / Super Admin)
- [ ] Is there an existing brand kit? (Logo, primary color, any existing font choices)
- [ ] Light mode only, dark mode only, or both?
- [ ] If dark mode: should it feel warm, cool, or neutral?
- [ ] Is a `system.md` already established, or is this the first session?
- [ ] Are there any motion or animation restrictions? (accessibility, performance, client preference)
- [ ] For each metric or status shown in the dashboard: is a high value good or bad? (drives semantic color direction)
- [ ] Does the client portal need to be a simplified surface, or is it the same feature set as the tenant dashboard with access controls?
