import { useMemo } from "react";
import { formatDate } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getBookingsCount, navigateDate, rangeText } from "@/components/admin/calendar/helpers";

import type { IBooking } from "@/components/admin/calendar/interfaces";
import type { TCalendarView } from "@/components/admin/calendar/types";

interface IProps {
  view: TCalendarView;
  bookings: IBooking[];
}

export function DateNavigator({ view, bookings }: IProps) {
  const { selectedDate, setSelectedDate } = useCalendar();

  const month = formatDate(selectedDate, "MMMM");
  const year = selectedDate.getFullYear();

  const bookingCount = useMemo(() => getBookingsCount(bookings, selectedDate, view), [bookings, selectedDate, view]);

  const handlePrevious = () => setSelectedDate(navigateDate(selectedDate, view, "previous"));
  const handleNext = () => setSelectedDate(navigateDate(selectedDate, view, "next"));

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">
          {month} {year}
        </span>
        <Badge variant="outline" className="px-1.5">
          {bookingCount} bookings
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handlePrevious}>
          <ChevronLeft />
        </Button>

        <p className="text-sm text-muted-foreground">{rangeText(view, selectedDate)}</p>

        <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handleNext}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
