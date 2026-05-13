import { BookingStatus } from "@prisma/client";
import { updateBookingStatus } from "@/app/admin/actions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { AdminBooking } from "@/components/admin/types";

type BookingCardProps = {
  booking: AdminBooking;
};

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            {booking.patientName}
          </h2>
          <p className="text-sm text-slate-600">{booking.physician.name}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <dl className="mt-5 grid gap-4 text-sm">
        <BookingDetail label="Appointment" value={formatAppointment(booking)} />
        <BookingDetail label="Email" value={booking.patientEmail} />
        <BookingDetail label="Phone" value={booking.patientPhone} />
        <BookingDetail label="Reason" value={booking.reason} />
        <BookingDetail label="Created" value={formatDateTime(booking.createdAt)} />
      </dl>

      <StatusActions booking={booking} />
    </article>
  );
}

function BookingDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-medium text-slate-950">{label}</dt>
      <dd className="mt-1 text-slate-600">{value}</dd>
    </div>
  );
}

export function StatusActions({ booking }: BookingCardProps) {
  const actions = getAvailableActions(booking.status);

  if (actions.length === 0) {
    return (
      <p className="mt-5 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
        No further status updates are available.
      </p>
    );
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2" aria-label="Booking status actions">
      {actions.map((action) => (
        <form action={updateBookingStatus} key={action.status}>
          <input name="bookingId" type="hidden" value={booking.id} />
          <input name="status" type="hidden" value={action.status} />
          <button
            className={`rounded-full px-3 py-2 text-sm font-semibold transition ${action.className}`}
            type="submit"
          >
            {action.label}
          </button>
        </form>
      ))}
    </div>
  );
}

function getAvailableActions(status: BookingStatus) {
  if (status === BookingStatus.PENDING) {
    return [
      {
        label: "Confirm",
        status: BookingStatus.CONFIRMED,
        className: "bg-emerald-700 text-white hover:bg-emerald-800",
      },
      {
        label: "Cancel",
        status: BookingStatus.CANCELLED,
        className:
          "bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50",
      },
    ];
  }

  if (status === BookingStatus.CONFIRMED) {
    return [
      {
        label: "Cancel",
        status: BookingStatus.CANCELLED,
        className:
          "bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50",
      },
    ];
  }

  return [];
}

export function formatAppointment(booking: AdminBooking) {
  return `${formatDateTime(booking.timeSlot.startTime)}–${formatTime(
    booking.timeSlot.endTime,
  )}`;
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
