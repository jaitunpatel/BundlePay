export default function WaitlistPage({
  searchParams,
}: {
  searchParams?: { from?: string };
}) {
  const from = searchParams?.from;

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold text-white">Join the waitlist</h1>
        <p className="mt-2 text-sm text-white/70">
          We’re in early access. We’re letting people in slowly.
        </p>

        <form className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/30"
          />
          <button
            type="button"
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90"
          >
            Join waitlist
          </button>
        </form>
      </div>
    </main>
  );
}
