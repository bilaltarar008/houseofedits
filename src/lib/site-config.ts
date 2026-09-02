/**
 * Central site configuration.
 *
 * Everything the client still has to provide (real contact details, social
 * links, address, phone) is left as an empty string and the UI hides those
 * elements until a value exists. Fill these in when the details are ready —
 * no component code needs to change.
 */

export const siteConfig = {
  /** Studio / brand name */
  name: "House of Edits",
  /** The editor this portfolio belongs to */
  editor: "Shoaib Ur Rehman",
  role: "Wedding Film Editor & Colorist",
  /** Short tagline used in hero + meta */
  tagline: "Wedding films, cut with feeling.",
  description:
    "House of Edits is the portfolio of Shoaib Ur Rehman — a wedding film editor and colorist crafting cinematic highlight films, feature films, and social teasers for photographers and studios worldwide.",

  /** Canonical production URL — override with NEXT_PUBLIC_SITE_URL on Vercel */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://houseofedits.vercel.app",

  locale: "en_US",
  timezone: "Asia/Karachi",

  /** Contact — TODO: client to provide */
  contact: {
    email: "",
    phone: "",
    /** Freeform location line, e.g. "Lahore, Pakistan — working worldwide" */
    location: "",
    /** WhatsApp number in international format without "+", e.g. 923001234567 */
    whatsapp: "923155634267",
    /** Default pre-filled message for WhatsApp chat links */
    whatsappMessage: "Hi, I'm interested in your wedding editing services.",
    /** Hours / turnaround note shown on the contact page */
    availability: "Currently booking projects for the upcoming season.",
  },

  /** Social links — TODO: client to provide. Empty entries are not rendered. */
  social: {
    instagram: "",
    youtube: "",
    vimeo: "",
    tiktok: "",
    behance: "",
    linkedin: "",
  } as Record<string, string>,

  /** Primary navigation */
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Journal", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  /**
   * External "leave a review" link (e.g. Google Business profile). When empty,
   * the reviews page points visitors to the contact form instead.
   * TODO: client to provide.
   */
  reviewUrl: "",

  /** Used by JSON-LD and the OG image */
  founded: "2018",
  /** Areas served — helps local SEO; adjust freely */
  areaServed: ["Worldwide"],
};

export type SiteConfig = typeof siteConfig;

/** Social platforms in display order with human labels. */
export const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  vimeo: "Vimeo",
  tiktok: "TikTok",
  behance: "Behance",
  linkedin: "LinkedIn",
};

/** Returns only the social links that have been filled in. */
export function activeSocialLinks() {
  return Object.entries(siteConfig.social)
    .filter(([, url]) => url.trim().length > 0)
    .map(([key, url]) => ({ key, url, label: socialLabels[key] ?? key }));
}

/**
 * Build a wa.me deep link with a pre-filled message. Returns "" when no
 * WhatsApp number is configured, so callers can conditionally render.
 */
export function whatsappLink(message?: string) {
  const digits = siteConfig.contact.whatsapp.replace(/\D/g, "");
  if (!digits) return "";
  const text = message ?? siteConfig.contact.whatsappMessage;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Human-readable WhatsApp number, e.g. "+92 315 5634267". */
export function whatsappDisplay() {
  const d = siteConfig.contact.whatsapp.replace(/\D/g, "");
  if (!d) return "";
  // +CC XXX XXXXXXX  (best-effort grouping)
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`.trim();
}
