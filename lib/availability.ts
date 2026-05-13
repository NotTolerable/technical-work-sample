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

const blockingStatuses = [BookingStatus.PENDING, BookingStatus.CONFIRMED];

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
        status: { in: blockingStatuses },
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
