import type { BookingTimeSlot } from "@/components/booking/types";

type TimeSlotPickerProps = {
  selectedPhysicianName?: string;
  selectedTimeSlotId: string;
  timeSlots: BookingTimeSlot[];
  onSelect: (timeSlotId: string) => void;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export function TimeSlotPicker({
  selectedPhysicianName,
  selectedTimeSlotId,
  timeSlots,
  onSelect,
}: TimeSlotPickerProps) {
  if (!selectedPhysicianName) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Select a physician first
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Available appointment times will appear here after a physician is
          selected.
        </p>
      </section>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-amber-300 bg-amber-50 p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          No open times for {selectedPhysicianName}
        </h2>
        <p className="mt-2 text-sm leading-6 text-amber-800">
          Pending and confirmed bookings are already holding this physician’s
          slots. Choose another physician or seed additional appointment times.
        </p>
      </section>
    );
  }

  return (
    <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <legend className="text-lg font-semibold text-slate-950">
            Choose an available appointment time
          </legend>
          <p className="mt-1 text-sm text-slate-600">
            Showing open times for {selectedPhysicianName}. Cancelled bookings do
            not block a time slot.
          </p>
        </div>
        <span className="text-sm font-medium text-slate-500">
          {timeSlots.length} open
        </span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {timeSlots.map((timeSlot) => {
          const startTime = new Date(timeSlot.startTime);
          const endTime = new Date(timeSlot.endTime);
          const isSelected = timeSlot.id === selectedTimeSlotId;

          return (
            <button
              aria-pressed={isSelected}
              className={`rounded-2xl border px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                isSelected
                  ? "border-sky-600 bg-sky-50 shadow-sm ring-2 ring-sky-100"
                  : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
              }`}
              key={timeSlot.id}
              onClick={() => onSelect(timeSlot.id)}
              type="button"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-950">
                  {dateFormatter.format(startTime)}
                </span>
                {isSelected ? (
                  <span className="rounded-full bg-sky-600 px-2 py-0.5 text-xs font-semibold text-white">
                    Selected
                  </span>
                ) : null}
              </span>
              <span className="mt-2 block text-sm text-slate-600">
                {timeFormatter.format(startTime)} – {timeFormatter.format(endTime)}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
