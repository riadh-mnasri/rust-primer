import { gettingStarted } from "./modules/getting-started";
import { basics } from "./modules/basics";
import { ownership } from "./modules/ownership";
import { plannedModules } from "./modules/planned";
import type { Lesson, Module } from "./types";

export const curriculum: Module[] = [
  gettingStarted,
  basics,
  ownership,
  ...plannedModules,
];

export function getModules(): Module[] {
  return curriculum;
}

export function getModule(moduleSlug: string): Module | undefined {
  return curriculum.find((module) => module.slug === moduleSlug);
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string,
): { module: Module; lesson: Lesson } | undefined {
  const foundModule = getModule(moduleSlug);
  const lesson = foundModule?.lessons.find((l) => l.slug === lessonSlug);
  if (!foundModule || !lesson) return undefined;
  return { module: foundModule, lesson };
}

export function getAdjacentLessons(moduleSlug: string, lessonSlug: string) {
  const moduleIndex = curriculum.findIndex((m) => m.slug === moduleSlug);
  const currentModule = curriculum[moduleIndex];
  if (!currentModule) return { previous: undefined, next: undefined };

  const lessonIndex = currentModule.lessons.findIndex((l) => l.slug === lessonSlug);

  const previous =
    lessonIndex > 0
      ? { module: currentModule, lesson: currentModule.lessons[lessonIndex - 1] }
      : undefined;

  let next =
    lessonIndex < currentModule.lessons.length - 1
      ? { module: currentModule, lesson: currentModule.lessons[lessonIndex + 1] }
      : undefined;

  if (!next) {
    const nextModule = curriculum
      .slice(moduleIndex + 1)
      .find((m) => m.lessons.length > 0);
    if (nextModule) {
      next = { module: nextModule, lesson: nextModule.lessons[0] };
    }
  }

  return { previous, next };
}

export function totalLessonCount(): number {
  return curriculum.reduce((total, currentModule) => total + currentModule.lessons.length, 0);
}
