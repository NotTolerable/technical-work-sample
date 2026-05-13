import { BookingStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type AvailableTimeSlot = {
  id: string;
  startTime: Date;
  endTime: Date;
};

export type PhysicianWithAvailableSlots = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  location: string;
  timeSlots: AvailableTimeSlot[];
};

// Pending and confirmed bookings hold a slot; cancelled bookings intentionally free it.
export const bookingBlockingStatuses = [
  BookingStatus.PENDING,
  BookingStatus.CONFIRMED,
] as const;

export async function getPhysiciansWithAvailableTimeSlots(): Promise<
  PhysicianWithAvailableSlots[]
> {
  return prisma.physician.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      specialty: true,
      bio: true,
      location: true,
      timeSlots: {
        where: availableTimeSlotWhere(),
        orderBy: { startTime: "asc" },
        select: {
          id: true,
          startTime: true,
          endTime: true,
        },
      },
    },
  });
}

export function availableTimeSlotWhere(): Prisma.TimeSlotWhereInput {
  return {
    bookings: {
      none: {
        status: { in: [...bookingBlockingStatuses] },
      },
    },
  };
}

export async function getAvailableTimeSlotForBooking(
  physicianId: string,
  timeSlotId: string,
  db: Prisma.TransactionClient | typeof prisma = prisma,
) {
  return db.timeSlot.findFirst({
    where: {
      id: timeSlotId,
      physicianId,
      ...availableTimeSlotWhere(),
    },
    include: {
      physician: true,
    },
  });
}

export async function hasBlockingBookingForTimeSlot(
  timeSlotId: string,
  db: Prisma.TransactionClient | typeof prisma = prisma,
  ignoredBookingId?: string,
): Promise<boolean> {
  const blockingBooking = await db.booking.findFirst({
    where: {
      id: ignoredBookingId ? { not: ignoredBookingId } : undefined,
      timeSlotId,
      status: { in: [...bookingBlockingStatuses] },
    },
    select: { id: true },
  });

  return Boolean(blockingBooking);
}
