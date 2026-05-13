export default function BookLoading() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm sm:p-8">
        <div className="h-4 w-36 rounded-full bg-slate-200" />
        <div className="mt-4 h-10 w-72 max-w-full rounded-xl bg-slate-200" />
        <div className="mt-5 h-6 w-full max-w-2xl rounded-xl bg-slate-200" />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {['physician-one', 'physician-two', 'physician-three'].map((item) => (
          <div
            className="h-52 animate-pulse rounded-3xl border border-slate-200 bg-white shadow-sm"
            key={item}
          />
        ))}
      </div>
    </section>
  );
}
