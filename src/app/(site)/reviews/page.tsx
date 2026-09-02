import type { Metadata } from "next";
import { Star } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/primitives/reveal";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewsEmpty } from "@/components/reviews/reviews-empty";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getPublishedTestimonials } from "@/lib/content";
import { breadcrumbSchema, graph, reviewsSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Reviews",
  description: `What couples, photographers, and studios say about working with ${siteConfig.editor} — reviews of the wedding films and colour grades delivered by ${siteConfig.name}.`,
  path: "/reviews",
});

export const revalidate = 3600;

export default async function ReviewsPage() {
  const reviews = await getPublishedTestimonials();
  const hasReviews = reviews.length > 0;

  const rated = reviews.filter((r) => typeof r.rating === "number");
  const average = rated.length
    ? rated.reduce((sum, r) => sum + (r.rating ?? 0), 0) / rated.length
    : 0;

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Reviews", path: "/reviews" },
          ]),
          hasReviews ? reviewsSchema(reviews) : undefined,
        )}
      />

      <PageHeader
        eyebrow="Reviews"
        title="Kind words from the couples"
        lede="Every film here was trusted to an outside editor. Here is what that felt like on the other side."
      />

      <section className="py-16 sm:py-24">
        <Container>
          {hasReviews ? (
            <div className="flex flex-col gap-12">
              {rated.length > 0 && (
                <Reveal className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-border pb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl text-accent">
                      {average.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted">/ 5</span>
                  </div>
                  <div className="flex gap-1" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < Math.round(average)
                            ? "size-4 fill-accent text-accent"
                            : "size-4 text-border-strong"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">
                    Based on {rated.length}{" "}
                    {rated.length === 1 ? "review" : "reviews"}
                  </span>
                </Reveal>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, i) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    delay={(i % 3) * 0.06}
                  />
                ))}
              </div>
            </div>
          ) : (
            <ReviewsEmpty />
          )}
        </Container>
      </section>

      <ReviewsCta hasReviews={hasReviews} />
    </>
  );
}

function ReviewsCta({ hasReviews }: { hasReviews: boolean }) {
  const leaveHref = siteConfig.reviewUrl || "/contact";

  return (
    <section className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_50%_120%,rgba(231,183,176,0.12),transparent_70%)]"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <span className="eyebrow text-[#e7b7b0]">Your turn</span>
          <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">
            {hasReviews
              ? "Worked with House of Edits?"
              : "Be the first to share your story"}
          </h2>
          <p className="max-w-lg text-muted">
            If a film we cut together moved your couple, we&apos;d love to hear
            about it. New reviews are added as couples and studios send them —
            check back soon, or share yours now.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button href={leaveHref} size="lg">
              Leave a review
            </Button>
            <Button href="/work" size="lg" variant="outline">
              See the films
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
