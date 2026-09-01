import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section";

const steps = [
  {
    n: "01",
    title: "Send your footage",
    body: "Share a Drive, Dropbox, or Frame.io link with your selects, audio, and a short brief. Proxies welcome.",
  },
  {
    n: "02",
    title: "First cut in days, not weeks",
    body: "You get a paced, colour-graded first cut with licensed music placeholders and speeches mixed in.",
  },
  {
    n: "03",
    title: "Refine & deliver",
    body: "Two focused revision rounds, then final exports in 4K plus social-ready vertical and square cuts.",
  },
];

export function Process() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How it works"
          title="A calm, predictable pipeline"
          description="Built for studios that need to shoot more and edit less."
        />

        <ol className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 0.08}
              className="flex flex-col gap-4 bg-surface p-8"
            >
              <span className="font-mono text-sm text-accent">{step.n}</span>
              <h3 className="font-display text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
