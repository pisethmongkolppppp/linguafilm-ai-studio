import type { ReactNode } from "react";

import { formatDuration, languageName, styleName } from "@/lib/catalog";
import { thumbnailSrc } from "@/lib/thumbnails";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

import { StatusPill } from "./StatusPill";

export function ProjectCard({
  project,
  actions,
  compact = false,
}: {
  project: Project;
  actions?: ReactNode;
  compact?: boolean;
}) {
  return (
    <article className="surface-panel group overflow-hidden rounded-xl">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnailSrc(project.thumbnail)}
          alt={`Sample still for ${project.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <StatusPill tone={project.status === "approved" ? "approved" : "draft"}>
            {project.status === "approved" ? "Approved" : "Draft"}
          </StatusPill>
          <StatusPill tone="neutral" dot={false}>
            {project.kind === "translation" ? "Translation" : "Original"}
          </StatusPill>
        </div>
        <span className="timecode absolute bottom-3 right-3 rounded-md bg-background/80 px-1.5 py-0.5 text-foreground">
          {formatDuration(project.durationSec)} · {project.aspectRatio}
        </span>
      </div>
      <div className={cn("space-y-2 p-4", compact && "p-3")}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-display text-[15px] font-semibold">{project.title}</h3>
          {actions}
        </div>
        <p className="text-xs text-muted-foreground">
          {styleName(project.style)} · {languageName(project.sourceLanguage)}
          {project.targetLanguages.length > 0 &&
            ` → ${project.targetLanguages.map(languageName).join(", ")}`}
        </p>
      </div>
    </article>
  );
}
