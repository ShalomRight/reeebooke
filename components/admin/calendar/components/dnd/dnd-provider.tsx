"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CustomDragLayer } from "@/components/admin/calendar/components/dnd/custom-drag-layer";
import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

interface DndProviderWrapperProps {
  children: React.ReactNode;
}

export function DndProviderWrapper({ children }: DndProviderWrapperProps) {
  const { mode } = useCalendar();
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
      {mode === "admin" && <CustomDragLayer />}
    </DndProvider>
  );
}
