"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "rust-primer:progress";
const EMPTY: ReadonlySet<string> = new Set();

let cache: Set<string> | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function getSnapshot(): ReadonlySet<string> {
  if (typeof window === "undefined") return EMPTY;
  if (!cache) cache = readFromStorage();
  return cache;
}

function getServerSnapshot(): ReadonlySet<string> {
  return EMPTY;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      cache = readFromStorage();
      emitChange();
    }
  }
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function persist(next: Set<string>) {
  cache = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
  emitChange();
}

function setLessonCompletedInStore(lessonId: string, value: boolean) {
  const next = new Set(getSnapshot());
  if (value) next.add(lessonId);
  else next.delete(lessonId);
  persist(next);
}

export function useProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isCompleted = useCallback(
    (lessonId: string) => completed.has(lessonId),
    [completed],
  );

  const setLessonCompleted = useCallback(
    (lessonId: string, value: boolean) => setLessonCompletedInStore(lessonId, value),
    [],
  );

  const toggleLesson = useCallback(
    (lessonId: string) => setLessonCompletedInStore(lessonId, !completed.has(lessonId)),
    [completed],
  );

  return { completed, isCompleted, toggleLesson, setLessonCompleted };
}
