import type { BookingPhysician } from "@/components/booking/types";

type PhysicianSelectorProps = {
  physicians: BookingPhysician[];
  selectedPhysicianId: string;
  onSelect: (physicianId: string) => void;
};

export function PhysicianSelector({
  physicians,
  selectedPhysicianId,
  onSelect,
}: PhysicianSelectorProps) {
  if (physicians.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          No physicians available
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Add physicians and appointment slots in the database seed or admin data
          source to begin accepting booking requests.
        </p>
      </section>
    );
  }

  return (
    <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <legend className="text-lg font-semibold text-slate-950">
            Choose a physician
          </legend>
          <p className="mt-1 text-sm text-slate-600">
            Select the clinician who best matches the visit reason.
          </p>
        </div>
        <span className="text-sm font-medium text-slate-500">
          {physicians.length} available
        </span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {physicians.map((physician) => {
          const isSelected = physician.id === selectedPhysicianId;

          return (
            <button
              aria-pressed={isSelected}
              className={`relative rounded-2xl border p-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                isSelected
                  ? "border-sky-600 bg-sky-50 shadow-sm ring-2 ring-sky-100"
                  : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
              }`}
              key={physician.id}
              onClick={() => onSelect(physician.id)}
              type="button"
            >
              {isSelected ? (
                <span className="absolute right-4 top-4 rounded-full bg-sky-600 px-2.5 py-1 text-xs font-semibold text-white">
                  Selected
                </span>
              ) : null}
              <span className="block pr-20 text-base font-semibold text-slate-950">
                {physician.name}
              </span>
              <span className="mt-1 block text-sm font-medium text-sky-700">
                {physician.specialty}
              </span>
              <span className="mt-3 block text-sm leading-6 text-slate-600">
                {physician.bio}
              </span>
              <span className="mt-4 block rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                {physician.location}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
