"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/motion/fade-in";

type Filter = "all" | "go" | "js" | "fullstack";

const projects = [
  {
    id: "groupie-tracker",
    category: "go" as Filter,
    github: "https://github.com/ThMasurel/groupie-tracker",
  },
  {
    id: "ascii-art-web",
    category: "go" as Filter,
    github: "https://github.com/ThMasurel/ascii-art-web",
  },
  {
    id: "lem-in",
    category: "go" as Filter,
    github: "https://github.com/ThMasurel/lem-in",
  },
  {
    id: "make-your-game",
    category: "js" as Filter,
    github: "https://github.com/ThMasurel/make-your-game",
  },
  {
    id: "teamup-hub",
    category: "fullstack" as Filter,
    github: "https://github.com/ThMasurel/teamup-hub",
  },
] as const;

const filters: Filter[] = ["all", "go", "js", "fullstack"];

export function Projects() {
  const t = useTranslations("projects");
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            {t("title")}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(`filters.${f}`)}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`items.${project.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {t(`items.${project.id}.description`)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">
                      {t(`items.${project.id}.stack`)}
                    </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      {t("viewCode")}
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
