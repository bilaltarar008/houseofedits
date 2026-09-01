import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Absolute URL against the configured site origin. */
export function absoluteUrl(path = "/") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://houseofedits.vercel.app";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Format an ISO date string for display. */
export function formatDate(
  input: string | Date,
  opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" },
) {
  const date = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", opts).format(date);
}

/** Rough reading-time estimate from a plain-text string. */
export function readingTime(text: string, wpm = 220) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

/**
 * Resolve a media URL. Absolute URLs pass through; a root-relative
 * `/videos/...` path is rewritten onto NEXT_PUBLIC_VIDEO_CDN_BASE when set,
 * so encoded files can move to a CDN without touching content.
 */
export function resolveMediaUrl(url?: string) {
  if (!url) return "";
  if (/^https?:\/\//.test(url) || url.startsWith("data:")) return url;
  const base = process.env.NEXT_PUBLIC_VIDEO_CDN_BASE?.replace(/\/$/, "");
  if (base && url.startsWith("/videos/")) {
    return `${base}${url.slice("/videos".length)}`;
  }
  return url;
}

/** Turn a string into a URL-safe slug. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
