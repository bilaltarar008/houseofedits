"use client";

import * as React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/content";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })],
  );
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!items.length) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Kind words"
            title="What studios say"
          />
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex size-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => emblaApi?.scrollNext()}
              className="flex size-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {items.map((item) => (
              <figure
                key={item._id}
                className="min-w-0 flex-[0_0_100%] pr-0 sm:flex-[0_0_50%] sm:pr-8 lg:flex-[0_0_40%]"
              >
                <div className="flex h-full flex-col justify-between gap-6 rounded-sm border border-border bg-surface p-8">
                  {item.rating ? (
                    <div className="flex gap-1" aria-label={`${item.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-3.5",
                            i < item.rating!
                              ? "fill-accent text-accent"
                              : "text-border-strong",
                          )}
                        />
                      ))}
                    </div>
                  ) : null}
                  <blockquote className="font-display text-lg leading-snug text-foreground">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="text-sm">
                    <span className="text-foreground">{item.author}</span>
                    {(item.role || item.company) && (
                      <span className="block text-muted">
                        {[item.role, item.company].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "h-1 rounded-full transition-all",
                  i === selected ? "w-8 bg-accent" : "w-4 bg-border-strong",
                )}
              />
            ))}
          </div>
          <Link
            href="/reviews"
            className="shrink-0 text-sm text-accent underline-offset-4 hover:underline"
          >
            All reviews →
          </Link>
        </div>
      </Container>
    </section>
  );
}
