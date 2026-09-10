import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

import { Media } from "@/components/media/media";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

function hasPlayableVideo(project: Project) {
  return Boolean(project.video?.src || project.video?.mp4);
}

export function WorkCard({
  project,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  onPlay,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** When provided and the project has a video, a plain click opens it here instead of navigating. */
  onPlay?: (project: Project) => void;
}) {
  const playable = onPlay && hasPlayableVideo(project);

  return (
    <Reveal as="article" className={cn("group", className)}>
      <Link
        href={`/work/${project.slug}`}
        className="block"
        onClick={(e) => {
          if (!playable) return;
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          e.preventDefault();
          onPlay(project);
        }}
      >
        <div className="relative overflow-hidden rounded-sm">
          <Media
            image={project.cover}
            aspect="4 / 3"
            priority={priority}
            sizes={sizes}
            imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
            placeholderLabel={project.couple ?? project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {playable ? (
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex size-14 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-accent group-hover:text-accent">
                <Play className="ml-0.5 size-5" />
              </span>
            </span>
          ) : (
            <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
              <ArrowUpRight className="size-4" />
            </span>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg leading-tight transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {[project.couple, project.location].filter(Boolean).join(" · ")}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
