import Link from "next/link";

import { Media } from "@/components/media/media";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/content";

export function PostCard({
  post,
  featured = false,
  priority = false,
}: {
  post: Post;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <Reveal
      as="article"
      className={cn("group", featured && "sm:col-span-2")}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "flex flex-col gap-5",
          featured && "sm:flex-row sm:items-center sm:gap-10",
        )}
      >
        <div className={cn(featured ? "sm:w-1/2" : "w-full")}>
          <Media
            image={post.cover}
            aspect={featured ? "16 / 10" : "3 / 2"}
            priority={priority}
            sizes={featured ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
            imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
            placeholderLabel={post.title}
          />
        </div>

        <div className={cn("flex flex-col gap-3", featured && "sm:w-1/2")}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h3
            className={cn(
              "font-display leading-tight transition-colors group-hover:text-accent",
              featured ? "text-2xl sm:text-3xl" : "text-xl",
            )}
          >
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
          {post.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-[0.7rem] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Reveal>
  );
}
