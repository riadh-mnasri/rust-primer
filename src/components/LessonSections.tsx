import { pick } from "@/lib/bilingual";
import { CodeBlock } from "./CodeBlock";
import type { LessonSection } from "@/content/types";

const CALLOUT_STYLE: Record<string, { label: string; color: string }> = {
  tip: { label: "💡", color: "var(--accent)" },
  warning: { label: "⚠️", color: "var(--amber)" },
  note: { label: "ℹ️", color: "var(--foreground-muted)" },
};

export function LessonSections({
  sections,
  locale,
}: {
  sections: LessonSection[];
  locale: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      {sections.map((section, index) => {
        if (section.type === "text") {
          return (
            <p key={index} className="leading-relaxed">
              {pick(section.text, locale)}
            </p>
          );
        }

        if (section.type === "code") {
          return (
            <figure key={index} className="flex flex-col gap-2">
              <CodeBlock code={section.code} />
              {section.caption && (
                <figcaption
                  className="text-sm"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {pick(section.caption, locale)}
                </figcaption>
              )}
            </figure>
          );
        }

        const style = CALLOUT_STYLE[section.variant];
        return (
          <div
            key={index}
            className="flex gap-3 rounded-lg border-l-4 p-4 text-sm"
            style={{
              borderColor: style.color,
              background: "var(--surface-muted)",
            }}
          >
            <span aria-hidden>{style.label}</span>
            <p>{pick(section.text, locale)}</p>
          </div>
        );
      })}
    </div>
  );
}
