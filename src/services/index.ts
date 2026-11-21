/**
 * Single swap point for every external capability.
 * v1 ships demo providers only; replace an entry with a live provider when the integration exists.
 */
import { demoAssistant } from "./assistant";
import { demoSocialPublishing } from "./social-publishing";
import { demoTranslation } from "./translation";
import { demoVideoGeneration } from "./video-generation";

export const services = {
  videoGeneration: demoVideoGeneration,
  translation: demoTranslation,
  assistant: demoAssistant,
  social: demoSocialPublishing,
};
