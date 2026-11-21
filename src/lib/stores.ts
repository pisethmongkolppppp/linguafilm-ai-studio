import { DEFAULT_SETTINGS, seedPosts, seedProjects } from "./mock-data";
import { createPersistentStore, usePersistentStore } from "./persistent-store";
import type { ChatMessage, Project, ScheduledPost, UserSettings } from "./types";

const NS = "linguafilm:v1";

export const projectsStore = createPersistentStore<Project[]>(`${NS}:projects`, () => seedProjects());
export const postsStore = createPersistentStore<ScheduledPost[]>(`${NS}:posts`, () => seedPosts());
export const chatStore = createPersistentStore<ChatMessage[]>(`${NS}:chat`, () => []);
export const settingsStore = createPersistentStore<UserSettings>(`${NS}:settings`, () => ({
  ...DEFAULT_SETTINGS,
}));

export const useProjects = () => usePersistentStore(projectsStore);
export const usePosts = () => usePersistentStore(postsStore);
export const useChat = () => usePersistentStore(chatStore);
export const useSettings = () => usePersistentStore(settingsStore);

export function resetDemoData() {
  [projectsStore, postsStore, chatStore, settingsStore].forEach((s) => s.reset());
}
