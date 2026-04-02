import { useMemo } from "react";

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { DayCell } from "@/components/admin/calendar/components/month-view/day-cell";

import { getCalendarCells, calculateMonthBookingPositions } from "@/components/admin/calendar/helpers";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  singleDayBookings: IBooking[];
  multiDayBookings: IBooking[];
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarMonthView({ singleDayBookings, multiDayBookings }: IProps) {
  const { selectedDate } = useCalendar();

  const allBookings = [...multiDayBookings, ...singleDayBookings];

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);

  const bookingPositions = useMemo(
    () => calculateMonthBookingPositions(multiDayBookings, singleDayBookings, selectedDate),
    [multiDayBookings, singleDayBookings, selectedDate]
  );

  return (
    <div>
      <div className="grid grid-cols-7 divide-x">
        {WEEK_DAYS.map(day => (
          <div key={day} className="flex items-center justify-center py-2">
            <span className="text-xs font-medium text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden">
        {cells.map(cell => (
          <DayCell key={cell.date.toISOString()} cell={cell} bookings={allBookings} bookingPositions={bookingPositions} />
        ))}
      </div>
    </div>
  );
}
