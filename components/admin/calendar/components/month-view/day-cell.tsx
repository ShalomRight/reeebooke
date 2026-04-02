import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { isToday, startOfDay } from "date-fns";

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { BookingBullet } from "@/components/admin/calendar/components/month-view/booking-bullet";
import { DroppableDayCell } from "@/components/admin/calendar/components/dnd/droppable-day-cell";
import { MonthBookingBadge } from "@/components/admin/calendar/components/month-view/month-booking-badge";

import { cn } from "@/lib/utils";
import { getMonthCellBookings } from "@/components/admin/calendar/helpers";

import type { ICalendarCell, IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  cell: ICalendarCell;
  bookings: IBooking[];
  bookingPositions: Record<string, number>;
}

const MAX_VISIBLE_EVENTS = 3;

export function DayCell({ cell, bookings, bookingPositions }: IProps) {
  const { push } = useRouter();
  const { setSelectedDate } = useCalendar();

  const { day, currentMonth, date } = cell;

  const cellBookings = useMemo(() => getMonthCellBookings(date, bookings, bookingPositions), [date, bookings, bookingPositions]);
  const isSunday = date.getDay() === 0;

  const handleClick = () => {
    setSelectedDate(date);
    push("/day-view");
  };

  return (
    <DroppableDayCell cell={cell}>
      <div className={cn("flex h-full flex-col gap-1 border-l border-t py-1.5 lg:pb-2 lg:pt-1", isSunday && "border-l-0")}>
        <button
          onClick={handleClick}
          className={cn(
            "flex size-6 translate-x-1 items-center justify-center rounded-full text-xs font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring lg:px-2",
            !currentMonth && "opacity-20",
            isToday(date) && "bg-primary font-bold text-primary-foreground hover:bg-primary"
          )}
        >
          {day}
        </button>

        <div className={cn("flex h-6 gap-1 px-2 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0", !currentMonth && "opacity-50")}>
          {[0, 1, 2].map(position => {
            const booking = cellBookings.find(e => e.position === position);
            const bookingKey = booking ? `booking-${booking.id}-${position}` : `empty-${position}`;

            return (
              <div key={bookingKey} className="lg:flex-1">
                {booking && (
                  <>
                    <BookingBullet className="lg:hidden" color={booking.color} />
                    <MonthBookingBadge className="hidden lg:flex" booking={booking} cellDate={startOfDay(date)} />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {cellBookings.length > MAX_VISIBLE_EVENTS && (
          <p className={cn("h-4.5 px-1.5 text-xs font-semibold text-muted-foreground", !currentMonth && "opacity-50")}>
            <span className="sm:hidden">+{cellBookings.length - MAX_VISIBLE_EVENTS}</span>
            <span className="hidden sm:inline"> {cellBookings.length - MAX_VISIBLE_EVENTS} more...</span>
          </p>
        )}
      </div>
    </DroppableDayCell>
  );
}
