export default function AdminLoading() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
      <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm sm:p-8">
        <div className="h-4 w-32 rounded-full bg-slate-200" />
        <div className="mt-4 h-10 w-72 max-w-full rounded-xl bg-slate-200" />
        <div className="mt-5 h-6 w-full max-w-2xl rounded-xl bg-slate-200" />
      </div>
      <div className="mt-6 grid gap-4">
        {[0, 1, 2].map((item) => (
          <div
            className="h-32 animate-pulse rounded-3xl border border-slate-200 bg-white shadow-sm"
            key={item}
          />
        ))}
      </div>
    </section>
  );
}
