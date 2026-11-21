import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  accent?: "primary" | "electric" | "success" | "warning";
}) {
  const accentClass = {
    primary: "bg-primary/15 text-primary",
    electric: "bg-electric/15 text-electric",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
  }[accent];
  return (
    <div className="surface-panel relative overflow-hidden rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className={cn("grid size-8 place-items-center rounded-lg", accentClass)}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="font-display mt-3 text-3xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
