import { z } from "zod";

export const bookingSchema = z
  .object({
    user: z.string().min(1, "User is required"),
    serviceId: z.string().min(1, "Service is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    startTime: z.object({ hour: z.number(), minute: z.number() }, { required_error: "Start time is required" }),
  });

export type TBookingFormData = z.infer<typeof bookingSchema>;
