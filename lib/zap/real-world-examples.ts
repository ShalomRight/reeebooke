/**
 * Real-World Examples — Supabook / Laravel Zap (TypeScript)
 *
 * Full translation of https://www.laravel-zap.com/raw/docs/guides/real-world-examples.md
 * All examples use the zap.ts fluent builder + ResourceHandle query methods.
 *
 * Import: import { zap } from "@/lib/zap";
 */

import { zap, type Resource } from "./zap";

// ─── 🏥 Doctor Appointment System ─────────────────────────────────────────────

const doctor: Resource = { resourceType: "doctor", resourceId: 1 };

export async function setupDoctorSchedule() {
  // 1. Office hours — Mon–Fri, split morning/afternoon
  await zap.for(doctor)
    .named("Office Hours")
    .availability()
    .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
    .forYear(2026)
    .addPeriod("09:00", "12:00")
    .addPeriod("14:00", "17:00")
    .save();

  // 2. Lunch break — block every weekday 12:00–13:00
  await zap.for(doctor)
    .named("Lunch Break")
    .blocked()
    .weekly(["monday", "tuesday", "wednesday", "thursday", "friday"])
    .forYear(2026)
    .addPeriod("12:00", "13:00")
    .save();
}

export async function bookDoctorAppointment(patientId: number, date: string) {
  const handle = zap.resource(doctor);

  // Check the slot is free before booking
  const available = await handle.isBookableAtTime(date, "10:00", "11:00");
  if (!available) {
    throw new Error("Requested time slot is not available.");
  }

  await zap.for(doctor)
    .named("Patient A - Checkup")
    .appointment()
    .on(date)
    .addPeriod("10:00", "11:00")
    .withMetadata({ patientId, type: "checkup" })
    .save();
}

export async function getDoctorSlots(date: string) {
  // Returns all slots for the day with is_available flag on each
  return zap.resource(doctor).getBookableSlots(date, 60, 15);
}

export async function getNextDoctorSlot() {
  // Find the next open 60-min slot from today
  return zap.resource(doctor).getNextBookableSlot(null, 60, 15);
}

// ─── 🏢 Meeting Room Booking ──────────────────────────────────────────────────

const room: Resource = { resourceType: "room", resourceId: 1 };

export async function setupRoomAvailability() {
  // weekDays() convenience: sets weekly + adds period in one call
  await zap.for(room)
    .named("Conference Room A")
    .availability()
    .weekDays(["monday", "tuesday", "wednesday", "thursday", "friday"], "08:00", "18:00")
    .forYear(2026)
    .save();
}

export async function bookMeetingRoom(organizer: string, date: string) {
  await zap.for(room)
    .named("Board Meeting")
    .appointment()
    .on(date)
    .addPeriod("09:00", "11:00")
    .withMetadata({ organizer })
    .save();
}

export async function getRoomSlots(date: string) {
  return zap.resource(room).getBookableSlots(date, 60);
}

// ─── 👔 Employee Shift Management ────────────────────────────────────────────

const employee: Resource = { resourceType: "employee", resourceId: 1 };

export async function setupEmployeeSchedule() {
  // Regular weekday shifts
  await zap.for(employee)
    .named("Regular Shift")
    .availability()
    .weekDays(["monday", "tuesday", "wednesday", "thursday", "friday"], "09:00", "17:00")
    .forYear(2026)
    .save();
}

export async function blockEmployeeVacation(startDate: string, endDate: string) {
  // Block an entire vacation period (all day)
  await zap.for(employee)
    .named("Vacation Leave")
    .blocked()
    .between(startDate, endDate)
    .addPeriod("00:00", "23:59")
    .save();
}

// ─── 🔄 Alternating / Rotating Shifts ────────────────────────────────────────

const employeeA: Resource = { resourceType: "employee", resourceId: 1 };
const employeeB: Resource = { resourceType: "employee", resourceId: 2 };

export async function setupRotatingShifts() {
  // Employee works morning shift (05:00–13:00) on odd weeks
  await zap.for(employeeA)
    .named("Morning Shift - Odd Weeks")
    .availability()
    .weekOddDays(["monday", "tuesday", "wednesday", "thursday", "friday"], "05:00", "13:00")
    .forYear(2026)
    .save();

  // Same employee works afternoon shift (13:00–21:00) on even weeks
  await zap.for(employeeA)
    .named("Afternoon Shift - Even Weeks")
    .availability()
    .weekEvenDays(["monday", "tuesday", "wednesday", "thursday", "friday"], "13:00", "21:00")
    .forYear(2026)
    .save();
}

export async function setupSharedOfficeSpace() {
  // Person A uses the office on odd weeks
  await zap.for(employeeA)
    .named("Office Access - Odd Weeks")
    .availability()
    .weeklyOdd(["monday", "tuesday", "wednesday", "thursday", "friday"])
    .addPeriod("09:00", "17:00")
    .forYear(2026)
    .save();

  // Person B uses the office on even weeks
  await zap.for(employeeB)
    .named("Office Access - Even Weeks")
    .availability()
    .weeklyEven(["monday", "tuesday", "wednesday", "thursday", "friday"])
    .addPeriod("09:00", "17:00")
    .forYear(2026)
    .save();
}

// ─── 📅 Extended Recurring Frequencies ───────────────────────────────────────

const team:      Resource = { resourceType: "team",      resourceId: 1 };
const manager:   Resource = { resourceType: "employee",  resourceId: 2 };
const accountant: Resource = { resourceType: "employee", resourceId: 3 };
const company:   Resource = { resourceType: "company",   resourceId: 1 };

export async function biweeklyTeamMeeting() {
  // Bi-weekly team standup every other Monday
  await zap.for(team)
    .named("Team Standup")
    .appointment()
    .biweekly(["monday"])
    .from("2026-01-06")
    .to("2026-12-31")
    .addPeriod("09:00", "09:30")
    .save();
}

export async function quarterlyReviews() {
  // Quarterly performance reviews on the 15th of each quarter, anchored to January
  await zap.for(manager)
    .named("Quarterly Reviews")
    .blocked()
    .quarterly([15], 1)
    .from("2026-01-15")
    .to("2026-12-15")
    .addPeriod("10:00", "17:00")
    .save();
}

export async function monthlyOrdinalMeetings() {
  // Monthly standup — every 1st Wednesday
  await zap.for(room)
    .named("Monthly Standup")
    .appointment()
    .firstWednesdayOfMonth()
    .forYear(2026)
    .addPeriod("09:00", "10:00")
    .save();

  // Month-end retro — every last Monday
  await zap.for(room)
    .named("Month-End Retro")
    .appointment()
    .lastMondayOfMonth()
    .forYear(2026)
    .addPeriod("16:00", "17:00")
    .save();
}

export async function monthlyPayroll() {
  // Payroll processing on the 1st and 15th of every month
  await zap.for(accountant)
    .named("Payroll Processing")
    .blocked()
    .monthly([1, 15])
    .forYear(2026)
    .addPeriod("08:00", "12:00")
    .save();
}

export async function annualCompanyMeeting() {
  // Annual company meeting on April 1st & 15th
  await zap.for(company)
    .named("Annual Company Meeting")
    .blocked()
    .annually([1, 15], 4)            // April = month 4
    .from("2026-04-01")
    .to("2027-04-15")
    .addPeriod("09:00", "17:00")
    .save();
}

// ─── 💡 Query schedules by metadata ──────────────────────────────────────────
//
// In PHP you can filter via ->where('metadata->customer_id', $id).
// In Supabook pass the metadata filter as a query param to your API route:
//
//   GET /api/schedules/doctor/1?metadata[customer_id]=42
//
// Example helper:

export async function getSchedulesByCustomer(
  resource: Resource,
  customerId: number
) {
  const { resourceType, resourceId } = resource;
  const res = await fetch(
    `/api/schedules/${resourceType}/${resourceId}?metadata[customer_id]=${customerId}`
  );
  if (!res.ok) throw new Error(`Failed to fetch schedules (${res.status})`);
  const data = await res.json() as any;
  return data.data.schedules;
}

// ─── Full booking flow (composite example) ───────────────────────────────────

export async function fullDoctorBookingFlow(patientId: number) {
  const handle = zap.resource(doctor);
  const today  = new Date().toISOString().split("T")[0];

  // 1. Make sure the doctor has active schedules at all
  const hasSchedules = await handle.hasActiveSchedules();
  if (!hasSchedules) throw new Error("Doctor has no active schedules.");

  // 2. Find the next open slot
  const next = await handle.getNextBookableSlot(today, 60, 15);
  if (!next) throw new Error("No available slots in the next 365 days.");

  // 3. Double-check no conflict exists (defensive)
  const conflict = await handle.hasConflicts(next.date, next.start_time, next.end_time);
  if (conflict) throw new Error("Conflict detected on the proposed slot.");

  // 4. Create the appointment schedule
  const schedule = await zap.for(doctor)
    .named(`Patient ${patientId} - Appointment`)
    .appointment()
    .on(next.date)
    .addPeriod(next.start_time, next.end_time)
    .withMetadata({ patientId, bookedAt: new Date().toISOString() })
    .save();

  return { schedule, slot: next };
}
