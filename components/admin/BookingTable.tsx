import type { ReactNode } from "react";
import {
  BookingCard,
  StatusActions,
  formatAppointment,
  formatDateTime,
} from "@/components/admin/BookingCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { AdminBooking } from "@/components/admin/types";

type BookingTableProps = {
  bookings: AdminBooking[];
};

export function BookingTable({ bookings }: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">No bookings found</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          There are no bookings for this filter yet. New patient requests will
          appear here after submission or status updates.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 lg:hidden">
        {bookings.map((booking) => (
          <BookingCard booking={booking} key={booking.id} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
        <table className="min-w-full divide-y divide-slate-200">
          <caption className="sr-only">Upcoming appointment bookings</caption>
          <thead className="bg-slate-50/80">
            <tr>
              <TableHeader>Patient</TableHeader>
              <TableHeader>Physician</TableHeader>
              <TableHeader>Appointment</TableHeader>
              <TableHeader>Reason</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Created</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <TableCell>
                  <div className="font-medium text-slate-950">
                    {booking.patientName}
                  </div>
                  <div className="mt-1 text-slate-600">{booking.patientEmail}</div>
                  <div className="mt-1 text-slate-600">{booking.patientPhone}</div>
                </TableCell>
                <TableCell>{booking.physician.name}</TableCell>
                <TableCell>{formatAppointment(booking)}</TableCell>
                <TableCell>
                  <p className="max-w-xs whitespace-normal leading-6">
                    {booking.reason}
                  </p>
                </TableCell>
                <TableCell>
                  <StatusBadge status={booking.status} />
                </TableCell>
                <TableCell>{formatDateTime(booking.createdAt)}</TableCell>
                <TableCell>
                  <StatusActions booking={booking} />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableHeader({ children }: { children: ReactNode }) {
  return (
    <th
      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
      scope="col"
    >
      {children}
    </th>
  );
}

function TableCell({ children }: { children: ReactNode }) {
  return <td className="px-5 py-5 align-top text-sm text-slate-700">{children}</td>;
}
