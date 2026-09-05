import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

interface SeoInput {
  title?: string;
  description?: string;
  /** Path only, e.g. "/work/golden-hour" */
  path?: string;
  /** Absolute or root-relative image URL; falls back to the dynamic OG route */
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
}

const defaultTitle = `${siteConfig.name} — ${siteConfig.role}`;

/**
 * Build a complete Next.js `Metadata` object for a page. Handles canonical
 * URLs, Open Graph, Twitter cards, and robots directives consistently.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  noindex = false,
}: SeoInput = {}): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = title ? `${title} — ${siteConfig.name}` : defaultTitle;
  const ogImage =
    image ??
    absoluteUrl(`/api/og?title=${encodeURIComponent(title ?? siteConfig.tagline)}`);

  return {
    title: title ?? defaultTitle,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: resolvedTitle }],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [siteConfig.name],
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [ogImage],
    },
  };
}
