# AGENTS.md

## 1. Project goal

Build a lightweight patient booking MVP for a hiring work sample. The project should demonstrate product judgment, code quality, clear UX, reliable booking behavior, and strong communication.

The core product loop is:

1. Patient selects a physician.
2. Patient selects an available appointment time.
3. Patient enters required details.
4. Patient submits a booking request.
5. Admin reviews the booking.
6. Admin confirms or cancels the booking.

Do not expand beyond this MVP unless the user explicitly asks for it.

## 2. Product scope

The MVP should support:

- A patient-facing booking flow.
- A physician selection step.
- Available appointment time selection.
- A required patient details form.
- Booking submission with a default `pending` status.
- An admin review surface for pending bookings.
- Admin status updates to `confirmed` or `cancelled`.
- Basic empty, loading, success, and error states.
- Clear README documentation that explains how to run, verify, and reason about the app.

Prefer simple, explicit workflows over overly generic abstractions.

## 3. Tech stack

Use the planned stack unless the user changes it:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- Postgres for deployed storage
- Vercel deployment
- Zod for validation

Official documentation references:

- Next.js App Router: https://nextjs.org/docs/app
- Next.js Forms and Server Actions: https://nextjs.org/docs/app/guides/forms
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Prisma with Next.js: https://www.prisma.io/docs/guides/frameworks/nextjs
- Prisma deploy to Vercel: https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-vercel
- Vercel Git deployments: https://vercel.com/docs/git
- Vercel Environment Variables: https://vercel.com/docs/environment-variables
- Tailwind responsive design: https://tailwindcss.com/docs/responsive-design
- Zod validation: https://zod.dev/

## 4. Folder structure

When the app is scaffolded, keep the structure easy to inspect for a work sample. Prefer this shape unless there is a clear reason to change it:

```text
app/
  page.tsx
  booking/
    page.tsx
  admin/
    page.tsx
  api/
    bookings/
      route.ts
components/
  booking/
  admin/
  ui/
lib/
  db.ts
  validators.ts
  booking-rules.ts
prisma/
  schema.prisma
README.md
```

Guidelines:

- Keep route-level files focused on composition, data loading, and server actions or route handlers.
- Put reusable business logic in `lib/`.
- Put reusable UI in `components/`.
- Keep Prisma schema and migrations under `prisma/`.
- Avoid deep folder nesting until the product needs it.

## 5. Code style rules

- Use TypeScript for application code.
- Prefer explicit domain names such as `Physician`, `Booking`, `TimeSlot`, and `BookingStatus`.
- Keep functions small and purpose-driven.
- Use clear variable names over abbreviations.
- Use Zod schemas for user-submitted data validation.
- Validate on the server before writing to the database.
- Return user-friendly error messages without exposing sensitive implementation details.
- Avoid broad catch-all abstractions for this MVP.
- Do not put `try`/`catch` blocks around imports.
- Remove dead code, unused files, and unused dependencies.
- Format code with the project formatter once configured.

## 6. Component rules

- Default to server components in the Next.js App Router.
- Use client components only when interactivity requires them.
- Keep form components accessible with labels, validation messages, and clear submit states.
- Design components around the booking workflow, not a generic design system.
- Use Tailwind CSS utilities for layout and responsive behavior.
- Keep visual hierarchy clear for patient and admin tasks.
- Reuse small UI primitives when they improve consistency, but do not overbuild a component library.

## 7. Database and server-side rules

- Use Prisma as the database access layer.
- Use Postgres for deployed storage.
- Keep database writes on the server through Server Actions or Route Handlers.
- Follow the official Next.js and Prisma guidance for serverless deployment on Vercel.
- Store environment-specific values in environment variables and document them in README.
- Do not expose database credentials or server-only code to the client.
- Ensure booking availability checks happen on the server immediately before creating or updating bookings.
- Prefer database constraints or transactions where needed to protect against double booking.

## 8. Booking business rules

- New bookings default to `pending`.
- A time slot is unavailable if it has a `pending` or `confirmed` booking.
- A `cancelled` booking should not block the time slot.
- The patient form must require:
  - name
  - email
  - phone
  - reason
  - physician
  - time slot
- Admin users can update booking status to `confirmed` or `cancelled`.
- Do not allow a booking request for a time slot that is already blocked by a pending or confirmed booking.
- Keep status values explicit and limited to `pending`, `confirmed`, and `cancelled` unless the user expands scope.

## 9. UX expectations

- Optimize for a simple, trustworthy booking experience.
- Make the next step obvious at each point in the flow.
- Show clear validation messages near the relevant fields.
- Show a clear confirmation or success state after submission.
- Clearly distinguish pending, confirmed, and cancelled bookings in admin views.
- Provide useful empty states for no physicians, no available time slots, and no bookings.
- Ensure layouts work on mobile and desktop using Tailwind responsive utilities.
- Prefer concise copy that reduces uncertainty for patients and admins.

## 10. Features not to build

Do not build these features unless the user explicitly asks:

- Full app implementation before requested.
- Next.js scaffolding before requested.
- Authentication.
- Payments.
- Calendar integration.
- Email notifications.
- SMS notifications.
- Insurance logic.
- Complex medical records.
- Role-based permission systems.
- Multi-location scheduling.
- Recurring appointments.
- Waitlists.
- Analytics dashboards.
- Unnecessary product scope beyond the core booking loop.

## 11. Verification commands

When commands are available, run the strongest reasonable checks before finalizing changes:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

If the project has not been scaffolded yet, verify documentation-only changes with commands that are available, such as:

```bash
git status --short
sed -n '1,240p' AGENTS.md
```

In final responses, report which commands were run and whether they passed, failed, or were blocked by environment limitations.

## 12. README expectations

The README should explain:

- The project goal and MVP scope.
- The core patient and admin booking loop.
- The planned or implemented tech stack.
- How to install dependencies.
- How to configure environment variables.
- How to set up Prisma and the database.
- How to run the app locally.
- How to run verification commands.
- Key booking business rules.
- Known tradeoffs or intentionally omitted features.
- Deployment notes for Vercel and Postgres.

Keep README content honest and current. Do not document features as implemented unless they exist.
