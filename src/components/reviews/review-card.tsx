import { Star } from "lucide-react";

import { Media } from "@/components/media/media";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/content";

export function ReviewCard({
  review,
  delay = 0,
}: {
  review: Testimonial;
  delay?: number;
}) {
  const rating = review.rating ?? 5;

  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn(
        "group flex h-full flex-col gap-6 rounded-lg border border-[#e7b7b0]/20 bg-gradient-to-b from-surface to-surface-2 p-8",
        "transition-colors duration-300 hover:border-[#e7b7b0]/40",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-1" aria-label={`Rated ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < rating ? "fill-accent text-accent" : "text-border-strong",
              )}
            />
          ))}
        </div>
        <span
          aria-hidden
          className="font-display text-4xl leading-none text-[#e7b7b0]/30"
        >
          &rdquo;
        </span>
      </div>

      <blockquote className="flex-1 font-display text-lg leading-relaxed text-foreground/90">
        {review.quote}
      </blockquote>

      <figcaption className="flex items-center gap-4 border-t border-border pt-5">
        <Media
          image={review.avatar}
          aspect="1 / 1"
          className="size-12 shrink-0 rounded-full border border-[#e7b7b0]/25"
          placeholderLabel={review.author}
        />
        <div className="min-w-0 text-sm">
          <p className="truncate text-foreground">{review.author}</p>
          {(review.role || review.company) && (
            <p className="truncate text-muted">
              {[review.role, review.company].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </figcaption>
    </Reveal>
  );
}
