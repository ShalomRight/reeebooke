import { useMemo } from "react";
import { parseISO, startOfDay, startOfWeek, endOfWeek, addDays, differenceInDays, isBefore, isAfter } from "date-fns";

import { MonthBookingBadge } from "@/components/admin/calendar/components/month-view/month-booking-badge";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  selectedDate: Date;
  multiDayBookings: IBooking[];
}

export function WeekViewMultiDayBookingsRow({ selectedDate, multiDayBookings }: IProps) {
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const processedBookings = useMemo(() => {
    return multiDayBookings
      .map(booking => {
        const start = parseISO(booking.startDate);
        const end = parseISO(booking.endDate);
        const adjustedStart = isBefore(start, weekStart) ? weekStart : start;
        const adjustedEnd = isAfter(end, weekEnd) ? weekEnd : end;
        const startIndex = differenceInDays(adjustedStart, weekStart);
        const endIndex = differenceInDays(adjustedEnd, weekStart);

        return {
          ...booking,
          adjustedStart,
          adjustedEnd,
          startIndex,
          endIndex,
        };
      })
      .sort((a, b) => {
        const startDiff = a.adjustedStart.getTime() - b.adjustedStart.getTime();
        if (startDiff !== 0) return startDiff;
        return b.endIndex - b.startIndex - (a.endIndex - a.startIndex);
      });
  }, [multiDayBookings, weekStart, weekEnd]);

  const bookingRows = useMemo(() => {
    const rows: (typeof processedBookings)[] = [];

    processedBookings.forEach(booking => {
      let rowIndex = rows.findIndex(row => row.every(e => e.endIndex < booking.startIndex || e.startIndex > booking.endIndex));

      if (rowIndex === -1) {
        rowIndex = rows.length;
        rows.push([]);
      }

      rows[rowIndex].push(booking);
    });

    return rows;
  }, [processedBookings]);

  const hasBookingsInWeek = useMemo(() => {
    return multiDayBookings.some(booking => {
      const start = parseISO(booking.startDate);
      const end = parseISO(booking.endDate);

      return (
        // Booking starts within the week
        (start >= weekStart && start <= weekEnd) ||
        // Booking ends within the week
        (end >= weekStart && end <= weekEnd) ||
        // Booking spans the entire week
        (start <= weekStart && end >= weekEnd)
      );
    });
  }, [multiDayBookings, weekStart, weekEnd]);

  if (!hasBookingsInWeek) {
    return null;
  }

  return (
    <div className="hidden overflow-hidden sm:flex">
      <div className="w-18 border-b"></div>
      <div className="grid flex-1 grid-cols-7 divide-x border-b border-l">
        {weekDays.map((day, dayIndex) => (
          <div key={day.toISOString()} className="flex h-full flex-col gap-1 py-1">
            {bookingRows.map((row, rowIndex) => {
              const booking = row.find(e => e.startIndex <= dayIndex && e.endIndex >= dayIndex);

              if (!booking) {
                return <div key={`${rowIndex}-${dayIndex}`} className="h-6.5" />;
              }

              let position: "first" | "middle" | "last" | "none" = "none";

              if (dayIndex === booking.startIndex && dayIndex === booking.endIndex) {
                position = "none";
              } else if (dayIndex === booking.startIndex) {
                position = "first";
              } else if (dayIndex === booking.endIndex) {
                position = "last";
              } else {
                position = "middle";
              }

              return <MonthBookingBadge key={`${booking.id}-${dayIndex}`} booking={booking} cellDate={startOfDay(day)} position={position} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
