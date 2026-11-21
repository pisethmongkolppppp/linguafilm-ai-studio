import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type PillTone = "draft" | "approved" | "planned" | "demo" | "offline" | "neutral";

const TONES: Record<PillTone, string> = {
  draft: "border-border bg-muted text-muted-foreground",
  approved: "border-success/30 bg-success/12 text-success",
  planned: "border-electric/30 bg-electric/12 text-electric",
  demo: "border-primary/35 bg-primary/12 text-primary",
  offline: "border-warning/30 bg-warning/10 text-warning",
  neutral: "border-border bg-surface-raised/80 text-foreground",
};

export function StatusPill({
  tone,
  children,
  className,
  dot = true,
}: {
  tone: PillTone;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide backdrop-blur",
        TONES[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}

export function DemoTag({ className }: { className?: string }) {
  return (
    <StatusPill tone="demo" className={className}>
      Demo
    </StatusPill>
  );
}
