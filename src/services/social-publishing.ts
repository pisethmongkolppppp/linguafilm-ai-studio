import type { PlatformId } from "@/lib/types";

export interface PlatformInfo {
  id: PlatformId;
  name: string;
  officialApi: string;
  formats: string[];
  capabilities: string[];
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "facebook",
    name: "Facebook",
    officialApi: "Meta Graph API (Pages)",
    formats: ["16:9", "1:1", "9:16 Reels"],
    capabilities: ["Publish to a Page you manage", "Schedule Reels and videos", "Read basic post insights"],
  },
  {
    id: "tiktok",
    name: "TikTok",
    officialApi: "TikTok Content Posting API",
    formats: ["9:16"],
    capabilities: ["Send videos to your drafts or profile", "Add captions and hashtags", "Respect TikTok privacy settings"],
  },
  {
    id: "instagram",
    name: "Instagram",
    officialApi: "Instagram Graph API (Business / Creator)",
    formats: ["9:16 Reels", "1:1", "4:5"],
    capabilities: ["Publish Reels to a professional account", "Add captions", "Read basic reach numbers"],
  },
  {
    id: "youtube",
    name: "YouTube",
    officialApi: "YouTube Data API v3",
    formats: ["16:9", "9:16 Shorts"],
    capabilities: ["Upload videos and Shorts", "Set title, description and visibility", "Add subtitle tracks per language"],
  },
];

export function platformInfo(id: PlatformId): PlatformInfo {
  const found = PLATFORMS.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown platform ${id}`);
  return found;
}

export type ConnectionState = { status: "not_connected" } | { status: "connected"; accountName: string };

export interface SocialPublishingProvider {
  readonly mode: "demo" | "live";
  getConnection(id: PlatformId): ConnectionState;
  /** Will start the platform's official sign-in flow. */
  connect(id: PlatformId): Promise<ConnectionState>;
}

export class NotAvailableInDemoError extends Error {
  constructor(platform: string) {
    super(`Connecting ${platform} isn't available yet. It needs the platform's official sign-in.`);
    this.name = "NotAvailableInDemoError";
  }
}

export const demoSocialPublishing: SocialPublishingProvider = {
  mode: "demo",
  getConnection: () => ({ status: "not_connected" }),
  connect: async (id) => {
    throw new NotAvailableInDemoError(platformInfo(id).name);
  },
};
