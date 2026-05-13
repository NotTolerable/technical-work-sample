import { PrimaryLink } from "@/components/ui/PrimaryLink";

const steps = [
  "Choose a physician",
  "Select an open appointment time",
  "Submit patient details for review",
  "Admin confirms or cancels the request",
];

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col justify-center px-6 py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800">
            Lightweight healthcare scheduling work sample
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            A simple patient booking MVP built for clarity and review.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Patients can request an appointment by choosing a physician and time slot.
            Admins can review each request and mark it confirmed or cancelled.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="/book">Book an appointment</PrimaryLink>
            <PrimaryLink href="/admin" variant="secondary">
              View admin dashboard
            </PrimaryLink>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">MVP workflow</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li className="flex gap-4" key={step}>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                  {index + 1}
                </span>
                <span className="pt-1 text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
