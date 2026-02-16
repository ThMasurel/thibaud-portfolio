"use client";

import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const stats = [
  { value: "5+", key: "projects" },
  { value: "10+", key: "technologies" },
  { value: "3+", key: "experience" },
] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main description card — spans 2 cols */}
          <FadeIn className="md:col-span-2">
            <GlassCard className="h-full">
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                {t("description")}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                {t("description2")}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("description3")}
              </p>
            </GlassCard>
          </FadeIn>

          {/* Stats cards */}
          <Stagger className="flex flex-col gap-6">
            {stats.map((s) => (
              <StaggerItem key={s.key}>
                <GlassCard className="text-center">
                  <p className="text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(`stats.${s.key}`)}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
