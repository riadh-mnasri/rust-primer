"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/bilingual";
import { ProgressBar } from "./ProgressBar";
import type { Module } from "@/content/types";

export function ModuleCard({
  module,
  index,
  completedCount,
}: {
  module: Module;
  index: number;
  completedCount: number;
}) {
  const locale = useLocale();
  const t = useTranslations();
  const total = module.lessons.length;
  const isPlanned = module.status === "planned";
  const isStarted = completedCount > 0;
  const isDone = total > 0 && completedCount === total;

  const content = (
    <div
      className="flex flex-col gap-3 rounded-xl border p-5 transition-colors"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        opacity: isPlanned ? 0.6 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
            style={{
              background: "var(--surface-muted)",
              color: "var(--foreground-muted)",
            }}
          >
            {index + 1}
          </span>
          <h3 className="font-semibold">{pick(module.title, locale)}</h3>
        </div>
        {!isPlanned && (
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
            style={{
              background: isDone ? "var(--amber-soft)" : "var(--surface-muted)",
              color: isDone ? "var(--amber)" : "var(--foreground-muted)",
            }}
          >
            {isDone ? "✓" : `${completedCount}/${total}`}
          </span>
        )}
      </div>
      <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
        {pick(module.description, locale)}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>
          {isPlanned
            ? t("module.statusPlanned")
            : t("module.lessonsCount", { count: total })}
        </span>
        {!isPlanned && (
          <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>
            {isDone
              ? t("module.reviewModule")
              : isStarted
                ? t("module.continueModule")
                : t("module.startModule")}
          </span>
        )}
      </div>
      {!isPlanned && total > 0 && (
        <ProgressBar value={(completedCount / total) * 100} />
      )}
    </div>
  );

  if (isPlanned) {
    return <div>{content}</div>;
  }

  return (
    <Link href={`/modules/${module.slug}`} className="block">
      {content}
    </Link>
  );
}
