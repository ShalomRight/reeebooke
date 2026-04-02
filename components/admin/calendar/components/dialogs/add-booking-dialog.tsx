"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServices } from "@/lib/swr/hooks/services";

import { useDisclosure } from "@/hooks/use-disclosure";
import { useCalendar } from "@/components/admin/calendar/contexts/calendar-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TimeInput } from "@/components/ui/time-input";
import { SingleDayPicker } from "@/components/ui/single-day-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogHeader, DialogClose, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

import { bookingSchema } from "@/components/admin/calendar/schemas";

import type { TimeValue } from "react-aria-components";
import type { TBookingFormData } from "@/components/admin/calendar/schemas";

interface IProps {
  children: React.ReactNode;
  startDate?: Date;
  startTime?: { hour: number; minute: number };
}

export function AddBookingDialog({ children, startDate, startTime }: IProps) {
  const { users } = useCalendar();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const form = useForm<TBookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      user: "",
      serviceId: "",
      startDate: typeof startDate !== "undefined" ? startDate : undefined,
      startTime: typeof startTime !== "undefined" ? startTime : undefined,
    },
  });

  const { data: servicesData } = useServices({ limit: 100 });
  const services = servicesData?.services || [];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: TBookingFormData) => {
    setIsSubmitting(true);
    try {
      const userObj = users.find(u => u.id === values.user);
      const dateStr = format(values.startDate, "yyyy-MM-dd");
      
      const hour = values.startTime.hour;
      const minute = String(values.startTime.minute).padStart(2, '0');
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const standardHour = hour % 12 || 12;
      const timeStr = `${standardHour}:${minute} ${suffix}`;
      
      const payload = {
        serviceIds: [values.serviceId],
        date: dateStr,
        time: timeStr,
        paymentMethod: "cash",
        userName: userObj?.name || "Calendar Guest",
        phone: userObj?.phone || "+1234567890", 
      };

      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let errMsg = "Failed to create booking";
        try {
          const bodyJSON = await res.json();
          if (bodyJSON.error) errMsg = bodyJSON.error;
        } catch (e) {}
        throw new Error(errMsg);
      }

      toast.success("Booking created successfully!");
      onClose();
      form.reset();
      window.location.reload(); 
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    form.reset({
      startDate,
      startTime,
    });
  }, [startDate, startTime, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
          <DialogDescription>
            Create a new manual booking. The standard booking API will be leveraged to secure the slot and assign a service.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="booking-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="user"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Responsible</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger data-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>

                      <SelectContent>
                        {users.map(user => (
                          <SelectItem key={user.id} value={user.id} className="flex-1">
                            <div className="flex items-center gap-2">
                              <Avatar key={user.id} className="size-6">
                                <AvatarImage src={user.picturePath ?? undefined} alt={user.name} />
                                <AvatarFallback className="text-xxs">{user.name[0]}</AvatarFallback>
                              </Avatar>

                              <p className="truncate">{user.name}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger data-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>

                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service.id} value={service.id}>
                            <div className="flex items-center gap-2">
                              {service.name} (GHS {service.price})
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="startDate">Start Date</FormLabel>

                    <FormControl>
                      <SingleDayPicker
                        id="startDate"
                        value={field.value}
                        onSelect={date => field.onChange(date as Date)}
                        placeholder="Select a date"
                        data-invalid={fieldState.invalid}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Time</FormLabel>

                    <FormControl>
                      <TimeInput value={field.value as TimeValue} onChange={field.onChange} hourCycle={12} data-invalid={fieldState.invalid} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button form="booking-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
