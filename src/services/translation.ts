import { languageName } from "@/lib/catalog";

import { runDemoPipeline, type PipelineProgress, type PipelineStep } from "./demo-runner";

export type SubtitleFormat = "srt" | "vtt";

export interface TranslationRequest {
  fileName: string;
  durationSec: number;
  sourceLanguage: string;
  targetLanguages: string[];
  subtitles: { enabled: boolean; format: SubtitleFormat; burnIn: boolean };
  voiceOver: { enabled: boolean; voice: string; keepBackground: boolean };
}

export interface TranslationResult {
  subtitlePreview: string | null;
  deliverables: string[];
  isDemo: true;
}

export interface TranslationProvider {
  readonly mode: "demo" | "live";
  getSteps(request: TranslationRequest): PipelineStep[];
  translate(
    request: TranslationRequest,
    onProgress: (p: PipelineProgress) => void,
    signal?: AbortSignal,
  ): Promise<TranslationResult>;
}

function getSteps(req: TranslationRequest): PipelineStep[] {
  const steps: PipelineStep[] = [
    { id: "check", label: "Checking the file in your browser", detail: "Nothing is uploaded in demo mode", durationMs: 700 },
    { id: "transcribe", label: "Transcribing speech", detail: `Demo — ${languageName(req.sourceLanguage)} source`, durationMs: 1200 },
    {
      id: "translate",
      label: "Translating the script",
      detail: `Demo — ${req.targetLanguages.map(languageName).join(", ")}`,
      durationMs: 1300,
    },
  ];
  if (req.subtitles.enabled) {
    steps.push({ id: "subs", label: "Formatting subtitle files", detail: `Demo — .${req.subtitles.format} layout`, durationMs: 800 });
  }
  if (req.voiceOver.enabled) {
    steps.push({ id: "voice", label: "Planning the voice-over", detail: "Demo — no audio is produced", durationMs: 900 });
  }
  return steps;
}

function stamp(sec: number, format: SubtitleFormat): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const sep = format === "srt" ? "," : ".";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}${sep}000`;
}

export function buildSubtitlePreview(req: TranslationRequest): string {
  const lang = languageName(req.targetLanguages[0] ?? "en");
  const lines = [1, 2, 3].map((n) => {
    const start = (n - 1) * 4;
    const end = start + 3;
    const body = `[${lang} line ${n} — translated text will appear here]`;
    const cue = `${stamp(start, req.subtitles.format)} --> ${stamp(end, req.subtitles.format)}`;
    return req.subtitles.format === "srt" ? `${n}\n${cue}\n${body}` : `${cue}\n${body}`;
  });
  const body = lines.join("\n\n");
  return req.subtitles.format === "vtt" ? `WEBVTT\n\n${body}` : body;
}

export const demoTranslation: TranslationProvider = {
  mode: "demo",
  getSteps,
  async translate(req, onProgress, signal) {
    await runDemoPipeline(getSteps(req), onProgress, signal);
    const deliverables: string[] = [];
    req.targetLanguages.forEach((code) => {
      const name = languageName(code);
      if (req.subtitles.enabled) deliverables.push(`${name} subtitles (.${req.subtitles.format})${req.subtitles.burnIn ? " + burned-in copy" : ""}`);
      if (req.voiceOver.enabled) deliverables.push(`${name} voice-over track`);
    });
    return {
      subtitlePreview: req.subtitles.enabled ? buildSubtitlePreview(req) : null,
      deliverables,
      isDemo: true,
    };
  },
};
