# Patient Booking Flow

A lightweight patient booking MVP built for a technical work sample. The app focuses on the core appointment workflow: patients can choose a physician, select an available time, submit appointment details, and admins can review and update booking statuses.

## How to run the project

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your-postgres-connection-string"
```

For deployment, configure `DATABASE_URL` in Vercel Environment Variables.

### 3. Set up the database

For the current demo/work-sample setup:

```bash
npx prisma db push
npx prisma db seed
```

`db push` syncs the Prisma schema to the database.

`db seed` inserts sample physicians and appointment slots.

Note: the seed script resets the sample MVP data before recreating the demo physicians and time slots.

### 4. Run the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Main routes:

```text
/book
/admin
```

### 5. Build for production

```bash
npm run build
```

## What I built

I built a simple patient booking flow with two main surfaces: a patient-facing booking page and an admin-facing review dashboard.

Working Demo: https://technical-work-sample.vercel.app

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

- View upcoming booking requests
- Filter bookings by status
- See patient details, physician, appointment time, reason, status, and created date
- Confirm pending bookings
- Cancel pending or confirmed bookings

The supported booking statuses are:

```text
PENDING
CONFIRMED
CANCELLED
```

## Key technical/product decisions

### Focused on the core product loop

I focused on the main workflow:

```text
Patient books appointment → admin reviews request → admin confirms or cancels
```

I intentionally avoided adding unrelated features like authentication, payments, insurance logic, calendar integrations, email notifications, or medical records because the goal of the work sample was to demonstrate product functionality, implementation quality, and tradeoff thinking.

### Used a lightweight database-backed setup

I used Prisma with Postgres so bookings persist across sessions and the patient/admin flows share the same data source. This makes the deployed app feel more realistic than a purely local or mock-data version.

For the demo setup, I used Prisma schema syncing and seed data to keep the project easy to run and review. In a production system, I would use a stricter migration workflow and avoid resetting data through seed scripts.

### Kept booking state server-side

Booking creation and admin status updates are handled server-side. This keeps the main business rules out of the browser and prevents the UI from being the only layer enforcing availability.

### Added server-side validation

Patient booking submissions are validated with Zod. Required fields include:

- Physician
- Time slot
- Patient name
- Patient email
- Patient phone
- Reason for visit

Admin status updates are also validated before being applied.

### Prevented duplicate booking of active slots

A time slot is considered unavailable if it already has a `PENDING` or `CONFIRMED` booking.

`CANCELLED` bookings do not block a slot, so cancelling a booking makes that time available again.

The booking flow checks availability before showing slots and re-checks availability when the patient submits the form. This avoids relying only on stale client-side state.

### Treated admin review as intentionally unauthenticated for the work sample

The `/admin` page is not protected by authentication. This was intentional to keep the review flow easy to access and avoid spending time on auth infrastructure that was outside the requested scope.

In production, the admin dashboard would require role-based authentication.

### Used AI as an implementation assistant

I used AI coding tools to speed up implementation, but I manually controlled the product scope, task breakdown, review process, and technical decisions. I worked in small tasks rather than one large generation step so the implementation stayed focused and easier to verify.

## What I would improve with more time

- Add authentication and role-based access for admins and physicians
- Add physician-side availability management
- Add email or SMS confirmations for patients
- Add calendar integration for confirmed appointments
- Add automated tests for booking creation, status transitions, and duplicate-slot prevention
- Add stronger database constraints around active bookings per time slot
- Add better production migration handling instead of relying on demo-oriented schema syncing
- Add audit history for booking status changes
- Improve admin search and filtering for larger booking volumes
- Add more detailed loading, error, and success states
