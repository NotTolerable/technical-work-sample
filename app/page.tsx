import { PrimaryLink } from "@/components/ui/PrimaryLink";

const steps = [
  "Choose a physician",
  "Select an open appointment time",
  "Submit patient details for review",
  "Admin confirms or cancels the request",
];

const highlights = [
  "Server-side availability checks",
  "Pending-by-default booking requests",
  "Focused admin review workflow",
];

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col justify-center px-6 py-12 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur sm:p-8 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
          <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-800 ring-1 ring-inset ring-sky-200">
            Lightweight healthcare scheduling work sample
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            A calm booking workflow for patients and reviewers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Patients request an appointment by choosing a physician and available
            time. Admin reviewers can quickly confirm or cancel each request.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="/book">Book an appointment</PrimaryLink>
            <PrimaryLink href="/admin" variant="secondary">
              View admin dashboard
            </PrimaryLink>
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <li
                className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm"
                key={highlight}
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                Core loop
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                MVP workflow
              </h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              Review-ready
            </span>
          </div>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li className="flex gap-4" key={step}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 ring-1 ring-inset ring-sky-200">
                  {index + 1}
                </span>
                <span className="pt-2 text-sm font-medium text-slate-700 sm:text-base">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
