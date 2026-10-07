import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { curriculum, totalLessonCount } from "@/content/curriculum";
import { ModuleList } from "@/components/ModuleList";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-12 sm:px-6">
      <section className="flex flex-col gap-4">
        <p
          className="text-sm font-medium uppercase tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          {t("site.tagline")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("home.heroTitle")}
        </h1>
        <p className="max-w-2xl text-lg" style={{ color: "var(--foreground-muted)" }}>
          {t("home.heroSubtitle")}
        </p>
        <div>
          <Link
            href={`/modules/${curriculum[0].slug}`}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            {t("home.heroCta")}
          </Link>
        </div>
      </section>

      <ModuleList modules={curriculum} totalLessons={totalLessonCount()} />
    </div>
  );
}
