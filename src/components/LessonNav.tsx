import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/bilingual";
import type { Lesson, Module } from "@/content/types";

type Adjacent = { module: Module; lesson: Lesson } | undefined;

export async function LessonNav({
  locale,
  previous,
  next,
  currentModuleSlug,
}: {
  locale: string;
  previous: Adjacent;
  next: Adjacent;
  currentModuleSlug: string;
}) {
  const t = await getTranslations();

  return (
    <div className="flex items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--border)" }}>
      {previous ? (
        <Link
          href={`/modules/${previous.module.slug}/${previous.lesson.slug}`}
          className="flex flex-col rounded-lg border px-4 py-2 text-sm transition-colors hover:opacity-90"
          style={{ borderColor: "var(--border)" }}
        >
          <span style={{ color: "var(--foreground-muted)" }}>
            {"< " + t("lesson.prevLesson")}
          </span>
          <span className="font-medium">{pick(previous.lesson.title, locale)}</span>
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link
          href={`/modules/${next.module.slug}/${next.lesson.slug}`}
          className="flex flex-col items-end rounded-lg border px-4 py-2 text-right text-sm transition-colors hover:opacity-90"
          style={{ borderColor: "var(--border)" }}
        >
          <span style={{ color: "var(--foreground-muted)" }}>
            {(next.module.slug !== currentModuleSlug
              ? t("lesson.nextModule")
              : t("lesson.nextLesson")) + " >"}
          </span>
          <span className="font-medium">{pick(next.lesson.title, locale)}</span>
        </Link>
      )}
    </div>
  );
}
