"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

import { Media } from "@/components/media/media";
import { cn, resolveMediaUrl } from "@/lib/utils";
import type { VideoAsset } from "@/types/content";

interface VideoPlayerProps {
  video: VideoAsset;
  className?: string;
  /** Start playing (muted) once scrolled into view — for hero showreels. */
  autoPlayInView?: boolean;
  /** Start playing immediately, unmuted — for a lightbox opened by a click. */
  autoPlay?: boolean;
  loop?: boolean;
  /** Show native controls once playing. */
  controls?: boolean;
  priority?: boolean;
  sizes?: string;
  /** Fill the parent's height instead of imposing the video aspect ratio */
  fill?: boolean;
}

type Status = "idle" | "loading" | "ready" | "playing" | "paused";

/**
 * Adaptive HLS player with lazy initialisation.
 *
 * - Nothing loads until the player is near the viewport (IntersectionObserver).
 * - hls.js is dynamically imported only when actually needed (Safari uses
 *   native HLS and skips the library entirely).
 * - With no source yet, shows the poster + a "coming soon" state.
 */
export function VideoPlayer({
  video,
  className,
  autoPlayInView = false,
  autoPlay = false,
  loop = false,
  controls = true,
  priority = false,
  sizes = "100vw",
  fill = false,
}: VideoPlayerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hlsRef = React.useRef<{ destroy: () => void } | null>(null);

  const [status, setStatus] = React.useState<Status>("idle");
  // Priority videos (e.g. the hero showreel) are already known to be above
  // the fold, so skip waiting on an IntersectionObserver round-trip.
  const [nearViewport, setNearViewport] = React.useState(priority);
  // Sticky flag — true once real frames have started rendering. Distinct
  // from `status`, which flips to "ready" the instant `src` is assigned,
  // well before the browser has actually decoded a paintable frame. Hiding
  // the poster on "ready" exposes that gap as a black/partial-frame flash;
  // this keeps the poster up until playback has genuinely begun, and (unlike
  // gating on status) never re-shows it on a later pause.
  const [hasStartedPlaying, setHasStartedPlaying] = React.useState(false);

  const hlsUrl = resolveMediaUrl(video.src);
  const mp4Url = resolveMediaUrl(video.mp4);
  const source = hlsUrl || mp4Url;
  const hasSource = source.length > 0;
  const isHls = hlsUrl.endsWith(".m3u8");

  /* Observe viewport proximity ------------------------------------------- */
  React.useEffect(() => {
    if (priority) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  /* Attach a source ----------------------------------------------------- */
  const attach = React.useCallback(async () => {
    const el = videoRef.current;
    if (!el || !hasSource || hlsRef.current || el.src) return;

    setStatus("loading");

    const canNativeHls =
      isHls && el.canPlayType("application/vnd.apple.mpegurl") !== "";

    if (!isHls || canNativeHls) {
      el.src = source;
      setStatus("ready");
      return;
    }

    try {
      const { default: Hls } = await import("hls.js");
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
        hls.loadSource(hlsUrl);
        hls.attachMedia(el);
        hlsRef.current = hls;
      } else {
        el.src = mp4Url || hlsUrl;
      }
      setStatus("ready");
    } catch {
      el.src = mp4Url || hlsUrl;
      setStatus("ready");
    }
  }, [hasSource, hlsUrl, isHls, mp4Url, source]);

  React.useEffect(() => {
    // Synchronising an external system (the <video> element / hls.js) with
    // viewport state — the loading/ready status is derived from that async
    // resource, which is what an effect is for here.
    if (nearViewport && (autoPlayInView || autoPlay || status !== "idle")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void attach();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearViewport]);

  React.useEffect(() => {
    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, []);

  /* Autoplay muted loop when visible ---------------------------------- */
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoPlayInView || status !== "ready") return;
    el.muted = true;
    el.play().then(
      () => setStatus("playing"),
      () => setStatus("paused"),
    );
  }, [autoPlayInView, status]);

  /* Autoplay with sound immediately — e.g. a lightbox opened by a click */
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoPlay || status !== "ready") return;
    el.muted = false;
    el.play().then(
      () => setStatus("playing"),
      () => setStatus("paused"),
    );
  }, [autoPlay, status]);

  const handlePlayToggle = async () => {
    if (!hasSource) return;
    if (!videoRef.current?.src && !hlsRef.current) await attach();
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) {
      node.play().then(() => setStatus("playing"));
    } else {
      node.pause();
      setStatus("paused");
    }
  };

  const showPoster = !hasStartedPlaying;

  return (
    <div
      ref={containerRef}
      className={cn(
        "grain group relative overflow-hidden rounded-sm bg-black",
        fill && "h-full w-full",
        className,
      )}
      style={fill ? undefined : { aspectRatio: video.aspect ?? "16 / 9" }}
    >
      {hasSource && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            showPoster ? "opacity-0" : "opacity-100",
          )}
          playsInline
          loop={loop || autoPlayInView}
          muted={autoPlayInView}
          controls={controls && !autoPlayInView && status !== "idle"}
          preload={priority ? "auto" : "none"}
          poster={video.poster?.url || undefined}
          onPlay={() => {
            setStatus("playing");
            setHasStartedPlaying(true);
          }}
          onPause={() => setStatus((s) => (s === "playing" ? "paused" : s))}
        />
      )}

      {showPoster && (
        <div className="absolute inset-0">
          <Media
            image={video.poster}
            fill
            priority={priority}
            sizes={sizes}
            placeholderLabel={video.title ?? "Film"}
            className="rounded-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
      )}

      {!autoPlayInView && (
        <button
          type="button"
          onClick={handlePlayToggle}
          disabled={!hasSource}
          aria-label={
            !hasSource
              ? "Film coming soon"
              : status === "playing"
                ? "Pause"
                : "Play film"
          }
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity",
            status === "playing" && "opacity-0 group-hover:opacity-100",
          )}
        >
          <span
            className={cn(
              "flex size-16 items-center justify-center rounded-full border backdrop-blur-sm transition-transform duration-300 sm:size-20",
              hasSource
                ? "border-white/30 bg-black/30 text-white group-hover:scale-105 group-hover:border-accent group-hover:text-accent"
                : "border-white/15 bg-black/40 text-white/50",
            )}
          >
            {status === "playing" ? (
              <Pause className="size-6" />
            ) : (
              <Play className="ml-1 size-6" />
            )}
          </span>
        </button>
      )}

      {!hasSource && (
        <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm">
          Film coming soon
        </span>
      )}

      {status === "loading" && (
        <span className="absolute bottom-4 right-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/60">
          Loading…
        </span>
      )}
    </div>
  );
}
