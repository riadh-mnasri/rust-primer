import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { curriculum, getModule } from "@/content/curriculum";
import { pick } from "@/lib/bilingual";
import { LessonList } from "@/components/LessonList";

export function generateStaticParams() {
  return curriculum
    .filter((availableModule) => availableModule.lessons.length > 0)
    .map((availableModule) => ({ moduleSlug: availableModule.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ locale: string; moduleSlug: string }>;
}) {
  const { locale, moduleSlug } = await params;
  setRequestLocale(locale);

  const activeModule = getModule(moduleSlug);
  if (!activeModule || activeModule.lessons.length === 0) {
    notFound();
  }

  const t = await getTranslations();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6">
      <div>
        <Link
          href="/"
          className="text-sm font-medium"
          style={{ color: "var(--accent)" }}
        >
          {"< " + t("module.backToModules")}
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {pick(activeModule.title, locale)}
        </h1>
        <p style={{ color: "var(--foreground-muted)" }}>
          {pick(activeModule.description, locale)}
        </p>
      </div>
      <LessonList module={activeModule} />
    </div>
  );
}
