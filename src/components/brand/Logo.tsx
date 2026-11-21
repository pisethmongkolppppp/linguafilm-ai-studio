import { useId } from "react";

import { cn } from "@/lib/utils";

/** LinguaFilm mark: a film frame shaped like a speech bubble, with a play cue. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const grad = `lf-grad-${id}`;
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--primary)" }} />
          <stop offset="1" style={{ stopColor: "var(--electric)" }} />
        </linearGradient>
      </defs>
      <path
        d="M7 3h18a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H15l-6.5 5v-5H7a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z"
        fill={`url(#${grad})`}
      />
      {[7, 11.5, 16, 20.5].map((x) => (
        <rect key={`t${x}`} x={x} y="5.5" width="2.5" height="1.6" rx="0.5" className="fill-background/60" />
      ))}
      {[7, 11.5, 16, 20.5].map((x) => (
        <rect key={`b${x}`} x={x} y="20.9" width="2.5" height="1.6" rx="0.5" className="fill-background/60" />
      ))}
      <path d="M13.5 10.2v7.6l6.2-3.8z" className="fill-primary-foreground" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[15px] font-semibold leading-tight", className)}>
      LinguaFilm <span className="text-gradient-brand">AI Studio</span>
    </span>
  );
}
