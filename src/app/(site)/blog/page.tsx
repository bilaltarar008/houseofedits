import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description:
    "Notes on wedding film editing, colour grading, and post-production workflow from Shoaib Ur Rehman — written for photographers and studios.",
  path: "/blog",
});

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
          ]),
          {
            "@type": "Blog",
            name: `${siteConfig.name} Journal`,
            url: absoluteUrl("/blog"),
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}`),
              datePublished: p.publishedAt,
            })),
          },
        )}
      />

      <PageHeader
        eyebrow="Journal"
        title="Notes from the timeline"
        lede="Practical writing on editing, colour, and working with an outside editor."
      />

      <section className="py-16 sm:py-24">
        <Container>
          {posts.length === 0 ? (
            <p className="py-16 text-center text-muted">
              The first posts are being written — check back soon.
            </p>
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {featured && <PostCard post={featured} featured priority />}
              {rest.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
