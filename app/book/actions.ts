"use server";

import { revalidatePath } from "next/cache";
import { BookingStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAvailableTimeSlotForBooking } from "@/lib/availability";
import { bookingRequestSchema } from "@/lib/validations";

export type BookingConfirmation = {
  physicianName: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  patientName: string;
  status: "pending";
};

type BookingFieldErrors = Partial<
  Record<
    | "physicianId"
    | "timeSlotId"
    | "patientName"
    | "patientEmail"
    | "patientPhone"
    | "reason",
    string[]
  >
>;

export type BookingFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: BookingFieldErrors;
  confirmation?: BookingConfirmation;
};

export async function createBooking(
  _previousState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const parsed = bookingRequestSchema.safeParse({
    physicianId: formData.get("physicianId"),
    timeSlotId: formData.get("timeSlotId"),
    patientName: formData.get("patientName"),
    patientEmail: formData.get("patientEmail"),
    patientPhone: formData.get("patientPhone"),
    reason: formData.get("reason"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const booking = await prisma
    .$transaction(
      async (tx) => {
        const timeSlot = await getAvailableTimeSlotForBooking(
          parsed.data.physicianId,
          parsed.data.timeSlotId,
          tx,
        );

        if (!timeSlot) {
          return null;
        }

        return tx.booking.create({
          data: {
            physicianId: parsed.data.physicianId,
            timeSlotId: parsed.data.timeSlotId,
            patientName: parsed.data.patientName,
            patientEmail: parsed.data.patientEmail,
            patientPhone: parsed.data.patientPhone,
            reason: parsed.data.reason,
            status: BookingStatus.PENDING,
          },
          include: {
            physician: true,
            timeSlot: true,
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    )
    .catch((error: unknown) => {
      if (isSerializableConflict(error)) {
        return null;
      }

      throw error;
    });

  if (!booking) {
    return {
      status: "error",
      message:
        "That appointment time is no longer available. Please choose another time.",
      fieldErrors: {
        timeSlotId: ["Choose another appointment time."],
      },
    };
  }

  revalidatePath("/book");

  return {
    status: "success",
    message: "Your booking request has been submitted for admin review.",
    confirmation: {
      physicianName: booking.physician.name,
      appointmentStartTime: booking.timeSlot.startTime.toISOString(),
      appointmentEndTime: booking.timeSlot.endTime.toISOString(),
      patientName: booking.patientName,
      status: "pending",
    },
  };
}

function isSerializableConflict(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2034"
  );
}
