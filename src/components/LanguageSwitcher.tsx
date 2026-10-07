"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          className="rounded-md px-2 py-1 font-medium uppercase transition-colors"
          style={{
            color: code === locale ? "var(--accent-foreground)" : "var(--foreground-muted)",
            background: code === locale ? "var(--accent)" : "transparent",
          }}
        >
          {code}
        </Link>
      ))}
    </div>
  );
}
