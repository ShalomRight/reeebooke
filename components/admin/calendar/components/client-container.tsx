"use client";

import { useState, useMemo } from "react";
import { isSameDay, parseISO } from "date-fns";

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { DndProviderWrapper } from "@/components/admin/calendar/components/dnd/dnd-provider";

import { CalendarHeader } from "@/components/admin/calendar/components/header/calendar-header";
import { CalendarYearView } from "@/components/admin/calendar/components/year-view/calendar-year-view";
import { CalendarMonthView } from "@/components/admin/calendar/components/month-view/calendar-month-view";
import { CalendarAgendaView } from "@/components/admin/calendar/components/agenda-view/calendar-agenda-view";
import { CalendarDayView } from "@/components/admin/calendar/components/week-and-day-view/calendar-day-view";
import { CalendarWeekView } from "@/components/admin/calendar/components/week-and-day-view/calendar-week-view";

import type { TCalendarView } from "@/components/admin/calendar/types";

interface IProps {
  initialView?: TCalendarView;
}

export function ClientContainer({ initialView = "month" }: IProps) {
  const [view, setView] = useState<TCalendarView>(initialView);
  const { selectedDate, selectedUserId, bookings } = useCalendar();

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const bookingStartDate = parseISO(booking.startDate);
      const bookingEndDate = parseISO(booking.endDate);

      if (view === "year") {
        const yearStart = new Date(selectedDate.getFullYear(), 0, 1);
        const yearEnd = new Date(selectedDate.getFullYear(), 11, 31, 23, 59, 59, 999);
        const isInSelectedYear = bookingStartDate <= yearEnd && bookingEndDate >= yearStart;
        const isUserMatch = selectedUserId === "all" || booking.user.id === selectedUserId;
        return isInSelectedYear && isUserMatch;
      }

      if (view === "month" || view === "agenda") {
        const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59, 999);
        const isInSelectedMonth = bookingStartDate <= monthEnd && bookingEndDate >= monthStart;
        const isUserMatch = selectedUserId === "all" || booking.user.id === selectedUserId;
        return isInSelectedMonth && isUserMatch;
      }

      if (view === "week") {
        const dayOfWeek = selectedDate.getDay();

        const weekStart = new Date(selectedDate);
        weekStart.setDate(selectedDate.getDate() - dayOfWeek);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const isInSelectedWeek = bookingStartDate <= weekEnd && bookingEndDate >= weekStart;
        const isUserMatch = selectedUserId === "all" || booking.user.id === selectedUserId;
        return isInSelectedWeek && isUserMatch;
      }

      if (view === "day") {
        const dayStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0);
        const dayEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59);
        const isInSelectedDay = bookingStartDate <= dayEnd && bookingEndDate >= dayStart;
        const isUserMatch = selectedUserId === "all" || booking.user.id === selectedUserId;
        return isInSelectedDay && isUserMatch;
      }
    });
  }, [selectedDate, selectedUserId, bookings, view]);

  const singleDayBookings = filteredBookings.filter(booking => {
    const startDate = parseISO(booking.startDate);
    const endDate = parseISO(booking.endDate);
    return isSameDay(startDate, endDate);
  });

  const multiDayBookings = filteredBookings.filter(booking => {
    const startDate = parseISO(booking.startDate);
    const endDate = parseISO(booking.endDate);
    return !isSameDay(startDate, endDate);
  });

  // For year view, we only care about the start date
  // by using the same date for both start and end,
  // we ensure only the start day will show a dot
  const bookingStartDates = useMemo(() => {
    return filteredBookings.map(booking => ({ ...booking, endDate: booking.startDate }));
  }, [filteredBookings]);

  return (
    <div className="overflow-hidden rounded-xl border">
      <CalendarHeader view={view} setView={setView} bookings={filteredBookings} />

      <DndProviderWrapper>
        {view === "day" && <CalendarDayView singleDayBookings={singleDayBookings} multiDayBookings={multiDayBookings} />}
        {view === "month" && <CalendarMonthView singleDayBookings={singleDayBookings} multiDayBookings={multiDayBookings} />}
        {view === "week" && <CalendarWeekView singleDayBookings={singleDayBookings} multiDayBookings={multiDayBookings} />}
        {view === "year" && <CalendarYearView allBookings={bookingStartDates} />}
        {view === "agenda" && <CalendarAgendaView singleDayBookings={singleDayBookings} multiDayBookings={multiDayBookings} />}
      </DndProviderWrapper>
    </div>
  );
}
