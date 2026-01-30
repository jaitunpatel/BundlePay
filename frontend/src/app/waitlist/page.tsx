'use client';

import { useState } from 'react';

export default function WaitlistPage({
  searchParams,
}: {
  searchParams?: { from?: string };
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    if (!email) {
      setMessage('Email is required');
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/waitlist`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Something went wrong');
      }

      setMessage('You are on the waitlist');
      setEmail('');
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold text-white">Join the waitlist</h1>
        <p className="mt-2 text-sm text-white/70">
          We’re in early access. We’re letting people in slowly.
        </p>

        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/30"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Join waitlist'}
          </button>

          {message && (
            <p className="text-sm text-white/80 text-center">{message}</p>
          )}
        </form>
      </div>
    </main>
  );
}
