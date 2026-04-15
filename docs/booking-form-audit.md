# Booking Form Audit Report

**Component**: `AmeliaBookingForm` + `BookingSection`  
**Date**: April 15, 2026  
**Auditor**: Cascade

---

## Executive Summary

| Metric | Score | Notes |
|--------|-------|-------|
| **Visual Consistency** | 2/5 | Forest green colors clash with warm terracotta theme |
| **UX/Usability** | 2/5 | No search, long scroll, filter tabs styling inconsistent |
| **Error Handling** | 2/5 | Basic alerts, no inline validation, poor error UX |
| **Performance** | 3/5 | Suspense fallback, but no virtualization for long lists |
| **Overall** | **9/20** | **Needs significant work — recommend fixing current component** |

**Verdict**: ✅ **Fix the current component** — structure is solid, needs color alignment + search + better errors

---

## Critical Issues (P1)

### 1. Color Scheme Inconsistency

**Problem**: The booking form uses `forest-*` and shadcn `primary` colors while the rest of the site uses warm terracotta.

**Locations**:
- `AmeliaBookingForm.tsx:51` — `bg-forest-800 text-cream-50` (sidebar)
- `AmeliaBookingForm.tsx:65` — `bg-forest-500 border-forest-500` (step indicators)
- `AmeliaBookingForm.tsx:379` — `bg-forest-800 hover:bg-forest-700` (Next button)
- `AmeliaBookingForm.tsx:387` — `bg-forest-600 hover:bg-forest-500` (Add to Cart button)
- `ServiceSelection.tsx:109` — `bg-primary text-primary-foreground` (category tabs)
- `ServiceSelection.tsx:140` — `bg-gradient-to-r from-primary/5 to-muted/5` (service cards)
- `ServiceSelection.tsx:147` — `bg-primary text-primary-foreground` (selected icon)

**Impact**: Jarring visual break, looks like a different website embedded in the landing page.

**Fix**: Map all forest colors to terracotta equivalents:
```
forest-800 → terracotta-800
forest-600 → terracotta-600
forest-500 → terracotta-500
forest-400 → warm-400
forest-200 → warm-200
cream-50 → warm-50
primary → terracotta-600
```

---

### 2. No Search Functionality

**Problem**: With many services, users must scroll through a long list (`max-h-[55vh]`) or click category tabs. No way to quickly find a specific service.

**Location**: `ServiceSelection.tsx:40-57` — Only category filter, no text search

**Impact**: Poor UX for users who know what they want — forces unnecessary scrolling.

**Fix**: Add a search input above category tabs:
```tsx
const [searchQuery, setSearchQuery] = useState("")
const filtered = useMemo(() => {
  let result = activeCategory === ALL_TAB ? services : services.filter(...)
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    result = result.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description?.toLowerCase().includes(q)
    )
  }
  return result
}, [services, activeCategory, searchQuery])
```

---

### 3. Poor Error Handling UX

**Problem**: Errors appear as red Alert banners at the bottom of the step content. No inline validation, no field-level errors, no retry mechanisms.

**Locations**:
- `AmeliaBookingForm.tsx:344-349` — Generic `stepError` Alert
- `AmeliaBookingForm.tsx:162-168` — `handleNext()` just sets error message
- No error handling for:
  - API failures (services not loading)
  - Cart add failures
  - Photo upload failures
  - Network timeouts

**Impact**: Users don't know which field is wrong, can't recover from errors gracefully.

**Fix**:
- Add inline validation (red border on invalid fields)
- Move errors next to relevant fields
- Add retry buttons for API failures
- Use toast for non-blocking errors

---

## Moderate Issues (P2)

### 4. Long Scroll Without Virtualization

**Problem**: Service list renders all items even with 50+ services. Uses `max-h-[55vh]` with overflow, but all DOM nodes still rendered.

**Location**: `AmeliaBookingForm.tsx:191` — `overflow-y-auto max-h-[55vh]`

**Fix**: 
- **Short term**: Add search (see #2) to reduce need for scrolling
- **Long term**: Implement virtualized list with `react-window` or similar if service count > 30

---

### 5. Filter Tabs Styling Inconsistent

**Problem**: Category filter tabs use `bg-primary` (blue) instead of terracotta. Count badges have inconsistent backgrounds.

**Location**: `ServiceSelection.tsx:104-122`

**Current**:
```tsx
isActive
  ? "bg-primary text-primary-foreground border-primary"
  : "bg-card text-muted-foreground border-border"
```

**Fix**:
```tsx
isActive
  ? "bg-terracotta-600 text-white border-terracotta-600"
  : "bg-warm-100 text-warm-600 border-warm-200 hover:border-terracotta-400"
```

---

### 6. Missing Loading States

**Problem**: Time slots show empty state while loading instead of skeleton. Services show skeleton but it's basic.

**Locations**:
- `AmeliaBookingForm.tsx:246-249` — "Click a date on the calendar" appears while loading
- `ServiceSelection.tsx:76-91` — Skeleton exists but very basic

**Fix**: Add proper skeleton for time slots panel.

---

### 7. Dark Mode Theme Variables

**Problem**: Uses `bg-card`, `text-muted-foreground`, `border-border` which resolve to dark colors in dark mode (as seen in your screenshots).

**Locations**:
- `ServiceSelection.tsx:109` — `bg-card text-muted-foreground`
- `AmeliaBookingForm.tsx:240` — `bg-muted/30 border-border`
- `AmeliaBookingForm.tsx:283` — `border-border`

**Fix**: Use explicit warm colors instead of theme variables.

---

## Minor Issues (P3)

### 8. Glass-card Effect

**Problem**: Main container uses `glass-card` class which creates a translucent background.

**Location**: `AmeliaBookingForm.tsx:334` — `glass-card rounded-lg`

**Fix**: Use `bg-white shadow-xl` for cleaner look that matches other cards.

---

### 9. Typography Inconsistency

**Problem**: Uses `font-playfair`, `font-source` which may not be the site's main fonts.

**Location**: `ServiceSelection.tsx:151` — `font-playfair`, `ServiceSelection.tsx:175` — `font-source`

**Fix**: Use site's standard `font-serif` and `font-sans` classes.

---

### 10. Calendar Legend Colors

**Problem**: Status dots use generic emerald/amber/orange/rose instead of terracotta palette.

**Location**: `AmeliaBookingForm.tsx:225-234`

**Fix**: Map to terracotta equivalents:
```
available → terracotta-500
filling-up → warm-400
almost-full → terracotta-600
full → warm-300
```

---

## Recommended Actions

### Option A: Fix Current Component (Recommended)

**Time estimate**: 2-3 hours  
**Effort**: Medium  
**Result**: Consistent, functional booking form

**Steps**:
1. **Color alignment** (45 min): Replace all forest/primary with terracotta/warm
2. **Add search** (30 min): Add search input to ServiceSelection
3. **Error handling** (45 min): Inline validation, better error UX, retry buttons
4. **Fix dark mode** (30 min): Replace theme variables with explicit warm colors
5. **Polish** (30 min): Fix typography, calendar legend, glass-card

**Commands to run**:
```bash
# Phase 1: Color alignment
/shape booking form - align colors with warm terracotta theme

# Phase 2: Add search functionality
/shape service selection - add text search input with category filter

# Phase 3: Error handling improvements
/shape booking form errors - inline validation and better UX

# Phase 4: Polish
/polish booking form before final review
```

---

### Option B: Create New Component

**Time estimate**: 6-8 hours  
**Effort**: High  
**Result**: Fresh start, but may introduce new bugs

**When to choose**: Only if current component has fundamental architectural issues (it doesn't).

**Not recommended** because:
- Current component has working state management (useZapBookingForm)
- Cart integration already built
- Photo upload already functional
- Step wizard logic is solid

---

## My Recommendation

**Fix the current component.** The structure is solid — it's purely presentation layer issues (colors, search, error UX). Creating a new component would be unnecessary rework.

### Priority Order:

1. **P1: Color scheme** — This is the most visible issue making it look broken
2. **P1: Add search** — Critical UX improvement for service selection
3. **P1: Error handling** — Professional polish, prevents user frustration
4. **P2: Dark mode fixes** — Prevent dark cards in light mode
5. **P3: Polish** — Typography, calendar legend, glass-card

---

## Quick Fixes You Can Do Now

### 1. Fix ServiceSelection colors (5 minutes)

```tsx
// ServiceSelection.tsx:109
isActive
  ? "bg-terracotta-600 text-white border-terracotta-600"
  : "bg-white text-warm-600 border-warm-200 hover:border-terracotta-400"

// ServiceSelection.tsx:140
className={`... ${isSelected
  ? "border-terracotta-600 bg-terracotta-50"
  : "border-warm-200 hover:border-terracotta-400"
} ...`}

// ServiceSelection.tsx:147
<div className={`... ${isSelected ? "bg-terracotta-600 text-white" : "bg-terracotta-100 text-terracotta-600"} ...`}>
```

### 2. Add search input to ServiceSelection (15 minutes)

```tsx
// Add to ServiceSelection component
const [searchQuery, setSearchQuery] = useState("")

// Update filtered useMemo
const filtered = useMemo(() => {
  let result = activeCategory === ALL_TAB ? services : services.filter(...)
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    result = result.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description?.toLowerCase().includes(q)
    )
  }
  return result
}, [services, activeCategory, categories, searchQuery])

// Add input above category tabs
<input
  type="text"
  placeholder="Search services..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full px-4 py-2 mb-4 border border-warm-200 rounded-lg bg-white text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-terracotta-400"
/>
```

---

## Success Criteria

After fixes, verify:
- [ ] All forest colors replaced with terracotta/warm
- [ ] Search input filters services in real-time
- [ ] No theme variables (`bg-card`, `text-muted-foreground`) remain
- [ ] Errors show inline with field highlighting
- [ ] Light mode is consistent with rest of site
- [ ] Category tabs use terracotta active state

---

## Files to Modify

1. `components/SimpleBookingForm/AmeliaBookingForm.tsx` — Main form colors, calendar legend
2. `components/SimpleBookingForm/ServiceSelection.tsx` — Search input, filter tabs, service cards
3. `components/SimpleBookingForm/TimeSelection.tsx` — (if exists) Time slot colors
4. `components/sections/BookingSection.tsx` — Container styling (optional)

---

*Generated by Cascade*  
*Recommendation: Fix current component, don't rebuild*
