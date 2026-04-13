/**
 * Schedule Patterns — Supabook / Laravel Zap (TypeScript)
 *
 * Full translation of https://www.laravel-zap.com/raw/docs/guides/schedule-patterns.md
 * All patterns use the zap.ts fluent builder.
 *
 * Import: import { zap } from "@/lib/zap";
 */

import { zap, type Resource } from "./zap";

// ─── Example resources ────────────────────────────────────────────────────────

const doctor:   Resource = { resourceType: "doctor",   resourceId: 1 };
const employee: Resource = { resourceType: "employee", resourceId: 1 };
const room:     Resource = { resourceType: "room",     resourceId: 1 };
const resource: Resource = { resourceType: "resource", resourceId: 1 };

// ─── 1. Daily ─────────────────────────────────────────────────────────────────

export async function dailySchedule() {
  await zap.for(resource)
    .named("Daily Schedule")
    .availability()
    .daily()
    .from("2026-01-01")
    .to("2026-12-31")
    .addPeriod("09:00", "17:00")
    .save();
}

// ─── 2. Weekly ───────────────────────────────────────────────────────────────

export async function weeklySchedule() {
  // Standard — specific days
  await zap.for(doctor)
    .named("Office Hours")
    .availability()
    .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
    .forYear(2026)
    .addPeriod("09:00", "17:00")
    .save();

  // weekDays() convenience: sets weekly days AND adds the period in one call
  await zap.for(doctor)
    .named("Office Hours")
    .availability()
    .weekDays(["monday", "tuesday", "wednesday", "thursday", "friday"], "09:00", "17:00")
    .forYear(2026)
    .save();
}

// ─── 3. Weekly Odd / Even ────────────────────────────────────────────────────

export async function weeklyOddEvenSchedule() {
  // Odd ISO weeks only (weeks 1, 3, 5 …)
  await zap.for(employee)
    .named("Team A Schedule")
    .availability()
    .weeklyOdd(["monday", "wednesday", "friday"])
    .forYear(2026)
    .addPeriod("09:00", "17:00")
    .save();

  // weekOddDays() convenience
  await zap.for(employee)
    .named("Team A Schedule")
    .availability()
    .weekOddDays(["monday", "wednesday", "friday"], "09:00", "17:00")
    .forYear(2026)
    .save();

  // Even ISO weeks only (weeks 2, 4, 6 …)
  await zap.for(employee)
    .named("Team B Schedule")
    .availability()
    .weeklyEven(["monday", "wednesday", "friday"])
    .forYear(2026)
    .addPeriod("09:00", "17:00")
    .save();

  // weekEvenDays() convenience
  await zap.for(employee)
    .named("Team B Schedule")
    .availability()
    .weekEvenDays(["monday", "wednesday", "friday"], "09:00", "17:00")
    .forYear(2026)
    .save();
}

// ─── 4. Biweekly ─────────────────────────────────────────────────────────────

export async function biweeklySchedule() {
  // Every 2 weeks on Tuesday & Thursday
  await zap.for(resource)
    .named("Bi-Weekly Meeting")
    .appointment()
    .biweekly(["tuesday", "thursday"])
    .from("2026-01-07")
    .to("2026-03-31")
    .addPeriod("10:00", "11:00")
    .save();

  // With explicit anchor date
  await zap.for(resource)
    .named("Bi-Weekly Meeting")
    .appointment()
    .biweekly(["tuesday", "thursday"], "2026-01-14")
    .from("2026-01-07")
    .to("2026-03-31")
    .addPeriod("10:00", "11:00")
    .save();
}

// ─── 5. Every N weeks (3 – 52) ───────────────────────────────────────────────

export async function everyNWeeksSchedule() {
  // Every 3 weeks
  await zap.for(resource)
    .named("Tri-Weekly Sync")
    .appointment()
    .everyThreeWeeks(["monday", "friday"])
    .from("2026-01-06")
    .to("2026-12-31")
    .addPeriod("10:00", "11:00")
    .save();

  // Every 4 weeks with anchor date
  await zap.for(resource)
    .named("Monthly-ish Meeting")
    .appointment()
    .everyFourWeeks(["tuesday"], "2026-01-06")
    .from("2026-01-13")
    .to("2026-12-31")
    .addPeriod("14:00", "15:00")
    .save();

  // Every 6 weeks
  await zap.for(resource)
    .named("Six-Week Review")
    .appointment()
    .everySixWeeks(["wednesday"])
    .forYear(2026)
    .addPeriod("09:00", "10:00")
    .save();

  // Generic helper for any N
  await zap.for(resource)
    .named("21-Week Cycle")
    .appointment()
    .everyNWeeks(21, ["monday"])
    .forYear(2026)
    .addPeriod("10:00", "11:00")
    .save();
}

// ─── 6. Monthly ──────────────────────────────────────────────────────────────

export async function monthlySchedule() {
  // Specific days of the month
  await zap.for(resource)
    .named("Monthly Review")
    .appointment()
    .monthly([1, 15])
    .forYear(2026)
    .addPeriod("14:00", "15:00")
    .save();
}

// ─── 7. Monthly ordinal weekday ───────────────────────────────────────────────
//
// Equivalent to Zap's firstWednesdayOfMonth(), lastMondayOfMonth(), etc.
// Every method is available on the builder (first/second/third/fourth/last × all 7 days).

export async function ordinalWeekdaySchedule() {
  // Every 1st Wednesday of the month
  await zap.for(resource)
    .named("Monthly Standup")
    .appointment()
    .firstWednesdayOfMonth()
    .forYear(2026)
    .addPeriod("09:00", "10:00")
    .save();

  // Every 2nd Friday of the month
  await zap.for(resource)
    .named("Bi-Monthly Review")
    .appointment()
    .secondFridayOfMonth()
    .forYear(2026)
    .addPeriod("14:00", "15:00")
    .save();

  // Every last Monday of the month
  await zap.for(resource)
    .named("Month-End Retro")
    .appointment()
    .lastMondayOfMonth()
    .forYear(2026)
    .addPeriod("16:00", "17:00")
    .save();

  // Generic helper: ordinalWeekday(position, day)
  await zap.for(resource)
    .named("Third Thursday Sync")
    .appointment()
    .ordinalWeekday("third", "thursday")
    .forYear(2026)
    .addPeriod("11:00", "12:00")
    .save();
}

// ─── 8. Bimonthly ────────────────────────────────────────────────────────────

export async function bimonthlySchedule() {
  await zap.for(resource)
    .named("Bi-Monthly Report")
    .appointment()
    .bimonthly([5, 20], 2)           // days 5 & 20, anchored to February
    .from("2026-01-05")
    .to("2026-06-30")
    .addPeriod("10:00", "11:00")
    .save();
}

// ─── 9. Quarterly ────────────────────────────────────────────────────────────

export async function quarterlySchedule() {
  await zap.for(resource)
    .named("Quarterly Review")
    .appointment()
    .quarterly([7, 21], 2)           // days 7 & 21, anchored to February
    .from("2026-02-15")
    .to("2026-11-15")
    .addPeriod("09:00", "12:00")
    .save();
}

// ─── 10. Semi-annual ─────────────────────────────────────────────────────────

export async function semiannualSchedule() {
  await zap.for(resource)
    .named("Semi-Annual Audit")
    .appointment()
    .semiannually([10], 3)           // day 10, anchored to March
    .from("2026-03-10")
    .to("2026-12-10")
    .addPeriod("09:00", "17:00")
    .save();
}

// ─── 11. Annual ──────────────────────────────────────────────────────────────

export async function annualSchedule() {
  await zap.for(resource)
    .named("Annual Conference")
    .blocked()
    .annually([1, 15], 4)            // April 1st & 15th every year
    .from("2026-04-01")
    .to("2027-04-01")
    .addPeriod("09:00", "18:00")
    .save();
}

// ─── 12. Every N months (4, 5, 7 – 11) ──────────────────────────────────────

export async function everyNMonthsSchedule() {
  // Every 4 months on the 15th
  await zap.for(resource)
    .named("Quadrimester Review")
    .appointment()
    .everyFourMonths([15])
    .forYear(2026)
    .addPeriod("09:00", "12:00")
    .save();

  // Every 5 months with multiple days and start-month anchor
  await zap.for(resource)
    .named("Five-Month Cycle")
    .appointment()
    .everyFiveMonths([1, 15], 2)
    .forYear(2026)
    .addPeriod("10:00", "11:00")
    .save();

  // Every 7 months
  await zap.for(resource)
    .named("Seven-Month Audit")
    .appointment()
    .everySevenMonths([10])
    .forYear(2026)
    .addPeriod("14:00", "16:00")
    .save();

  // Generic helper for any N
  await zap.for(resource)
    .named("Nine-Month Sync")
    .appointment()
    .everyNMonths(9, [1])
    .forYear(2026)
    .addPeriod("10:00", "11:00")
    .save();
}

// ─── 13. Validation rules ────────────────────────────────────────────────────

export async function validationRulesExamples() {
  // No overlap
  await zap.for(resource)
    .named("Exclusive Event")
    .custom()
    .from("2026-03-15")
    .addPeriod("15:00", "16:00")
    .noOverlap()
    .save();

  // Allow overlap (explicit)
  await zap.for(resource)
    .named("Open Availability")
    .availability()
    .weekly(["monday", "friday"])
    .forYear(2026)
    .addPeriod("09:00", "17:00")
    .allowOverlap()
    .save();

  // Restrict to working hours
  await zap.for(resource)
    .named("Working Hours Only")
    .custom()
    .daily()
    .forYear(2026)
    .addPeriod("08:00", "20:00")
    .workingHoursOnly("09:00", "17:00")
    .save();

  // Maximum duration
  await zap.for(resource)
    .named("Capped Session")
    .appointment()
    .from("2026-03-15")
    .addPeriod("10:00", "13:00")
    .maxDuration(120)                // 120 minutes max
    .save();

  // No weekends
  await zap.for(resource)
    .named("Weekday Only")
    .availability()
    .daily()
    .forYear(2026)
    .addPeriod("09:00", "17:00")
    .noWeekends()
    .save();
}

// ─── 14. Schedule state ──────────────────────────────────────────────────────

export async function scheduleStateExamples() {
  // Create inactive (draft) schedule
  await zap.for(resource)
    .named("Draft Schedule")
    .availability()
    .weekly(["monday"])
    .forYear(2026)
    .addPeriod("09:00", "17:00")
    .inactive()
    .save();

  // Explicitly active (default)
  await zap.for(resource)
    .named("Active Schedule")
    .availability()
    .weekly(["monday"])
    .forYear(2026)
    .addPeriod("09:00", "17:00")
    .active()
    .save();
}

// ─── 15. Metadata ────────────────────────────────────────────────────────────

export async function metadataExample() {
  await zap.for(doctor)
    .named("Patient A - Consultation")
    .appointment()
    .on("2026-01-15")
    .addPeriod("10:00", "11:00")
    .withMetadata({
      patientId: 1,
      type: "consultation",
      notes: "Follow-up required",
    })
    .save();
}

// ─── 16. Date range helpers ───────────────────────────────────────────────────

export async function dateRangeExamples() {
  const r = zap.for(resource).named("Demo").availability().weekly(["monday"]).addPeriod("09:00", "17:00");

  await r.from("2026-01-15").save();                        // single date
  await r.on("2026-01-15").save();                          // alias for from()
  await r.from("2026-01-01").to("2026-12-31").save();       // explicit range
  await r.between("2026-01-01", "2026-12-31").save();       // shorthand range
  await r.forYear(2026).save();                             // full year
}

// ─── 17. Multiple periods (split shifts) ─────────────────────────────────────

export async function splitShiftExample() {
  await zap.for(doctor)
    .named("Split Shift")
    .availability()
    .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
    .forYear(2026)
    .addPeriod("09:00", "12:00")
    .addPeriod("14:00", "17:00")
    .save();

  // Or with addPeriods() bulk helper
  await zap.for(doctor)
    .named("Split Shift")
    .availability()
    .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
    .forYear(2026)
    .addPeriods([
      { start_time: "09:00", end_time: "12:00" },
      { start_time: "14:00", end_time: "17:00" },
    ])
    .save();
}
