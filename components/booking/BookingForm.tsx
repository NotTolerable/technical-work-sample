"use client";

import { useActionState } from "react";
import { createBooking, type BookingFormState } from "@/app/book/actions";
import type {
  BookingPhysician,
  BookingTimeSlot,
} from "@/components/booking/types";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

type BookingFormProps = {
  selectedPhysician?: BookingPhysician;
  selectedTimeSlot?: BookingTimeSlot;
};

const initialState: BookingFormState = {
  status: "idle",
};

function getError(errors: BookingFormState["fieldErrors"], field: string) {
  return errors?.[
    field as keyof NonNullable<BookingFormState["fieldErrors"]>
  ]?.[0];
}

export function BookingForm({
  selectedPhysician,
  selectedTimeSlot,
}: BookingFormProps) {
  const [state, formAction, isPending] = useActionState(
    createBooking,
    initialState,
  );

  if (state.status === "success" && state.confirmation) {
    return <BookingConfirmation confirmation={state.confirmation} />;
  }

  const physicianError = getError(state.fieldErrors, "physicianId");
  const timeSlotError = getError(state.fieldErrors, "timeSlotId");
  const nameError = getError(state.fieldErrors, "patientName");
  const emailError = getError(state.fieldErrors, "patientEmail");
  const phoneError = getError(state.fieldErrors, "patientPhone");
  const reasonError = getError(state.fieldErrors, "reason");
  const canSubmit = Boolean(selectedPhysician && selectedTimeSlot);

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <input
        name="physicianId"
        type="hidden"
        value={selectedPhysician?.id ?? ""}
      />
      <input
        name="timeSlotId"
        type="hidden"
        value={selectedTimeSlot?.id ?? ""}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Patient details</h2>
          <p className="mt-1 text-sm text-slate-600">
            Enter the required information to submit a pending booking request.
          </p>
        </div>
        {canSubmit ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-inset ring-slate-200">
            <span className="block font-semibold text-slate-950">
              Ready to submit
            </span>
            Your selected physician and time will be reviewed by an admin.
          </div>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {state.message}
        </div>
      ) : null}

      {physicianError || timeSlotError ? (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          {physicianError ?? timeSlotError}
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            aria-describedby={nameError ? "patientName-error" : undefined}
            aria-invalid={Boolean(nameError)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            name="patientName"
            placeholder="Jordan Lee"
            required
            type="text"
          />
          {nameError ? (
            <span
              className="mt-2 block text-sm text-red-600"
              id="patientName-error"
            >
              {nameError}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            aria-describedby={emailError ? "patientEmail-error" : undefined}
            aria-invalid={Boolean(emailError)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            name="patientEmail"
            placeholder="jordan@example.com"
            required
            type="email"
          />
          {emailError ? (
            <span
              className="mt-2 block text-sm text-red-600"
              id="patientEmail-error"
            >
              {emailError}
            </span>
          ) : null}
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Phone</span>
          <input
            aria-describedby={phoneError ? "patientPhone-error" : undefined}
            aria-invalid={Boolean(phoneError)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            name="patientPhone"
            placeholder="(555) 123-4567"
            required
            type="tel"
          />
          {phoneError ? (
            <span
              className="mt-2 block text-sm text-red-600"
              id="patientPhone-error"
            >
              {phoneError}
            </span>
          ) : null}
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Reason for visit
          </span>
          <textarea
            aria-describedby={reasonError ? "reason-error" : undefined}
            aria-invalid={Boolean(reasonError)}
            className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            name="reason"
            placeholder="Briefly describe what you would like to discuss."
            required
          />
          {reasonError ? (
            <span className="mt-2 block text-sm text-red-600" id="reason-error">
              {reasonError}
            </span>
          ) : null}
        </label>
      </div>

      <button
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
        disabled={!canSubmit || isPending}
        type="submit"
      >
        {isPending ? "Submitting..." : "Submit booking request"}
      </button>

      {!canSubmit ? (
        <p className="mt-3 text-sm text-slate-500">
          Select a physician and available time before submitting patient details.
        </p>
      ) : null}
    </form>
  );
}
