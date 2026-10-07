import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations();

  return (
    <header
      className="sticky top-0 z-10 border-b backdrop-blur"
      style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--background) 88%, transparent)" }}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            rs
          </span>
          <span>{t("site.name")}</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--foreground-muted)" }}
          >
            {t("nav.modules")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
