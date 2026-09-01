import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PostCard } from "@/components/blog/post-card";
import { Media } from "@/components/media/media";
import { PortableText } from "@/components/portable-text";
import { Container } from "@/components/primitives/container";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, getPostSlugs, getPosts } from "@/lib/content";
import {
  articleSchema,
  breadcrumbSchema,
  graph,
  personSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return buildMetadata({ title: "Post not found", noindex: true });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover?.url || undefined,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    tags: post.tags,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);

  if (!post) notFound();

  const more = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={graph(
          personSchema(),
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        )}
      />

      <article className="py-10 sm:py-14">
        <Container className="flex max-w-3xl flex-col gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Journal
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
            {post.tags[0] && (
              <>
                <span aria-hidden>·</span>
                <span>{post.tags[0]}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl leading-[1.12] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="text-lg text-muted">{post.excerpt}</p>
        </Container>

        {post.cover && (
          <Container className="my-10 max-w-4xl">
            <Media
              image={post.cover}
              aspect="16 / 9"
              priority
              sizes="(min-width: 896px) 896px, 100vw"
            />
          </Container>
        )}

        <Container className="max-w-3xl">
          {post.body?.length ? (
            <PortableText value={post.body} />
          ) : (
            <p className="leading-relaxed text-muted">
              {post.plainText ||
                "This article is being finalised and will be published shortly."}
            </p>
          )}

          <div className="mt-12 flex items-center gap-4 border-t border-border pt-8">
            <Media
              image={post.author.avatar}
              aspect="1 / 1"
              className="size-12 shrink-0 rounded-full"
              placeholderLabel={post.author.name}
            />
            <div className="text-sm">
              <p className="text-foreground">{post.author.name}</p>
              {post.author.role && (
                <p className="text-muted">{post.author.role}</p>
              )}
            </div>
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <Container className="border-t border-border py-16">
          <h2 className="mb-10 font-display text-2xl">Keep reading</h2>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {more.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </Container>
      )}

      <CtaSection />
    </>
  );
}
