import { Reveal } from "@/components/primitives/reveal";

/** Elegant "Reviews coming soon" state — dimmed skeleton cards behind a note. */
export function ReviewsEmpty() {
  return (
    <div className="relative isolate flex min-h-[26rem] items-center justify-center overflow-hidden rounded-lg border border-accent/20 px-6 py-16 sm:py-20">
      {/* soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_25%,rgba(193,231,251,0.45),transparent_70%)]"
      />

      {/* ghost cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-6 -z-10 mx-auto grid max-w-4xl grid-cols-1 gap-5 px-6 opacity-[0.16] blur-[2px] sm:grid-cols-3"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <span key={s} className="size-3 rounded-full bg-accent/60" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-full rounded bg-foreground/20" />
              <div className="h-2.5 w-5/6 rounded bg-foreground/20" />
              <div className="h-2.5 w-2/3 rounded bg-foreground/20" />
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="size-9 rounded-full bg-foreground/20" />
              <div className="h-2.5 w-24 rounded bg-foreground/20" />
            </div>
          </div>
        ))}
      </div>

      <Reveal className="relative mx-auto flex max-w-md flex-col items-center gap-5 text-center">
        <Flourish />
        <span className="eyebrow">Coming soon</span>
        <h2 className="text-3xl leading-tight sm:text-4xl">Reviews coming soon</h2>
        <p className="text-[0.98rem] leading-relaxed text-muted">
          The first films are being delivered now. Kind words from the couples
          and studios behind them will appear here shortly — check back soon.
        </p>
      </Reveal>
    </div>
  );
}

function Flourish() {
  return (
    <svg
      width="72"
      height="20"
      viewBox="0 0 72 20"
      fill="none"
      aria-hidden
      className="text-accent/70"
    >
      <path
        d="M2 10h22M48 10h22"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M36 4c-2.2-2.6-6-2.4-7.6.2-1.2 2 .1 4.4 2 6L36 16l5.6-5.8c1.9-1.6 3.2-4 2-6-1.6-2.6-5.4-2.8-7.6-.2Z"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
