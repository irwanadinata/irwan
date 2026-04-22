"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Star, ChevronDown, ChevronUp } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import projectsData from "@/data/projects.json";

type Category = "all" | "fullstack" | "frontend" | "featured";

interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  tech: string[];
  image: string;
  demo: string;
  githubFrontend: string;
  githubBackend?: string;
  featured: boolean;
  category: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_VISIBLE = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(projectsData as Project[]);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filters: { label: string; value: Category }[] = [
    { label: t("projects.all"), value: "all" },
    { label: t("projects.featured"), value: "featured" },
    { label: t("projects.fullstack"), value: "fullstack" },
    { label: t("projects.frontend"), value: "frontend" },
  ];

  const filtered = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return p.featured;
    return p.category === activeFilter;
  });

  const visibleProjects = showAll
    ? filtered
    : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  const handleFilterChange = useCallback((val: Category) => {
    setActiveFilter(val);
    setShowAll(false);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 bg-slate-50 dark:bg-dark-900 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
      <div className="absolute -left-40 bottom-20 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-accent-500 font-semibold text-sm uppercase tracking-widest mb-3">
            {t("projects.subtitle")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            {t("projects.title")}
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 ${
                activeFilter === filter.value
                  ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-600/25"
                  : "bg-white dark:bg-dark-600 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-primary-400/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-500 py-16">
            {t("projects.noProjects")}
          </p>
        ) : (
          <>
            <div className="relative">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="group rounded-2xl overflow-hidden bg-white dark:bg-dark-600 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-primary-900/10 dark:hover:shadow-primary-400/10 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden bg-dark-700">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {project.featured && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400/90 text-dark-900 text-xs font-semibold">
                          <Star size={10} className="fill-dark-900" />
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-primary-500 dark:group-hover:text-accent-400 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-dark-500 text-slate-600 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200"
                        >
                          <ExternalLink size={13} />
                          {t("projects.viewDemo")}
                        </a>
                        <div className="flex gap-2">
                          <a
                            href={project.githubFrontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-primary-400/50 hover:text-primary-500 transition-all duration-200"
                          >
                            <FaGithub size={15} />
                            Frontend
                            <ExternalLink size={12} />
                          </a>
                          {project.githubBackend && (
                            <a
                              href={project.githubBackend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-primary-400/50 hover:text-primary-500 transition-all duration-200"
                            >
                              <FaGithub size={15} />
                              Backend
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {hasMore && !showAll && (
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 dark:from-dark-900 via-slate-50/80 dark:via-dark-900/80 to-transparent pointer-events-none" />
              )}
            </div>

            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex flex-col items-center gap-2 mt-6"
              >
                <p className="text-slate-400 dark:text-slate-500 text-sm">
                  {showAll
                    ? `Showing all ${filtered.length} projects`
                    : `Showing ${Math.min(INITIAL_VISIBLE, filtered.length)} of ${filtered.length} projects`}
                </p>
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border-2 border-primary-500/40 text-primary-500 dark:text-accent-400 hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-accent-500 dark:hover:border-accent-500 dark:hover:text-dark-900 transition-all duration-300 shadow-sm hover:shadow-primary-500/25"
                >
                  {showAll ? (
                    <>
                      <ChevronUp
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-y-0.5"
                      />
                      Show More ({filtered.length - INITIAL_VISIBLE} more)
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
