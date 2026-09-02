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
  headline: "Wedding films, cut with feeling.",
  intro:
    "I'm Shoaib Ur Rehman — a wedding film editor and colorist. I take your footage and shape it into a film couples actually re-watch: paced with intention, graded like cinema, scored to the moment.",
  showreel: {
    src: "",
    aspect: "2.39 / 1",
    title: "House of Edits — 2026 Showreel",
    poster: img("House of Edits showreel poster"),
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

export const fallbackProjects: Project[] = [
  {
    _id: "p-1",
    title: "Golden Hour in Hunza",
    slug: "golden-hour-in-hunza",
    couple: "Ayesha & Hamza",
    location: "Hunza Valley, Pakistan",
    category: "Highlight Film",
    year: 2025,
    excerpt:
      "A mountain elopement cut to a single long exhale — 4 minutes, no filler.",
    services: ["Edit", "Color", "Sound Design"],
    credits: [
      { role: "Film", name: "Studio Nine" },
      { role: "Edit & Color", name: "Shoaib Ur Rehman" },
    ],
    cover: img("Couple on a ridge at golden hour in Hunza"),
    featured: true,
    order: 1,
    video: { src: "", aspect: "2.39 / 1", title: "Golden Hour in Hunza — Highlight" },
  },
  {
    _id: "p-2",
    title: "The Lahore Walima",
    slug: "the-lahore-walima",
    couple: "Zara & Bilal",
    location: "Lahore, Pakistan",
    category: "Feature Film",
    year: 2025,
    excerpt:
      "22 minutes of a three-day celebration, structured so the family never reaches for the skip button.",
    services: ["Edit", "Color", "Multicam", "Titles"],
    cover: img("Walima stage with warm uplighting"),
    featured: true,
    order: 2,
  },
  {
    _id: "p-3",
    title: "Coastline, Karachi",
    slug: "coastline-karachi",
    couple: "Mahnoor & Danial",
    location: "Karachi, Pakistan",
    category: "Teaser",
    year: 2024,
    excerpt: "A 60-second social teaser delivered 48 hours after the wedding.",
    services: ["Edit", "Color", "Vertical cut"],
    cover: img("Couple walking along the Karachi coastline at dusk"),
    featured: true,
    order: 3,
  },
  {
    _id: "p-4",
    title: "Rain on the Tea Estate",
    slug: "rain-on-the-tea-estate",
    couple: "Iqra & Usman",
    location: "Shinkiari, Pakistan",
    category: "Highlight Film",
    year: 2024,
    excerpt: "Monsoon light, hand-held vows, and a grade that leans into the green.",
    services: ["Edit", "Color"],
    cover: img("Wedding couple under umbrellas on a tea estate"),
    featured: false,
    order: 4,
  },
  {
    _id: "p-5",
    title: "City Hall, Then the Rooftop",
    slug: "city-hall-then-the-rooftop",
    couple: "Sana & Ali",
    location: "Islamabad, Pakistan",
    category: "Highlight Film",
    year: 2023,
    excerpt: "A documentary-style cut that never once feels staged.",
    services: ["Edit", "Color", "Sound Design"],
    cover: img("Rooftop reception with string lights"),
    featured: false,
    order: 5,
  },
  {
    _id: "p-6",
    title: "Desert Nikkah",
    slug: "desert-nikkah",
    couple: "Hira & Faizan",
    location: "Cholistan, Pakistan",
    category: "Feature Film",
    year: 2023,
    excerpt: "Wide, patient, and quiet — the landscape does half the storytelling.",
    services: ["Edit", "Color", "Titles"],
    cover: img("Desert nikkah ceremony at dusk"),
    featured: false,
    order: 6,
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
    price: "From $350 / film",
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
    price: "From $600 / film",
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
    price: "From $120 / teaser",
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
      "You cut it, I grade it — a filmic, consistent grade across your whole timeline in DaVinci Resolve.",
    price: "From $180 / project",
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
      "Upload to Google Drive, Dropbox, or Frame.io and share the link. For large feature edits I can provide a dedicated upload space. Proxies are welcome — I can conform to your originals later.",
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
      "I edit to properly licensed tracks (Musicbed, Artlist, Epidemic) and will guide you on the right license tier. Licensing is billed to your studio account or added to the invoice.",
    order: 4,
  },
  {
    _id: "f-5",
    question: "Can you match our studio's existing style?",
    answer:
      "Yes. Send two or three reference films you've delivered before and I'll build the edit and grade to sit alongside them.",
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
