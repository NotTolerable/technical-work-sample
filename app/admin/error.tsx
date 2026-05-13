"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
        Admin dashboard unavailable
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        We could not load bookings.
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        Check that DATABASE_URL is configured and Prisma migrations have been
        applied to the Postgres database, then try again.
      </p>
      <button
        className="mt-8 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </section>
  );
}
