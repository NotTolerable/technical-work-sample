export default function BookLoading() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <div className="h-4 w-36 rounded-full bg-slate-200" />
        <div className="mt-4 h-10 w-72 rounded-xl bg-slate-200" />
        <div className="mt-5 h-6 w-full max-w-2xl rounded-xl bg-slate-200" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {["physician-one", "physician-two", "physician-three"].map((item) => (
          <div className="h-48 rounded-2xl bg-slate-200" key={item} />
        ))}
      </div>
    </section>
  );
}
