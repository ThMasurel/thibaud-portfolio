import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 text-center relative z-10">
      <h1 className="text-8xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        {t("title")}
      </h1>
      <h2 className="text-2xl font-semibold text-foreground">
        {t("subtitle")}
      </h2>
      <p className="text-foreground/60 max-w-md">{t("description")}</p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 transition-colors"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
