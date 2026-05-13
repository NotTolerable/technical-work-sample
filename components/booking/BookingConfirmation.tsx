import type { BookingConfirmation as BookingConfirmationDetails } from "@/app/book/actions";

type BookingConfirmationProps = {
  confirmation: BookingConfirmationDetails;
};

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export function BookingConfirmation({ confirmation }: BookingConfirmationProps) {
  const startTime = new Date(confirmation.appointmentStartTime);
  const endTime = new Date(confirmation.appointmentEndTime);

  return (
    <section
      aria-live="polite"
      className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
        Request submitted
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
        Your appointment request is pending.
      </h2>
      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-slate-500">Physician</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {confirmation.physicianName}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Appointment time</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {dateTimeFormatter.format(startTime)} – {timeFormatter.format(endTime)}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Patient</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {confirmation.patientName}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Status</dt>
          <dd className="mt-1 font-semibold capitalize text-amber-700">
            {confirmation.status}
          </dd>
        </div>
      </dl>
    </section>
  );
}
