import type { Metadata } from "next";

import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { WorkIndex } from "@/components/work/work-index";
import { getProjects } from "@/lib/content";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Wedding highlight films, feature edits, and social teasers edited and colour-graded by Shoaib Ur Rehman for studios worldwide.",
  path: "/work",
});

export const revalidate = 3600;

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          {
            "@type": "CollectionPage",
            name: "Work — House of Edits",
            url: absoluteUrl("/work"),
            hasPart: projects.map((p) => ({
              "@type": "CreativeWork",
              name: p.title,
              url: absoluteUrl(`/work/${p.slug}`),
              genre: p.category,
            })),
          },
        )}
      />

      <PageHeader
        eyebrow="Portfolio"
        title="Wedding films, start to finish"
        lede="Every project here was edited and graded in-house. Filter by format below."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <WorkIndex projects={projects} />
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
