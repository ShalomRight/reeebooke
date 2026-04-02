"use client";

import { useDrop } from "react-dnd";
import { parseISO, differenceInMilliseconds } from "date-fns";

import { useUpdateBooking } from "@/components/admin/calendar/hooks/use-update-booking";

import { cn } from "@/lib/utils";
import { ItemTypes } from "@/components/admin/calendar/components/dnd/draggable-booking";

import type { IBooking, ICalendarCell } from "@/components/admin/calendar/interfaces";

interface DroppableDayCellProps {
  cell: ICalendarCell;
  children: React.ReactNode;
}

export function DroppableDayCell({ cell, children }: DroppableDayCellProps) {
  const { updateBooking } = useUpdateBooking();

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.EVENT,
      drop: (item: { booking: IBooking }) => {
        const droppedBooking = item.booking;

        const bookingStartDate = parseISO(droppedBooking.startDate);
        const bookingEndDate = parseISO(droppedBooking.endDate);

        const bookingDurationMs = differenceInMilliseconds(bookingEndDate, bookingStartDate);

        const newStartDate = new Date(cell.date);
        newStartDate.setHours(bookingStartDate.getHours(), bookingStartDate.getMinutes(), bookingStartDate.getSeconds(), bookingStartDate.getMilliseconds());
        const newEndDate = new Date(newStartDate.getTime() + bookingDurationMs);

        updateBooking({
          ...droppedBooking,
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        });

        return { moved: true };
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [cell.date, updateBooking]
  );

  return (
    <div ref={drop as unknown as React.RefObject<HTMLDivElement>} className={cn(isOver && canDrop && "bg-accent/50")}>
      {children}
    </div>
  );
}
