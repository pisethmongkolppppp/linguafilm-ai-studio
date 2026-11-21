export interface PipelineStep {
  id: string;
  label: string;
  detail: string;
  durationMs: number;
}

export interface PipelineProgress {
  activeIndex: number;
  /** 0–100 across the whole pipeline */
  percent: number;
}

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException("Cancelled", "AbortError"));
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new DOMException("Cancelled", "AbortError"));
      },
      { once: true },
    );
  });
}

/** Walks through steps on a timer so the UI can show a realistic workflow. Does no real work. */
export async function runDemoPipeline(
  steps: PipelineStep[],
  onProgress: (p: PipelineProgress) => void,
  signal?: AbortSignal,
): Promise<void> {
  const total = steps.reduce((sum, s) => sum + s.durationMs, 0);
  let elapsed = 0;
  const tick = 90;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (!step) continue;
    let stepElapsed = 0;
    while (stepElapsed < step.durationMs) {
      onProgress({ activeIndex: i, percent: Math.min(99, ((elapsed + stepElapsed) / total) * 100) });
      await sleep(tick, signal);
      stepElapsed += tick;
    }
    elapsed += step.durationMs;
  }
  onProgress({ activeIndex: steps.length, percent: 100 });
}

export function isAbortError(e: unknown): boolean {
  return e instanceof DOMException && e.name === "AbortError";
}
