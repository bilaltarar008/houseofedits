"use client";

import * as React from "react";

import { WorkCard } from "@/components/work/work-card";
import { WorkLightbox } from "@/components/work/work-lightbox";
import type { Project } from "@/types/content";

export function WorkGrid({
  projects,
  className = "grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
  priorityCount = 0,
}: {
  projects: Project[];
  className?: string;
  priorityCount?: number;
}) {
  const [active, setActive] = React.useState<Project | null>(null);

  return (
    <>
      <div className={className}>
        {projects.map((project, i) => (
          <WorkCard
            key={project._id}
            project={project}
            priority={i < priorityCount}
            onPlay={setActive}
          />
        ))}
      </div>
      <WorkLightbox project={active} onClose={() => setActive(null)} />
    </>
  );
}
