"use client";

import { useDrag } from "react-dnd";
import { useRef, useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

import { cn } from "@/lib/utils";

import type { IBooking } from "@/components/admin/calendar/interfaces";

export const ItemTypes = {
  EVENT: "booking",
};

interface DraggableBookingProps {
  booking: IBooking;
  children: React.ReactNode;
}

export function DraggableBooking({ booking, children }: DraggableBookingProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: () => {
      const width = ref.current?.offsetWidth || 0;
      const height = ref.current?.offsetHeight || 0;
      return { booking, children, width, height };
    },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  }));

  // Hide the default drag preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(ref);

  return (
    <div ref={ref} className={cn(isDragging && "opacity-40")}>
      {children}
    </div>
  );
}
