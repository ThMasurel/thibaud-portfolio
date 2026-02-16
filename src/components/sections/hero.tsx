"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export function Hero() {
  const t = useTranslations("hero");

  const name = t("name");

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg sm:text-xl text-muted-foreground mb-2"
        >
          {t("greeting")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
              className={char === " " ? "" : "inline-block"}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-xl sm:text-2xl text-primary font-semibold mb-6"
        >
          {t("role")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            {t("cta")}
          </a>
          <a
            href="/cv_thibaud_masurel.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-border font-medium transition-all hover:bg-muted hover:scale-105"
          >
            {t("cv")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
