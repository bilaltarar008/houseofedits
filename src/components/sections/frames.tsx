"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { Media } from "@/components/media/media";
import { VideoPlayer } from "@/components/media/video-player";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section";
import { cn } from "@/lib/utils";
import type { GalleryFrame, VideoAsset } from "@/types/content";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 26, clipPath: "inset(14% 0% 0% 0%)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, delay: i * 0.06, ease },
  }),
};

function Frame({
  frame,
  index,
  className,
  sizes,
}: {
  frame: GalleryFrame;
  index: number;
  className?: string;
  sizes: string;
}) {
  return (
    <motion.figure
      custom={index}
      variants={reveal}
      className={cn(
        "group relative overflow-hidden rounded-sm border border-border",
        className,
      )}
    >
      <Media
        image={frame.image}
        fill
        sizes={sizes}
        placeholderLabel={frame.caption ?? frame.image.alt}
        imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />

      <span className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[0.6rem] tracking-[0.2em] text-white/55 mix-blend-difference">
        {String(index + 1).padStart(2, "0")}
      </span>

      {frame.caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full border-t border-accent/60 bg-background/85 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {frame.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

export function Frames({
  frames,
  video,
}: {
  frames: GalleryFrame[];
  video?: VideoAsset;
}) {
  const reduce = useReducedMotion();
  const bandRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const driftUp = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const driftDown = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  if (!frames.length) return null;

  const [a, b, ...rest] = frames;
  const strip = rest.slice(0, 4);

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Stills & motion"
            title="The frames behind the films"
            description="A contact sheet from recent weddings — the moments the highlight films are built from."
          />
          <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            {String(frames.length).padStart(2, "0")} frames
          </span>
        </div>

        {/* Hero band: showreel + two stills, perfectly aligned */}
        <motion.div
          ref={bandRef}
          initial={reduce ? undefined : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px 120px 0px" }}
          className="grid gap-3 lg:grid-cols-12 lg:grid-rows-2 lg:[aspect-ratio:16/7]"
        >
          <motion.div
            style={reduce ? undefined : { y: driftDown }}
            className="aspect-video lg:col-span-7 lg:row-span-2 lg:aspect-auto"
          >
            {video ? (
              <motion.div variants={reveal} custom={0} className="h-full">
                <VideoPlayer
                  video={video}
                  fill
                  controls
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="border border-border"
                />
              </motion.div>
            ) : (
              <Frame
                frame={{ image: { url: "", alt: "Showreel still" }, caption: "Showreel" }}
                index={0}
                className="h-full"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            )}
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: driftUp }}
            className="aspect-[3/2] lg:col-span-5 lg:aspect-auto"
          >
            {a && (
              <Frame
                frame={a}
                index={1}
                className="h-full"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            )}
          </motion.div>

          <div className="aspect-[3/2] lg:col-span-5 lg:aspect-auto">
            {b && (
              <Frame
                frame={b}
                index={2}
                className="h-full"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            )}
          </div>
        </motion.div>

        {/* Contact strip: uniform portrait tiles */}
        {strip.length > 0 && (
          <motion.div
            initial={reduce ? undefined : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15, margin: "0px 0px 120px 0px" }}
            className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            {strip.map((frame, i) => (
              <div key={i} className="aspect-[4/5]">
                <Frame
                  frame={frame}
                  index={i + 3}
                  className="h-full"
                  sizes="(min-width: 1024px) 22vw, 50vw"
                />
              </div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
