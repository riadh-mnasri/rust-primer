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
        const isProject = lesson.kind === "project";
        return (
          <li key={lesson.id}>
            <Link
              href={`/modules/${module.slug}/${lesson.slug}`}
              className="card lift flex items-center gap-4 rounded-xl p-4"
              style={isProject ? { borderLeft: "3px solid var(--copper)" } : undefined}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                style={{
                  background: done ? "var(--accent)" : isProject ? "var(--copper-soft)" : "var(--surface-muted)",
                  color: done ? "var(--accent-foreground)" : isProject ? "var(--copper)" : "var(--foreground-muted)",
                }}
              >
                {done ? "✓" : isProject ? "◆" : index + 1}
              </span>
              <div className="flex flex-col">
                <span className="flex flex-wrap items-center gap-2 font-medium">
                  {pick(lesson.title, locale)}
                  {isProject && (
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
                      style={{ background: "var(--copper-soft)", color: "var(--copper)" }}
                    >
                      {t("lesson.projectBadge")}
                    </span>
                  )}
                </span>
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
