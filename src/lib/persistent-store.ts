import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store. In v1 this is the app's "database".
 * Later, replace each store's get/set with server functions backed by a real database
 * while keeping the same hook signatures.
 */
export interface PersistentStore<T> {
  readonly key: string;
  get: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
  reset: () => void;
}

export function createPersistentStore<T>(key: string, createInitial: () => T): PersistentStore<T> {
  let cache: T | undefined;
  let initial: T | undefined;
  const listeners = new Set<() => void>();

  const getInitial = (): T => {
    if (initial === undefined) initial = createInitial();
    return initial;
  };

  const emit = () => listeners.forEach((l) => l());

  const get = (): T => {
    if (cache !== undefined) return cache;
    if (typeof window === "undefined") return getInitial();
    try {
      const raw = window.localStorage.getItem(key);
      cache = raw ? (JSON.parse(raw) as T) : getInitial();
    } catch {
      cache = getInitial();
    }
    return cache;
  };

  const set = (next: T | ((prev: T) => T)) => {
    const value = typeof next === "function" ? (next as (prev: T) => T)(get()) : next;
    cache = value;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: keep the in-memory value for this session.
    }
    emit();
  };

  const reset = () => {
    initial = undefined;
    cache = undefined;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    emit();
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return { key, get, set, subscribe, reset };
}

export function usePersistentStore<T>(store: PersistentStore<T>) {
  const value = useSyncExternalStore(store.subscribe, store.get, store.get);
  return [value, store.set] as const;
}
