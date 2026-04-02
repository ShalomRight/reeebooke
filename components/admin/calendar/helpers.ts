import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
  isSameWeek,
  isSameDay,
  isSameMonth,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  format,
  parseISO,
  differenceInMinutes,
  eachDayOfInterval,
  startOfDay,
  differenceInDays,
  endOfYear,
  startOfYear,
  subYears,
  addYears,
  isSameYear,
  isWithinInterval,
} from "date-fns";

import type { ICalendarCell, IBooking } from "@/components/admin/calendar/interfaces";
import type { TCalendarView, TVisibleHours, TWorkingHours } from "@/components/admin/calendar/types";

// ================ Header helper functions ================ //

export function rangeText(view: TCalendarView, date: Date) {
  const formatString = "MMM d, yyyy";
  let start: Date;
  let end: Date;

  switch (view) {
    case "agenda":
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;
    case "year":
      start = startOfYear(date);
      end = endOfYear(date);
      break;
    case "month":
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;
    case "week":
      start = startOfWeek(date);
      end = endOfWeek(date);
      break;
    case "day":
      return format(date, formatString);
    default:
      return "Error while formatting ";
  }

  return `${format(start, formatString)} - ${format(end, formatString)}`;
}

export function navigateDate(date: Date, view: TCalendarView, direction: "previous" | "next"): Date {
  const operations = {
    agenda: direction === "next" ? addMonths : subMonths,
    year: direction === "next" ? addYears : subYears,
    month: direction === "next" ? addMonths : subMonths,
    week: direction === "next" ? addWeeks : subWeeks,
    day: direction === "next" ? addDays : subDays,
  };

  return operations[view](date, 1);
}

export function getBookingsCount(bookings: IBooking[], date: Date, view: TCalendarView): number {
  const compareFns = {
    agenda: isSameMonth,
    year: isSameYear,
    day: isSameDay,
    week: isSameWeek,
    month: isSameMonth,
  };

  return bookings.filter(booking => compareFns[view](new Date(booking.startDate), date)).length;
}

// ================ Week and day view helper functions ================ //

export function getCurrentBookings(bookings: IBooking[]) {
  const now = new Date();
  return bookings.filter(booking => isWithinInterval(now, { start: parseISO(booking.startDate), end: parseISO(booking.endDate) })) || null;
}

export function groupBookings(dayBookings: IBooking[]) {
  const sortedBookings = dayBookings.sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
  const groups: IBooking[][] = [];

  for (const booking of sortedBookings) {
    const bookingStart = parseISO(booking.startDate);

    let placed = false;
    for (const group of groups) {
      const lastBookingInGroup = group[group.length - 1];
      const lastBookingEnd = parseISO(lastBookingInGroup.endDate);

      if (bookingStart >= lastBookingEnd) {
        group.push(booking);
        placed = true;
        break;
      }
    }

    if (!placed) groups.push([booking]);
  }

  return groups;
}

export function getBookingBlockStyle(booking: IBooking, day: Date, groupIndex: number, groupSize: number, visibleHoursRange?: { from: number; to: number }) {
  const startDate = parseISO(booking.startDate);
  const dayStart = new Date(day.setHours(0, 0, 0, 0));
  const bookingStart = startDate < dayStart ? dayStart : startDate;
  const startMinutes = differenceInMinutes(bookingStart, dayStart);

  let top;

  if (visibleHoursRange) {
    const visibleStartMinutes = visibleHoursRange.from * 60;
    const visibleEndMinutes = visibleHoursRange.to * 60;
    const visibleRangeMinutes = visibleEndMinutes - visibleStartMinutes;
    top = ((startMinutes - visibleStartMinutes) / visibleRangeMinutes) * 100;
  } else {
    top = (startMinutes / 1440) * 100;
  }

  const width = 100 / groupSize;
  const left = groupIndex * width;

  return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
}

export function isWorkingHour(day: Date, hour: number, workingHours: TWorkingHours) {
  const dayIndex = day.getDay() as keyof typeof workingHours;
  const dayHours = workingHours[dayIndex];
  return hour >= dayHours.from && hour < dayHours.to;
}

export function getVisibleHours(visibleHours: TVisibleHours, singleDayBookings: IBooking[]) {
  let earliestBookingHour = visibleHours.from;
  let latestBookingHour = visibleHours.to;

  singleDayBookings.forEach(booking => {
    const startHour = parseISO(booking.startDate).getHours();
    const endTime = parseISO(booking.endDate);
    const endHour = endTime.getHours() + (endTime.getMinutes() > 0 ? 1 : 0);
    if (startHour < earliestBookingHour) earliestBookingHour = startHour;
    if (endHour > latestBookingHour) latestBookingHour = endHour;
  });

  latestBookingHour = Math.min(latestBookingHour, 24);

  const hours = Array.from({ length: latestBookingHour - earliestBookingHour }, (_, i) => i + earliestBookingHour);

  return { hours, earliestBookingHour, latestBookingHour };
}

// ================ Month view helper functions ================ //

export function getCalendarCells(selectedDate: Date): ICalendarCell[] {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const totalDays = firstDayOfMonth + daysInMonth;

  const prevMonthCells = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - firstDayOfMonth + i + 1),
  }));

  const currentMonthCells = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
    date: new Date(currentYear, currentMonth, i + 1),
  }));

  const nextMonthCells = Array.from({ length: (7 - (totalDays % 7)) % 7 }, (_, i) => ({
    day: i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth + 1, i + 1),
  }));

  return [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];
}

export function calculateMonthBookingPositions(multiDayBookings: IBooking[], singleDayBookings: IBooking[], selectedDate: Date) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);

  const bookingPositions: { [key: string]: number } = {};
  const occupiedPositions: { [key: string]: boolean[] } = {};

  eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach(day => {
    occupiedPositions[day.toISOString()] = [false, false, false];
  });

  const sortedBookings = [
    ...multiDayBookings.sort((a, b) => {
      const aDuration = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
      const bDuration = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
      return bDuration - aDuration || parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime();
    }),
    ...singleDayBookings.sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()),
  ];

  sortedBookings.forEach(booking => {
    const bookingStart = parseISO(booking.startDate);
    const bookingEnd = parseISO(booking.endDate);
    const bookingDays = eachDayOfInterval({
      start: bookingStart < monthStart ? monthStart : bookingStart,
      end: bookingEnd > monthEnd ? monthEnd : bookingEnd,
    });

    let position = -1;

    for (let i = 0; i < 3; i++) {
      if (
        bookingDays.every(day => {
          const dayPositions = occupiedPositions[startOfDay(day).toISOString()];
          return dayPositions && !dayPositions[i];
        })
      ) {
        position = i;
        break;
      }
    }

    if (position !== -1) {
      bookingDays.forEach(day => {
        const dayKey = startOfDay(day).toISOString();
        occupiedPositions[dayKey][position] = true;
      });
      bookingPositions[booking.id] = position;
    }
  });

  return bookingPositions;
}

export function getMonthCellBookings(date: Date, bookings: IBooking[], bookingPositions: Record<string, number>) {
  const bookingsForDate = bookings.filter(booking => {
    const bookingStart = parseISO(booking.startDate);
    const bookingEnd = parseISO(booking.endDate);
    return (date >= bookingStart && date <= bookingEnd) || isSameDay(date, bookingStart) || isSameDay(date, bookingEnd);
  });

  return bookingsForDate
    .map(booking => ({
      ...booking,
      position: bookingPositions[booking.id] ?? -1,
      isMultiDay: booking.startDate !== booking.endDate,
    }))
    .sort((a, b) => {
      if (a.isMultiDay && !b.isMultiDay) return -1;
      if (!a.isMultiDay && b.isMultiDay) return 1;
      return a.position - b.position;
    });
}
