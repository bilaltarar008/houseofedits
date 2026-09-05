import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function CtaSection({
  title = "Ready to start your wedding project?",
  body = "Tell us about the wedding, your style, and your deadline. We'll reply within one business day with availability and a quote.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="grain relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_120%,rgba(200,164,107,0.14),transparent_70%)]"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <h2 className="max-w-2xl text-3xl leading-tight sm:text-5xl">{title}</h2>
          <p className="max-w-lg text-muted">{body}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button href="/work" size="lg" variant="outline">
              Watch more films
            </Button>
          </div>
          {siteConfig.contact.availability && (
            <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              {siteConfig.contact.availability}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
