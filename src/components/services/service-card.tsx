import {
  Clapperboard,
  Film,
  Music,
  Palette,
  Scissors,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";
import type { ServicePackage } from "@/types/content";

const icons: Record<string, LucideIcon> = {
  film: Film,
  clapperboard: Clapperboard,
  palette: Palette,
  smartphone: Smartphone,
  scissors: Scissors,
  music: Music,
  sparkles: Sparkles,
};

export function ServiceCard({
  service,
  detailed = false,
  delay = 0,
}: {
  service: ServicePackage;
  detailed?: boolean;
  delay?: number;
}) {
  const Icon = icons[service.icon ?? "film"] ?? Film;

  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn(
        "flex flex-col gap-5 rounded-sm border border-border bg-surface p-7 transition-colors hover:border-border-strong",
        detailed && "p-8",
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-sm border border-border text-accent">
        <Icon className="size-5" />
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl">{service.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{service.summary}</p>
      </div>

      {(service.price || service.turnaround) && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {service.price && (
            <span className="text-accent">{service.price}</span>
          )}
          {service.turnaround && (
            <span className="text-muted-foreground">{service.turnaround}</span>
          )}
        </div>
      )}

      {detailed && service.deliverables.length > 0 && (
        <ul className="mt-1 flex flex-col gap-2 border-t border-border pt-5 text-sm text-muted">
          {service.deliverables.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}
