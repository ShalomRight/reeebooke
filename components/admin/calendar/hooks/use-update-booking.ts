import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import type { IBooking } from "@/components/admin/calendar/interfaces";

export function useUpdateBooking() {
  const { setLocalBookings } = useCalendar();

  // This is just and example, in a real scenario
  // you would call an API to update the booking
  const updateBooking = (booking: IBooking) => {
    const newBooking: IBooking = booking;

    newBooking.startDate = new Date(booking.startDate).toISOString();
    newBooking.endDate = new Date(booking.endDate).toISOString();

    setLocalBookings(prev => {
      const index = prev.findIndex(e => e.id === booking.id);
      if (index === -1) return prev;
      return [...prev.slice(0, index), newBooking, ...prev.slice(index + 1)];
    });
  };

  return { updateBooking };
}
