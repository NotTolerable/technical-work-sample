import { PrimaryLink } from "@/components/ui/PrimaryLink";

export default function BookPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
        Patient booking
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Book an appointment
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        This placeholder will become the patient flow for selecting a physician, choosing an
        available time, and submitting required booking details.
      </p>
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Booking form coming next. No database or scheduling logic has been added
        yet.
      </div>
      <div className="mt-8">
        <PrimaryLink href="/" variant="secondary">
          Back to homepage
        </PrimaryLink>
      </div>
    </section>
  );
}
