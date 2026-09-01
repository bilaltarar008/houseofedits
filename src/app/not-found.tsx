import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="text-4xl sm:text-5xl">This page has been cut</h1>
      <p className="max-w-md text-muted">
        The link may be broken or the page moved. Let&apos;s get you back to the
        work.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-contrast hover:bg-accent-strong"
        >
          Back home
        </Link>
        <Link
          href="/work"
          className="inline-flex h-11 items-center rounded-sm border border-border-strong px-6 text-sm hover:border-accent hover:text-accent"
        >
          View work
        </Link>
      </div>
    </main>
  );
}
