"use client";

import { useTranslations } from "next-intl";
import { useProgress } from "@/lib/progress";
import { ProgressBar } from "./ProgressBar";
import { ModuleCard } from "./ModuleCard";
import type { Module } from "@/content/types";

export function ModuleList({
  modules,
  totalLessons,
}: {
  modules: Module[];
  totalLessons: number;
}) {
  const t = useTranslations();
  const { isCompleted } = useProgress();

  const totalCompleted = modules.reduce(
    (sum, currentModule) =>
      sum + currentModule.lessons.filter((lesson) => isCompleted(lesson.id)).length,
    0,
  );

  return (
    <div className="flex flex-col gap-8">
      <div
        className="rounded-xl border p-5"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">{t("home.progressTitle")}</h2>
          <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            {`${totalCompleted}/${totalLessons}`}
          </span>
        </div>
        <ProgressBar value={(totalCompleted / totalLessons) * 100} />
        {totalCompleted === 0 && (
          <p className="mt-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
            {t("home.progressEmpty")}
          </p>
        )}
      </div>

      <div>
        <h2 className="mb-4 font-semibold">{t("home.modulesTitle")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {modules.map((currentModule, index) => (
            <ModuleCard
              key={currentModule.id}
              module={currentModule}
              index={index}
              completedCount={
                currentModule.lessons.filter((lesson) => isCompleted(lesson.id)).length
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
