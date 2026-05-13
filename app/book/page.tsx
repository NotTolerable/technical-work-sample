import { BookingFlow } from "@/components/booking/BookingFlow";
import { getPhysiciansWithAvailableTimeSlots } from "@/lib/availability";

export default async function BookPage() {
  const physicians = await getPhysiciansWithAvailableTimeSlots();
  const serializedPhysicians = physicians.map((physician) => ({
    ...physician,
    timeSlots: physician.timeSlots.map((timeSlot) => ({
      ...timeSlot,
      startTime: timeSlot.startTime.toISOString(),
      endTime: timeSlot.endTime.toISOString(),
    })),
  }));

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Patient booking
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Book an appointment
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Choose a physician, select an available appointment time, and submit a
          pending booking request for admin review.
        </p>
      </div>
      <div className="mt-10">
        <BookingFlow physicians={serializedPhysicians} />
      </div>
    </section>
  );
}
