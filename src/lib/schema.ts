/**
 * JSON-LD structured-data builders. Rendered via the <JsonLd> component.
 * @see https://schema.org
 */

import { siteConfig, whatsappLink } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";
import type { FaqItem, Post, Project, VideoAsset } from "@/types/content";

const ORG_ID = `${siteConfig.url}/#organization`;
const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    founder: { "@id": PERSON_ID },
    foundingDate: siteConfig.founded,
    description: siteConfig.description,
    areaServed: siteConfig.areaServed,
    knowsAbout: [
      "Wedding film editing",
      "Color grading",
      "DaVinci Resolve",
      "Adobe Premiere Pro",
      "Video post-production",
    ],
    ...(siteConfig.contact.email && { email: siteConfig.contact.email }),
    ...(siteConfig.contact.phone && { telephone: siteConfig.contact.phone }),
    ...(siteConfig.contact.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        postalCode: siteConfig.contact.address.postalCode,
        addressCountry: siteConfig.contact.address.country,
      },
    }),
    ...(siteConfig.contact.whatsapp && {
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${siteConfig.contact.whatsapp.replace(/\D/g, "")}`,
        url: whatsappLink(),
        availableLanguage: ["en", "ur"],
      },
    }),
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.founder,
    jobTitle: siteConfig.founderRole,
    url: absoluteUrl("/about"),
    worksFor: { "@id": ORG_ID },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function videoObjectSchema(video: VideoAsset, pagePath: string) {
  if (!video?.src && !video?.poster?.url) return null;
  return {
    "@type": "VideoObject",
    name: video.title ?? siteConfig.name,
    description: video.title ?? `A wedding film by ${siteConfig.name}.`,
    thumbnailUrl: video.poster?.url ? [video.poster.url] : undefined,
    uploadDate: video.uploadDate ?? `${siteConfig.founded}-01-01`,
    ...(video.durationSeconds && {
      duration: `PT${Math.round(video.durationSeconds)}S`,
    }),
    contentUrl: video.mp4 || video.src || undefined,
    embedUrl: absoluteUrl(pagePath),
    publisher: { "@id": ORG_ID },
  };
}

export function projectSchema(project: Project) {
  const path = `/work/${project.slug}`;
  return {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(path)}#creativework`,
    name: project.title,
    url: absoluteUrl(path),
    genre: project.category,
    dateCreated: project.year ? `${project.year}` : undefined,
    creator: { "@id": ORG_ID },
    locationCreated: project.location,
    abstract: project.excerpt,
    image: project.cover?.url || undefined,
    ...(project.video && {
      video: videoObjectSchema(project.video, path),
    }),
  };
}

export function articleSchema(post: Post) {
  const path = `/blog/${post.slug}`;
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.cover?.url ? [post.cover.url] : [absoluteUrl("/api/og")],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author.name, url: absoluteUrl("/about") },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absoluteUrl(path),
    keywords: post.tags,
    wordCount: post.plainText
      ? post.plainText.trim().split(/\s+/).length
      : undefined,
  };
}

export function reviewsSchema(
  testimonials: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    rating?: number;
  }[],
) {
  if (!testimonials.length) return null;

  const rated = testimonials.filter((t) => typeof t.rating === "number");
  const aggregate = rated.length
    ? {
        "@type": "AggregateRating" as const,
        ratingValue: (
          rated.reduce((sum, t) => sum + (t.rating ?? 0), 0) / rated.length
        ).toFixed(1),
        reviewCount: rated.length,
        bestRating: 5,
        worstRating: 1,
      }
    : undefined;

  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: siteConfig.name,
    url: absoluteUrl("/reviews"),
    ...(aggregate && { aggregateRating: aggregate }),
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: {
        "@type": "Person",
        name: t.author,
        ...(t.company && { worksFor: { "@type": "Organization", name: t.company } }),
      },
      ...(typeof t.rating === "number" && {
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating,
          bestRating: 5,
          worstRating: 1,
        },
      }),
      itemReviewed: { "@id": ORG_ID },
    })),
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Wrap one or more schema nodes into a single @graph document. */
export function graph(...nodes: (object | null | undefined)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
