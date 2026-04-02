import { differenceInDays, format, parseISO, startOfDay } from "date-fns";

import { AgendaBookingCard } from "@/components/admin/calendar/components/agenda-view/agenda-booking-card";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  date: Date;
  bookings: IBooking[];
  multiDayBookings: IBooking[];
}

export function AgendaDayGroup({ date, bookings, multiDayBookings }: IProps) {
  const sortedBookings = [...bookings].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <div className="space-y-4">
      <div className="sticky top-0 flex items-center gap-4 bg-background py-2">
        <p className="text-sm font-semibold">{format(date, "EEEE, MMMM d, yyyy")}</p>
      </div>

      <div className="space-y-2">
        {multiDayBookings.length > 0 &&
          multiDayBookings.map(booking => {
            const bookingStart = startOfDay(parseISO(booking.startDate));
            const bookingEnd = startOfDay(parseISO(booking.endDate));
            const currentDate = startOfDay(date);

            const bookingTotalDays = differenceInDays(bookingEnd, bookingStart) + 1;
            const bookingCurrentDay = differenceInDays(currentDate, bookingStart) + 1;
            return <AgendaBookingCard key={booking.id} booking={booking} bookingCurrentDay={bookingCurrentDay} bookingTotalDays={bookingTotalDays} />;
          })}

        {sortedBookings.length > 0 && sortedBookings.map(booking => <AgendaBookingCard key={booking.id} booking={booking} />)}
      </div>
    </div>
  );
}
