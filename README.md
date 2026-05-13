# Patient Booking MVP

A lightweight patient booking MVP for a hiring work sample. The goal is to demonstrate product judgment, code quality, UX, reliability, and communication through a focused appointment request workflow.

## MVP scope

The intended core loop is:

1. Patient selects a physician.
2. Patient selects an available appointment time.
3. Patient enters required details.
4. Patient submits a booking request.
5. Admin reviews the booking.
6. Admin confirms or cancels the booking.

This scaffold currently includes a polished homepage, a patient booking placeholder route, and an admin dashboard placeholder route. Database logic, authentication, payments, calendar integrations, notifications, insurance logic, and medical records are intentionally not implemented yet.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- Planned: Prisma with Postgres for deployed storage
- Planned: Vercel deployment
- Planned: Zod validation for patient-submitted data

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Verification

Run the standard checks:

```bash
npm run lint
npm run build
```

## Environment variables

No environment variables are required for the current scaffold. When Prisma and Postgres are added, document required variables such as `DATABASE_URL` here.

## Booking business rules

Future booking implementation should follow these rules:

- New bookings default to `pending`.
- A time slot is unavailable if it has a `pending` or `confirmed` booking.
- A `cancelled` booking should not block the time slot.
- The patient form must require name, email, phone, reason, physician, and time slot.
- Admin users can update booking status to `confirmed` or `cancelled`.

## Deployment notes

The planned deployment target is Vercel. Add Vercel and Postgres setup notes when persistence is implemented.
