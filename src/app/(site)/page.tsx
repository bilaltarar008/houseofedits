import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { CtaSection } from "@/components/sections/cta";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Frames } from "@/components/sections/frames";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { VideoHero } from "@/components/sections/video-hero";
import {
  getFeaturedProjects,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";
import {
  graph,
  organizationSchema,
  personSchema,
  videoObjectSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  description:
    "Portfolio of Shoaib Ur Rehman — a wedding film editor and colorist crafting cinematic highlight films, feature edits, and social teasers for photographers and studios worldwide.",
});

export default async function HomePage() {
  const [settings, projects, services, testimonials] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          personSchema(),
          websiteSchema(),
          settings.showreel
            ? videoObjectSchema(settings.showreel, "/")
            : undefined,
        )}
      />

      <Hero settings={settings} />
      <ClientMarquee clients={settings.clients} />
      <VideoHero />
      <FeaturedWork projects={projects} />
      <Frames frames={settings.gallery} video={settings.showreel} />
      <ServicesPreview services={services} />
      <Process />
      <Stats stats={settings.stats} />
      <Testimonials items={testimonials} />
      <CtaSection />
    </>
  );
}
