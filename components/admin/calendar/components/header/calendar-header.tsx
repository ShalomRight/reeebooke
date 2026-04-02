
import { Columns, Grid3x3, List, Plus, Grid2x2, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";

import { UserSelect } from "@/components/admin/calendar/components/header/user-select";
import { TodayButton } from "@/components/admin/calendar/components/header/today-button";
import { DateNavigator } from "@/components/admin/calendar/components/header/date-navigator";
import { AddBookingDialog } from "@/components/admin/calendar/components/dialogs/add-booking-dialog";

import type { IBooking } from "@/components/admin/calendar/interfaces";
import type { TCalendarView } from "@/components/admin/calendar/types";

interface IProps {
  view: TCalendarView;
  setView: React.Dispatch<React.SetStateAction<TCalendarView>>;
  bookings: IBooking[];
}

export function CalendarHeader({ view, setView, bookings }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} bookings={bookings} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
            <Button onClick={() => setView("day")} aria-label="View by day" size="icon" variant={view === "day" ? "default" : "outline"} className="rounded-r-none [&_svg]:size-5">
              <List strokeWidth={1.8} />
            </Button>

            <Button
              onClick={() => setView("week")}
              aria-label="View by week"
              size="icon"
              variant={view === "week" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5"
            >
              <Columns strokeWidth={1.8} />
            </Button>

            <Button
              onClick={() => setView("month")}
              aria-label="View by month"
              size="icon"
              variant={view === "month" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5"
            >
              <Grid2x2 strokeWidth={1.8} />
            </Button>

            <Button
              onClick={() => setView("year")}
              aria-label="View by year"
              size="icon"
              variant={view === "year" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5"
            >
              <Grid3x3 strokeWidth={1.8} />
            </Button>

            <Button
              onClick={() => setView("agenda")}
              aria-label="View by agenda"
              size="icon"
              variant={view === "agenda" ? "default" : "outline"}
              className="-ml-px rounded-l-none [&_svg]:size-5"
            >
              <CalendarRange strokeWidth={1.8} />
            </Button>
          </div>

          <UserSelect />
        </div>

        <AddBookingDialog>
          <Button className="w-full sm:w-auto">
            <Plus />
            Add Booking
          </Button>
        </AddBookingDialog>
      </div>
    </div>
  );
}
