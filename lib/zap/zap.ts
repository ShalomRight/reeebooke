/**
 * Supabook Schedule Builder
 *
 * A TypeScript fluent builder that mirrors the Laravel Zap API surface.
 * Works against the /api/schedules Next.js routes.
 *
 * Usage:
 *   import { zap } from "@/lib/zap";
 *
 *   await zap.for(doctor)
 *     .named("Office Hours")
 *     .availability()
 *     .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
 *     .forYear(2026)
 *     .addPeriod("09:00", "12:00")
 *     .addPeriod("14:00", "17:00")
 *     .save();
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ScheduleType = "availability" | "appointment" | "blocked" | "custom";

export type Frequency =
  | "daily"
  | "weekly"
  | "weekly_odd"
  | "weekly_even"
  | "biweekly"
  | "monthly"
  | "bimonthly"
  | "quarterly"
  | "semiannually"
  | "annually"
  | "monthly_ordinal_weekday"
  | `every${string}Weeks`
  | `every${string}Months`;

export type DayName =
  | "monday" | "tuesday" | "wednesday" | "thursday"
  | "friday" | "saturday" | "sunday";

export type OrdinalPosition = "first" | "second" | "third" | "fourth" | "last";

export interface TimePeriod {
  start_time: string;
  end_time: string;
}

export interface Resource {
  resourceType: string;
  resourceId: number | string;
}

export interface SchedulePayload {
  name: string;
  type: ScheduleType;
  periods: TimePeriod[];
  start_date?: string;
  end_date?: string;
  frequency?: Frequency;
  frequency_data?: Record<string, unknown>;
  active: boolean;
  allow_overlap?: boolean;
  no_weekends?: boolean;
  max_duration_minutes?: number;
  working_hours_start?: string;
  working_hours_end?: string;
  metadata?: Record<string, unknown>;
}

export interface Schedule extends SchedulePayload {
  id: number;
  resource_type: string;
  resource_id: number | string;
  total_duration_minutes?: number;
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
  buffer_minutes: number;
}

export interface NextSlot extends TimeSlot {
  date: string;
}

export interface ConflictResult {
  has_conflicts: boolean;
  conflicts: Schedule[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ordinalToWords(n: number): string {
  const map: Record<number, string> = {
    3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight",
    9: "Nine", 10: "Ten", 11: "Eleven", 12: "Twelve", 13: "Thirteen",
    14: "Fourteen", 15: "Fifteen", 16: "Sixteen", 17: "Seventeen",
    18: "Eighteen", 19: "Nineteen", 20: "Twenty", 21: "TwentyOne",
    22: "TwentyTwo", 23: "TwentyThree", 24: "TwentyFour", 25: "TwentyFive",
    26: "TwentySix", 27: "TwentySeven", 28: "TwentyEight", 29: "TwentyNine",
    30: "Thirty", 31: "ThirtyOne", 32: "ThirtyTwo", 40: "Forty",
    52: "FiftyTwo",
  };
  return map[n] ?? String(n);
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── ScheduleBuilder ─────────────────────────────────────────────────────────

export class ScheduleBuilder {
  private resource: Resource;
  private payload: Partial<SchedulePayload> = { active: true, periods: [] };

  constructor(resource: Resource) {
    this.resource = resource;
  }

  // ── Identity ──────────────────────────────────────────────────────────────

  named(name: string): this {
    this.payload.name = name;
    return this;
  }

  // ── Schedule types ────────────────────────────────────────────────────────

  availability(): this {
    this.payload.type = "availability";
    this.payload.allow_overlap = true;
    return this;
  }

  appointment(): this {
    this.payload.type = "appointment";
    this.payload.allow_overlap = false;
    return this;
  }

  blocked(): this {
    this.payload.type = "blocked";
    this.payload.allow_overlap = false;
    return this;
  }

  custom(): this {
    this.payload.type = "custom";
    return this;
  }

  // ── Date range ────────────────────────────────────────────────────────────

  from(date: string): this {
    this.payload.start_date = date;
    return this;
  }

  /** Alias for from() */
  on(date: string): this {
    return this.from(date);
  }

  to(date: string): this {
    this.payload.end_date = date;
    return this;
  }

  between(start: string, end: string): this {
    return this.from(start).to(end);
  }

  forYear(year: number): this {
    return this.between(`${year}-01-01`, `${year}-12-31`);
  }

  // ── Time periods ──────────────────────────────────────────────────────────

  addPeriod(startTime: string, endTime: string): this {
    this.payload.periods!.push({ start_time: startTime, end_time: endTime });
    return this;
  }

  addPeriods(periods: TimePeriod[]): this {
    this.payload.periods!.push(...periods);
    return this;
  }

  // ── Recurrence — simple ───────────────────────────────────────────────────

  daily(): this {
    this.payload.frequency = "daily";
    return this;
  }

  weekly(days: DayName[]): this {
    this.payload.frequency = "weekly";
    this.payload.frequency_data = { days };
    return this;
  }

  weeklyOdd(days: DayName[]): this {
    this.payload.frequency = "weekly_odd";
    this.payload.frequency_data = { days };
    return this;
  }

  weeklyEven(days: DayName[]): this {
    this.payload.frequency = "weekly_even";
    this.payload.frequency_data = { days };
    return this;
  }

  biweekly(days: DayName[], anchorDate?: string): this {
    this.payload.frequency = "biweekly";
    this.payload.frequency_data = { days, ...(anchorDate ? { anchor_date: anchorDate } : {}) };
    return this;
  }

  monthly(daysOfMonth: number[]): this {
    this.payload.frequency = "monthly";
    this.payload.frequency_data = { days_of_month: daysOfMonth };
    return this;
  }

  bimonthly(daysOfMonth: number[], startMonth?: number): this {
    this.payload.frequency = "bimonthly";
    this.payload.frequency_data = { days_of_month: daysOfMonth, ...(startMonth ? { start_month: startMonth } : {}) };
    return this;
  }

  quarterly(daysOfMonth: number[], startMonth?: number): this {
    this.payload.frequency = "quarterly";
    this.payload.frequency_data = { days_of_month: daysOfMonth, ...(startMonth ? { start_month: startMonth } : {}) };
    return this;
  }

  semiannually(daysOfMonth: number[], startMonth?: number): this {
    this.payload.frequency = "semiannually";
    this.payload.frequency_data = { days_of_month: daysOfMonth, ...(startMonth ? { start_month: startMonth } : {}) };
    return this;
  }

  annually(daysOfMonth: number[], startMonth: number): this {
    this.payload.frequency = "annually";
    this.payload.frequency_data = { days_of_month: daysOfMonth, start_month: startMonth };
    return this;
  }

  // ── Recurrence — convenience ──────────────────────────────────────────────

  /**
   * weekDays(['monday', 'friday'], '09:00', '17:00')
   * Sets weekly recurrence AND adds a period in one call.
   */
  weekDays(days: DayName[], startTime: string, endTime: string): this {
    return this.weekly(days).addPeriod(startTime, endTime);
  }

  weekOddDays(days: DayName[], startTime: string, endTime: string): this {
    return this.weeklyOdd(days).addPeriod(startTime, endTime);
  }

  weekEvenDays(days: DayName[], startTime: string, endTime: string): this {
    return this.weeklyEven(days).addPeriod(startTime, endTime);
  }

  // ── Recurrence — ordinal weekday ──────────────────────────────────────────

  /**
   * ordinalWeekday('first', 'wednesday')
   * Equivalent to Zap's firstWednesdayOfMonth()
   */
  ordinalWeekday(ordinal: OrdinalPosition, day: DayName): this {
    this.payload.frequency = "monthly_ordinal_weekday";
    this.payload.frequency_data = { ordinal, day };
    return this;
  }

  // Zap magic-method equivalents: firstMondayOfMonth(), lastFridayOfMonth(), etc.
  firstMondayOfMonth()    { return this.ordinalWeekday("first",  "monday"); }
  firstTuesdayOfMonth()   { return this.ordinalWeekday("first",  "tuesday"); }
  firstWednesdayOfMonth() { return this.ordinalWeekday("first",  "wednesday"); }
  firstThursdayOfMonth()  { return this.ordinalWeekday("first",  "thursday"); }
  firstFridayOfMonth()    { return this.ordinalWeekday("first",  "friday"); }
  firstSaturdayOfMonth()  { return this.ordinalWeekday("first",  "saturday"); }
  firstSundayOfMonth()    { return this.ordinalWeekday("first",  "sunday"); }

  secondMondayOfMonth()    { return this.ordinalWeekday("second", "monday"); }
  secondTuesdayOfMonth()   { return this.ordinalWeekday("second", "tuesday"); }
  secondWednesdayOfMonth() { return this.ordinalWeekday("second", "wednesday"); }
  secondThursdayOfMonth()  { return this.ordinalWeekday("second", "thursday"); }
  secondFridayOfMonth()    { return this.ordinalWeekday("second", "friday"); }
  secondSaturdayOfMonth()  { return this.ordinalWeekday("second", "saturday"); }
  secondSundayOfMonth()    { return this.ordinalWeekday("second", "sunday"); }

  thirdMondayOfMonth()    { return this.ordinalWeekday("third",  "monday"); }
  thirdTuesdayOfMonth()   { return this.ordinalWeekday("third",  "tuesday"); }
  thirdWednesdayOfMonth() { return this.ordinalWeekday("third",  "wednesday"); }
  thirdThursdayOfMonth()  { return this.ordinalWeekday("third",  "thursday"); }
  thirdFridayOfMonth()    { return this.ordinalWeekday("third",  "friday"); }
  thirdSaturdayOfMonth()  { return this.ordinalWeekday("third",  "saturday"); }
  thirdSundayOfMonth()    { return this.ordinalWeekday("third",  "sunday"); }

  fourthMondayOfMonth()    { return this.ordinalWeekday("fourth", "monday"); }
  fourthTuesdayOfMonth()   { return this.ordinalWeekday("fourth", "tuesday"); }
  fourthWednesdayOfMonth() { return this.ordinalWeekday("fourth", "wednesday"); }
  fourthThursdayOfMonth()  { return this.ordinalWeekday("fourth", "thursday"); }
  fourthFridayOfMonth()    { return this.ordinalWeekday("fourth", "friday"); }
  fourthSaturdayOfMonth()  { return this.ordinalWeekday("fourth", "saturday"); }
  fourthSundayOfMonth()    { return this.ordinalWeekday("fourth", "sunday"); }

  lastMondayOfMonth()    { return this.ordinalWeekday("last",   "monday"); }
  lastTuesdayOfMonth()   { return this.ordinalWeekday("last",   "tuesday"); }
  lastWednesdayOfMonth() { return this.ordinalWeekday("last",   "wednesday"); }
  lastThursdayOfMonth()  { return this.ordinalWeekday("last",   "thursday"); }
  lastFridayOfMonth()    { return this.ordinalWeekday("last",   "friday"); }
  lastSaturdayOfMonth()  { return this.ordinalWeekday("last",   "saturday"); }
  lastSundayOfMonth()    { return this.ordinalWeekday("last",   "sunday"); }

  // ── Recurrence — dynamic N-week ───────────────────────────────────────────

  everyNWeeks(n: number, days: DayName[], anchorDate?: string): this {
    this.payload.frequency = `every${ordinalToWords(n)}Weeks` as Frequency;
    this.payload.frequency_data = { days, ...(anchorDate ? { anchor_date: anchorDate } : {}) };
    return this;
  }

  everyThreeWeeks(days: DayName[], anchorDate?: string)  { return this.everyNWeeks(3,  days, anchorDate); }
  everyFourWeeks(days: DayName[], anchorDate?: string)   { return this.everyNWeeks(4,  days, anchorDate); }
  everyFiveWeeks(days: DayName[], anchorDate?: string)   { return this.everyNWeeks(5,  days, anchorDate); }
  everySixWeeks(days: DayName[], anchorDate?: string)    { return this.everyNWeeks(6,  days, anchorDate); }
  everyEightWeeks(days: DayName[], anchorDate?: string)  { return this.everyNWeeks(8,  days, anchorDate); }
  everyTenWeeks(days: DayName[], anchorDate?: string)    { return this.everyNWeeks(10, days, anchorDate); }
  everyTwelveWeeks(days: DayName[], anchorDate?: string) { return this.everyNWeeks(12, days, anchorDate); }

  // ── Recurrence — dynamic N-month ─────────────────────────────────────────

  everyNMonths(n: number, daysOfMonth: number[], startMonth?: number): this {
    this.payload.frequency = `every${ordinalToWords(n)}Months` as Frequency;
    this.payload.frequency_data = { days_of_month: daysOfMonth, ...(startMonth ? { start_month: startMonth } : {}) };
    return this;
  }

  everyFourMonths(daysOfMonth: number[], startMonth?: number)   { return this.everyNMonths(4,  daysOfMonth, startMonth); }
  everyFiveMonths(daysOfMonth: number[], startMonth?: number)   { return this.everyNMonths(5,  daysOfMonth, startMonth); }
  everySevenMonths(daysOfMonth: number[], startMonth?: number)  { return this.everyNMonths(7,  daysOfMonth, startMonth); }
  everyEightMonths(daysOfMonth: number[], startMonth?: number)  { return this.everyNMonths(8,  daysOfMonth, startMonth); }
  everyNineMonths(daysOfMonth: number[], startMonth?: number)   { return this.everyNMonths(9,  daysOfMonth, startMonth); }
  everyTenMonths(daysOfMonth: number[], startMonth?: number)    { return this.everyNMonths(10, daysOfMonth, startMonth); }
  everyElevenMonths(daysOfMonth: number[], startMonth?: number) { return this.everyNMonths(11, daysOfMonth, startMonth); }

  // ── Validation rules ──────────────────────────────────────────────────────

  noOverlap(): this {
    this.payload.allow_overlap = false;
    return this;
  }

  allowOverlap(): this {
    this.payload.allow_overlap = true;
    return this;
  }

  noWeekends(): this {
    this.payload.no_weekends = true;
    return this;
  }

  maxDuration(minutes: number): this {
    this.payload.max_duration_minutes = minutes;
    return this;
  }

  workingHoursOnly(start: string, end: string): this {
    this.payload.working_hours_start = start;
    this.payload.working_hours_end = end;
    return this;
  }

  // ── State ─────────────────────────────────────────────────────────────────

  active(): this {
    this.payload.active = true;
    return this;
  }

  inactive(): this {
    this.payload.active = false;
    return this;
  }

  // ── Metadata ──────────────────────────────────────────────────────────────

  withMetadata(metadata: Record<string, unknown>): this {
    this.payload.metadata = metadata;
    return this;
  }

  // ── HTTP helpers ──────────────────────────────────────────────────────────

  private baseUrl(): string {
    const { resourceType, resourceId } = this.resource;
    return `/api/schedules/${resourceType}/${resourceId}`;
  }

  private typeSegment(): string {
    const type = this.payload.type;
    if (!type) throw new Error("Schedule type must be set before calling save()");
    // Map type to route segment
    const map: Record<ScheduleType, string> = {
      availability: "availability",
      appointment:  "appointments",
      blocked:      "blocked",
      custom:       "custom",
    };
    return map[type];
  }

  // ── Terminal: save ────────────────────────────────────────────────────────

  async save(): Promise<Schedule> {
    const url = `${this.baseUrl()}/${this.typeSegment()}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message ?? `Failed to save schedule (${res.status})`);
    }
    const data = await res.json();
    return data.data.schedule as Schedule;
  }
}

// ─── ResourceHandle ───────────────────────────────────────────────────────────
// Attached to each resource; mirrors $doctor->getBookableSlots() etc.

export class ResourceHandle {
  constructor(private resource: Resource) {}

  private get base() {
    const { resourceType, resourceId } = this.resource;
    return `/api/schedules/${resourceType}/${resourceId}`;
  }

  /** Get all schedules, with optional filters */
  async schedules(params?: {
    type?: ScheduleType;
    date?: string;
    from?: string;
    to?: string;
    active?: boolean;
    recurring?: boolean;
  }): Promise<Schedule[]> {
    const qs = new URLSearchParams(
      Object.entries(params ?? {})
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    );
    const res = await fetch(`${this.base}?${qs}`);
    if (!res.ok) throw new Error(`Failed to fetch schedules (${res.status})`);
    const data = await res.json();
    return data.data.schedules as Schedule[];
  }

  /** Get schedules for a specific date */
  async schedulesForDate(date: string): Promise<Schedule[]> {
    return this.schedules({ date });
  }

  /** Get schedules within a date range */
  async schedulesForDateRange(from: string, to: string): Promise<Schedule[]> {
    return this.schedules({ from, to });
  }

  async appointmentSchedules(): Promise<Schedule[]> {
    return this.schedules({ type: "appointment" });
  }

  async availabilitySchedules(): Promise<Schedule[]> {
    return this.schedules({ type: "availability" });
  }

  async blockedSchedules(): Promise<Schedule[]> {
    return this.schedules({ type: "blocked" });
  }

  async recurringSchedules(): Promise<Schedule[]> {
    return this.schedules({ recurring: true });
  }

  async activeSchedules(): Promise<Schedule[]> {
    return this.schedules({ active: true });
  }

  async hasSchedules(): Promise<boolean> {
    const list = await this.schedules();
    return list.length > 0;
  }

  async hasActiveSchedules(): Promise<boolean> {
    const list = await this.activeSchedules();
    return list.length > 0;
  }

  // ── Bookability ───────────────────────────────────────────────────────────

  /** Check if there is at least one bookable slot on a date */
  async isBookableAt(date: string, durationMinutes: number, bufferMinutes = 0): Promise<boolean> {
    const qs = new URLSearchParams({
      date,
      duration: String(durationMinutes),
      buffer: String(bufferMinutes),
    });
    const res = await fetch(`${this.base}/bookable?${qs}`);
    if (!res.ok) throw new Error(`Bookability check failed (${res.status})`);
    const data = await res.json();
    return data.data.is_bookable as boolean;
  }

  /** Check if a specific time range is available */
  async isBookableAtTime(date: string, startTime: string, endTime: string): Promise<boolean> {
    const qs = new URLSearchParams({ date, start_time: startTime, end_time: endTime });
    const res = await fetch(`${this.base}/bookable/time?${qs}`);
    if (!res.ok) throw new Error(`Time bookability check failed (${res.status})`);
    const data = await res.json();
    return data.data.is_bookable as boolean;
  }

  /** Get all bookable slots for a date */
  async getBookableSlots(date: string, durationMinutes: number, bufferMinutes = 0): Promise<TimeSlot[]> {
    const qs = new URLSearchParams({
      date,
      duration: String(durationMinutes),
      buffer: String(bufferMinutes),
    });
    const res = await fetch(`${this.base}/slots?${qs}`);
    if (!res.ok) throw new Error(`Failed to get bookable slots (${res.status})`);
    const data = await res.json();
    return data.data.slots as TimeSlot[];
  }

  /** Find the next available slot on or after `fromDate` (defaults to today) */
  async getNextBookableSlot(
    fromDate: string | null,
    durationMinutes: number,
    bufferMinutes = 0
  ): Promise<NextSlot | null> {
    const qs = new URLSearchParams({
      duration: String(durationMinutes),
      buffer: String(bufferMinutes),
      ...(fromDate ? { from: fromDate } : {}),
    });
    const res = await fetch(`${this.base}/slots/next?${qs}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to get next bookable slot (${res.status})`);
    const data = await res.json();
    return data.data as NextSlot;
  }

  // ── Conflict detection ────────────────────────────────────────────────────

  async findConflicts(
    date: string,
    startTime: string,
    endTime: string,
    type: ScheduleType = "appointment"
  ): Promise<Schedule[]> {
    const res = await fetch(`${this.base}/conflicts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, start_time: startTime, end_time: endTime, type }),
    });
    if (!res.ok) throw new Error(`Conflict detection failed (${res.status})`);
    const data = await res.json();
    return (data.data as ConflictResult).conflicts;
  }

  async hasConflicts(
    date: string,
    startTime: string,
    endTime: string,
    type: ScheduleType = "appointment"
  ): Promise<boolean> {
    const conflicts = await this.findConflicts(date, startTime, endTime, type);
    return conflicts.length > 0;
  }

  // ── Totals ────────────────────────────────────────────────────────────────

  async getTotalScheduledTime(from: string, to: string): Promise<number> {
    const qs = new URLSearchParams({ from, to });
    const res = await fetch(`${this.base}/total-time?${qs}`);
    if (!res.ok) throw new Error(`Failed to get total scheduled time (${res.status})`);
    const data = await res.json();
    return data.data.total_minutes as number;
  }
}

// ─── Zap facade ───────────────────────────────────────────────────────────────

export const zap = {
  /**
   * Start a fluent schedule builder for any resource.
   *
   * @param resource  { resourceType: "doctor", resourceId: 42 }
   * @returns ScheduleBuilder
   *
   * @example
   * await zap.for({ resourceType: "doctor", resourceId: 42 })
   *   .named("Office Hours")
   *   .availability()
   *   .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
   *   .forYear(2026)
   *   .addPeriod("09:00", "17:00")
   *   .save();
   */
  for(resource: Resource): ScheduleBuilder {
    return new ScheduleBuilder(resource);
  },

  /**
   * Get a resource handle for querying, slots, and conflict detection.
   *
   * @example
   * const doctor = zap.resource({ resourceType: "doctor", resourceId: 42 });
   * const slots  = await doctor.getBookableSlots("2026-02-10", 60, 15);
   */
  resource(resource: Resource): ResourceHandle {
    return new ResourceHandle(resource);
  },

  /** Convenience: check conflicts without instantiating a handle */
  async findConflicts(
    resource: Resource,
    date: string,
    startTime: string,
    endTime: string,
    type: ScheduleType = "appointment"
  ): Promise<Schedule[]> {
    return new ResourceHandle(resource).findConflicts(date, startTime, endTime, type);
  },

  async hasConflicts(
    resource: Resource,
    date: string,
    startTime: string,
    endTime: string,
    type: ScheduleType = "appointment"
  ): Promise<boolean> {
    return new ResourceHandle(resource).hasConflicts(date, startTime, endTime, type);
  },
};

// ─── Usage examples (for reference — not executed) ───────────────────────────
//
// const doctor = { resourceType: "doctor", resourceId: 42 };
//
// // Define office hours
// await zap.for(doctor)
//   .named("Office Hours")
//   .availability()
//   .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
//   .forYear(2026)
//   .addPeriod("09:00", "12:00")
//   .addPeriod("14:00", "17:00")
//   .save();
//
// // Block lunch
// await zap.for(doctor)
//   .named("Lunch Break")
//   .blocked()
//   .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
//   .forYear(2026)
//   .addPeriod("12:00", "13:00")
//   .save();
//
// // Book a patient
// await zap.for(doctor)
//   .named("Patient A - Consultation")
//   .appointment()
//   .on("2026-02-10")
//   .addPeriod("10:00", "11:00")
//   .withMetadata({ patientId: 1, type: "consultation" })
//   .save();
//
// // Alternating teams
// const teamA = { resourceType: "employee", resourceId: 1 };
// const teamB = { resourceType: "employee", resourceId: 2 };
//
// await zap.for(teamA)
//   .named("Team A")
//   .availability()
//   .weekOddDays(["monday","tuesday","wednesday","thursday","friday"], "09:00", "17:00")
//   .forYear(2026)
//   .save();
//
// await zap.for(teamB)
//   .named("Team B")
//   .availability()
//   .weekEvenDays(["monday","tuesday","wednesday","thursday","friday"], "09:00", "17:00")
//   .forYear(2026)
//   .save();
//
// // Ordinal weekday — first Wednesday of each month
// await zap.for({ resourceType: "room", resourceId: 5 })
//   .named("Monthly Standup")
//   .appointment()
//   .firstWednesdayOfMonth()
//   .forYear(2026)
//   .addPeriod("09:00", "10:00")
//   .save();
//
// // Query + slots
// const handle = zap.resource(doctor);
//
// const slots    = await handle.getBookableSlots("2026-02-10", 60, 15);
// const next     = await handle.getNextBookableSlot(null, 60);
// const free     = await handle.isBookableAtTime("2026-02-10", "10:00", "11:00");
// const conflicts = await handle.findConflicts("2026-02-10", "10:00", "11:00");
// const total    = await handle.getTotalScheduledTime("2026-01-01", "2026-12-31");
