import { FlaskConical } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function DemoNotice({
  title = "Demo mode",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-primary/25 bg-gradient-brand-soft px-4 py-3 text-sm",
        className,
      )}
    >
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-primary/20 text-primary">
        <FlaskConical className="size-4" />
      </span>
      <div className="space-y-0.5">
        <p className="font-semibold text-foreground">{title}</p>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
