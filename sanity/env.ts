/**
 * Sanity environment configuration.
 *
 * The site is designed to run with NO Sanity project connected — every data
 * helper falls back to seed content in `src/lib/fallback-content.ts`. Once the
 * client creates a project, set these in `.env.local` (and on Vercel) and the
 * CMS content takes over automatically.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True only when a real project id has been supplied. */
export const sanityConfigured = projectId.trim().length > 0;

export const studioUrl = "/studio";

/** Server-only token for authenticated reads (drafts, private datasets). */
export const readToken = process.env.SANITY_API_READ_TOKEN || "";

export const useCdn = process.env.NODE_ENV === "production";
