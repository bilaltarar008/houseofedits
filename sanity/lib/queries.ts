import { groq } from "next-sanity";

/* Reusable projections ------------------------------------------------------ */

const imageFields = groq`
  "url": asset->url,
  "lqip": asset->metadata.lqip,
  "dimensions": asset->metadata.dimensions,
  "alt": coalesce(alt, "")
`;

const videoFields = groq`
  "src": coalesce(hlsUrl, ""),
  "mp4": mp4Url,
  "aspect": coalesce(aspect, "16 / 9"),
  "title": title,
  "durationSeconds": durationSeconds,
  "uploadDate": uploadDate,
  poster{ ${imageFields} }
`;

/* Documents --------------------------------------------------------------- */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    headline,
    intro,
    showreel{ ${videoFields} },
    framesVideo{ ${videoFields} },
    "gallery": gallery[]{ caption, image{ ${imageFields} } },
    "clients": clients[]{ name, logo{ ${imageFields} } },
    "stats": stats[]{ label, value },
    about,
    "toolkit": coalesce(toolkit, [])
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(coalesce(order, 999) asc, year desc){
    _id, title, "slug": slug.current, couple, location, category, year,
    excerpt, "services": coalesce(services, []), featured, order,
    cover{ ${imageFields} }
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(coalesce(order, 999) asc, year desc)[0...6]{
    _id, title, "slug": slug.current, couple, location, category, year,
    excerpt, "services": coalesce(services, []),
    cover{ ${imageFields} },
    video{ ${videoFields} }
  }
`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)][].slug.current`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, couple, location, category, year,
    excerpt, "services": coalesce(services, []),
    "credits": credits[]{ role, name },
    cover{ ${imageFields} },
    "gallery": gallery[]{ ${imageFields} },
    video{ ${videoFields} },
    body
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(coalesce(order, 999) asc){
    _id, quote, author, role, company, rating, featured,
    avatar{ ${imageFields} },
    video{ ${videoFields} }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(coalesce(order, 999) asc){
    _id, title, "slug": slug.current, summary, turnaround, perfectFor,
    "deliverables": coalesce(deliverables, []), icon, featured, order
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(coalesce(order, 999) asc){ _id, question, answer, order }
`;

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(publishedAt desc){
    _id, title, "slug": slug.current, excerpt, publishedAt, "updatedAt": _updatedAt,
    "tags": coalesce(tags, []),
    cover{ ${imageFields} },
    "author": author->{ name, role, "avatar": image{ ${imageFields} } }
  }
`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, excerpt, publishedAt, "updatedAt": _updatedAt,
    "tags": coalesce(tags, []),
    cover{ ${imageFields} },
    "author": author->{ name, role, bio, "avatar": image{ ${imageFields} } },
    body,
    "plainText": pt::text(body)
  }
`;
