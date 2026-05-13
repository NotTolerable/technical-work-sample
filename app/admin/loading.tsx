export default function AdminLoading() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="h-4 w-32 rounded bg-slate-200" />
      <div className="mt-4 h-10 w-72 rounded bg-slate-200" />
      <div className="mt-8 grid gap-4">
        {[0, 1, 2].map((item) => (
          <div
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
            key={item}
          />
        ))}
      </div>
    </section>
  );
}
