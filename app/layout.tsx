import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patient Booking MVP",
  description: "A lightweight patient booking MVP for appointment requests and admin review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <nav
              aria-label="Primary navigation"
              className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link className="text-base font-semibold text-slate-950" href="/">
                Patient Booking MVP
              </Link>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                <Link className="hover:text-slate-950" href="/book">
                  Book
                </Link>
                <Link className="hover:text-slate-950" href="/admin">
                  Admin
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
