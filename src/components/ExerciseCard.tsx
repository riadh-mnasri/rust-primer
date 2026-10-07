"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { pick } from "@/lib/bilingual";
import { CodeBlock } from "./CodeBlock";
import type { Exercise } from "@/content/types";

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const locale = useLocale();
  const t = useTranslations();
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <section
      className="flex flex-col gap-4 rounded-xl border p-5"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <h2 className="font-semibold" style={{ color: "var(--amber)" }}>
        {t("lesson.exerciseTitle")}
      </h2>
      <p className="leading-relaxed">{pick(exercise.prompt, locale)}</p>
      <CodeBlock code={exercise.starterCode} />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowHint((v) => !v)}
          className="rounded-md border px-3 py-1.5 text-sm font-medium"
          style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
        >
          {showHint ? "×" : "💡"} {pick({ fr: "Indice", en: "Hint" }, locale)}
        </button>
        <button
          type="button"
          onClick={() => setShowSolution((v) => !v)}
          className="rounded-md px-3 py-1.5 text-sm font-semibold"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          {showSolution ? t("lesson.hideSolution") : t("lesson.revealSolution")}
        </button>
      </div>

      {showHint && (
        <p
          className="rounded-lg p-3 text-sm"
          style={{ background: "var(--amber-soft)", color: "var(--foreground)" }}
        >
          {pick(exercise.hint, locale)}
        </p>
      )}

      {showSolution && (
        <div className="flex flex-col gap-3">
          <CodeBlock code={exercise.solutionCode} />
          <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            {pick(exercise.explanation, locale)}
          </p>
        </div>
      )}
    </section>
  );
}
