import { summarisePrompt } from "@/lib/domain";
import type { AssistantMode, ChatMessage } from "@/lib/types";

import { sleep } from "./demo-runner";

export interface AssistantRequest {
  mode: AssistantMode;
  prompt: string;
  history: ChatMessage[];
}

/** Later: a server function streaming from an AI model. Same callback shape. */
export interface AssistantProvider {
  readonly mode: "demo" | "live";
  reply(request: AssistantRequest, onDelta: (textSoFar: string) => void, signal?: AbortSignal): Promise<string>;
}

export const ASSISTANT_MODES: { id: AssistantMode; label: string; hint: string; starters: string[] }[] = [
  {
    id: "ideas",
    label: "Video ideas",
    hint: "Concepts and hooks",
    starters: [
      "Short video ideas for a small Khmer bakery",
      "3 concepts for a travel vlog about rainy season",
    ],
  },
  {
    id: "script",
    label: "Script",
    hint: "Scene-by-scene drafts",
    starters: ["A 45-second script about morning routines", "Script for a product explainer about a smart lamp"],
  },
  {
    id: "captions",
    label: "Captions",
    hint: "Platform-ready copy",
    starters: ["Captions for a sunrise timelapse", "TikTok caption for a cooking clip"],
  },
  {
    id: "translate",
    label: "Translation",
    hint: "Plan multilingual versions",
    starters: ["Plan a Thai and Khmer version of my cooking video", "How should I adapt jokes for Spanish viewers?"],
  },
];

function template(mode: AssistantMode, prompt: string): string {
  const topic = summarisePrompt(prompt, 12);
  switch (mode) {
    case "ideas":
      return `Here are three original directions for **${topic}**:

1. **The 5-second hook** — open on the most surprising moment, then rewind to show how it happened.
2. **Day-in-the-life** — follow one person from first light to last light, with on-screen time stamps.
3. **Before / after** — split screen that resolves into one clean final shot.

*Tip:* pick one, then switch to **Script** mode to break it into scenes.`;
    case "script":
      return `**Draft script — ${topic}**

| Time | Scene | Voice-over |
| --- | --- | --- |
| 0:00 | Close-up that sets the mood | "Everyone has a moment like this…" |
| 0:08 | Wide shot introducing the place | "…here's what it looks like for us." |
| 0:20 | Detail shots, quick cuts | "Small steps, one after another." |
| 0:35 | Final hero frame + call to action | "Follow for part two." |

Want me to tighten it to 30 seconds or add on-screen text?`;
    case "captions":
      return `**Caption options for ${topic}:**

- **TikTok:** Wait for the last shot 👀 #fyp #shortfilm
- **Instagram:** Some moments are better slowed down. Which frame is your favourite?
- **YouTube Shorts title:** ${topic.replace(/…$/, "")} in under a minute
- **Facebook:** We made this one for everyone who loves a quiet morning. Share it with someone who needs a pause today.`;
    case "translate":
      return `**Translation plan for ${topic}:**

1. **Lock the script first** — final source text keeps every language in sync.
2. **Subtitles** — keep lines under ~42 characters, two lines max per cue.
3. **Voice-over** — pick a voice per language that matches the original energy.
4. **Local review** — have a native speaker check idioms and on-screen text.

> Demo mode can't translate text yet. In the full version, the translated lines will appear here and in the Movie Translator.`;
  }
}

export const demoAssistant: AssistantProvider = {
  mode: "demo",
  async reply(request, onDelta, signal) {
    await sleep(650, signal);
    const full = template(request.mode, request.prompt);
    const tokens = full.split(/(\s+)/);
    let out = "";
    for (const t of tokens) {
      out += t;
      onDelta(out);
      if (t.trim()) await sleep(18, signal);
    }
    return full;
  },
};
