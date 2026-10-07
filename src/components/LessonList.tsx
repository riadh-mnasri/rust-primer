"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/bilingual";
import { useProgress } from "@/lib/progress";
import type { Module } from "@/content/types";

export function LessonList({ module }: { module: Module }) {
  const locale = useLocale();
  const t = useTranslations();
  const { isCompleted } = useProgress();

  return (
    <ol className="flex flex-col gap-3">
      {module.lessons.map((lesson, index) => {
        const done = isCompleted(lesson.id);
        return (
          <li key={lesson.id}>
            <Link
              href={`/modules/${module.slug}/${lesson.slug}`}
              className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:opacity-90"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                style={{
                  background: done ? "var(--accent)" : "var(--surface-muted)",
                  color: done ? "var(--accent-foreground)" : "var(--foreground-muted)",
                }}
              >
                {done ? "✓" : index + 1}
              </span>
              <div className="flex flex-col">
                <span className="font-medium">{pick(lesson.title, locale)}</span>
                <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                  {pick(lesson.summary, locale)}
                </span>
              </div>
              {done && (
                <span
                  className="ml-auto shrink-0 text-xs font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {t("lesson.completed")}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
