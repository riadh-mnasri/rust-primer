import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { curriculum, totalLessonCount } from "@/content/curriculum";
import { milestones, projectPitch } from "@/content/project";
import { pick } from "@/lib/bilingual";
import { ModuleList } from "@/components/ModuleList";
import { CodeBlock } from "@/components/CodeBlock";

const HERO_SNIPPET = `fn expected_exposure(mtms: &[f64]) -> f64 {
    let total: f64 = mtms.iter().map(|m| m.max(0.0)).sum();
    total / mtms.len() as f64
}

fn main() {
    let mtms = vec![1_200.0, -300.0, 450.0, 0.0, -800.0];
    println!("EE = {:.2}", expected_exposure(&mtms)); // 330.00
}`;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const availableModules = curriculum.filter((m) => m.status === "available");

  return (
    <div className="flex flex-col">
      <section className="blueprint border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div className="rise flex flex-col gap-5">
            <p
              className="font-mono text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: "var(--copper)" }}
            >
              {t("site.tagline")}
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {t("home.heroTitle")}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {t("home.heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={`/modules/${curriculum[0].slug}`}
                className="lift inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                {t("home.heroCta")} →
              </Link>
              <a
                href="#riskforge"
                className="lift inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-semibold"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                {t("home.heroSecondary")}
              </a>
            </div>
            <dl className="mt-4 flex flex-wrap gap-8">
              {[
                { value: curriculum.length, label: t("home.statModules") },
                { value: totalLessonCount(), label: t("home.statLessons") },
                { value: milestones.length, label: t("home.statProject") },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 text-xs" style={{ color: "var(--foreground-muted)" }}>
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-mono text-2xl font-medium">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rise" style={{ animationDelay: "120ms" }}>
            <div className="rotate-[0.6deg] rounded-2xl p-1.5" style={{ background: "var(--surface-muted)", boxShadow: "var(--shadow)" }}>
              <CodeBlock code={HERO_SNIPPET} label="riskforge/src/main.rs" />
            </div>
          </div>
        </div>
      </section>

      <section id="riskforge" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <p
                className="font-mono text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: "var(--copper)" }}
              >
                {t("home.projectEyebrow")}
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
                {t("home.projectTitle")}
              </h2>
            </div>
            <p className="leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {pick(projectPitch, locale)}
            </p>
          </div>

          <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {milestones.map((milestone, index) => {
              const projectModule = availableModules.find((m) => m.id === milestone.moduleId);
              const projectLesson = projectModule?.lessons.find((l) => l.kind === "project");
              const isReady = Boolean(projectModule && projectLesson);
              const body = (
                <div
                  className={`card flex h-full flex-col gap-2 rounded-xl p-4 ${isReady ? "lift" : ""}`}
                  style={{ opacity: isReady ? 1 : 0.62 }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-semibold"
                      style={{
                        background: isReady ? "var(--copper)" : "var(--surface-muted)",
                        color: isReady ? "#ffffff" : "var(--foreground-muted)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {!isReady && (
                      <span className="text-[11px] font-medium" style={{ color: "var(--foreground-muted)" }}>
                        {t("home.projectStepPlanned")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold leading-snug">{pick(milestone.title, locale)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                    {pick(milestone.deliverable, locale)}
                  </p>
                </div>
              );
              return (
                <li key={milestone.moduleId}>
                  {isReady && projectModule && projectLesson ? (
                    <Link href={`/modules/${projectModule.slug}/${projectLesson.slug}`} className="block h-full">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border)", background: "var(--surface-muted)" }}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <ModuleList modules={curriculum} totalLessons={totalLessonCount()} />
        </div>
      </section>
    </div>
  );
}
