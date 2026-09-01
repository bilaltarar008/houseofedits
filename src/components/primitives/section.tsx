import { cn } from "@/lib/utils";

import { Container } from "./container";
import { Reveal } from "./reveal";

export function Section({
  className,
  children,
  id,
  bleed = false,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  /** Skip the inner container (for full-bleed media) */
  bleed?: boolean;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className="max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>
      {description && (
        <p className="max-w-xl text-[0.98rem] leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
