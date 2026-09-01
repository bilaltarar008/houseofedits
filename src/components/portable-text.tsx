import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { Media } from "@/components/media/media";
import { VideoPlayer } from "@/components/media/video-player";
import { toImageAsset } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-5 leading-relaxed text-muted first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-display text-2xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-3 font-display text-xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-accent pl-5 font-display text-xl leading-snug text-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 flex flex-col gap-2 text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 flex list-decimal flex-col gap-2 pl-5 text-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3">
        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent underline-offset-4 hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const image = toImageAsset(value, value?.alt ?? "");
      return (
        <figure className="my-10">
          <Media image={image} aspect="16 / 9" sizes="(min-width: 768px) 720px, 100vw" />
          {value?.caption && (
            <figcaption className="mt-3 text-center text-xs text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoAsset: ({ value }) => (
      <div className="my-10">
        <VideoPlayer
          video={{
            src: value?.hlsUrl ?? "",
            mp4: value?.mp4Url,
            aspect: value?.aspect ?? "16 / 9",
            title: value?.title,
            poster: toImageAsset(value?.poster, value?.title ?? "Video"),
          }}
        />
      </div>
    ),
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <BasePortableText value={value} components={components} />;
}
