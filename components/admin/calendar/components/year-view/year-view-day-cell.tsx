import { isToday } from "date-fns";
import { useRouter } from "next/navigation";

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { cn } from "@/lib/utils";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  day: number;
  date: Date;
  bookings: IBooking[];
}

export function YearViewDayCell({ day, date, bookings }: IProps) {
  const { push } = useRouter();
  const { setSelectedDate } = useCalendar();

  const maxIndicators = 3;
  const bookingCount = bookings.length;

  const handleClick = () => {
    setSelectedDate(date);
    push("/day-view");
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex h-11 flex-1 flex-col items-center justify-start gap-0.5 rounded-md pt-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full text-xs font-medium",
          isToday(date) && "bg-primary font-semibold text-primary-foreground"
        )}
      >
        {day}
      </div>

      {bookingCount > 0 && (
        <div className="mt-0.5 flex gap-0.5">
          {bookingCount <= maxIndicators ? (
            bookings.map(booking => (
              <div
                key={booking.id}
                className={cn(
                  "size-1.5 rounded-full",
                  booking.color === "blue" && "bg-blue-600",
                  booking.color === "green" && "bg-green-600",
                  booking.color === "red" && "bg-red-600",
                  booking.color === "yellow" && "bg-yellow-600",
                  booking.color === "purple" && "bg-purple-600",
                  booking.color === "orange" && "bg-orange-600",
                  booking.color === "gray" && "bg-neutral-600"
                )}
              />
            ))
          ) : (
            <>
              <div
                className={cn(
                  "size-1.5 rounded-full",
                  bookings[0].color === "blue" && "bg-blue-600",
                  bookings[0].color === "green" && "bg-green-600",
                  bookings[0].color === "red" && "bg-red-600",
                  bookings[0].color === "yellow" && "bg-yellow-600",
                  bookings[0].color === "purple" && "bg-purple-600",
                  bookings[0].color === "orange" && "bg-orange-600"
                )}
              />
              <span className="text-[7px] text-muted-foreground">+{bookingCount - 1}</span>
            </>
          )}
        </div>
      )}
    </button>
  );
}
