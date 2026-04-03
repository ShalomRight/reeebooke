"use client";

import { format, parseISO } from "date-fns";
import { Calendar, Clock, Text, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditBookingDialog } from "@/components/admin/calendar/components/dialogs/edit-booking-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import type { IBooking } from "@/components/admin/calendar/interfaces";

interface IProps {
  booking: IBooking;
  children: React.ReactNode;
}

import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

export function BookingDetailsDialog({ booking, children }: IProps) {
  const { mode } = useCalendar();
  const startDate = parseISO(booking.startDate);
  const endDate = parseISO(booking.endDate);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{booking.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <User className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Responsible</p>
                <p className="text-sm text-muted-foreground">{booking.user.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{format(startDate, "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">{format(endDate, "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Text className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground">{booking.description}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            {mode === "admin" && (
              <EditBookingDialog booking={booking}>
                <Button type="button" variant="outline">
                  Edit
                </Button>
              </EditBookingDialog>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
