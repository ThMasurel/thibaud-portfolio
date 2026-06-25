"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/motion/fade-in";

interface Skill {
  name: string;
  level: number; // 0-100
}

const skillCategories: { key: string; skills: Skill[] }[] = [
  {
    key: "languages",
    skills: [
      { name: "Go", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "SQL", level: 70 },
      { name: "HTML / CSS", level: 90 },
    ],
  },
  {
    key: "frontend",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Angular", level: 70 },
      { name: "Ionic", level: 65 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 70 },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "Prisma", level: 70 },
      { name: "Sanity CMS", level: 75 },
      { name: "Firebase", level: 65 },
      { name: "Stripe", level: 60 },
      { name: "REST API", level: 85 },
      { name: "WebSocket", level: 75 },
    ],
  },
  {
    key: "tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 65 },
      { name: "Linux", level: 75 },
      { name: "Vercel", level: 80 },
      { name: "WordPress / Gutenberg", level: 65 },
      { name: "GitHub Actions", level: 60 },
    ],
  },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <FadeIn key={cat.key} delay={catIdx * 0.1}>
              <GlassCard className="h-full">
                <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {t(`categories.${cat.key}`)}
                </h3>
                <div className="space-y-4">
                  {cat.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      delay={catIdx * 0.15 + i * 0.08}
                    />
                  ))}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
