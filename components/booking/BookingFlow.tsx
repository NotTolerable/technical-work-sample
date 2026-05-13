"use client";

import { useMemo, useState } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { PhysicianSelector } from "@/components/booking/PhysicianSelector";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import type { BookingPhysician } from "@/components/booking/types";

type BookingFlowProps = {
  physicians: BookingPhysician[];
};

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
    <div className="space-y-8">
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
  );
}
