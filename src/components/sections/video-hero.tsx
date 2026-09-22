import { Section } from "@/components/primitives/section";

/**
 * Full-bleed video banner clipped into an angular shape (see `.hero-video-clip`
 * in globals.css — adjust the cut angle via its `--clip-cut` custom property).
 * Sits on the site's `background` surface so the clipped corners blend into
 * the same dark theme as every other section.
 */
export function VideoHero() {
  return (
    <Section bleed className="bg-background py-8 sm:py-10">
      {/* Preload in parallel with the hero video so this plays smoothly the
          moment it scrolls into view, instead of stalling to buffer. */}
      <link rel="preload" as="video" href="/videos/checkvideo.mp4" type="video/mp4" />
      <div className="hero-video-clip relative aspect-[3/1] min-h-[220px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/checkvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/checkvideo-poster.jpg"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/10 px-6 text-center">
          <h2 className="font-display text-3xl leading-[1.05] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45),0_1px_4px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl">
            Where every moment carries meaning.
          </h2>
          <p className="max-w-md text-pretty text-xs leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:max-w-lg sm:text-base">
            Every frame cut with intention — where sound, story, and light move as one.
          </p>
        </div>
      </div>
    </Section>
  );
}
