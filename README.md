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

This scaffold currently includes a polished homepage, a patient booking placeholder route, an admin dashboard placeholder route, and Prisma database setup. Runtime booking logic, authentication, payments, calendar integrations, notifications, insurance logic, and medical records are intentionally not implemented yet.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- Prisma with Postgres for deployed storage
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

Copy `.env.example` to `.env` for local development and set `DATABASE_URL` to a Postgres connection string. Use the environment variable provided by Vercel, Neon, Supabase, or another Postgres host in deployed environments. Do not commit real database credentials.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

## Database setup

The Prisma schema lives in `prisma/schema.prisma` and reads its Postgres connection from `DATABASE_URL`.

After installing dependencies and configuring `DATABASE_URL`, run the local development commands:

```bash
npm run prisma:generate
npm run prisma:migrate
```

For production or deployed environments such as Vercel, apply the committed migrations with:

```bash
npx prisma migrate deploy
```

Use seed data only when resetting demo sample data is acceptable:

```bash
npx prisma db seed
```

The seed script resets the three MVP tables, then creates three physicians with three appointment slots each for local development and demos. Do not run `npx prisma db seed` against a production database that contains real booking data unless intentionally resetting that demo data is acceptable.

## Booking business rules

Future booking implementation should follow these rules:

- New bookings default to `pending`.
- A time slot is unavailable if it has a `pending` or `confirmed` booking.
- A `cancelled` booking should not block the time slot.
- The patient form must require name, email, phone, reason, physician, and time slot.
- Admin users can update booking status to `confirmed` or `cancelled`.

## Deployment notes

The planned deployment target is Vercel. Configure `DATABASE_URL` in Vercel Environment Variables using the connection string from your Postgres provider, then run `npx prisma migrate deploy` against that database as part of your deployment workflow. Run `npx prisma db seed` only for demo environments where resetting and recreating sample physicians and appointment slots is acceptable. The `postinstall` script runs `prisma generate` so Prisma Client is generated during dependency installation.
