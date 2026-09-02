/**
 * Domain types shared across the app.
 *
 * These are the shapes the UI consumes. The Sanity query layer maps CMS
 * documents into these types; the fallback layer produces the same shapes so
 * the site renders fully even before a Sanity project is connected.
 */

import type { PortableTextBlock } from "@portabletext/types";

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** Low-quality blur placeholder (data URI) when available */
  lqip?: string;
}

/** A single video, hosted as an adaptive HLS stream (client provides later). */
export interface VideoAsset {
  /** HLS master playlist URL (.m3u8). Empty string => "coming soon" state. */
  src: string;
  /** Optional progressive MP4 fallback for instant first paint */
  mp4?: string;
  /** Poster frame shown before playback */
  poster?: ImageAsset;
  /** Aspect ratio, e.g. "16 / 9" or "2.39 / 1" */
  aspect?: string;
  title?: string;
  /** Seconds — used for VideoObject schema */
  durationSeconds?: number;
  uploadDate?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  /** Couple / event name, e.g. "Ayesha & Bilal" */
  couple?: string;
  location?: string;
  /** e.g. "Highlight Film", "Feature Film", "Teaser" */
  category: string;
  year?: number;
  /** Short one-liner for cards */
  excerpt: string;
  /** Roles performed, e.g. ["Edit", "Color", "Sound Design"] */
  services: string[];
  /** Credited collaborators */
  credits?: { role: string; name: string }[];
  cover: ImageAsset;
  gallery?: ImageAsset[];
  video?: VideoAsset;
  body?: PortableTextBlock[];
  featured?: boolean;
  order?: number;
}

export interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  /** e.g. "Lead Photographer, Studio Nine" */
  role?: string;
  company?: string;
  avatar?: ImageAsset;
  rating?: number;
  video?: VideoAsset;
  featured?: boolean;
}

export interface ServicePackage {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  /** Display price, e.g. "From $350 / film" — free text */
  price?: string;
  turnaround?: string;
  deliverables: string[];
  icon?: string;
  featured?: boolean;
  order?: number;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  order?: number;
}

export interface Author {
  name: string;
  role?: string;
  avatar?: ImageAsset;
  bio?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  cover?: ImageAsset;
  tags: string[];
  author: Author;
  readingTime: number;
  body?: PortableTextBlock[];
  /** Plain-text rendition used for search / reading-time / meta description */
  plainText?: string;
}

/** A still frame in the home-page gallery, with an optional caption. */
export interface GalleryFrame {
  image: ImageAsset;
  /** e.g. "Ayesha & Hamza — Hunza" */
  caption?: string;
  /** CSS aspect-ratio string; defaults per grid slot when omitted */
  aspect?: string;
}

export interface SiteSettings {
  headline: string;
  intro: string;
  /** Full showreel shown on the home page (client provides the src later) */
  showreel?: VideoAsset;
  /** Stills + motion gallery on the home page */
  gallery: GalleryFrame[];
  /** Client / studio logos for the marquee */
  clients: { name: string; logo?: ImageAsset }[];
  stats: { label: string; value: string }[];
  /** About-page long-form bio */
  about?: PortableTextBlock[];
  /** Editing toolkit / software list */
  toolkit: string[];
}
