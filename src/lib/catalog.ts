import type { AspectRatio, ThumbnailKey, VideoStyleId } from "./types";

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "km", name: "Khmer" },
  { code: "th", name: "Thai" },
  { code: "vi", name: "Vietnamese" },
  { code: "id", name: "Indonesian" },
  { code: "zh", name: "Chinese (Mandarin)" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
] as const;

export function languageName(code: string): string {
  if (code === "auto") return "Auto-detect";
  return LANGUAGES.find((l) => l.code === code)?.name ?? code.toUpperCase();
}

export const VIDEO_STYLES: {
  id: VideoStyleId;
  name: string;
  blurb: string;
  thumbnail: ThumbnailKey;
}[] = [
  {
    id: "cinematic",
    name: "Cinematic",
    blurb: "Moody light, slow camera moves",
    thumbnail: "neon-rain",
  },
  {
    id: "documentary",
    name: "Documentary",
    blurb: "Natural, observational, calm narration",
    thumbnail: "mountain-dawn",
  },
  {
    id: "animated",
    name: "Animated",
    blurb: "Stylised 3D characters and worlds",
    thumbnail: "paper-forest",
  },
  {
    id: "explainer",
    name: "Product explainer",
    blurb: "Clean studio shots with clear beats",
    thumbnail: "studio-product",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    blurb: "Warm, handheld, everyday moments",
    thumbnail: "kitchen-dumplings",
  },
];

export function styleName(id: VideoStyleId): string {
  return VIDEO_STYLES.find((s) => s.id === id)?.name ?? id;
}

export const ASPECT_RATIOS: { id: AspectRatio; label: string; hint: string }[] = [
  { id: "16:9", label: "16:9", hint: "YouTube, Facebook" },
  { id: "9:16", label: "9:16", hint: "TikTok, Reels, Shorts" },
  { id: "1:1", label: "1:1", hint: "Feed posts" },
];

export const VOICE_TONES = [
  { id: "warm", name: "Warm narrator" },
  { id: "bright", name: "Bright host" },
  { id: "calm", name: "Calm documentary" },
  { id: "none", name: "No voice-over" },
] as const;

export function formatDuration(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = Math.round(totalSec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
