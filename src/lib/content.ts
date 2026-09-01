import "server-only";

import type { PortableTextBlock } from "@portabletext/types";

import { client, sanityConfigured } from "@/sanity/lib/client";
import { toImageAsset } from "@/sanity/lib/image";
import {
  faqsQuery,
  featuredProjectsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  servicesQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import {
  fallbackFaqs,
  fallbackPosts,
  fallbackProjects,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTestimonials,
} from "@/lib/fallback-content";
import { readingTime } from "@/lib/utils";
import type {
  FaqItem,
  Post,
  Project,
  ServicePackage,
  SiteSettings,
  Testimonial,
  VideoAsset,
} from "@/types/content";

/**
 * Every fetch runs through this guard. If Sanity isn't configured, or the
 * request throws, we return the seed content so pages always render.
 */
async function fromSanity<T>(
  run: () => Promise<T | null | undefined>,
  fallback: T,
): Promise<T> {
  if (!sanityConfigured) return fallback;
  try {
    const result = await run();
    if (result == null) return fallback;
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[content] Sanity fetch failed, using fallback:", error);
    }
    return fallback;
  }
}

const NEXT_TAGS = { next: { revalidate: 3600, tags: ["sanity"] } };

/* Mappers --------------------------------------------------------------- */

type Raw = Record<string, unknown>;

function mapVideo(raw: Raw | null | undefined): VideoAsset | undefined {
  if (!raw) return undefined;
  const src = typeof raw.src === "string" ? raw.src : "";
  return {
    src,
    mp4: (raw.mp4 as string) || undefined,
    aspect: (raw.aspect as string) || "16 / 9",
    title: (raw.title as string) || undefined,
    durationSeconds: (raw.durationSeconds as number) || undefined,
    uploadDate: (raw.uploadDate as string) || undefined,
    poster: toImageAsset(raw.poster as never, (raw.title as string) || "Video poster"),
  };
}

function mapProject(raw: Raw): Project {
  return {
    _id: String(raw._id),
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    couple: (raw.couple as string) || undefined,
    location: (raw.location as string) || undefined,
    category: String(raw.category ?? "Film"),
    year: (raw.year as number) || undefined,
    excerpt: String(raw.excerpt ?? ""),
    services: (raw.services as string[]) ?? [],
    credits: (raw.credits as Project["credits"]) ?? undefined,
    cover:
      toImageAsset(raw.cover as never, String(raw.title ?? "")) ?? {
        url: "",
        alt: String(raw.title ?? ""),
      },
    gallery: Array.isArray(raw.gallery)
      ? (raw.gallery as never[])
          .map((g) => toImageAsset(g, String(raw.title ?? "")))
          .filter(Boolean) as Project["gallery"]
      : undefined,
    video: mapVideo(raw.video as Raw),
    body: (raw.body as PortableTextBlock[]) ?? undefined,
    featured: Boolean(raw.featured),
    order: (raw.order as number) || undefined,
  };
}

function mapTestimonial(raw: Raw): Testimonial {
  return {
    _id: String(raw._id),
    quote: String(raw.quote ?? ""),
    author: String(raw.author ?? ""),
    role: (raw.role as string) || undefined,
    company: (raw.company as string) || undefined,
    rating: (raw.rating as number) || undefined,
    avatar: toImageAsset(raw.avatar as never, String(raw.author ?? "")),
    video: mapVideo(raw.video as Raw),
    featured: Boolean(raw.featured),
  };
}

function mapService(raw: Raw): ServicePackage {
  return {
    _id: String(raw._id),
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    summary: String(raw.summary ?? ""),
    price: (raw.price as string) || undefined,
    turnaround: (raw.turnaround as string) || undefined,
    deliverables: (raw.deliverables as string[]) ?? [],
    icon: (raw.icon as string) || undefined,
    featured: Boolean(raw.featured),
    order: (raw.order as number) || undefined,
  };
}

function mapPost(raw: Raw): Post {
  const plainText = (raw.plainText as string) || (raw.excerpt as string) || "";
  return {
    _id: String(raw._id),
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    excerpt: String(raw.excerpt ?? ""),
    publishedAt: String(raw.publishedAt ?? raw.updatedAt ?? ""),
    updatedAt: (raw.updatedAt as string) || undefined,
    cover: toImageAsset(raw.cover as never, String(raw.title ?? "")),
    tags: (raw.tags as string[]) ?? [],
    author: {
      name: String((raw.author as Raw)?.name ?? "Shoaib Ur Rehman"),
      role: ((raw.author as Raw)?.role as string) || undefined,
      bio: ((raw.author as Raw)?.bio as string) || undefined,
      avatar: toImageAsset((raw.author as Raw)?.avatar as never, "Author portrait"),
    },
    readingTime: plainText ? readingTime(plainText) : 4,
    body: (raw.body as PortableTextBlock[]) ?? undefined,
    plainText,
  };
}

/* Public API ---------------------------------------------------------------- */

export async function getSiteSettings(): Promise<SiteSettings> {
  return fromSanity(async () => {
    const raw = await client.fetch<Raw>(siteSettingsQuery, {}, NEXT_TAGS);
    if (!raw) return null;
    return {
      headline: String(raw.headline ?? fallbackSiteSettings.headline),
      intro: String(raw.intro ?? fallbackSiteSettings.intro),
      showreel: mapVideo(raw.showreel as Raw),
      clients: Array.isArray(raw.clients)
        ? (raw.clients as Raw[]).map((c) => ({
            name: String(c.name ?? ""),
            logo: toImageAsset(c.logo as never, String(c.name ?? "")),
          }))
        : fallbackSiteSettings.clients,
      stats: (raw.stats as SiteSettings["stats"]) ?? fallbackSiteSettings.stats,
      about: (raw.about as PortableTextBlock[]) ?? undefined,
      toolkit: (raw.toolkit as string[]) ?? fallbackSiteSettings.toolkit,
    } satisfies SiteSettings;
  }, fallbackSiteSettings);
}

export async function getProjects(): Promise<Project[]> {
  return fromSanity(async () => {
    const raw = await client.fetch<Raw[]>(projectsQuery, {}, NEXT_TAGS);
    return raw?.map(mapProject) ?? null;
  }, fallbackProjects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return fromSanity(async () => {
    const raw = await client.fetch<Raw[]>(featuredProjectsQuery, {}, NEXT_TAGS);
    return raw?.map(mapProject) ?? null;
  }, fallbackProjects.filter((p) => p.featured).slice(0, 6));
}

export async function getProjectSlugs(): Promise<string[]> {
  return fromSanity(
    () => client.fetch<string[]>(projectSlugsQuery, {}, NEXT_TAGS),
    fallbackProjects.map((p) => p.slug),
  );
}

export async function getProject(slug: string): Promise<Project | null> {
  const fallback = fallbackProjects.find((p) => p.slug === slug) ?? null;
  return fromSanity(async () => {
    const raw = await client.fetch<Raw>(projectBySlugQuery, { slug }, NEXT_TAGS);
    return raw ? mapProject(raw) : fallback;
  }, fallback);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fromSanity(async () => {
    const raw = await client.fetch<Raw[]>(testimonialsQuery, {}, NEXT_TAGS);
    return raw?.map(mapTestimonial) ?? null;
  }, fallbackTestimonials);
}

export async function getServices(): Promise<ServicePackage[]> {
  return fromSanity(async () => {
    const raw = await client.fetch<Raw[]>(servicesQuery, {}, NEXT_TAGS);
    return raw?.map(mapService) ?? null;
  }, fallbackServices);
}

export async function getFaqs(): Promise<FaqItem[]> {
  return fromSanity(
    () => client.fetch<FaqItem[]>(faqsQuery, {}, NEXT_TAGS),
    fallbackFaqs,
  );
}

export async function getPosts(): Promise<Post[]> {
  return fromSanity(async () => {
    const raw = await client.fetch<Raw[]>(postsQuery, {}, NEXT_TAGS);
    return raw?.map(mapPost) ?? null;
  }, fallbackPosts);
}

export async function getPostSlugs(): Promise<string[]> {
  return fromSanity(
    () => client.fetch<string[]>(postSlugsQuery, {}, NEXT_TAGS),
    fallbackPosts.map((p) => p.slug),
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const fallback = fallbackPosts.find((p) => p.slug === slug) ?? null;
  return fromSanity(async () => {
    const raw = await client.fetch<Raw>(postBySlugQuery, { slug }, NEXT_TAGS);
    return raw ? mapPost(raw) : fallback;
  }, fallback);
}
