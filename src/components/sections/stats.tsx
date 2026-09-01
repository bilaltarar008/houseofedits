import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import type { SiteSettings } from "@/types/content";

export function Stats({ stats }: { stats: SiteSettings["stats"] }) {
  if (!stats?.length) return null;

  return (
    <section className="border-y border-border py-16">
      <Container>
        <dl className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="flex flex-col gap-2">
              <dt className="font-display text-4xl text-accent sm:text-5xl">
                {stat.value}
              </dt>
              <dd className="text-sm text-muted">{stat.label}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
