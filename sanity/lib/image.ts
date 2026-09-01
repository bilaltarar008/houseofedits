import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import type { ImageAsset } from "@/types/content";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

/** Map a raw Sanity image (with our GROQ projection) into an `ImageAsset`. */
export function toImageAsset(
  source:
    | (SanityImageSource & {
        alt?: string;
        lqip?: string;
        dimensions?: { width: number; height: number };
      })
    | null
    | undefined,
  fallbackAlt = "",
  width = 1600,
): ImageAsset | undefined {
  if (!source) return undefined;
  try {
    return {
      url: urlForImage(source).width(width).url(),
      alt: source.alt || fallbackAlt,
      width: source.dimensions?.width,
      height: source.dimensions?.height,
      lqip: source.lqip,
    };
  } catch {
    return undefined;
  }
}
