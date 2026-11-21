import { VIDEO_STYLES } from "@/lib/catalog";
import { buildStoryboard, titleFromPrompt } from "@/lib/domain";
import type { AspectRatio, StoryboardScene, ThumbnailKey, VideoStyleId } from "@/lib/types";

import { runDemoPipeline, type PipelineProgress, type PipelineStep } from "./demo-runner";

export interface VideoGenerationRequest {
  prompt: string;
  style: VideoStyleId;
  aspectRatio: AspectRatio;
  durationSec: number;
  voiceTone: string;
  language: string;
}

export interface VideoGenerationResult {
  title: string;
  scenes: StoryboardScene[];
  thumbnail: ThumbnailKey;
  /** In demo mode there is no rendered file — only a storyboard outline. */
  videoUrl: null;
  isDemo: true;
}

/** Swap this for a real provider (server function calling a video model) later. */
export interface VideoGenerationProvider {
  readonly mode: "demo" | "live";
  readonly steps: PipelineStep[];
  generate(
    request: VideoGenerationRequest,
    onProgress: (p: PipelineProgress) => void,
    signal?: AbortSignal,
  ): Promise<VideoGenerationResult>;
}

const STEPS: PipelineStep[] = [
  { id: "read", label: "Reading your prompt", detail: "Finding subject, mood and setting", durationMs: 900 },
  { id: "shots", label: "Drafting a shot list", detail: "Splitting the idea into scenes", durationMs: 1300 },
  { id: "board", label: "Building the storyboard", detail: "Timing each scene to your length", durationMs: 1200 },
  { id: "preview", label: "Preparing a preview frame", detail: "Demo: reuses a sample still", durationMs: 800 },
];

export const demoVideoGeneration: VideoGenerationProvider = {
  mode: "demo",
  steps: STEPS,
  async generate(request, onProgress, signal) {
    await runDemoPipeline(STEPS, onProgress, signal);
    const thumbnail = VIDEO_STYLES.find((s) => s.id === request.style)?.thumbnail ?? "neon-rain";
    return {
      title: titleFromPrompt(request.prompt),
      scenes: buildStoryboard(request.prompt, request.style, request.durationSec),
      thumbnail,
      videoUrl: null,
      isDemo: true,
    };
  },
};
