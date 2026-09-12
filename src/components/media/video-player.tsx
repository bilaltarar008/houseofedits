"use client";

import * as React from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";

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
  /** Show the custom control bar (scrubber, time, volume, fullscreen). */
  controls?: boolean;
  priority?: boolean;
  sizes?: string;
  /** Fill the parent's height instead of imposing the video aspect ratio */
  fill?: boolean;
}

type Status = "idle" | "loading" | "ready" | "playing" | "paused";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const ss = String(s).padStart(2, "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${ss}`;
  return `${m}:${ss}`;
}

/**
 * Adaptive HLS player with lazy initialisation and a custom, brand-styled
 * control bar (no native browser video UI).
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
  const progressRef = React.useRef<HTMLDivElement>(null);
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

  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [buffered, setBuffered] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(autoPlayInView);
  const [volume, setVolume] = React.useState(1);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

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
    setIsMuted(true);
    el.play().then(
      () => setStatus("playing"),
      () => setStatus("paused"),
    );
  }, [autoPlayInView, status]);

  /* Autoplay with sound immediately — e.g. a lightbox opened by a click */
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoPlay || status !== "ready") return;
    setIsMuted(false);
    el.play().then(
      () => setStatus("playing"),
      () => setStatus("paused"),
    );
  }, [autoPlay, status]);

  // Keep the element's muted/volume props in sync with our custom controls.
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = isMuted;
  }, [isMuted]);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  React.useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

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

  const toggleMute = () => setIsMuted((m) => !m);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    setVolume(next);
    if (next === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen?.().catch(() => {});
    }
  };

  const seekToClientX = (clientX: number) => {
    const bar = progressRef.current;
    const el = videoRef.current;
    if (!bar || !el || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    el.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const handleProgressPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    seekToClientX(e.clientX);
  };

  const handleProgressPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    seekToClientX(e.clientX);
  };

  const showPoster = !hasStartedPlaying;
  const showControlBar = controls && !autoPlayInView && hasSource;
  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration ? (buffered / duration) * 100 : 0;

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
          preload={priority ? "auto" : "none"}
          poster={video.poster?.url || undefined}
          onPlay={() => {
            setStatus("playing");
            setHasStartedPlaying(true);
          }}
          onPause={() => setStatus((s) => (s === "playing" ? "paused" : s))}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onProgress={(e) => {
            const el = e.currentTarget;
            setBuffered(el.buffered.length ? el.buffered.end(el.buffered.length - 1) : 0);
          }}
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

      {showControlBar && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-2.5 pt-10 transition-opacity duration-300 sm:px-4 sm:pb-3",
            status === "playing" ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        >
          <button
            type="button"
            onClick={handlePlayToggle}
            aria-label={status === "playing" ? "Pause" : "Play"}
            className="shrink-0 text-white transition-colors hover:text-accent-soft"
          >
            {status === "playing" ? (
              <Pause className="size-[18px]" />
            ) : (
              <Play className="size-[18px]" />
            )}
          </button>

          <span className="shrink-0 font-mono text-[0.7rem] tabular-nums text-white/80">
            {formatTime(currentTime)}
          </span>

          <div
            ref={progressRef}
            onPointerDown={handleProgressPointerDown}
            onPointerMove={handleProgressPointerMove}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            className="group/bar relative h-4 flex-1 cursor-pointer touch-none"
          >
            <div className="absolute inset-y-0 left-0 right-0 my-auto h-1 rounded-full bg-white/25" />
            <div
              className="absolute inset-y-0 left-0 my-auto h-1 rounded-full bg-white/40"
              style={{ width: `${bufferedPct}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 my-auto h-1 rounded-full bg-accent-soft"
              style={{ width: `${progressPct}%` }}
            />
            <div
              className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-accent-soft opacity-0 shadow-sm transition-opacity group-hover/bar:opacity-100"
              style={{ left: `calc(${progressPct}% - 6px)` }}
            />
          </div>

          <span className="hidden shrink-0 font-mono text-[0.7rem] tabular-nums text-white/60 sm:inline">
            {formatTime(duration)}
          </span>

          <div className="group/volume flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
              className="text-white transition-colors hover:text-accent-soft"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="size-[18px]" />
              ) : (
                <Volume2 className="size-[18px]" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="hidden w-0 accent-[var(--accent-soft)] transition-all duration-200 group-hover/volume:w-14 sm:block"
            />
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="shrink-0 text-white transition-colors hover:text-accent-soft"
          >
            {isFullscreen ? (
              <Minimize className="size-[18px]" />
            ) : (
              <Maximize className="size-[18px]" />
            )}
          </button>
        </div>
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
