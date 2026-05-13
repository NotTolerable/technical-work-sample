import { BookingStatus, Prisma } from "@prisma/client";
import { BookingTable } from "@/components/admin/BookingTable";
import {
  StatusFilter,
  type AdminStatusFilter,
} from "@/components/admin/StatusFilter";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const statusFilterMap: Record<
  Exclude<AdminStatusFilter, "all">,
  BookingStatus
> = {
  pending: BookingStatus.PENDING,
  confirmed: BookingStatus.CONFIRMED,
  cancelled: BookingStatus.CANCELLED,
};

type AdminPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeFilter = getStatusFilter(resolvedSearchParams?.status);
  const bookings = await getAdminBookings(activeFilter);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
      <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur sm:p-8 lg:flex lg:items-end lg:justify-between lg:gap-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            Admin review
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Admin dashboard
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Review appointment requests, confirm pending bookings, and cancel
            bookings that should no longer hold an appointment time.
          </p>
        </div>
        <StatusFilter activeFilter={activeFilter} />
      </div>

      <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm leading-6 text-sky-900">
        This work-sample dashboard is intentionally unauthenticated. A production
        version would require authentication and role checks before exposing
        patient contact details or status updates.
      </div>

      <div className="mt-6">
        <BookingTable bookings={bookings} />
      </div>
    </section>
  );
}

async function getAdminBookings(activeFilter: AdminStatusFilter) {
  const statusWhere: Prisma.BookingWhereInput =
    activeFilter === "all" ? {} : { status: statusFilterMap[activeFilter] };
  const where: Prisma.BookingWhereInput = {
    ...statusWhere,
    timeSlot: {
      startTime: { gte: new Date() },
    },
  };

  return prisma.booking.findMany({
    where,
    orderBy: [
      { timeSlot: { startTime: "asc" } },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      patientName: true,
      patientEmail: true,
      patientPhone: true,
      reason: true,
      status: true,
      createdAt: true,
      physician: {
        select: {
          name: true,
        },
      },
      timeSlot: {
        select: {
          startTime: true,
          endTime: true,
        },
      },
    },
  });
}

function getStatusFilter(status: string | undefined): AdminStatusFilter {
  if (status === "pending" || status === "confirmed" || status === "cancelled") {
    return status;
  }

  return "all";
}
