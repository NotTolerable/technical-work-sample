import type { BookingStatus } from "@prisma/client";

export type AdminBooking = {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  status: BookingStatus;
  createdAt: Date;
  physician: {
    name: string;
  };
  timeSlot: {
    startTime: Date;
    endTime: Date;
  };
};
