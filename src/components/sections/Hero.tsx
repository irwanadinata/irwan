"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SocialIcons from "@/components/ui/SocialIcons";
import Button from "@/components/ui/Button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 order-2 lg:order-1"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Sparkles size={13} />
                {t("hero.available")}
              </span>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-slate-600 dark:text-slate-400 text-lg font-medium"
            >
              {t("hero.greeting")}
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              <span className="text-gray-900 dark:text-white">
                {t("hero.name")}
              </span>
            </motion.h1>
            <motion.div variants={itemVariants}>
              <span className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300">
                {t("hero.role")}
              </span>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 dark:text-white text-lg leading-relaxed max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button as="a" href="#projects" variant="primary" size="lg">
                {t("hero.cta")}
                <ArrowRight size={18} />
              </Button>
              <Button
                as="a"
                href="/CV-IRWAN ADINATA.pdf"
                download
                variant="outline"
                size="lg"
              >
                <Download size={18} />
                {t("hero.downloadCV")}
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="pt-2 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {t("hero.hireMe")}
              </p>
              <SocialIcons size="md" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              <div className="rounded-full overflow-hidden w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-dark-700">
                <Image
                  src="/profile.jpeg"
                  alt="Irwan Adinata – Fullstack Web Developer"
                  width={320}
                  height={320}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
