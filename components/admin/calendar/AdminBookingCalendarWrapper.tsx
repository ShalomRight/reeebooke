"use client";

import { useState, useEffect } from "react";
import { Settings, Loader2 } from "lucide-react";
import { CalendarProvider } from "@/components/admin/calendar/contexts/calendar-context";
import { ChangeBadgeVariantInput } from "@/components/admin/calendar/components/change-badge-variant-input";
import { ChangeVisibleHoursInput } from "@/components/admin/calendar/components/change-visible-hours-input";
import { ChangeWorkingHoursInput } from "@/components/admin/calendar/components/change-working-hours-input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ClientContainer } from "@/components/admin/calendar/components/client-container";
import type { IBooking, IUser } from "@/components/admin/calendar/interfaces";
import type { TBookingColor } from "@/components/admin/calendar/types";

function getStatusColor(status: string): TBookingColor {
  switch ((status || "").toUpperCase()) {
    case "CONFIRMED":
    case "COMPLETED":
      return "green";
    case "PENDING":
      return "yellow";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
}

export function AdminBookingCalendarWrapper({ 
  mode = "admin", 
  currentUserId 
}: { 
  mode?: "admin" | "staff" | "client", 
  currentUserId?: string 
}) {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/v1/bookings?limit=1000");
        if (res.ok) {
          const data = await res.json();
          const uniqueUsersMap = new Map<string, IUser>();
          
          let allBookings = data.bookings || [];
          if (mode === "client" && currentUserId) {
            allBookings = allBookings.filter((b: any) => {
              const uId = b.user?.id || b.userId;
              return uId === currentUserId;
            });
          }

          const mappedBookings: IBooking[] = allBookings.map((b: any) => {
            const userId = b.user?.id || b.userId || "anonymous";
            const userName = b.userName || b.user?.name || "Guest";
            if (!uniqueUsersMap.has(userId)) {
              uniqueUsersMap.set(userId, {
                id: userId,
                name: userName,
                picturePath: b.user?.image || null
              });
            }

            const dateStr = b.date?.includes("T") ? b.date.split("T")[0] : b.date;
            
            let timeStr = b.time || "09:00";
            if (timeStr.toLowerCase().includes("am") || timeStr.toLowerCase().includes("pm")) {
               const timeMatch = timeStr.trim().split(" ")[0];
               let ampm = timeStr.trim().split(" ")[1];
               let [h, m] = timeMatch.split(":");
               let hours = parseInt(h);
               if (ampm?.toLowerCase() === "pm" && hours < 12) hours += 12;
               if (ampm?.toLowerCase() === "am" && hours === 12) hours = 0;
               timeStr = `${hours.toString().padStart(2, '0')}:${m || "00"}:00`;
            } else if (timeStr.split(":").length === 2) {
               timeStr = `${timeStr}:00`;
            }

            let startIso = new Date().toISOString(); 
            try { 
                startIso = new Date(`${dateStr}T${timeStr}`).toISOString(); 
            } catch (e) {
                // Ignore parse errors gracefully
            }
            
            const endDate = new Date(new Date(startIso).getTime() + 60 * 60 * 1000);
            
            const numericId = typeof b.id === 'string' 
                ? parseInt(b.id.replace(/\D/g, '').substring(0, 8) || "0", 10) || Math.floor(Math.random() * 1000000)
                : b.id;

            return {
              id: numericId,
              startDate: startIso,
              endDate: endDate.toISOString(),
              title: b.service?.name || "Service Booking",
              color: getStatusColor(b.status || "PENDING"),
              description: `Status: ${b.status || "Unknown"} | Client: ${userName}`,
              user: uniqueUsersMap.get(userId)!
            } as IBooking;
          });

          // Ensure there's always an "all" or general user for the context selector if needed.
          
          setUsers(Array.from(uniqueUsersMap.values()));
          setBookings(mappedBookings);
        }
      } catch (err) {
        console.error("Failed to load calendar data:", err);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="bg-card rounded-xl p-6 border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-card-foreground font-sans">
          Dynamic Bookings Calendar
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag and drop support for managing blocks of time and visualizing appointments dynamically.
        </p>
      </div>

      <CalendarProvider users={users} bookings={bookings} mode={mode}>
        <div className="mx-auto flex w-full flex-col gap-4">
          <ClientContainer initialView="month" />

          {mode === "admin" && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="flex-none gap-2 py-0 hover:no-underline">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Settings className="size-4" />
                    <p className="text-sm font-semibold">Calendar Preferences</p>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="mt-4 flex flex-col gap-6 max-w-sm">
                    <ChangeBadgeVariantInput />
                    <ChangeVisibleHoursInput />
                    <ChangeWorkingHoursInput />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </CalendarProvider>
    </div>
  );
}
