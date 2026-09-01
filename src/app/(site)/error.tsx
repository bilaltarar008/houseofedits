"use client";

import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="eyebrow">Something broke</span>
      <h1 className="text-3xl sm:text-4xl">We hit a snag loading this page</h1>
      <p className="max-w-md text-muted">
        Try again in a moment. If it keeps happening, the issue is on our end.
      </p>
      <button
        onClick={reset}
        className="inline-flex h-11 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-contrast hover:bg-accent-strong"
      >
        Try again
      </button>
    </main>
  );
}
