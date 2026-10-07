import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t px-4 py-6 text-center text-sm sm:px-6"
      style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
    >
      {t.rich("footer.copyright", {
        year,
        a: (chunks) => (
          <a href="https://riadh-mnasri.pro" className="hover:underline">
            {chunks}
          </a>
        ),
      })}
    </footer>
  );
}
