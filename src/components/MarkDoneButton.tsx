"use client";

import { useTranslations } from "next-intl";
import { useProgress } from "@/lib/progress";

export function MarkDoneButton({ lessonId }: { lessonId: string }) {
  const t = useTranslations();
  const { isCompleted, toggleLesson } = useProgress();
  const done = isCompleted(lessonId);

  return (
    <button
      type="button"
      onClick={() => toggleLesson(lessonId)}
      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
      style={{
        background: done ? "var(--surface-muted)" : "var(--accent)",
        color: done ? "var(--foreground)" : "var(--accent-foreground)",
        border: done ? "1px solid var(--border)" : "none",
      }}
    >
      {done ? "✓ " + t("lesson.markNotDone") : t("lesson.markDone")}
    </button>
  );
}
