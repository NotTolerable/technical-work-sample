import { PrimaryLink } from "@/components/ui/PrimaryLink";

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
        Admin review
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Admin dashboard
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        This placeholder will become the admin surface for reviewing pending appointment
        requests and marking bookings confirmed or cancelled.
      </p>
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Admin booking review coming next. Authentication and database logic are
        intentionally out of scope for this scaffold.
      </div>
      <div className="mt-8">
        <PrimaryLink href="/" variant="secondary">
          Back to homepage
        </PrimaryLink>
      </div>
    </section>
  );
}
