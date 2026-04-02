import type { TBookingColor } from "@/components/admin/calendar/types";

export interface IUser {
  id: string;
  name: string;
  picturePath: string | null;
}

export interface IBooking {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  color: TBookingColor;
  description: string;
  user: IUser;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
