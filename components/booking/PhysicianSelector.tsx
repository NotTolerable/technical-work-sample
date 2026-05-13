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
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        No physicians are available for booking yet.
      </div>
    );
  }

  return (
    <fieldset>
      <legend className="text-lg font-semibold text-slate-950">
        Choose a physician
      </legend>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {physicians.map((physician) => {
          const isSelected = physician.id === selectedPhysicianId;

          return (
            <button
              aria-pressed={isSelected}
              className={`rounded-2xl border p-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                isSelected
                  ? "border-sky-600 bg-sky-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
              }`}
              key={physician.id}
              onClick={() => onSelect(physician.id)}
              type="button"
            >
              <span className="block text-base font-semibold text-slate-950">
                {physician.name}
              </span>
              <span className="mt-1 block text-sm font-medium text-sky-700">
                {physician.specialty}
              </span>
              <span className="mt-3 block text-sm text-slate-600">
                {physician.bio}
              </span>
              <span className="mt-4 block text-sm font-medium text-slate-700">
                {physician.location}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
