/**
 * Pure business rules. No storage, no network — easy to test and reuse on a server later.
 */
import type {
  PlatformId,
  Project,
  ScheduledPost,
  StoryboardScene,
  VideoStyleId,
} from "./types";

/** Only drafts the user has approved can be put on the publishing plan. */
export function getSchedulableProjects(projects: Project[]): Project[] {
  return projects.filter((p) => p.status === "approved");
}

export interface PlannedPostInput {
  projectId: string;
  platforms: PlatformId[];
  scheduledFor: Date;
  caption: string;
}

export type PlannedPostResult = { ok: true; post: ScheduledPost } | { ok: false; error: string };

export function createPlannedPost(
  input: PlannedPostInput,
  projects: Project[],
  now: Date,
  id: string,
): PlannedPostResult {
  const project = projects.find((p) => p.id === input.projectId);
  if (!project) return { ok: false, error: "Choose a video draft to schedule." };
  if (project.status !== "approved") {
    return { ok: false, error: "Only approved drafts can be scheduled. Approve it in the Media Library first." };
  }
  if (input.platforms.length === 0) return { ok: false, error: "Pick at least one platform." };
  if (Number.isNaN(input.scheduledFor.getTime())) return { ok: false, error: "Pick a valid date and time." };
  if (input.scheduledFor.getTime() <= now.getTime()) {
    return { ok: false, error: "Pick a time in the future." };
  }
  return {
    ok: true,
    post: {
      id,
      projectId: project.id,
      platforms: [...new Set(input.platforms)],
      scheduledFor: input.scheduledFor.toISOString(),
      caption: input.caption.trim(),
      status: "planned",
      createdAt: now.toISOString(),
    },
  };
}

export interface StudioStats {
  totalProjects: number;
  approved: number;
  drafts: number;
  translations: number;
  upcomingPosts: number;
  languages: number;
}

export function computeStats(projects: Project[], posts: ScheduledPost[], now: Date): StudioStats {
  const langs = new Set<string>();
  projects.forEach((p) => {
    langs.add(p.sourceLanguage);
    p.targetLanguages.forEach((l) => langs.add(l));
  });
  return {
    totalProjects: projects.length,
    approved: projects.filter((p) => p.status === "approved").length,
    drafts: projects.filter((p) => p.status === "draft").length,
    translations: projects.filter((p) => p.kind === "translation").length,
    upcomingPosts: posts.filter((p) => new Date(p.scheduledFor).getTime() > now.getTime()).length,
    languages: langs.size,
  };
}

const SCENE_BEATS = [
  "Opening hook",
  "Set the scene",
  "Turning point",
  "Closer look",
  "Closing frame",
];

const STYLE_DIRECTION: Record<VideoStyleId, string> = {
  cinematic: "Slow dolly move, low-key light, shallow focus",
  documentary: "Steady wide shot, natural light, observational framing",
  animated: "Stylised 3D frame, bold silhouettes, soft glow",
  explainer: "Clean studio frame, on-screen label, crisp cut",
  lifestyle: "Handheld close-up, warm practical light",
};

/** Deterministic storyboard outline from a prompt — used by the demo generator. */
export function buildStoryboard(
  prompt: string,
  style: VideoStyleId,
  durationSec: number,
): StoryboardScene[] {
  const count = durationSec <= 30 ? 3 : durationSec <= 60 ? 4 : 5;
  const beats = count === 3 ? [SCENE_BEATS[0], SCENE_BEATS[2], SCENE_BEATS[4]] : SCENE_BEATS.slice(0, count);
  const base = Math.floor(durationSec / count);
  const remainder = durationSec - base * count;
  const subject = summarisePrompt(prompt);
  return beats.map((beat, i) => ({
    id: `scene-${i + 1}`,
    title: beat ?? `Scene ${i + 1}`,
    description: `${STYLE_DIRECTION[style]} — ${subject}`,
    durationSec: base + (i === count - 1 ? remainder : 0),
  }));
}

export function summarisePrompt(prompt: string, maxWords = 14): string {
  const words = prompt.trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
  if (words.length === 0) return "your idea";
  const clipped = words.slice(0, maxWords).join(" ");
  return words.length > maxWords ? `${clipped}…` : clipped;
}

export function titleFromPrompt(prompt: string): string {
  const words = prompt
    .trim()
    .replace(/[^\p{L}\p{N}\s'-]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);
  if (words.length === 0) return "Untitled video";
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
