import { Check, Loader2 } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { PipelineStep } from "@/services/demo-runner";

export function StepProgress({
  steps,
  activeIndex,
  percent,
}: {
  steps: PipelineStep[];
  activeIndex: number;
  percent: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="timecode text-muted-foreground">Demo workflow</span>
        <span className="timecode text-electric">{Math.round(percent)}%</span>
      </div>
      <Progress value={percent} className="h-1.5 bg-muted [&>div]:bg-gradient-brand" />
      <ol className="space-y-2">
        {steps.map((step, i) => {
          const state = i < activeIndex ? "done" : i === activeIndex ? "running" : "pending";
          return (
            <li
              key={step.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                state === "running" && "border-primary/40 bg-primary/8",
                state === "done" && "border-border bg-surface-raised/50",
                state === "pending" && "border-transparent opacity-55",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border text-[10px]",
                  state === "done" && "border-success/50 bg-success/15 text-success",
                  state === "running" && "border-primary/50 text-primary",
                  state === "pending" && "border-border text-muted-foreground",
                )}
              >
                {state === "done" ? (
                  <Check className="size-3" />
                ) : state === "running" ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  i + 1
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
