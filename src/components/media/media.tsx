import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/content";

interface MediaProps {
  image?: ImageAsset;
  /** CSS aspect-ratio string, e.g. "16 / 9" */
  aspect?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Label shown on the placeholder when no image is set */
  placeholderLabel?: string;
}

function hasRealSrc(url?: string) {
  return !!url && (url.startsWith("http") || url.startsWith("/")) && url !== "/";
}

/**
 * Renders a Sanity/remote image, or an elegant editorial placeholder when the
 * client hasn't supplied media yet. Same footprint either way, so layouts
 * don't shift when real images drop in.
 */
export function Media({
  image,
  aspect = "16 / 9",
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  placeholderLabel,
}: MediaProps) {
  const real = hasRealSrc(image?.url);

  return (
    <div
      className={cn(
        "grain @container relative overflow-hidden rounded-sm bg-surface-2",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {real ? (
        <Image
          src={image!.url}
          alt={image!.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={image!.lqip ? "blur" : "empty"}
          blurDataURL={image!.lqip}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <Placeholder label={placeholderLabel ?? image?.alt} />
      )}
    </div>
  );
}

function Placeholder({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_120%_at_20%_0%,#1c1c20,#0d0d0f_70%)]">
      {/* frame corner marks — hidden in small containers (e.g. avatars) */}
      <span className="pointer-events-none absolute left-4 top-4 size-4 border-l border-t border-accent/40 @max-[220px]:hidden" />
      <span className="pointer-events-none absolute right-4 top-4 size-4 border-r border-t border-accent/40 @max-[220px]:hidden" />
      <span className="pointer-events-none absolute bottom-4 left-4 size-4 border-b border-l border-accent/40 @max-[220px]:hidden" />
      <span className="pointer-events-none absolute bottom-4 right-4 size-4 border-b border-r border-accent/40 @max-[220px]:hidden" />
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          className="text-accent/70 @max-[120px]:size-4"
          aria-hidden
        >
          <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" stroke="currentColor" />
          <path d="M2.5 8.5h19M7.5 4.5v15M16.5 4.5v15" stroke="currentColor" />
        </svg>
        {label && (
          <span className="max-w-[24ch] font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground @max-[220px]:hidden">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
