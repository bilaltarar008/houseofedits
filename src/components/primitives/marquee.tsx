import { cn } from "@/lib/utils";

/** Infinite horizontal marquee. Duplicates children for a seamless loop. */
export function Marquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x group relative overflow-hidden", className)}>
      <div className="flex w-max animate-marquee gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {children}
        {children}
      </div>
    </div>
  );
}
