# Secondary Prompt — CRUD Interaction Patterns & UI Feedback System

> **Extends:** `dashboard-agent-master-prompt.md`
> **Works with:** `parallel-prompt--data-layer.md` (for Zod schemas and API contracts), `secondary-prompt--theming.md` (for motion tokens and semantic color)
> **Scope:** Every interaction a user has with data — triggering actions, filling forms, receiving validation, submitting, and getting feedback on the outcome.
> Always load the Master Prompt first. This prompt adds the interaction layer on top.

---

## What This Prompt Covers

The gap between "the data model exists" and "the dashboard feels finished" is almost entirely made up of interaction patterns. This prompt defines every one of them:

- How actions are triggered (buttons, dropdowns, context menus, inline controls)
- How forms open (page navigation, modal, sheet, inline)
- How validation is shown (field-level, form-level, server-side errors)
- How submission states are communicated (loading, optimistic, success, failure)
- How the user is returned to context after an action completes
- How destructive actions are protected
- How feedback persists long enough to be seen (toasts, banners, inline states)

These patterns apply to every entity in the system. They are defined once here and applied consistently everywhere.

---

## The Interaction Lifecycle

Every data interaction in the dashboard follows this lifecycle. Understanding it end-to-end prevents gaps in any single step.

```
1. TRIGGER        → User sees an affordance and decides to act
2. ENTRY POINT    → System opens the right interface for the action
3. FORM STATE     → User fills in data; client-side validation guides them
4. SUBMISSION     → User commits; system enters loading state
5. SERVER         → Data layer validates, processes, responds
6. OUTCOME        → System communicates success or failure clearly
7. RETURN         → User is placed back in the right context
8. PERSISTENCE    → The outcome is visible long enough to register
```

Every CRUD operation — create, read/detail, update, delete, status change — maps to this lifecycle. This prompt defines each step for each operation.

---

## Part 1 — Triggers & Entry Points

### 1.1 — The Trigger Hierarchy

Every entity list view must have triggers at three levels. Never flatten all actions into a single button or hide them all in a menu.

```
Level 1 — Page-level trigger (always visible)
  → "New [Entity]" button in the page header, top-right
  → Primary button style, with a + icon
  → Shortcut: accessible via keyboard shortcut if volume warrants it

Level 2 — Row-level trigger (visible on hover or always for key actions)
  → Primary row action: a direct button (e.g., "Edit") shown on hover
  → Secondary row actions: collapsed into a "..." (ellipsis) DropdownMenu
  → Destructive actions: always in the "..." menu, never a top-level row button

Level 3 — Inline trigger (for quick single-field changes)
  → Status badge click → status change popover
  → Editable cell click → inline input appears
  → Toggle switch for boolean fields (isActive, isPublished)
```

### 1.2 — The Ellipsis Menu Contract

Every data table row must have a `...` menu. Its contents follow this order — always:

```
1. View details         (navigate to detail page)
2. Edit                 (open edit form)
3. Duplicate            (if applicable to the entity)
4. ─── divider ───
5. [Domain actions]     (approve, confirm, archive, publish — entity-specific)
6. ─── divider ───
7. Delete               (destructive — always last, always red)
```

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
      <MoreHorizontal size={16} />
      <span className="sr-only">Actions for {row.name}</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onSelect={() => router.push(`/${entity}/${row.id}`)}>
      View details
    </DropdownMenuItem>
    <DropdownMenuItem onSelect={() => openEditSheet(row.id)}>
      Edit
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem
      onSelect={() => openDeleteDialog(row.id)}
      className="text-destructive focus:text-destructive"
    >
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 1.3 — Entry Point Selection

Not every action needs its own page. Match the entry point to the complexity of the action:

| Action complexity | Entry point | When to use |
|---|---|---|
| Single field change | Inline edit or Popover | Status change, rename, toggle |
| Simple form (< 6 fields) | Sheet (slide-in panel) | Quick create, quick edit |
| Standard form (6–15 fields) | Dedicated page | Create/edit for primary entities |
| Complex form (15+ fields, multi-step) | Dedicated page with stepper | Onboarding, configuration wizards |
| Confirmation only | Alert Dialog | Delete, irreversible status change |
| Information only | Toast or inline banner | Success, warning, informational |

**Rule:** Never use a full-page navigation for something that can be done in a Sheet. Never use a Sheet for something complex enough that the user needs to reference other parts of the dashboard.

---

## Part 2 — Form Patterns

### 2.1 — Form Architecture

All forms use **React Hook Form + Zod resolver** in Next.js, or **Inertia `useForm()` + Laravel Form Request** in Laravel. Never manage form state with `useState`.

```tsx
// Next.js pattern — every form follows this structure
const form = useForm<CreateBookingInput>({
  resolver: zodResolver(createBookingSchema),
  defaultValues: {
    userId:   '',
    startsAt: undefined,
    endsAt:   undefined,
  },
});

// Laravel / Inertia pattern — equivalent
const form = useForm({
  userId:   '',
  starts_at: '',
  ends_at:   '',
});
// Validation errors returned from Laravel Form Request
// land automatically in form.errors.userId, form.errors.starts_at, etc.
```

### 2.2 — Field Validation Rules

**When validation fires:**
- `onBlur` for most fields — validate when the user leaves the field, not while typing
- `onChange` only after the first failed submission — once a user has seen an error, fix it in real time
- Never `onSubmit`-only — the user should not have to submit to discover their first error

**How errors are displayed:**
- Error message appears directly below the field it belongs to
- Field border changes to `--color-danger` (semantic color from theming system)
- No modal, no toast for field-level errors — they live with the field
- Error text: `text-sm text-destructive` — readable but not alarming

```tsx
// Standard field with error pattern
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email address</FormLabel>
      <FormControl>
        <Input
          {...field}
          type="email"
          placeholder="user@company.com"
          aria-describedby="email-error"
          aria-invalid={!!form.formState.errors.email}
        />
      </FormControl>
      <FormMessage id="email-error" /> {/* renders error or nothing */}
    </FormItem>
  )}
/>
```

### 2.3 — Server-Side Validation Errors

Server errors that come back after submission must map to the correct fields — not just appear as a generic banner.

```tsx
// Next.js — Server Action returns field errors
const result = await createBooking(data);

if (!result.success) {
  if (result.fieldErrors) {
    // Map server errors back to form fields
    Object.entries(result.fieldErrors).forEach(([field, messages]) => {
      form.setError(field as keyof CreateBookingInput, {
        type: 'server',
        message: messages[0],
      });
    });
  } else {
    // Non-field error — show as form-level message
    form.setError('root', { message: result.error });
  }
  return;
}
```

```tsx
// Inertia — errors land automatically in form.errors
// Display them the same way as client-side errors
{form.errors.starts_at && (
  <p className="text-sm text-destructive mt-1">{form.errors.starts_at}</p>
)}
```

**Form-level errors** (errors not belonging to a specific field) appear in a banner at the top of the form:

```tsx
{form.formState.errors.root && (
  <Alert variant="destructive">
    <AlertCircle size={16} />
    <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
  </Alert>
)}
```

### 2.4 — Required vs Optional Fields

- Required fields: label has no additional marker — the form itself implies required
- Optional fields: label has `(optional)` appended in muted text — `text-muted-foreground text-sm`
- Never use `*` asterisks — they have no clear meaning to non-technical users

### 2.5 — Dependent / Conditional Fields

Fields that depend on another field's value must appear and disappear smoothly:

```tsx
// Field appears only when a condition is met
{form.watch('status') === 'cancelled' && (
  <FormField
    control={form.control}
    name="cancelReason"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Cancellation reason <span className="text-muted-foreground text-sm">(optional)</span></FormLabel>
        <FormControl>
          <Textarea {...field} placeholder="Reason for cancellation..." />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)}
```

Animate with Framer Motion `AnimatePresence` if the design prompt's motion budget allows it (Landing/Portal zones yes, Dashboard/Admin zones use simple `hidden`/`block`).

---

## Part 3 — Submission States

### 3.1 — The Four Submission States

Every form button and every action trigger must communicate which of these four states it is in:

```
IDLE       → Default. Action is available. Button shows label + optional icon.
LOADING    → Action in flight. Button shows spinner, label grays, is disabled.
SUCCESS    → Action completed. Brief visual confirmation before return.
ERROR      → Action failed. Button returns to IDLE. Error is shown (see Part 2).
```

```tsx
<Button
  type="submit"
  disabled={form.formState.isSubmitting}
>
  {form.formState.isSubmitting ? (
    <>
      <Loader2 size={16} className="animate-spin mr-2" />
      Saving...
    </>
  ) : (
    'Save booking'
  )}
</Button>
```

**Rules:**
- The button must be disabled during loading — never allow double-submission
- The label must change during loading — spinner alone is not enough for accessibility
- Never use a full-page loading state for a form submission — the button itself communicates loading
- The cancel/secondary button must remain enabled during loading so the user can abort

### 3.2 — Optimistic Updates

For actions where the outcome is highly predictable (status toggles, boolean flips, soft deletes), apply the update to the UI immediately and roll back if the server returns an error.

```tsx
// React Query optimistic update pattern
const mutation = useMutation({
  mutationFn: (id: string) => cancelBooking(id),
  onMutate: async (id) => {
    // Cancel any outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['bookings'] });

    // Snapshot the previous value
    const previous = queryClient.getQueryData(['bookings']);

    // Optimistically update
    queryClient.setQueryData(['bookings'], (old: Booking[]) =>
      old.map(b => b.id === id ? { ...b, status: 'cancelled' } : b)
    );

    return { previous };
  },
  onError: (err, id, context) => {
    // Roll back
    queryClient.setQueryData(['bookings'], context?.previous);
    toast.error('Failed to cancel booking. Please try again.');
  },
  onSettled: () => {
    // Always refetch after mutation settles
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
  },
});
```

**Use optimistic updates for:** status badge changes, toggles, inline edits, drag-and-drop reordering.
**Do not use for:** creates, deletes, or anything with meaningful failure modes that the user needs to see.

---

## Part 4 — Outcome Feedback

### 4.1 — Toast Notifications

Toasts are the primary outcome feedback mechanism. Use `sonner` (ships with shadcn). Every action that mutates data must fire a toast on completion.

```tsx
// Success
toast.success('Booking created', {
  description: `${booking.user.name} — ${format(booking.startsAt, 'MMM d, h:mm a')}`,
});

// Error
toast.error('Failed to create booking', {
  description: error.message ?? 'Something went wrong. Please try again.',
  action: {
    label: 'Retry',
    onClick: () => handleSubmit(),
  },
});

// Warning (non-blocking)
toast.warning('Booking saved with conflicts', {
  description: 'Another booking overlaps this time slot.',
});

// Info (background action completed)
toast.info('Export ready', {
  description: 'Your CSV is ready to download.',
  action: {
    label: 'Download',
    onClick: () => downloadExport(),
  },
});
```

**Toast rules:**
- Success toasts: 4 seconds duration
- Error toasts: 8 seconds duration (user needs time to read and act)
- Include a description when the title alone is ambiguous
- Include an action button when there is a single obvious next step
- Never stack more than 3 toasts at once — queue them

### 4.2 — Inline Feedback for Empty States

When a list is empty, the empty state is not just decorative — it is an action prompt:

```tsx
<EmptyState
  icon={<CalendarOff size={48} className="text-muted-foreground" />}
  title="No bookings yet"
  description="Create your first booking to get started."
  action={
    <Button onClick={() => router.push('/bookings/new')}>
      <Plus size={16} className="mr-2" />
      Create booking
    </Button>
  }
/>
```

**Empty state rules:**
- Always include an action that resolves the empty state
- Different empty states for "no data exists" vs "no results match your filter"
  - No data: "No bookings yet. Create one →"
  - No results: "No bookings match your filters. Clear filters →"

### 4.3 — Inline Status Indicators

For data that is loading, stale, or in an error state within a component (not a full page):

```tsx
// Loading skeleton — matches the shape of the real content
<Skeleton className="h-10 w-full" />         // input-shaped
<Skeleton className="h-4 w-32" />            // label-shaped
<Skeleton className="h-24 w-full" />         // card-shaped

// Error state within a component
<div className="flex items-center gap-2 text-destructive text-sm">
  <AlertCircle size={14} />
  <span>Failed to load bookings. <button onClick={retry} className="underline">Retry</button></span>
</div>

// Stale data indicator (when data is being refreshed in background)
<RefreshCw size={14} className="animate-spin text-muted-foreground" />
```

---

## Part 5 — Navigation Flow After Actions

### 5.1 — The Return Map

After every action, the user must land somewhere meaningful. Define this per-action, per-entity:

| Action | Entry point | On success → navigate to | On cancel → navigate to |
|---|---|---|---|
| Create (new entity) | Full page | Detail page of new entity | List page |
| Create (sheet) | Sheet (slide-in) | Close sheet, stay on list | Close sheet, stay on list |
| Edit (full page) | Full page | Detail page | Detail page (no change) |
| Edit (sheet) | Sheet | Close sheet, stay on current page | Close sheet, stay on current page |
| Delete | Confirm dialog | List page (entity is gone) | Stay on current page |
| Status change (inline) | Popover | Stay in place (optimistic) | Stay in place |
| Bulk action | Toolbar | Stay on list, clear selection | Stay on list, clear selection |

**Rules:**
- Never return the user to a page that no longer makes sense (e.g., the detail page of a deleted entity)
- After a successful Sheet form submission, close the Sheet and show a toast — do not navigate
- After a successful full-page create, navigate to the detail page of the new record — not back to the list
- The browser back button must always work predictably — never break the history stack with unnecessary `replace()`

### 5.2 — Breadcrumbs & Context Preservation

When navigating deep into an entity hierarchy, breadcrumbs must be present and accurate:

```
Dashboard > Bookings > Booking #1284 > Edit
```

The breadcrumb at "Bookings" is a live link back. "Edit" is the current page — not a link.

When the user returns from a create/edit flow, preserve any filters or pagination state they had on the list page. Use URL search params to store filter state, not local component state.

```
/bookings?status=confirmed&page=2
→ user edits a booking
→ user returns to /bookings?status=confirmed&page=2  (not /bookings)
```

---

## Part 6 — Destructive Action Patterns

### 6.1 — Confirm Dialog

All destructive actions (delete, bulk delete, irreversible status changes) require a confirmation dialog before executing.

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <DropdownMenuItem
      onSelect={(e) => e.preventDefault()} // prevent menu close before dialog opens
      className="text-destructive"
    >
      Delete booking
    </DropdownMenuItem>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete the booking for {booking.user.name} on{' '}
        {format(booking.startsAt, 'MMMM d, yyyy')}. This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleDelete}
        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
      >
        {isDeleting ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
        Delete booking
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

**Confirm dialog rules:**
- Title: states exactly what will happen — "Delete this booking?" not "Are you sure?"
- Description: names the specific record being affected and states the consequence
- Confirm button: uses the destructive action word ("Delete", "Cancel booking", "Remove") — never "OK" or "Yes"
- Confirm button: uses destructive color variant
- Cancel button: always the left/first button — the safe default
- If the action requires typing to confirm (for high-consequence deletes): add a text input that must match the entity name

### 6.2 — High-Consequence Delete (Typing Confirmation)

For deletes with significant downstream consequences (deleting an organization, deleting all data, irreversible bulk operations):

```tsx
// User must type the entity name to confirm
const [confirmText, setConfirmText] = useState('');
const isConfirmed = confirmText === organization.name;

<div className="space-y-2">
  <p className="text-sm text-muted-foreground">
    Type <strong>{organization.name}</strong> to confirm deletion.
  </p>
  <Input
    value={confirmText}
    onChange={(e) => setConfirmText(e.target.value)}
    placeholder={organization.name}
  />
</div>
<AlertDialogAction disabled={!isConfirmed} onClick={handleDelete}>
  Delete organization
</AlertDialogAction>
```

---

## Part 7 — Inline Interactions

### 7.1 — Status Badge Click

A status badge in a table is a shortcut to the most common status transitions. Clicking it opens a popover with the allowed next states.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Badge
      variant="outline"
      className="cursor-pointer hover:ring-1 hover:ring-border transition-shadow"
      style={{ color: STATUS_COLORS[booking.status] }}
    >
      {BOOKING_STATUS_LABELS[booking.status]}
      <ChevronDown size={12} className="ml-1" />
    </Badge>
  </PopoverTrigger>
  <PopoverContent className="w-48 p-1">
    <p className="text-xs text-muted-foreground px-2 py-1">Change status to</p>
    {ALLOWED_TRANSITIONS[booking.status].map(nextStatus => (
      <button
        key={nextStatus}
        onClick={() => updateStatus(booking.id, nextStatus)}
        className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted"
      >
        {BOOKING_STATUS_LABELS[nextStatus]}
      </button>
    ))}
  </PopoverContent>
</Popover>
```

The `ALLOWED_TRANSITIONS` map comes directly from the status machine defined in the Data Layer prompt.

### 7.2 — Inline Cell Editing

For fields that are commonly updated without opening a full form (name, title, price):

```tsx
function EditableCell({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-left hover:underline decoration-dashed underline-offset-2
                   hover:text-foreground transition-colors"
      >
        {value}
      </button>
    );
  }

  return (
    <input
      autoFocus
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => { onSave(draft); setEditing(false); }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') { onSave(draft); setEditing(false); }
        if (e.key === 'Escape') { setDraft(value); setEditing(false); }
      }}
      className="border-b border-foreground bg-transparent outline-none w-full"
    />
  );
}
```

### 7.3 — Row Hover Reveal

Action controls in a table row appear on hover, not always:

```tsx
<TableRow className="group">
  <TableCell>{booking.user.name}</TableCell>
  <TableCell>{format(booking.startsAt, 'MMM d, h:mm a')}</TableCell>
  <TableCell>
    <StatusBadge status={booking.status} />
  </TableCell>
  <TableCell>
    {/* Always visible — primary quick action */}
    <Button
      variant="ghost"
      size="sm"
      className="opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={() => openEditSheet(booking.id)}
    >
      Edit
    </Button>
    {/* Ellipsis menu */}
    <RowActionsMenu booking={booking} />
  </TableCell>
</TableRow>
```

---

## Part 8 — Bulk Actions

When multiple rows are selected, a bulk action toolbar appears above the table.

```tsx
{selectedRows.length > 0 && (
  <div className="flex items-center gap-3 p-3 bg-muted border rounded-md mb-2
                  animate-in slide-in-from-top-1 duration-200">
    <span className="text-sm font-medium">
      {selectedRows.length} selected
    </span>
    <div className="flex items-center gap-2 ml-auto">
      <Button variant="outline" size="sm" onClick={handleBulkExport}>
        Export
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleBulkStatusChange}
      >
        Change status
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setDeleteDialogOpen(true)}
      >
        Delete ({selectedRows.length})
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => table.resetRowSelection()}
      >
        <X size={14} />
      </Button>
    </div>
  </div>
)}
```

**Bulk delete** requires the same confirmation dialog as single delete, with the count stated clearly: "Delete 12 bookings? This cannot be undone."

---

## Part 9 — Laravel + Inertia Equivalents

All of the above patterns have direct equivalents in a Laravel 12 + Inertia stack. The interaction model is identical — only the implementation differs.

| Next.js pattern | Laravel + Inertia equivalent |
|---|---|
| Server Action + `useActionState` | `useForm()` from `@inertiajs/react` + controller POST |
| `form.setError('field', ...)` | Errors from Laravel Form Request land in `form.errors.field` automatically |
| `toast.success()` after mutation | Flash message via `session()->flash()` in controller, read from Inertia shared data |
| `router.push('/bookings/new')` | `router.visit('/bookings/create')` from `@inertiajs/react` |
| `router.replace()` after delete | `router.visit('/bookings', { replace: true })` |
| React Query `invalidateQueries` | `router.reload({ only: ['bookings'] })` — partial reload |
| Optimistic update + rollback | Inertia handles this via `form.transform()` + error handling |
| `AlertDialog` for confirm | Same component — shadcn works unchanged in Inertia |
| URL search params for filter state | Same — use `router.get()` with `preserveState: true` to maintain filter state |

**Flash message pattern in Inertia:**

```php
// Controller — after successful action
return redirect()->route('bookings.index')
    ->with('success', 'Booking created successfully.');
```

```ts
// HandleInertiaRequests.php — share flash globally
'flash' => [
    'success' => fn () => $request->session()->get('success'),
    'error'   => fn () => $request->session()->get('error'),
],
```

```tsx
// React component — read shared flash and fire toast
const { flash } = usePage<SharedProps>().props;

useEffect(() => {
  if (flash.success) toast.success(flash.success);
  if (flash.error)   toast.error(flash.error);
}, [flash]);
```

---

## Interaction Pattern Checklist

After building any entity's CRUD implementation, verify every item before marking it complete:

**Triggers**
- [ ] Page-level "New [Entity]" button present in page header
- [ ] Every table row has a `...` menu with Edit and Delete as minimum options
- [ ] `...` menu items are in the correct order (view → edit → domain actions → delete)
- [ ] Delete is always last and always styled destructive

**Forms**
- [ ] Form uses React Hook Form + Zod / Inertia `useForm()` — no raw `useState`
- [ ] Validation fires on `onBlur`, not `onSubmit` only
- [ ] Field errors appear below the field, not in a toast or modal
- [ ] Server-side validation errors map to specific fields where possible
- [ ] Form-level errors (non-field) show as a banner above the submit button
- [ ] Optional fields are labeled `(optional)` — no asterisks
- [ ] Conditional fields appear/disappear based on related field values

**Submission**
- [ ] Submit button shows spinner + "Saving..." during loading
- [ ] Submit button is disabled during loading — no double-submission possible
- [ ] Cancel button remains enabled during loading
- [ ] Optimistic updates applied for predictable single-field mutations

**Outcome Feedback**
- [ ] Success toast fires after every successful mutation
- [ ] Error toast fires when a non-field error occurs
- [ ] Toast includes a meaningful description, not just "Success"
- [ ] Empty states include an action button that resolves the empty state
- [ ] No-results-from-filter empty state is distinct from no-data empty state

**Navigation**
- [ ] After sheet-based create/edit: sheet closes, user stays on current page
- [ ] After page-based create: user navigates to the new entity's detail page
- [ ] After delete: user navigates to the list page (not a broken detail page)
- [ ] Filter/pagination state is preserved in URL params and survives navigation
- [ ] Breadcrumbs are accurate and all but the last item are live links

**Destructive Actions**
- [ ] Delete always requires a confirmation dialog
- [ ] Confirmation dialog names the specific record being deleted
- [ ] Confirmation button uses the action verb, not "OK" or "Yes"
- [ ] High-consequence deletes require typing the entity name to confirm
- [ ] Bulk delete states the count in the confirmation dialog

**Inline Interactions**
- [ ] Status badges are clickable and show allowed transitions only
- [ ] Row action buttons are visible on hover via `group-hover`
- [ ] Inline editable cells commit on Enter/blur and cancel on Escape
- [ ] Bulk action toolbar appears when rows are selected and disappears when deselected
