import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const physicians = [
  {
    name: "Dr. Maya Chen",
    specialty: "Family Medicine",
    bio: "Primary care physician focused on preventive care, chronic condition support, and clear patient communication.",
    location: "Downtown Clinic",
    slots: [
      ["2026-06-01T09:00:00.000Z", "2026-06-01T09:30:00.000Z"],
      ["2026-06-01T10:00:00.000Z", "2026-06-01T10:30:00.000Z"],
      ["2026-06-02T14:00:00.000Z", "2026-06-02T14:30:00.000Z"],
    ],
  },
  {
    name: "Dr. Samuel Ortiz",
    specialty: "Cardiology",
    bio: "Cardiologist helping patients evaluate heart health, symptoms, and follow-up care plans.",
    location: "Northside Medical Center",
    slots: [
      ["2026-06-03T13:00:00.000Z", "2026-06-03T13:45:00.000Z"],
      ["2026-06-03T14:00:00.000Z", "2026-06-03T14:45:00.000Z"],
      ["2026-06-04T09:30:00.000Z", "2026-06-04T10:15:00.000Z"],
    ],
  },
  {
    name: "Dr. Priya Raman",
    specialty: "Dermatology",
    bio: "Dermatologist supporting skin checks, rash evaluations, acne care, and treatment follow-ups.",
    location: "West End Specialty Clinic",
    slots: [
      ["2026-06-05T15:00:00.000Z", "2026-06-05T15:30:00.000Z"],
      ["2026-06-05T15:45:00.000Z", "2026-06-05T16:15:00.000Z"],
      ["2026-06-08T11:00:00.000Z", "2026-06-08T11:30:00.000Z"],
    ],
  },
] as const;

async function main() {
  await prisma.booking.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.physician.deleteMany();

  for (const physician of physicians) {
    await prisma.physician.create({
      data: {
        name: physician.name,
        specialty: physician.specialty,
        bio: physician.bio,
        location: physician.location,
        timeSlots: {
          create: physician.slots.map(([startTime, endTime]) => ({
            startTime: new Date(startTime),
            endTime: new Date(endTime),
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
