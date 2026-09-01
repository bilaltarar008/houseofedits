import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section";
import { Button } from "@/components/ui/button";
import { WorkCard } from "@/components/work/work-card";
import type { Project } from "@/types/content";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Films couples re-watch"
            description="A cross-section of recent highlight films, feature edits, and teasers."
          />
          <Button href="/work" variant="link" className="text-sm">
            All projects →
          </Button>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, i) => (
            <WorkCard key={project._id} project={project} priority={i < 3} />
          ))}
        </div>
      </Container>
    </section>
  );
}
