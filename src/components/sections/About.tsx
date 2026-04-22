"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Layers, Server, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/ui/Card";

const techStack = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Express.js",
  "MySQL",
  "Tailwind CSS",
  "Node.js",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative py-24 bg-white dark:bg-dark-800 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />

      <div className="absolute -right-40 top-20 w-80 h-80 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-accent-500 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            {t("about.subtitle")}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white"
          >
            {t("about.title")}
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.p
              variants={itemLeftVariants}
              className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed text-justify"
            >
              {t("about.description")}
            </motion.p>
            <motion.p
              variants={itemLeftVariants}
              className="text-slate-500 dark:text-slate-400 leading-relaxed text-justify"
            >
              {t("about.description2")}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 lg:mt-0"
          >
            <motion.div variants={itemRightVariants}>
              <Card
                glass
                className="relative overflow-hidden dark:bg-gradient-to-br dark:from-primary-900/30 dark:to-dark-600 bg-gradient-to-br from-primary-50 to-white border border-primary-100 dark:border-primary-800/30"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-400/10 rounded-full blur-2xl" />
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 uppercase tracking-widest font-medium">
                  Philosophy
                </p>
                <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                  &ldquo;Clean code, great UX, and scalable architecture are not
                  options they&apos;re requirements.&rdquo;
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemRightVariants}>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                {t("about.techStack")}
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-dark-600 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-accent-400/50 hover:text-accent-500 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
