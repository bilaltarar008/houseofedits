import { ArrowDown } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { VideoPlayer } from "@/components/media/video-player";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/types/content";

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="grain relative overflow-hidden pb-16 pt-14 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_-10%,rgba(200,164,107,0.12),transparent_60%)]"
      />
      <Container className="relative">
        <div className="flex flex-col gap-3">
          <span className="eyebrow animate-fade-up">
            {siteConfig.name} — {siteConfig.role}
          </span>
          <h1 className="max-w-4xl text-balance text-4xl leading-[1.05] animate-fade-up sm:text-6xl lg:text-7xl">
            {settings.headline}
          </h1>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted animate-fade-up sm:text-lg">
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

        <div className="mt-14">
          {settings.showreel ? (
            <VideoPlayer
              video={settings.showreel}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              controls
              className="w-full border border-border"
            />
          ) : null}
        </div>

        <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
          <ArrowDown className="size-4 animate-bounce" />
          <span className="font-mono uppercase tracking-[0.18em]">
            Scroll for featured films
          </span>
        </div>
      </Container>
    </section>
  );
}
