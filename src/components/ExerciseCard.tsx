"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { pick } from "@/lib/bilingual";
import { CodeBlock } from "./CodeBlock";
import { RichText } from "./RichText";
import type { Exercise } from "@/content/types";

// Indice et solution restent toujours dans le DOM (masqués en CSS) :
// le contenu reste indexable et l'état d'ouverture ne coûte aucun rendu.
export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const locale = useLocale();
  const t = useTranslations();
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <section
      className="card prose-inline flex flex-col gap-4 rounded-2xl p-5 sm:p-6"
      style={{ borderTop: "3px solid var(--copper)" }}
    >
      <h2 className="font-serif text-xl font-semibold" style={{ color: "var(--copper)" }}>
        {t("lesson.exerciseTitle")}
      </h2>
      <p className="leading-relaxed">
        <RichText text={pick(exercise.prompt, locale)} />
      </p>
      <CodeBlock code={exercise.starterCode} label="src/main.rs" />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowHint((v) => !v)}
          aria-expanded={showHint}
          className="lift rounded-lg border px-3 py-1.5 text-sm font-medium"
          style={{ borderColor: "var(--border)", color: "var(--foreground-muted)", background: "var(--surface)" }}
        >
          {pick({ fr: showHint ? "Masquer l'indice" : "Indice", en: showHint ? "Hide hint" : "Hint" }, locale)}
        </button>
        <button
          type="button"
          onClick={() => setShowSolution((v) => !v)}
          aria-expanded={showSolution}
          className="lift rounded-lg px-3 py-1.5 text-sm font-semibold"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          {showSolution ? t("lesson.hideSolution") : t("lesson.revealSolution")}
        </button>
      </div>

      <p
        className={`${showHint ? "" : "hidden"} rounded-lg p-3 text-sm`}
        style={{ background: "var(--copper-soft)", color: "var(--foreground)" }}
      >
        <RichText text={pick(exercise.hint, locale)} />
      </p>

      <div className={`${showSolution ? "flex" : "hidden"} flex-col gap-3`}>
        <CodeBlock code={exercise.solutionCode} label="solution" />
        <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
          <RichText text={pick(exercise.explanation, locale)} />
        </p>
      </div>
    </section>
  );
}
