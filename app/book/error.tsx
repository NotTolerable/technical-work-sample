"use client";

type BookErrorProps = {
  reset: () => void;
};

export default function BookError({ reset }: BookErrorProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Booking unavailable
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          We could not load appointment availability.
        </h1>
        <p className="mt-4 text-slate-700">
          Please try again. If the issue continues, confirm the database is
          configured and reachable.
        </p>
        <button
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
