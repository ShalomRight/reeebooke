# Design Critique: AmeliaBookingForm

**Component**: `AmeliaBookingForm`  
**Date**: April 15, 2026  
**Critiquer**: Cascade  
**Context**: Caribbean hair salon booking flow for Abby Hair Studio (warm terracotta brand)

---

## Design Health Score (Nielsen's Heuristics)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Step indicators work, but progress dots use wrong colors |
| 2 | Match System / Real World | 2 | **Forest green theme clashes with warm terracotta brand** |
| 3 | User Control and Freedom | 3 | Back button works, but no cancel/exit option |
| 4 | Consistency and Standards | 2 | **Color scheme inconsistent with rest of site** |
| 5 | Error Prevention | 2 | **No inline validation, generic error banners** |
| 6 | Recognition Rather Than Recall | 2 | **No search — forces users to scroll long lists** |
| 7 | Flexibility and Efficiency | 2 | **No keyboard shortcuts, no search/filter for power users** |
| 8 | Aesthetic and Minimalist Design | 2 | **Glassmorphism + busy sidebar = visual noise** |
| 9 | Error Recovery | 2 | **Errors don't indicate which field failed** |
| 10 | Help and Documentation | 3 | Basic "Need help?" text, no inline guidance |
| **Total** | | **23/40** | **Fair — major visual and UX issues** |

**Rating band**: 20-23 = Fair (significant issues, needs work)

---

## Anti-Patterns Verdict

**Status**: ⚠️ **Partial AI-generated characteristics**

### AI Tells Detected:
1. **Glassmorphism**: Main container uses `glass-card` class (translucent background)
2. **Generic color palette**: Forest green (`forest-800`, `forest-600`) feels like a template choice, not brand-intentional
3. **Busy step wizard**: 4-step sidebar with icons feels like a generic SaaS pattern, not a salon booking flow
4. **Theme variable abuse**: `bg-card`, `text-muted-foreground`, `border-border` — signs of shadcn/ui defaults without customization

### What Saves It:
- The 4-step flow structure is appropriate for booking
- Icons are relevant (Calendar, Camera, CreditCard, Check)
- Photo upload step shows thoughtful UX for hair consultations

---

## Overall Impression

**Gut reaction**: This looks like a generic SaaS booking widget dropped into a warm Caribbean salon website. The forest green sidebar feels like a different brand entirely. It's functional but emotionally cold — not the "warm, skilled, unhurried" feeling Abby's brand promises.

**Single biggest opportunity**: **Color alignment** — simply fixing the forest green to terracotta would transform the perceived quality by 70%.

---

## What's Working

1. **Clear step progression** — The 4-step flow (Service → Date/Time → Photos → Review) is logical and shows progress clearly. Users know where they are in the process.

2. **Photo upload step** — Smart addition for hair services. Clients showing reference photos reduces consultation time and miscommunication. Shows understanding of the domain.

3. **Cart persistence** — The floating cart button with count badge follows e-commerce conventions users expect. Adds convenience for multi-service bookings.

---

## Priority Issues

### [P1] Visual Identity Breakdown — Forest Green Clash

**What**: The sidebar uses `bg-forest-800`, buttons use `bg-forest-600`, step indicators use forest greens. This clashes violently with the warm terracotta theme.

**Why it matters**: Users experience a jarring "did I leave the site?" moment. Undermines brand trust. Makes the salon look like they bought a generic booking widget and didn't customize it.

**Fix**: Map all forest colors to terracotta:
```
forest-800 → terracotta-800 (#8B3A1F)
forest-600 → terracotta-600 (#B85C38)  
forest-500 → terracotta-500
forest-400 → warm-400
cream-50 → warm-50
```

**Command**: `/colorize AmeliaBookingForm — align with warm terracotta theme, remove forest greens`

---

### [P1] No Search for Services

**What**: Service list only has category tabs. With 20+ services, users must scroll through a long list (`max-h-[55vh]`).

**Why it matters**: Violates "Flexibility and Efficiency of Use" (Heuristic #7). Power users who know what they want ("Silk Press") are forced to browse. High abandonment risk.

**Fix**: Add search input above category tabs that filters services by name/description in real-time.

**Command**: `/shape ServiceSelection — add search input with real-time filtering`

---

### [P1] Poor Error UX

**What**: Errors appear as red Alert banners at the bottom of the step. No inline field highlighting, no indication which specific input failed.

**Why it matters**: Users don't know what to fix. Creates anxiety at a high-stakes moment (committing to an appointment). Violates "Error Prevention" and "Help Users Recognize, Diagnose, Recover" heuristics.

**Fix**: 
- Add inline validation (red border on invalid fields)
- Move error messages next to relevant fields
- Use toast for non-blocking errors

**Command**: `/shape AmeliaBookingForm — add inline validation and field-level error messages`

---

### [P2] Dark Mode Theme Variables

**What**: Uses `bg-card`, `text-muted-foreground`, `border-border` which resolve to dark colors in your light mode setup (as seen in your screenshots).

**Why it matters**: Causes the dark card backgrounds you complained about. Looks broken.

**Fix**: Replace theme variables with explicit warm colors:
```
bg-card → bg-white
text-muted-foreground → text-warm-600
border-border → border-warm-200
bg-muted/30 → bg-warm-100
```

**Command**: `/colorize ServiceSelection and AmeliaBookingForm — replace theme variables with explicit warm colors`

---

### [P2] Glassmorphism Visual Noise

**What**: Main container uses `glass-card` (translucent background with blur).

**Why it matters**: Reduces readability. Looks like a generic "modern UI" pattern, not a clean salon aesthetic. Competes with the content for attention.

**Fix**: Use solid `bg-white` with `shadow-xl` for depth. Matches other cards on the site.

**Command**: `/distill AmeliaBookingForm — remove glassmorphism, use solid white backgrounds`

---

## Persona Red Flags

### Alex (Power User — Knows exactly what she wants)
**Scenario**: "I need a Silk Press next Tuesday."

**Red flags found**:
1. **No search** — Must scroll through all services or guess which category
2. **No keyboard navigation** — Can't Tab through calendar dates
3. **Forced 4-step flow** — Can't jump directly to calendar if she knows the service
4. **No recent bookings** — Doesn't suggest "Rebook your last service?"

**Abandonment risk**: **HIGH** — Power users will bail if they can't move fast.

---

### Jordan (First-Timer — Nervous about booking)
**Scenario**: "I've never been to Abby's salon. I want to see what she offers."

**Red flags found**:
1. **Category tabs unclear** — "What category is 'Silk Press' under?"
2. **No service descriptions visible** — Must click into each service to see details
3. **Price anxiety** — Prices shown prominently but no context ("From $90" is vague)
4. **Cold forest green colors** — Doesn't feel welcoming or trustworthy
5. **No "Why book with Abby?"** — No trust signals, reviews, or salon photos

**Abandonment risk**: **MODERATE** — The photo upload step is reassuring, but the cold aesthetic is off-putting.

---

## Minor Observations

1. **Typography inconsistency**: Uses `font-playfair` and `font-source` which may not match site fonts
2. **Calendar legend uses generic colors**: emerald/amber/orange/rose instead of terracotta palette
3. **"Need help?" email**: `support@reebooking.com` — generic, not personalized to Abby
4. **Step sidebar too busy on mobile**: Horizontal scroll with 4 items is cramped
5. **Missing skip-to-content**: No accessibility link for keyboard users

---

## Questions to Consider

1. **Does the 4-step sidebar need to be visible constantly?** Could it collapse or become a simple "Step 2 of 4" text on mobile to reduce visual noise?

2. **What if the primary action (Add to Cart) felt more celebratory?** A Caribbean salon booking should feel exciting, not like e-commerce checkout.

3. **Could we show Abby's availability more visually?** Instead of a generic calendar, what if it felt like peeking at her actual appointment book?

4. **Does this need to feel this complex?** Could we simplify to 2 steps: "Pick Service + Time" and "Confirm Details"?

---

## Recommended Actions

**Priority order based on impact:**

1. **`/colorize AmeliaBookingForm`** — **Critical**: Replace forest greens with terracotta, fix theme variables causing dark backgrounds

2. **`/shape ServiceSelection`** — **High**: Add search input with real-time filtering

3. **`/shape AmeliaBookingForm`** — **High**: Add inline validation and field-level error messages

4. **`/distill AmeliaBookingForm`** — **Medium**: Remove glassmorphism, use solid white backgrounds

5. **`/polish AmeliaBookingForm`** — **Final**: Typography consistency, calendar legend colors, copy polish

---

*Generated by Cascade /critique skill*  
*Next step: Run recommended commands to address issues, then re-run `/critique` to verify improvements*
