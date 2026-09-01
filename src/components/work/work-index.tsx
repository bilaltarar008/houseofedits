"use client";

import * as React from "react";

import { WorkCard } from "@/components/work/work-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const categories = React.useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [active, setActive] = React.useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={active === category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors",
              active === category
                ? "border-accent bg-accent text-accent-contrast"
                : "border-border text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <WorkCard key={project._id} project={project} priority={i < 3} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
