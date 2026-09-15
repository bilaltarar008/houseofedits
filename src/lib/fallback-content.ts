/**
 * Seed content used until a Sanity project is connected (or when a query
 * fails). It matches the domain types 1:1 so every page renders and looks
 * finished during development and the first deploy.
 *
 * Media URLs are intentionally empty — the <Media> component renders an
 * elegant placeholder in their place. Swap real values in through Sanity.
 */

import type {
  FaqItem,
  Post,
  Project,
  ServicePackage,
  SiteSettings,
  Testimonial,
} from "@/types/content";

const img = (alt: string) => ({ url: "", alt });

export const fallbackSiteSettings: SiteSettings = {
  headline: "Wedding stories, shot and cut with feeling.",
  intro:
    "House of Edits is a team of editors, videographers, and photographers. We shoot your day and shape it into a film and gallery couples actually revisit: paced with intention, graded like cinema, scored to the moment.",
  showreel: {
    src: "",
    mp4: "/videos/front-page-video.mp4",
    aspect: "16 / 9",
    title: "House of Edits — 2026 Showreel",
    durationSeconds: 39,
    poster: { url: "/images/front-page-video-poster.jpg", alt: "House of Edits showreel poster" },
  },
  framesVideo: {
    src: "",
    mp4: "/videos/front-page-video1.mp4",
    aspect: "16 / 9",
    title: "House of Edits — Frames Reel",
    poster: { url: "/images/front-page-video-poster.jpg", alt: "House of Edits frames reel poster" },
  },
  gallery: [
    { image: img("Bride and groom portrait at golden hour"), caption: "Ayesha & Hamza — Hunza" },
    { image: img("First dance under warm string lights"), caption: "Sana & Ali — Islamabad" },
    { image: img("Detail shot of rings on floral arrangement"), caption: "Ring detail — Studio Nine" },
    { image: img("Guests dancing at the walima reception"), caption: "Zara & Bilal — Lahore" },
    { image: img("Couple walking the Karachi coastline at dusk"), caption: "Mahnoor & Danial — Karachi" },
    { image: img("Bridal entry through a corridor of light"), caption: "Iqra & Usman — Shinkiari" },
    { image: img("Wide desert ceremony at blue hour"), caption: "Hira & Faizan — Cholistan" },
    { image: img("Emotional embrace during the vows"), caption: "The vows — Frame Forty" },
  ],
  clients: [
    { name: "Studio Nine" },
    { name: "Amber & Co." },
    { name: "The Wedding House" },
    { name: "Frame Forty" },
    { name: "Noor Films" },
    { name: "Evergreen Studio" },
  ],
  stats: [
    { label: "Films delivered", value: "600+" },
    { label: "Studios trust the edit", value: "40+" },
    { label: "Avg. first-cut turnaround", value: "10 days" },
    { label: "Years behind the timeline", value: "8" },
  ],
  toolkit: [
    "Adobe Premiere Pro",
    "DaVinci Resolve Studio",
    "After Effects",
    "Neat Video",
    "iZotope RX",
    "Frame.io review",
  ],
};

const video = (
  slug: string,
  title: string,
  durationSeconds: number,
  aspect = "16 / 9",
) => ({
  src: "",
  mp4: `/videos/projects/${slug}.mp4`,
  aspect,
  title,
  durationSeconds,
  poster: { url: `/images/projects/${slug}.jpg`, alt: title },
});

export const fallbackProjects: Project[] = [
  {
    _id: "p-1",
    title: "Aizaz & Laraib",
    slug: "aizaz-and-laraib",
    category: "Highlight Film",
    year: 2025,
    excerpt:
      "A wedding day cut into one continuous highlight — paced from arrival through the reception.",
    services: ["Edit", "Color", "Sound Design"],
    cover: { url: "/images/projects/aizaz-and-laraib.jpg", alt: "Aizaz & Laraib — wedding highlight" },
    featured: true,
    order: 1,
    video: video("aizaz-and-laraib", "Aizaz & Laraib — Wedding Highlight", 163),
  },
  {
    _id: "p-2",
    title: "Arham & Maanu",
    slug: "arham-and-maanu",
    category: "Highlight Film",
    year: 2025,
    excerpt:
      "Warm, documentary-style coverage graded to feel like one unbroken afternoon.",
    services: ["Edit", "Color", "Sound Design"],
    cover: { url: "/images/projects/arham-and-maanu.jpg", alt: "Arham & Maanu — wedding highlight" },
    featured: true,
    order: 2,
    video: video("arham-and-maanu", "Arham & Maanu — Wedding Highlight", 193),
  },
  {
    _id: "p-3",
    title: "Asad & Sana",
    slug: "asad-and-sana",
    category: "Highlight Film",
    year: 2025,
    excerpt:
      "A festive, music-driven cut that keeps every guest reaction in the frame.",
    services: ["Edit", "Color", "Sound Design"],
    cover: { url: "/images/projects/asad-and-sana.jpg", alt: "Asad & Sana — wedding highlight" },
    featured: true,
    order: 3,
    video: video("asad-and-sana", "Asad & Sana — Wedding Highlight", 171),
  },
  {
    _id: "p-4",
    title: "Noor & Rizwan",
    slug: "noor-and-rizwan",
    category: "Nikkah Film",
    year: 2026,
    excerpt:
      "Quiet, patient coverage of the Nikkah — the ceremony carries the pacing, not the edit.",
    services: ["Edit", "Color", "Titles"],
    cover: { url: "/images/projects/noor-and-rizwan.jpg", alt: "Noor & Rizwan — Nikkah highlight" },
    featured: true,
    order: 4,
    video: video("noor-and-rizwan", "Noor & Rizwan — Nikkah Highlight", 216),
  },
  {
    _id: "p-5",
    title: "Hiba",
    slug: "hiba-social-reel",
    category: "Social Reel",
    year: 2025,
    excerpt: "A social-ready cut trimmed for the feed, delivered the same week.",
    services: ["Edit", "Color", "Vertical cut"],
    cover: { url: "/images/projects/hiba-social-reel.jpg", alt: "Hiba — social reel" },
    featured: true,
    order: 5,
    video: video("hiba-social-reel", "Hiba — Social Reel", 90),
  },
  {
    _id: "p-6",
    title: "Mahnoor's Mehndi",
    slug: "mahnoor-mehndi",
    category: "Social Reel",
    year: 2026,
    excerpt: "Color and movement from the Mehndi, cut tight for Instagram.",
    services: ["Edit", "Color", "Vertical cut"],
    cover: { url: "/images/projects/mahnoor-mehndi.jpg", alt: "Mahnoor — Mehndi reel" },
    featured: true,
    order: 6,
    video: video("mahnoor-mehndi", "Mahnoor's Mehndi — Reel", 59),
  },
  {
    _id: "p-7",
    title: "Zeina",
    slug: "zeina-social-reel",
    category: "Social Reel",
    year: 2026,
    excerpt: "A short, punchy Instagram cut built for scroll-stopping pace.",
    services: ["Edit", "Color", "Vertical cut"],
    cover: { url: "/images/projects/zeina-social-reel.jpg", alt: "Zeina — social reel" },
    featured: true,
    order: 7,
    video: video("zeina-social-reel", "Zeina — Social Reel", 69, "4 / 3"),
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "t-1",
    quote:
      "Shoaib is the editor I hand my hardest weddings to. He finds the story in footage I'd given up on and grades it like a feature.",
    author: "Hamza Sheikh",
    role: "Lead Photographer",
    company: "Studio Nine",
    rating: 5,
    featured: true,
  },
  {
    _id: "t-2",
    quote:
      "Our couples cry at the highlight film every single time. Turnaround is fast, revisions are painless, and the color is consistently gorgeous.",
    author: "Amber Rehman",
    role: "Owner",
    company: "Amber & Co.",
    rating: 5,
    featured: true,
  },
  {
    _id: "t-3",
    quote:
      "We outsourced editing so we could shoot more. Two seasons in, Shoaib feels like part of the studio.",
    author: "Daniyal K.",
    role: "Cinematographer",
    company: "Frame Forty",
    rating: 5,
    featured: true,
  },
  {
    _id: "t-4",
    quote:
      "The vertical teasers alone paid for themselves — our inquiries doubled once we started posting his cuts.",
    author: "Noor A.",
    role: "Creative Director",
    company: "Noor Films",
    rating: 5,
    featured: true,
  },
  {
    _id: "t-5",
    quote:
      "Reliable, communicative, and genuinely great taste in music and pacing. Rare combination.",
    author: "Evergreen Studio",
    role: "Studio Team",
    rating: 5,
    featured: true,
  },
];

export const fallbackServices: ServicePackage[] = [
  {
    _id: "s-1",
    title: "Highlight Film",
    slug: "highlight-film",
    summary:
      "The film your couple shares first — a cinematic 3–6 minute cut with full color grade and sound design.",
    turnaround: "10–14 days first cut",
    deliverables: [
      "3–6 minute highlight film",
      "Full color grade",
      "Sound design & music licensing guidance",
      "2 rounds of revisions",
      "4K + social exports",
    ],
    icon: "film",
    featured: true,
    order: 1,
  },
  {
    _id: "s-2",
    title: "Feature / Documentary Edit",
    slug: "feature-documentary-edit",
    summary:
      "The long-form keepsake — full ceremony and speeches, structured so the whole family watches to the end.",
    turnaround: "3–4 weeks first cut",
    deliverables: [
      "15–40 minute feature film",
      "Multicam sync & cut",
      "Color grade",
      "Licensed score + speeches mix",
      "Chapter markers",
    ],
    icon: "clapperboard",
    order: 2,
  },
  {
    _id: "s-3",
    title: "Social Teaser",
    slug: "social-teaser",
    summary:
      "A 30–60 second vertical cut delivered within 48 hours, built to travel on Instagram and TikTok.",
    turnaround: "48 hours",
    deliverables: [
      "30–60s vertical + square exports",
      "Trend-aware pacing",
      "Caption-safe framing",
      "1 round of revisions",
    ],
    icon: "smartphone",
    order: 3,
  },
  {
    _id: "s-4",
    title: "Color Grade Only",
    slug: "color-grade",
    summary:
      "You cut it, we grade it — a filmic, consistent grade across your whole timeline in DaVinci Resolve.",
    turnaround: "5–7 days",
    deliverables: [
      "Primary + secondary grade",
      "Shot matching",
      "Film emulation / print looks",
      "Round-trip XML/Resolve project",
    ],
    icon: "palette",
    order: 4,
  },
];

export const fallbackFaqs: FaqItem[] = [
  {
    _id: "f-1",
    question: "How do I send you footage?",
    answer:
      "Upload to Google Drive, Dropbox, or Frame.io and share the link. For large feature edits we can provide a dedicated upload space. Proxies are welcome — we can conform to your originals later.",
    order: 1,
  },
  {
    _id: "f-2",
    question: "What's your typical turnaround?",
    answer:
      "Highlight films: 10–14 days for a first cut. Feature films: 3–4 weeks. Social teasers: 48 hours. Rush slots are available for an added fee.",
    order: 2,
  },
  {
    _id: "f-3",
    question: "How many revisions are included?",
    answer:
      "Two rounds for highlight and feature films, one round for teasers. Most projects are locked within the first round.",
    order: 3,
  },
  {
    _id: "f-4",
    question: "Do you handle music licensing?",
    answer:
      "We edit to properly licensed tracks (Musicbed, Artlist, Epidemic) and will guide you on the right license tier. Licensing is billed to your studio account or added to the invoice.",
    order: 4,
  },
  {
    _id: "f-5",
    question: "Can you match our studio's existing style?",
    answer:
      "Yes. Send two or three reference films you've delivered before and we'll build the edit and grade to sit alongside them.",
    order: 5,
  },
];

const author = {
  name: "Shoaib Ur Rehman",
  role: "Wedding Film Editor & Colorist",
  avatar: img("Portrait of Shoaib Ur Rehman"),
  bio: "Shoaib Ur Rehman has edited and graded wedding films for studios across Pakistan and beyond since 2018.",
};

export const fallbackPosts: Post[] = [
  {
    _id: "b-1",
    title: "How to hand off wedding footage to an editor (a checklist)",
    slug: "wedding-footage-handoff-checklist",
    excerpt:
      "The folder structure, naming, and notes that turn a two-week edit into a one-week edit.",
    publishedAt: "2026-07-14",
    tags: ["Workflow", "For Studios"],
    author,
    readingTime: 6,
    plainText:
      "A clean handoff is the single biggest factor in turnaround. Here is the structure I ask every studio to use before uploading footage for an edit.",
  },
  {
    _id: "b-2",
    title: "Pacing a highlight film: the 4-minute rule",
    slug: "pacing-a-highlight-film",
    excerpt:
      "Why most wedding highlights lose the viewer at 2:30 — and the edit decisions that keep them watching.",
    publishedAt: "2026-05-02",
    tags: ["Editing", "Craft"],
    author,
    readingTime: 8,
    plainText:
      "Every highlight film has a moment where the audience decides whether to keep watching. Usually it is around the two-and-a-half minute mark.",
  },
  {
    _id: "b-3",
    title: "A filmic grade for warm outdoor weddings in DaVinci Resolve",
    slug: "filmic-grade-warm-outdoor-weddings",
    excerpt:
      "A repeatable node tree for golden-hour ceremonies that keeps skin tones honest.",
    publishedAt: "2026-02-19",
    tags: ["Color", "Resolve"],
    author,
    readingTime: 10,
    plainText:
      "Golden hour is generous and punishing at the same time. Here is the node structure I start from for warm outdoor ceremonies.",
  },
  {
    _id: "b-4",
    title: "Delivering vertical teasers that photographers actually post",
    slug: "delivering-vertical-teasers",
    excerpt:
      "Framing, safe areas, and export settings for social cuts that don't look like an afterthought.",
    publishedAt: "2025-11-08",
    tags: ["Social", "Workflow"],
    author,
    readingTime: 5,
    plainText:
      "A vertical teaser is not a cropped horizontal edit. Treat it as its own format from the first cut.",
  },
];
