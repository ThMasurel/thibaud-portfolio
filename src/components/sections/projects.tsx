"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/motion/fade-in";

type Filter = "all" | "stage" | "go" | "js" | "fullstack";

type Project = {
  id: string;
  category: Filter;
  github?: string;
  live?: string;
  preview?: string;
};

const projects: Project[] = [
  {
    id: "craf2s-website",
    category: "stage",
    github: "https://github.com/ThMasurel/craf2s-website",
    live: "https://craf2s.fr",
  },
  {
    id: "2sclub",
    category: "stage",
    preview: "/image/2s-club.png",
  },
  {
    id: "link-up",
    category: "stage",
    github: "https://github.com/ThMasurel/link-up",
    live: "https://craf2s-dev.web.app",
  },
  {
    id: "craf2s-wp",
    category: "stage",
    github: "https://github.com/ThMasurel/craf2s-landing",
  },
  {
    id: "groupie-tracker",
    category: "go",
    github: "https://github.com/ThMasurel/groupie-tracker",
  },
  {
    id: "ascii-art-web",
    category: "go",
    github: "https://github.com/ThMasurel/ascii-art-web",
  },
  {
    id: "lem-in",
    category: "go",
    github: "https://github.com/ThMasurel/lem-in",
  },
  {
    id: "make-your-game",
    category: "js",
    github: "https://github.com/ThMasurel/make-your-game",
  },
  {
    id: "teamup-hub",
    category: "fullstack",
    github: "https://github.com/ThMasurel/teamup-hub",
  },
];

const filters: Filter[] = ["all", "stage", "go", "js", "fullstack"];

export function Projects() {
  const t = useTranslations("projects");
  const [active, setActive] = useState<Filter>("all");
  const [preview, setPreview] = useState<string | null>(null);

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
                    <div className="flex gap-3">
                      {project.preview && (
                        <button
                          onClick={() => setPreview(project.preview!)}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          {t("viewPreview")}
                        </button>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          {t("viewCode")}
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          {t("viewLive")}
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={preview}
                alt="Preview"
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-xl w-auto h-auto max-w-[90vw] max-h-[90vh]"
              />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
