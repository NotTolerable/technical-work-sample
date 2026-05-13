import { BookingStatus } from "@prisma/client";

const statusStyles: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]: "bg-amber-100 text-amber-800 ring-amber-200",
  [BookingStatus.CONFIRMED]: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  [BookingStatus.CANCELLED]: "bg-slate-100 text-slate-700 ring-slate-200",
};

const statusLabels: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]: "Pending",
  [BookingStatus.CONFIRMED]: "Confirmed",
  [BookingStatus.CANCELLED]: "Cancelled",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
