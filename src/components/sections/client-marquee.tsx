import { Container } from "@/components/primitives/container";
import { Marquee } from "@/components/primitives/marquee";
import type { SiteSettings } from "@/types/content";

export function ClientMarquee({ clients }: { clients: SiteSettings["clients"] }) {
  if (!clients?.length) return null;

  return (
    <section className="border-y border-border py-10">
      <Container className="flex flex-col gap-6">
        <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by photographers &amp; studios
        </p>
        <Marquee>
          {clients.map((client, i) => (
            <span
              key={`${client.name}-${i}`}
              className="whitespace-nowrap font-display text-xl text-muted/70"
            >
              {client.name}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
