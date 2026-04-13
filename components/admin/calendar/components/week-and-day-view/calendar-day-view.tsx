import { Calendar, Clock, User } from "lucide-react";
import { parseISO, areIntervalsOverlapping, format } from "date-fns";

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SingleCalendar } from "@/components/ui/single-calendar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { AddBookingSheet } from "@/components/admin/calendar/components/dialogs/AddBookingSheet";
import { BookingBlock } from "@/components/admin/calendar/components/week-and-day-view/booking-block";
import { DroppableTimeBlock } from "@/components/admin/calendar/components/dnd/droppable-time-block";
import { CalendarTimeline } from "@/components/admin/calendar/components/week-and-day-view/calendar-time-line";
import { DayViewMultiDayBookingsRow } from "@/components/admin/calendar/components/week-and-day-view/day-view-multi-day-bookings-row";

import { cn } from "@/lib/utils";
import { groupBookings, getBookingBlockStyle, isWorkingHour, getCurrentBookings, getVisibleHours } from "@/components/admin/calendar/helpers";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  singleDayBookings: IBooking[];
  multiDayBookings: IBooking[];
}

export function CalendarDayView({ singleDayBookings, multiDayBookings }: IProps) {
  const { selectedDate, setSelectedDate, users, visibleHours, workingHours } = useCalendar();

  const { hours, earliestBookingHour, latestBookingHour } = getVisibleHours(visibleHours, singleDayBookings);

  const currentBookings = getCurrentBookings(singleDayBookings);

  const dayBookings = singleDayBookings.filter(booking => {
    const bookingDate = parseISO(booking.startDate);
    return (
      bookingDate.getDate() === selectedDate.getDate() &&
      bookingDate.getMonth() === selectedDate.getMonth() &&
      bookingDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const groupedBookings = groupBookings(dayBookings);

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <div>
          <DayViewMultiDayBookingsRow selectedDate={selectedDate} multiDayBookings={multiDayBookings} />

          {/* Day header */}
          <div className="relative z-20 flex border-b">
            <div className="w-18"></div>
            <span className="flex-1 border-l py-2 text-center text-xs font-medium text-muted-foreground">
              {format(selectedDate, "EE")} <span className="font-semibold text-foreground">{format(selectedDate, "d")}</span>
            </span>
          </div>
        </div>

        <ScrollArea className="h-[800px]" type="always">
          <div className="flex">
            {/* Hours column */}
            <div className="relative w-18">
              {hours.map((hour, index) => (
                <div key={hour} className="relative" style={{ height: "96px" }}>
                  <div className="absolute -top-3 right-2 flex h-6 items-center">
                    {index !== 0 && <span className="text-xs text-muted-foreground">{format(new Date().setHours(hour, 0, 0, 0), "hh a")}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="relative flex-1 border-l">
              <div className="relative">
                {hours.map((hour, index) => {
                  const isDisabled = !isWorkingHour(selectedDate, hour, workingHours);

                  return (
                    <div key={hour} className={cn("group relative", isDisabled && "bg-calendar-disabled-hour")} style={{ height: "96px" }}>
                      {index !== 0 && <div className="pointer-bookings-none absolute inset-x-0 top-0 border-b"></div>}

                      <DroppableTimeBlock date={selectedDate} hour={hour} minute={0}>
                        <div className="absolute top-0 bottom-0 left-0 right-0 group-hover:bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pb-2">
                          <AddBookingSheet initialDate={selectedDate} initialTime={{ hour, minute: 0 }}>
                            <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full hover:bg-slate-200">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </AddBookingSheet>
                        </div>
                      </DroppableTimeBlock>

                      <DroppableTimeBlock date={selectedDate} hour={hour} minute={15}>
                        <div className="absolute top-0 bottom-0 left-0 right-0 group-hover:bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pb-2">
                          <AddBookingSheet initialDate={selectedDate} initialTime={{ hour, minute: 15 }}>
                            <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full hover:bg-slate-200">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </AddBookingSheet>
                        </div>
                      </DroppableTimeBlock>

                      <div className="pointer-bookings-none absolute inset-x-0 top-1/2 border-b border-dashed"></div>

                      <DroppableTimeBlock date={selectedDate} hour={hour} minute={30}>
                        <div className="absolute top-0 bottom-0 left-0 right-0 group-hover:bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pb-2">
                          <AddBookingSheet initialDate={selectedDate} initialTime={{ hour, minute: 30 }}>
                            <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full hover:bg-slate-200">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </AddBookingSheet>
                        </div>
                      </DroppableTimeBlock>

                      <DroppableTimeBlock date={selectedDate} hour={hour} minute={45}>
                        <div className="absolute top-0 bottom-0 left-0 right-0 group-hover:bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pb-2">
                          <AddBookingSheet initialDate={selectedDate} initialTime={{ hour, minute: 45 }}>
                            <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full hover:bg-slate-200">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </AddBookingSheet>
                        </div>
                      </DroppableTimeBlock>
                    </div>
                  );
                })}

                {groupedBookings.map((group, groupIndex) =>
                  group.map(booking => {
                    let style = getBookingBlockStyle(booking, selectedDate, groupIndex, groupedBookings.length, { from: earliestBookingHour, to: latestBookingHour });
                    const hasOverlap = groupedBookings.some(
                      (otherGroup, otherIndex) =>
                        otherIndex !== groupIndex &&
                        otherGroup.some(otherBooking =>
                          areIntervalsOverlapping(
                            { start: parseISO(booking.startDate), end: parseISO(booking.endDate) },
                            { start: parseISO(otherBooking.startDate), end: parseISO(otherBooking.endDate) }
                          )
                        )
                    );

                    if (!hasOverlap) style = { ...style, width: "100%", left: "0%" };

                    return (
                      <div key={booking.id} className="absolute p-1" style={style}>
                        <BookingBlock booking={booking} />
                      </div>
                    );
                  })
                )}
              </div>

              <CalendarTimeline firstVisibleHour={earliestBookingHour} lastVisibleHour={latestBookingHour} />
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="hidden w-64 divide-y border-l md:block">
        <SingleCalendar mode="single" selected={selectedDate} onSelect={setSelectedDate} autoFocus />

        <div className="flex-1 space-y-3">
          {currentBookings.length > 0 ? (
            <div className="flex items-start gap-2 px-4 pt-4">
              <span className="relative mt-[5px] flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-green-600"></span>
              </span>

              <p className="text-sm font-semibold text-foreground">Happening now</p>
            </div>
          ) : (
            <p className="p-4 text-center text-sm italic text-muted-foreground">No appointments or consultations at the moment</p>
          )}

          {currentBookings.length > 0 && (
            <ScrollArea className="h-[422px] px-4" type="always">
              <div className="space-y-6 pb-4">
                {currentBookings.map(booking => {
                  const user = users.find(user => user.id === booking.user.id);

                  return (
                    <div key={booking.id} className="space-y-1.5">
                      <p className="line-clamp-2 text-sm font-semibold">{booking.title}</p>

                      {user && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <User className="size-3.5" />
                          <span className="text-sm">{user.name}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="size-3.5" />
                        <span className="text-sm">{format(new Date(), "MMM d, yyyy")}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-3.5" />
                        <span className="text-sm">
                          {format(parseISO(booking.startDate), "h:mm a")} - {format(parseISO(booking.endDate), "h:mm a")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
