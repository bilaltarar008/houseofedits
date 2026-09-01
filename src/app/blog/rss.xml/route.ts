import { Feed } from "feed";

import { getPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 3600;

export async function GET() {
  const posts = await getPosts();

  const feed = new Feed({
    title: `${siteConfig.name} — Journal`,
    description: siteConfig.description,
    id: siteConfig.url,
    link: absoluteUrl("/blog"),
    language: "en",
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    updated: posts[0] ? new Date(posts[0].publishedAt) : new Date(),
    feedLinks: { rss2: absoluteUrl("/blog/rss.xml") },
    author: { name: siteConfig.editor },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: absoluteUrl(`/blog/${post.slug}`),
      link: absoluteUrl(`/blog/${post.slug}`),
      description: post.excerpt,
      content: post.plainText || post.excerpt,
      author: [{ name: post.author.name }],
      date: new Date(post.publishedAt),
      category: post.tags.map((name) => ({ name })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
