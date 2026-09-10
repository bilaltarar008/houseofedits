import { Container } from "@/components/primitives/container";

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-border py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_300px_at_10%_-20%,rgba(193,231,251,0.5),transparent_60%)]"
      />
      <Container className="relative flex flex-col gap-4">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lede && (
          <p className="max-w-xl text-base leading-relaxed text-muted">{lede}</p>
        )}
      </Container>
    </section>
  );
}
