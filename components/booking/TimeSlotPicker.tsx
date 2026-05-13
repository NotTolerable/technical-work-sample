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
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Select a physician to see available appointment times.
      </section>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        No available appointment times are open for {selectedPhysicianName}.
      </section>
    );
  }

  return (
    <fieldset>
      <legend className="text-lg font-semibold text-slate-950">
        Choose an available appointment time
      </legend>
      <p className="mt-1 text-sm text-slate-600">
        Pending and confirmed bookings are hidden. Cancelled bookings do not block
        a time slot.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {timeSlots.map((timeSlot) => {
          const startTime = new Date(timeSlot.startTime);
          const endTime = new Date(timeSlot.endTime);
          const isSelected = timeSlot.id === selectedTimeSlotId;

          return (
            <button
              aria-pressed={isSelected}
              className={`rounded-xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                isSelected
                  ? "border-sky-600 bg-sky-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
              }`}
              key={timeSlot.id}
              onClick={() => onSelect(timeSlot.id)}
              type="button"
            >
              <span className="block text-sm font-semibold text-slate-950">
                {dateFormatter.format(startTime)}
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                {timeFormatter.format(startTime)} – {timeFormatter.format(endTime)}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
