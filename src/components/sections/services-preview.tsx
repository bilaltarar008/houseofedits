import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section";
import { ServiceCard } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";
import type { ServicePackage } from "@/types/content";

export function ServicesPreview({ services }: { services: ServicePackage[] }) {
  if (!services.length) return null;

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="What we do"
          title="Post-production, handled end to end"
          description="Pick a package or bring your own workflow — our team slots into your studio's process."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, i) => (
            <ServiceCard key={service._id} service={service} delay={i * 0.05} />
          ))}
        </div>

        <div>
          <Button href="/services" variant="outline">
            See packages &amp; pricing
          </Button>
        </div>
      </Container>
    </section>
  );
}
