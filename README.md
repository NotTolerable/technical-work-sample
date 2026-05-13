# Patient Booking MVP

A lightweight patient booking work sample focused on the core appointment workflow: patients can choose a physician, select an available time, submit appointment details, and admins can review and update booking statuses.

Live demo: https://patient-booking-mvp.vercel.app/

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- Postgres
- Zod
- Vercel

## How to run the project

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
DATABASE_URL="your-postgres-connection-string"
```

Set up the database for the demo:

```bash
npx prisma db push
npx prisma db seed
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Main routes:

```text
/book
/admin
```

Build for production:

```bash
npm run build
```

Note: the seed script resets the demo data before recreating the sample physicians and appointment slots.

## What I built

I built a simple patient booking flow with two main surfaces.

### Patient-facing booking flow

Patients can:

- Select a physician
- View available appointment times
- Enter their name, email, phone number, and reason for visit
- Submit a booking request
- See a confirmation screen after submitting

New bookings default to `PENDING`.

### Admin-facing dashboard

Admins can:

- View booking requests
- Filter bookings by all, pending, confirmed, and cancelled
- See patient details, physician, appointment time, reason, status, and created date
- Confirm pending bookings
- Cancel pending or confirmed bookings

The supported statuses are:

```text
PENDING
CONFIRMED
CANCELLED
```

## Key technical/product decisions

### Focused on the core booking loop

I focused on the main workflow:

```text
Patient requests appointment → admin reviews request → admin confirms or cancels
```

I intentionally left out authentication, payments, insurance logic, calendar integrations, email/SMS notifications, and medical records because they were outside the requested scope. The goal was to build a complete, reviewable MVP around the core booking functionality.

### Used a database-backed setup

I used Prisma with Postgres so the patient and admin flows share the same persistent data source. This makes the deployed app more realistic than a purely local or mock-data version.

For this work sample, I used Prisma schema syncing and seed data to keep setup simple. In a production system, I would use a stricter migration workflow and avoid resetting data through seed scripts.

### Kept booking logic server-side

Booking creation and admin status updates are handled server-side. Patient form submissions and admin status updates are validated with Zod before writing to the database.

### Prevented duplicate active bookings

A time slot is unavailable if it already has a `PENDING` or `CONFIRMED` booking.

`CANCELLED` bookings do not block a time slot, so cancelling a booking makes that slot available again.

The app checks availability before showing time slots and re-checks availability when the patient submits the form, so the UI is not the only layer enforcing booking rules.

### Separated patient booking from admin review

The app separates the patient-facing booking flow from the admin-facing review dashboard because those are distinct jobs in the product workflow.

The `/admin` route is intentionally unauthenticated for this work sample to keep the demo easy to review. In production, it would require role-based authentication.

### AI usage

I used AI coding tools to speed up implementation, but I manually directed the product scope, task breakdown, review, tradeoff decisions, and verification process.

## What I would improve with more time

- Add authentication and role-based access for admins and physicians
- Add automated tests for booking creation, validation, and status transitions
- Add stronger production migration handling
- Add physician-side availability management
- Add email/SMS confirmations after appointments are confirmed
- Add calendar integration for confirmed appointments
- Add admin search, pagination, and date-range filtering for larger booking volumes
- Add production-safe logging and error reporting

## Known limitations

- The admin dashboard is not authenticated and is not production-ready for real patient data.
- The app does not include calendar, email, SMS, payment, insurance, or medical record functionality.
- The seed script resets demo data and should only be used in local/demo environments.
- The app assumes `DATABASE_URL` is configured before database-backed routes are used.
