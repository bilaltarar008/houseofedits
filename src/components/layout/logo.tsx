import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 text-foreground",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 64 64"
        className="shrink-0"
        aria-hidden
      >
        <rect width="64" height="64" rx="14" fill="transparent" />
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          className="text-accent"
        >
          <circle cx="32" cy="32" r="15" />
          <path d="M32 17 L32 32 L45 39" />
          <path d="M32 32 L19 39" />
        </g>
        <circle cx="32" cy="32" r="3.4" className="fill-accent" />
      </svg>
      <span className="font-display text-[0.95rem] tracking-tight">
        {siteConfig.name}
      </span>
    </Link>
  );
}
