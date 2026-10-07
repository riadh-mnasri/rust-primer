import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { curriculum, getAdjacentLessons, getLesson } from "@/content/curriculum";
import { pick } from "@/lib/bilingual";
import { LessonSections } from "@/components/LessonSections";
import { ExerciseCard } from "@/components/ExerciseCard";
import { MarkDoneButton } from "@/components/MarkDoneButton";
import { LessonNav } from "@/components/LessonNav";

export function generateStaticParams() {
  return curriculum.flatMap((module) =>
    module.lessons.map((lesson) => ({
      moduleSlug: module.slug,
      lessonSlug: lesson.slug,
    })),
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; moduleSlug: string; lessonSlug: string }>;
}) {
  const { locale, moduleSlug, lessonSlug } = await params;
  setRequestLocale(locale);

  const found = getLesson(moduleSlug, lessonSlug);
  if (!found) {
    notFound();
  }
  const { module, lesson } = found;
  const { previous, next } = getAdjacentLessons(moduleSlug, lessonSlug);
  const t = await getTranslations();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6">
      <div>
        <Link
          href={`/modules/${module.slug}`}
          className="text-sm font-medium"
          style={{ color: "var(--accent)" }}
        >
          {"< " + t("lesson.backToModule")}
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--foreground-muted)" }}
        >
          {pick(module.title, locale)}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          {pick(lesson.title, locale)}
        </h1>
      </div>

      <LessonSections sections={lesson.sections} locale={locale} />

      {lesson.exercise && <ExerciseCard exercise={lesson.exercise} />}

      <div>
        <MarkDoneButton lessonId={lesson.id} />
      </div>

      <LessonNav
        locale={locale}
        previous={previous}
        next={next}
        currentModuleSlug={module.slug}
      />
    </div>
  );
}
