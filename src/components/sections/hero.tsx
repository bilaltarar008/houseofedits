import { Container } from "@/components/primitives/container";
import { VideoPlayer } from "@/components/media/video-player";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { resolveMediaUrl } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

export function Hero({ settings }: { settings: SiteSettings }) {
  const showreelUrl = settings.showreel
    ? resolveMediaUrl(settings.showreel.src) || resolveMediaUrl(settings.showreel.mp4)
    : "";

  return (
    <section className="grain relative -mt-20 overflow-hidden">
      {showreelUrl && (
        // Kicks off the network fetch as soon as the browser parses <head>,
        // in parallel with the JS bundle, so the hero video is already
        // buffering well before React hydrates and VideoPlayer mounts.
        <link rel="preload" as="video" href={showreelUrl} type="video/mp4" />
      )}
      {settings.showreel ? (
        <div className="relative h-[92svh] min-h-[560px] w-full sm:h-screen">
          <VideoPlayer
            video={settings.showreel}
            priority
            sizes="100vw"
            autoPlayInView
            loop
            fill
            className="h-full w-full rounded-none border-0"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
            <p className="animate-fade-up text-center leading-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55)]">
              <span className="block font-display text-4xl italic sm:text-6xl lg:text-7xl">
                Wedding stories, shot
              </span>
              <span className="mt-2 block font-display text-2xl italic tracking-wide text-white/85 sm:text-3xl lg:text-4xl">
                and cut with feeling.
              </span>
            </p>
          </div>
          {/* <div className="absolute inset-x-0 bottom-0">
            <Container className="pb-6">
              <div className="inline-flex animate-fade-up items-center gap-3 rounded-full border border-border bg-background/80 px-4 py-2 text-xs text-foreground backdrop-blur-sm">
                <ArrowDown className="size-4 animate-bounce" />
                <span className="font-mono uppercase tracking-[0.18em]">
                  Scroll for featured films
                </span>
              </div>
            </Container>
          </div> */}
        </div>
      ) : null}

      <Container className="relative pb-16 pt-10 sm:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_-10%,rgba(193,231,251,0.55),transparent_60%)]"
        />
        <div className="relative flex flex-col gap-3">
          <span className="eyebrow animate-fade-up">
            {siteConfig.name} — {siteConfig.role}
          </span>
          <h1 className="max-w-4xl text-balance text-4xl leading-[1.05] animate-fade-up sm:text-6xl lg:text-7xl">
            {settings.headline}
          </h1>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-pretty text-xs leading-relaxed text-muted animate-fade-up sm:text-sm">
            {settings.intro}
          </p>
          <div className="flex shrink-0 flex-wrap gap-3 animate-fade-up">
            <Button href="/work" size="lg">
              View the work
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Start a project
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
