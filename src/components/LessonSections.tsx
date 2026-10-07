import { pick } from "@/lib/bilingual";
import { CodeBlock } from "./CodeBlock";
import { RichText } from "./RichText";
import type { LessonSection } from "@/content/types";

const CALLOUT_STYLE: Record<string, { color: string; background: string }> = {
  tip: { color: "var(--accent)", background: "var(--accent-soft)" },
  warning: { color: "var(--copper)", background: "var(--copper-soft)" },
  note: { color: "var(--foreground-muted)", background: "var(--surface-muted)" },
};

const CALLOUT_LABEL: Record<string, { fr: string; en: string }> = {
  tip: { fr: "Astuce", en: "Tip" },
  warning: { fr: "Attention", en: "Warning" },
  note: { fr: "À noter", en: "Note" },
};

export function LessonSections({
  sections,
  locale,
}: {
  sections: LessonSection[];
  locale: string;
}) {
  return (
    <div className="prose-inline flex flex-col gap-5">
      {sections.map((section, index) => {
        if (section.type === "text") {
          return (
            <p key={index} className="text-[17px] leading-relaxed">
              <RichText text={pick(section.text, locale)} />
            </p>
          );
        }

        if (section.type === "code") {
          return (
            <figure key={index} className="flex flex-col gap-2">
              <CodeBlock code={section.code} label={section.label} />
              {section.caption && (
                <figcaption className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                  <RichText text={pick(section.caption, locale)} />
                </figcaption>
              )}
            </figure>
          );
        }

        const style = CALLOUT_STYLE[section.variant];
        return (
          <aside
            key={index}
            className="flex flex-col gap-1 rounded-xl border-l-4 px-4 py-3 text-[15px] leading-relaxed"
            style={{ borderColor: style.color, background: style.background }}
          >
            <span
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: style.color }}
            >
              {pick(CALLOUT_LABEL[section.variant], locale)}
            </span>
            <p>
              <RichText text={pick(section.text, locale)} />
            </p>
          </aside>
        );
      })}
    </div>
  );
}
