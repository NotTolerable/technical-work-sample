import { z } from "zod";

export const bookingRequestSchema = z.object({
  physicianId: z.string().min(1, "Choose a physician."),
  timeSlotId: z.string().min(1, "Choose an appointment time."),
  patientName: z.string().trim().min(1, "Enter your name."),
  patientEmail: z.string().trim().email("Enter a valid email address."),
  patientPhone: z.string().trim().min(7, "Enter a valid phone number."),
  reason: z.string().trim().min(1, "Enter a reason for your visit."),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

export const adminStatusUpdateSchema = z.object({
  bookingId: z.string().min(1, "Booking is required."),
  status: z.enum(["CONFIRMED", "CANCELLED"]),
});
