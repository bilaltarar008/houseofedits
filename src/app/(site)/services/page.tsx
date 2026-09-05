import type { Metadata } from "next";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section";
import { CtaSection } from "@/components/sections/cta";
import { Process } from "@/components/sections/process";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCard } from "@/components/services/service-card";
import { getFaqs, getServices } from "@/lib/content";
import {
  breadcrumbSchema,
  faqPageSchema,
  graph,
  organizationSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Services & Pricing",
  description:
    "Wedding highlight films, feature edits, social teasers, and colour grading — packages, deliverables, turnaround times, and pricing.",
  path: "/services",
});

export const revalidate = 3600;

export default async function ServicesPage() {
  const [services, faqs] = await Promise.all([getServices(), getFaqs()]);

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          faqPageSchema(faqs),
          {
            "@type": "OfferCatalog",
            name: "Wedding post-production services",
            url: absoluteUrl("/services"),
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              name: s.title,
              description: s.summary,
            })),
          },
        )}
      />

      <PageHeader
        eyebrow="Services"
        title="Packages built around your studio"
        lede="Fixed-scope packages for predictable budgets — or an hourly retainer if you'd rather I embed in your workflow."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard
              key={service._id}
              service={service}
              detailed
              delay={i * 0.05}
            />
          ))}
        </Container>
      </section>

      <Process />

      <section className="border-t border-border py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently asked"
            className="lg:sticky lg:top-28 lg:self-start"
          />
          <Reveal>
            <Accordion
              items={faqs.map((f) => ({
                id: f._id,
                question: f.question,
                answer: f.answer,
              }))}
            />
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Not sure which package fits?"
        body="Send me a couple of reference films and your deadline — I'll recommend the right scope and give you a quote."
      />
    </>
  );
}
