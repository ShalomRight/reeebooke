import { parseISO, isWithinInterval, differenceInDays, startOfDay, endOfDay } from "date-fns";

import { MonthBookingBadge } from "@/components/admin/calendar/components/month-view/month-booking-badge";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  selectedDate: Date;
  multiDayBookings: IBooking[];
}

export function DayViewMultiDayBookingsRow({ selectedDate, multiDayBookings }: IProps) {
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);

  const multiDayBookingsInDay = multiDayBookings
    .filter(booking => {
      const bookingStart = parseISO(booking.startDate);
      const bookingEnd = parseISO(booking.endDate);

      const isOverlapping =
        isWithinInterval(dayStart, { start: bookingStart, end: bookingEnd }) ||
        isWithinInterval(dayEnd, { start: bookingStart, end: bookingEnd }) ||
        (bookingStart <= dayStart && bookingEnd >= dayEnd);

      return isOverlapping;
    })
    .sort((a, b) => {
      const durationA = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
      const durationB = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
      return durationB - durationA;
    });

  if (multiDayBookingsInDay.length === 0) return null;

  return (
    <div className="flex border-b">
      <div className="w-18"></div>
      <div className="flex flex-1 flex-col gap-1 border-l py-1">
        {multiDayBookingsInDay.map(booking => {
          const bookingStart = startOfDay(parseISO(booking.startDate));
          const bookingEnd = startOfDay(parseISO(booking.endDate));
          const currentDate = startOfDay(selectedDate);

          const bookingTotalDays = differenceInDays(bookingEnd, bookingStart) + 1;
          const bookingCurrentDay = differenceInDays(currentDate, bookingStart) + 1;

          return <MonthBookingBadge key={booking.id} booking={booking} cellDate={selectedDate} bookingCurrentDay={bookingCurrentDay} bookingTotalDays={bookingTotalDays} />;
        })}
      </div>
    </div>
  );
}
