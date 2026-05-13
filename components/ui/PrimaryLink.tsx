import Link from "next/link";
import type { ReactNode } from "react";

type PrimaryLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function PrimaryLink({
  children,
  href,
  variant = "primary",
}: PrimaryLinkProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-sky-600 text-white shadow-sm hover:bg-sky-700 focus-visible:outline-sky-600"
      : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-slate-500";

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses}`}
      href={href}
    >
      {children}
    </Link>
  );
}
