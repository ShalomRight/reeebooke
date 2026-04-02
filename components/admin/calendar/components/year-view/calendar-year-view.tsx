import { useMemo } from "react";
import { addMonths, startOfYear } from "date-fns";

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { YearViewMonth } from "@/components/admin/calendar/components/year-view/year-view-month";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  allBookings: IBooking[];
}

export function CalendarYearView({ allBookings }: IProps) {
  const { selectedDate } = useCalendar();

  const months = useMemo(() => {
    const yearStart = startOfYear(selectedDate);
    return Array.from({ length: 12 }, (_, i) => addMonths(yearStart, i));
  }, [selectedDate]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {months.map(month => (
          <YearViewMonth key={month.toString()} month={month} bookings={allBookings} />
        ))}
      </div>
    </div>
  );
}
