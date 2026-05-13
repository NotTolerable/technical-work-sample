import Link from "next/link";

export type AdminStatusFilter = "all" | "pending" | "confirmed" | "cancelled";

const filters: { label: string; value: AdminStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Cancelled", value: "cancelled" },
];

export function StatusFilter({
  activeFilter,
}: {
  activeFilter: AdminStatusFilter;
}) {
  return (
    <nav aria-label="Filter bookings by status" className="mt-6 flex flex-wrap gap-2 lg:mt-0">
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;
        const href =
          filter.value === "all" ? "/admin" : `/admin?status=${filter.value}`;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-sky-700 text-white shadow-sm"
                : "bg-white text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
            }`}
            href={href}
            key={filter.value}
          >
            {filter.label}
          </Link>
        );
      })}
    </nav>
  );
}
