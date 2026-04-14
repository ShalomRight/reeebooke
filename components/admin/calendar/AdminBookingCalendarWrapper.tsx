"use client";

import { useState, useEffect, useMemo } from "react";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  createEvent,
  createMonthView,
  createWeekView,
  createDayView,
  type Event as DayflowEvent,
} from "@dayflow/core";
import { useCalendarApp, DayFlowCalendar } from "@dayflow/react";
import "@dayflow/core/dist/styles.css";

// ─── Status → calendarId mapping ─────────────────────────────────────────────
const STATUS_CALENDAR_MAP: Record<string, string> = {
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  PENDING: "pending",
  CANCELLED: "cancelled",
};

const CALENDARS = [
  { id: "confirmed", name: "Confirmed",  colors: { eventColor: "#16a34a", eventSelectedColor: "#15803d", lineColor: "#16a34a", textColor: "#fff" }, isVisible: true },
  { id: "completed", name: "Completed",  colors: { eventColor: "#2563eb", eventSelectedColor: "#1d4ed8", lineColor: "#2563eb", textColor: "#fff" }, isVisible: true },
  { id: "pending",   name: "Pending",    colors: { eventColor: "#d97706", eventSelectedColor: "#b45309", lineColor: "#d97706", textColor: "#fff" }, isVisible: true },
  { id: "cancelled", name: "Cancelled",  colors: { eventColor: "#dc2626", eventSelectedColor: "#b91c1c", lineColor: "#dc2626", textColor: "#fff" }, isVisible: true },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseBookingTime(timeStr: string): string {
  if (!timeStr) return "09:00:00";
  const t = timeStr.trim();
  const ampmMatch = t.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (ampmMatch) {
    let h = parseInt(ampmMatch[1]);
    const m = ampmMatch[2];
    const ampm = ampmMatch[3].toLowerCase();
    if (ampm === "pm" && h < 12) h += 12;
    if (ampm === "am" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${m}:00`;
  }
  const parts = t.split(":");
  return parts.length === 2 ? `${t}:00` : t;
}

function bookingToEvent(b: any): DayflowEvent {
  const dateStr: string = b.date?.includes("T") ? b.date.split("T")[0] : (b.date ?? new Date().toISOString().split("T")[0]);
  const timeStr = parseBookingTime(b.time || "09:00");
  const [y, mo, d] = dateStr.split("-").map(Number);
  const [h, mi] = timeStr.split(":").map(Number);
  const durationMins: number = b.service?.duration || 60;
  const start = new Date(y, mo - 1, d, h, mi);
  const end = new Date(start.getTime() + durationMins * 60_000);
  const status = (b.status || "PENDING").toUpperCase();
  const calendarId = STATUS_CALENDAR_MAP[status] ?? "pending";
  const userName = b.userName || b.user?.name || "Guest";

  return createEvent({
    id: String(b.id),
    title: b.service?.name || "Booking",
    start,
    end,
    description: `${userName} · ${b.status ?? "pending"}${b.phone ? ` · ${b.phone}` : ""}`,
    calendarId,
    meta: { booking: b, userName, status },
  });
}

// ─── Status legend dot ────────────────────────────────────────────────────────
function StatusLegend() {
  return (
    <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
      {CALENDARS.map((c) => (
        <span key={c.id} className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.colors.eventColor }} />
          {c.name}
        </span>
      ))}
    </div>
  );
}

// ─── Inner calendar using Dayflow ────────────────────────────────────────────
function BookingDayflowCalendar({ events }: { events: DayflowEvent[] }) {
  const calendar = useCalendarApp({
    views: [createMonthView(), createWeekView(), createDayView()],
    events,
    calendars: CALENDARS,
  });

  return <DayFlowCalendar calendar={calendar} />;
}

// ─── Wrapper component ────────────────────────────────────────────────────────
export function AdminBookingCalendarWrapper({
  mode = "admin",
  currentUserId,
}: {
  mode?: "admin" | "staff" | "client";
  currentUserId?: string;
}) {
  const [rawBookings, setRawBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/bookings?limit=1000");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as any;
      let all: any[] = data.bookings || [];
      if (mode === "client" && currentUserId) {
        all = all.filter((b: any) => (b.user?.id || b.userId) === currentUserId);
      }
      setRawBookings(all);
    } catch (err: any) {
      setError(err?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const events = useMemo(() => rawBookings.map(bookingToEvent), [rawBookings]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    rawBookings.forEach((b) => {
      const s = (b.status || "PENDING").toUpperCase();
      map[s] = (map[s] || 0) + 1;
    });
    return map;
  }, [rawBookings]);

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-card-foreground">Bookings Calendar</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {loading ? "Loading…" : `${rawBookings.length} bookings`}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Stat badges */}
          {!loading && Object.entries(counts).map(([status, count]) => (
            <Badge
              key={status}
              variant="outline"
              className="text-[11px] font-medium gap-1"
              style={{ borderColor: CALENDARS.find((c) => c.id === STATUS_CALENDAR_MAP[status])?.colors.eventColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: CALENDARS.find((c) => c.id === STATUS_CALENDAR_MAP[status])?.colors.eventColor }}
              />
              {count} {status.charAt(0) + status.slice(1).toLowerCase()}
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={loadData} disabled={loading} className="gap-1.5 text-muted-foreground">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Legend */}
        <div className="mb-4">
          <StatusLegend />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <AlertCircle className="w-8 h-8 opacity-40" />
            <p className="text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
          </div>
        ) : (
          <BookingDayflowCalendar key={`df-${rawBookings.length}`} events={events} />
        )}
      </div>
    </div>
  );
}
