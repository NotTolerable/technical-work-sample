import { BookingFlow } from "@/components/booking/BookingFlow";
import { getPhysiciansWithAvailableTimeSlots } from "@/lib/availability";

export const dynamic = "force-dynamic";

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
    <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Patient booking
        </p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Book an appointment
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Choose a physician, select an available appointment time, and
              submit a pending booking request for admin review.
            </p>
          </div>
          <div className="rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-sky-900 ring-1 ring-inset ring-sky-100">
            Pending and confirmed bookings are removed from availability before
            you submit.
          </div>
        </div>
      </div>
      <div className="mt-8">
        <BookingFlow physicians={serializedPhysicians} />
      </div>
    </section>
  );
}
