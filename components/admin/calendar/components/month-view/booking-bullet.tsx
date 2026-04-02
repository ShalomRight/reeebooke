import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import type { TBookingColor } from "@/components/admin/calendar/types";

const bookingBulletVariants = cva("size-2 rounded-full", {
  variants: {
    color: {
      blue: "bg-blue-600 dark:bg-blue-500",
      green: "bg-green-600 dark:bg-green-500",
      red: "bg-red-600 dark:bg-red-500",
      yellow: "bg-yellow-600 dark:bg-yellow-500",
      purple: "bg-purple-600 dark:bg-purple-500",
      gray: "bg-neutral-600 dark:bg-neutral-500",
      orange: "bg-orange-600 dark:bg-orange-500",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export function BookingBullet({ color, className }: { color: TBookingColor; className: string }) {
  return <div className={cn(bookingBulletVariants({ color, className }))} />;
}
