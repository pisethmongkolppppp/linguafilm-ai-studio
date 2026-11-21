/**
 * Domain types for LinguaFilm AI Studio.
 * Shaped so they can later map 1:1 to database tables.
 */

export type ProjectKind = "original" | "translation";
export type ProjectStatus = "draft" | "approved";
export type VideoStyleId = "cinematic" | "documentary" | "animated" | "explainer" | "lifestyle";
export type AspectRatio = "16:9" | "9:16" | "1:1";
export type PlatformId = "facebook" | "tiktok" | "instagram" | "youtube";
export type ThumbnailKey =
  | "neon-rain"
  | "mountain-dawn"
  | "kitchen-dumplings"
  | "paper-forest"
  | "studio-product";

export interface StoryboardScene {
  id: string;
  title: string;
  description: string;
  durationSec: number;
}

export interface Project {
  id: string;
  title: string;
  kind: ProjectKind;
  status: ProjectStatus;
  style: VideoStyleId;
  aspectRatio: AspectRatio;
  durationSec: number;
  sourceLanguage: string;
  targetLanguages: string[];
  thumbnail: ThumbnailKey;
  prompt?: string;
  scenes?: StoryboardScene[];
  outputs?: { subtitles: boolean; voiceOver: boolean };
  createdAt: string;
  updatedAt: string;
  /** Every project in v1 is a demo record: nothing was actually rendered. */
  isDemo: true;
}

/** A plan to publish later. "planned" is the only status until real publishing APIs exist. */
export interface ScheduledPost {
  id: string;
  projectId: string;
  platforms: PlatformId[];
  scheduledFor: string;
  caption: string;
  status: "planned";
  createdAt: string;
}

export type AssistantMode = "ideas" | "script" | "captions" | "translate";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  mode: AssistantMode;
  createdAt: string;
}

export interface UserSettings {
  displayName: string;
  email: string;
  studioName: string;
  role: string;
  defaultSourceLanguage: string;
  defaultTargetLanguage: string;
  defaultAspectRatio: AspectRatio;
  defaultStyle: VideoStyleId;
  notifyWeeklySummary: boolean;
  notifyScheduleReminders: boolean;
  reduceMotion: boolean;
}
