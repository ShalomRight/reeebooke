import { useMemo } from "react";
import { CalendarX2 } from "lucide-react";
import { parseISO, format, endOfDay, startOfDay, isSameMonth } from "date-fns";

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AgendaDayGroup } from "@/components/admin/calendar/components/agenda-view/agenda-day-group";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  singleDayBookings: IBooking[];
  multiDayBookings: IBooking[];
}

export function CalendarAgendaView({ singleDayBookings, multiDayBookings }: IProps) {
  const { selectedDate } = useCalendar();

  const bookingsByDay = useMemo(() => {
    const allDates = new Map<string, { date: Date; bookings: IBooking[]; multiDayBookings: IBooking[] }>();

    singleDayBookings.forEach(booking => {
      const bookingDate = parseISO(booking.startDate);
      if (!isSameMonth(bookingDate, selectedDate)) return;

      const dateKey = format(bookingDate, "yyyy-MM-dd");

      if (!allDates.has(dateKey)) {
        allDates.set(dateKey, { date: startOfDay(bookingDate), bookings: [], multiDayBookings: [] });
      }

      allDates.get(dateKey)?.bookings.push(booking);
    });

    multiDayBookings.forEach(booking => {
      const bookingStart = parseISO(booking.startDate);
      const bookingEnd = parseISO(booking.endDate);

      let currentDate = startOfDay(bookingStart);
      const lastDate = endOfDay(bookingEnd);

      while (currentDate <= lastDate) {
        if (isSameMonth(currentDate, selectedDate)) {
          const dateKey = format(currentDate, "yyyy-MM-dd");

          if (!allDates.has(dateKey)) {
            allDates.set(dateKey, { date: new Date(currentDate), bookings: [], multiDayBookings: [] });
          }

          allDates.get(dateKey)?.multiDayBookings.push(booking);
        }
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    });

    return Array.from(allDates.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [singleDayBookings, multiDayBookings, selectedDate]);

  const hasAnyBookings = singleDayBookings.length > 0 || multiDayBookings.length > 0;

  return (
    <div className="h-[800px]">
      <ScrollArea className="h-full" type="always">
        <div className="space-y-6 p-4">
          {bookingsByDay.map(dayGroup => (
            <AgendaDayGroup key={format(dayGroup.date, "yyyy-MM-dd")} date={dayGroup.date} bookings={dayGroup.bookings} multiDayBookings={dayGroup.multiDayBookings} />
          ))}

          {!hasAnyBookings && (
            <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
              <CalendarX2 className="size-10" />
              <p className="text-sm md:text-base">No bookings scheduled for the selected month</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
