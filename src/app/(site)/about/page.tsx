import type { Metadata } from "next";

import { Media } from "@/components/media/media";
import { PortableText } from "@/components/portable-text";
import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section";
import { CtaSection } from "@/components/sections/cta";
import { Stats } from "@/components/sections/stats";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteSettings } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, graph, personSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Meet ${siteConfig.editor} — a wedding film editor and colorist. Background, editing philosophy, and the toolkit behind every delivery.`,
  path: "/about",
  type: "profile",
});

export const revalidate = 3600;

const fallbackBio = [
  "I've spent the better part of a decade in the timeline — first as a videographer, then, once I realised the edit was where the film actually came alive, entirely in post.",
  "Today I work exclusively with wedding photographers and studios who want to shoot more and edit less. I take raw footage, selects, and a short brief, and hand back a film the couple actually re-watches: paced with intention, graded like cinema, and mixed so every vow lands.",
  "I care about restraint. The best wedding films aren't the ones with the most cuts or the loudest music — they're the ones that trust a moment to breathe.",
];

const principles = [
  {
    title: "Story before spectacle",
    body: "Every choice serves the couple's day, not the highlight reel. If a shot doesn't move the story, it doesn't make the cut.",
  },
  {
    title: "Consistent, filmic colour",
    body: "A repeatable grade in DaVinci Resolve so your studio's films look like they belong together — shot to shot, wedding to wedding.",
  },
  {
    title: "Communication you can plan around",
    body: "Clear timelines, one tidy review link, and revisions that don't drag. You always know where the edit stands.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={graph(
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />

      <PageHeader
        eyebrow="About"
        title={`${siteConfig.editor} — editor & colorist`}
        lede={siteConfig.tagline}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Media
              image={{ url: "", alt: `Portrait of ${siteConfig.editor}` }}
              aspect="4 / 5"
              placeholderLabel={`Portrait of ${siteConfig.editor}`}
            />
          </Reveal>

          <div className="flex flex-col gap-6">
            {settings.about?.length ? (
              <PortableText value={settings.about} />
            ) : (
              fallbackBio.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-muted">
                  {p}
                </p>
              ))
            )}
          </div>
        </Container>
      </section>

      <Stats stats={settings.stats} />

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="How I work" title="Three things I won't compromise on" />
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
            {principles.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.06}
                className="flex flex-col gap-3 bg-surface p-8"
              >
                <h3 className="font-display text-lg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {settings.toolkit?.length ? (
        <section className="border-t border-border py-20 sm:py-24">
          <Container className="flex flex-col gap-8">
            <SectionHeading eyebrow="Toolkit" title="What's on the timeline" />
            <ul className="flex flex-wrap gap-3">
              {settings.toolkit.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-border px-4 py-2 text-sm text-muted"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaSection />
    </>
  );
}
