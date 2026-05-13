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
      className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Request submitted
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Your appointment request is pending.
          </h2>
          <p className="mt-2 text-sm leading-6 text-emerald-900">
            An admin reviewer can now confirm or cancel this appointment request.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
          Status: pending
        </span>
      </div>
      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-emerald-100">
          <dt className="font-medium text-slate-600">Physician</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {confirmation.physicianName}
          </dd>
        </div>
        <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-emerald-100">
          <dt className="font-medium text-slate-600">Appointment</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {dateTimeFormatter.format(startTime)} – {timeFormatter.format(endTime)}
          </dd>
        </div>
        <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-emerald-100">
          <dt className="font-medium text-slate-600">Patient</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {confirmation.patientName}
          </dd>
        </div>
        <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-emerald-100">
          <dt className="font-medium text-slate-600">Next step</dt>
          <dd className="mt-1 font-semibold text-slate-950">Admin review</dd>
        </div>
      </dl>
    </section>
  );
}
