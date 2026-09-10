"use client";

import * as React from "react";
import { X } from "lucide-react";

import { VideoPlayer } from "@/components/media/video-player";
import type { Project } from "@/types/content";

export function WorkLightbox({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  React.useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project?.video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent sm:right-6 sm:top-6"
      >
        <X className="size-5" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl"
      >
        <VideoPlayer
          video={project.video}
          controls
          autoPlay
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="w-full border border-border"
        />
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 px-1 text-white/80">
          <h3 className="font-display text-xl">{project.title}</h3>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/50">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
}
