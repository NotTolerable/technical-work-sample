"use client";

import { useMemo, useState } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { PhysicianSelector } from "@/components/booking/PhysicianSelector";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import type { BookingPhysician } from "@/components/booking/types";

type BookingFlowProps = {
  physicians: BookingPhysician[];
};

const bookingSteps = ["Physician", "Time", "Details"];

export function BookingFlow({ physicians }: BookingFlowProps) {
  const [selectedPhysicianId, setSelectedPhysicianId] = useState("");
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState("");

  const selectedPhysician = useMemo(
    () => physicians.find((physician) => physician.id === selectedPhysicianId),
    [physicians, selectedPhysicianId],
  );

  const selectedTimeSlot = useMemo(
    () =>
      selectedPhysician?.timeSlots.find(
        (timeSlot) => timeSlot.id === selectedTimeSlotId,
      ),
    [selectedPhysician, selectedTimeSlotId],
  );

  function handlePhysicianSelect(physicianId: string) {
    setSelectedPhysicianId(physicianId);
    setSelectedTimeSlotId("");
  }

  return (
    <div className="space-y-6">
      <ol className="grid gap-3 sm:grid-cols-3" aria-label="Booking steps">
        {bookingSteps.map((step, index) => {
          const isComplete =
            (index === 0 && Boolean(selectedPhysician)) ||
            (index === 1 && Boolean(selectedTimeSlot));
          const isCurrent =
            (index === 0 && !selectedPhysician) ||
            (index === 1 && selectedPhysician && !selectedTimeSlot) ||
            (index === 2 && selectedPhysician && selectedTimeSlot);

          return (
            <li
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                isCurrent || isComplete
                  ? "border-sky-200 bg-sky-50 text-sky-800"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
              key={step}
            >
              <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-white text-xs ring-1 ring-inset ring-current">
                {index + 1}
              </span>
              {step}
            </li>
          );
        })}
      </ol>

      <div className="grid gap-6">
        <PhysicianSelector
          onSelect={handlePhysicianSelect}
          physicians={physicians}
          selectedPhysicianId={selectedPhysicianId}
        />
        <TimeSlotPicker
          onSelect={setSelectedTimeSlotId}
          selectedPhysicianName={selectedPhysician?.name}
          selectedTimeSlotId={selectedTimeSlotId}
          timeSlots={selectedPhysician?.timeSlots ?? []}
        />
        <BookingForm
          selectedPhysician={selectedPhysician}
          selectedTimeSlot={selectedTimeSlot}
        />
      </div>
    </div>
  );
}
