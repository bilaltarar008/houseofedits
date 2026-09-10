import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section";
import { Button } from "@/components/ui/button";
import { WorkGrid } from "@/components/work/work-grid";
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

        <WorkGrid projects={projects.slice(0, 6)} priorityCount={3} />
      </Container>
    </section>
  );
}
