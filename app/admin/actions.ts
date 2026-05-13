"use server";

import { revalidatePath } from "next/cache";
import { BookingStatus, Prisma } from "@prisma/client";
import { hasBlockingBookingForTimeSlot } from "@/lib/availability";
import { prisma } from "@/lib/prisma";
import { adminStatusUpdateSchema } from "@/lib/validations";

const allowedStatusTransitions: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.PENDING]: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED],
  [BookingStatus.CONFIRMED]: [BookingStatus.CANCELLED],
  [BookingStatus.CANCELLED]: [],
};

export async function updateBookingStatus(formData: FormData) {
  const parsed = adminStatusUpdateSchema.safeParse({
    bookingId: formData.get("bookingId"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    throw new Error("Choose a valid booking status update.");
  }

  const nextStatus = parsed.data.status as BookingStatus;

  await prisma.$transaction(
    async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id: parsed.data.bookingId },
        select: {
          id: true,
          status: true,
          timeSlotId: true,
        },
      });

      if (!booking) {
        throw new Error("Booking not found.");
      }

      if (!allowedStatusTransitions[booking.status].includes(nextStatus)) {
        throw new Error("That status update is not allowed for this booking.");
      }

      if (
        nextStatus === BookingStatus.CONFIRMED &&
        (await hasBlockingBookingForTimeSlot(booking.timeSlotId, tx, booking.id))
      ) {
        throw new Error(
          "This appointment time already has a pending or confirmed booking.",
        );
      }

      await tx.booking.update({
        where: { id: booking.id },
        data: { status: nextStatus },
      });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
  );

  revalidatePath("/admin");
  revalidatePath("/book");
}
