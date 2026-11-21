/**
 * Original sample content for the demo workspace. No real films or brands.
 */
import type { Project, ScheduledPost, UserSettings } from "./types";

const DAY = 24 * 60 * 60 * 1000;

function daysAgo(now: Date, days: number): string {
  return new Date(now.getTime() - days * DAY).toISOString();
}

function atDayOffset(now: Date, days: number, hours: number, minutes = 0): string {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

export function seedProjects(now = new Date()): Project[] {
  return [
    {
      id: "p_neonrain",
      title: "Neon Rain: A Night Walk",
      kind: "original",
      status: "approved",
      style: "cinematic",
      aspectRatio: "9:16",
      durationSec: 45,
      sourceLanguage: "en",
      targetLanguages: [],
      thumbnail: "neon-rain",
      prompt:
        "A lone walker with a clear umbrella crosses a rain-soaked city at night, neon reflections everywhere.",
      createdAt: daysAgo(now, 6),
      updatedAt: daysAgo(now, 1),
      isDemo: true,
    },
    {
      id: "p_ridge",
      title: "Ridge at First Light",
      kind: "original",
      status: "approved",
      style: "documentary",
      aspectRatio: "16:9",
      durationSec: 90,
      sourceLanguage: "en",
      targetLanguages: [],
      thumbnail: "mountain-dawn",
      prompt: "Sunrise over misty mountain ridges, a river catching the first light.",
      createdAt: daysAgo(now, 9),
      updatedAt: daysAgo(now, 2),
      isDemo: true,
    },
    {
      id: "p_dumpling",
      title: "Grandma's Dumpling Hour",
      kind: "translation",
      status: "draft",
      style: "lifestyle",
      aspectRatio: "16:9",
      durationSec: 94,
      sourceLanguage: "en",
      targetLanguages: ["km", "es"],
      thumbnail: "kitchen-dumplings",
      outputs: { subtitles: true, voiceOver: true },
      createdAt: daysAgo(now, 3),
      updatedAt: daysAgo(now, 0.2),
      isDemo: true,
    },
    {
      id: "p_bolt",
      title: "Bolt and the Paper Forest",
      kind: "original",
      status: "draft",
      style: "animated",
      aspectRatio: "9:16",
      durationSec: 30,
      sourceLanguage: "en",
      targetLanguages: [],
      thumbnail: "paper-forest",
      prompt: "A small round robot explores a glowing paper-craft forest at dusk.",
      createdAt: daysAgo(now, 4),
      updatedAt: daysAgo(now, 4),
      isDemo: true,
    },
    {
      id: "p_everflask",
      title: "Everflask — 30-Second Explainer",
      kind: "original",
      status: "approved",
      style: "explainer",
      aspectRatio: "1:1",
      durationSec: 30,
      sourceLanguage: "en",
      targetLanguages: [],
      thumbnail: "studio-product",
      prompt: "Explain a reusable bottle that keeps drinks cold for 24 hours.",
      createdAt: daysAgo(now, 12),
      updatedAt: daysAgo(now, 5),
      isDemo: true,
    },
    {
      id: "p_neonrain_km",
      title: "Neon Rain — Khmer & Thai edition",
      kind: "translation",
      status: "draft",
      style: "cinematic",
      aspectRatio: "9:16",
      durationSec: 45,
      sourceLanguage: "en",
      targetLanguages: ["km", "th"],
      thumbnail: "neon-rain",
      outputs: { subtitles: true, voiceOver: false },
      createdAt: daysAgo(now, 1),
      updatedAt: daysAgo(now, 1),
      isDemo: true,
    },
  ];
}

export function seedPosts(now = new Date()): ScheduledPost[] {
  return [
    {
      id: "s_neonrain",
      projectId: "p_neonrain",
      platforms: ["tiktok", "instagram"],
      scheduledFor: atDayOffset(now, 2, 19),
      caption: "One umbrella, a hundred reflections. 🌧️ #nightwalk #cinematic",
      status: "planned",
      createdAt: daysAgo(now, 1),
    },
    {
      id: "s_ridge",
      projectId: "p_ridge",
      platforms: ["youtube"],
      scheduledFor: atDayOffset(now, 5, 10),
      caption: "90 seconds of first light over the ridge. Turn the sound up.",
      status: "planned",
      createdAt: daysAgo(now, 2),
    },
    {
      id: "s_everflask",
      projectId: "p_everflask",
      platforms: ["facebook", "instagram"],
      scheduledFor: atDayOffset(now, 9, 12, 30),
      caption: "Cold for 24 hours. Here's how it works in 30 seconds.",
      status: "planned",
      createdAt: daysAgo(now, 3),
    },
  ];
}

export const DEFAULT_SETTINGS: UserSettings = {
  displayName: "Sokha Lim",
  email: "sokha@example.com",
  studioName: "Mekong Light Studio",
  role: "creator",
  defaultSourceLanguage: "en",
  defaultTargetLanguage: "km",
  defaultAspectRatio: "9:16",
  defaultStyle: "cinematic",
  notifyWeeklySummary: true,
  notifyScheduleReminders: true,
  reduceMotion: false,
};

/** Sample activity for the dashboard chart (labelled as sample data in the UI). */
export const SAMPLE_ACTIVITY = [
  { week: "W1", originals: 2, translations: 1 },
  { week: "W2", originals: 3, translations: 2 },
  { week: "W3", originals: 2, translations: 4 },
  { week: "W4", originals: 4, translations: 3 },
  { week: "W5", originals: 3, translations: 5 },
  { week: "W6", originals: 5, translations: 4 },
  { week: "W7", originals: 4, translations: 6 },
  { week: "W8", originals: 6, translations: 7 },
];
