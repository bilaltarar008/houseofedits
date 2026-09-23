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
  /** Founder & creative director — the studio is a team, not a solo act */
  founder: "Shoaib Ur Rehman",
  founderRole: "Founder & Creative Director",
  /** Company positioning, used in titles, hero, footer, OG image */
  role: "Wedding Film Editing & Post-Production Studio",
  /** Short tagline used in hero + meta */
  tagline: "Wedding Stories, Crafted Through Editing.",
  description:
    "House of Edits is a wedding film, videography, and photography studio — a team of editors, colorists, videographers, and photographers crafting cinematic highlight films, feature edits, and photo galleries for couples and studios worldwide.",
  /** The disciplines the team covers, shown on the About page */
  team: [
    {
      title: "Film Editors & Colorists",
      body: "Cutting and grading footage into a film paced with intention and mixed so every vow lands.",
    },
    {
      title: "Videographers",
      body: "Multi-camera coverage of the day itself — ceremony, speeches, and the moments in between.",
    },
    {
      title: "Photographers",
      body: "Stills that hold up next to the film — candid, directed, and colour-matched to the same look.",
    },
  ],

  /** Canonical production URL — override with NEXT_PUBLIC_SITE_URL on Vercel */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://houseofedits.vercel.app",

  locale: "en_US",
  timezone: "Asia/Karachi",

  /** Contact — TODO: client to provide email & phone */
  contact: {
    email: "",
    phone: "",
    /** Freeform location line, e.g. "Lahore, Pakistan — working worldwide" */
    location: "Block G Model Town, Lahore, 54000, Pakistan",
    /** Structured address for JSON-LD (Organization schema / local SEO) */
    address: {
      street: "Block G Model Town",
      city: "Lahore",
      postalCode: "54000",
      country: "PK",
    },
    /** Google Maps "embed" iframe src (Maps → Share → Embed a map) */
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.5791199187906!2d74.32208281085508!3d31.4776526741262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905007f680151%3A0xba7302a7be719e80!2sThe%20House%20of%20edits!5e1!3m2!1sen!2s!4v1790097597522!5m2!1sen!2s",
    /** WhatsApp number in international format without "+", e.g. 923001234567 */
    whatsapp: "923155634267",
    /** Default pre-filled message for WhatsApp chat links */
    whatsappMessage: "Hi, I'm interested in your wedding editing services.",
    /** Hours / turnaround note shown on the contact page */
    availability: "Currently booking projects for the upcoming season.",
  },

  /** Social links — TODO: client to provide the rest. Empty entries are not rendered. */
  social: {
    instagram: "https://www.instagram.com/thehouseofeditss/",
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
