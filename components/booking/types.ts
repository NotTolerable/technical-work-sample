export type BookingTimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

export type BookingPhysician = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  location: string;
  timeSlots: BookingTimeSlot[];
};
