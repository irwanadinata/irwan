"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
} from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skillGroups: { labelKey: string; skills: Skill[] }[] = [
  {
    labelKey: "skills.frontend",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000ff" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    labelKey: "skills.backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#0b0202ff" },
    ],
  },
  {
    labelKey: "skills.database",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ],
  },
  {
    labelKey: "skills.tools",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#1d0202ff" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-dark-600 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-lg hover:shadow-primary-900/5 dark:hover:shadow-primary-400/5 hover:border-primary-200 dark:hover:border-white/10 transition-all duration-300 group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-dark-500 group-hover:scale-110 transition-transform duration-300"
        style={{ boxShadow: `0 0 16px ${skill.color}22`, color: skill.color }}
      >
        <Icon size={26} />
      </div>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="relative py-24 bg-white dark:bg-dark-800 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent-500 font-semibold text-sm uppercase tracking-widest mb-3">
            {t("skills.subtitle")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            {t("skills.title")}
          </h2>
        </motion.div>

        <div className="space-y-12">
          {skillGroups.map((group) => (
            <div key={group.labelKey}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-3"
              >
                <span className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
                {t(group.labelKey)}
                <span className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
              </motion.h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
