"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.substring(1));
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const threshold = window.innerHeight / 3;
          if (rect.top <= threshold && rect.bottom >= threshold) {
            current = section;
          }
        }
      }

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-dark-800/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="#home"
          className="font-bold text-xl tracking-tight"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-400">
            IR
          </span>
        </motion.a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li
                key={link.key}
                className="relative flex items-center justify-center"
              >
                <a
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary-500 dark:text-accent-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-accent-400 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {t(link.key)}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary-500 dark:bg-accent-400 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-primary-400 hover:text-primary-500 transition-all duration-200 bg-white/50 dark:bg-white/5"
          >
            {language === "en" ? (
              <>
                <img
                  src="https://flagcdn.com/id.svg"
                  alt="ID"
                  className="w-4 h-3 object-cover rounded-[2px] shadow-sm"
                />
                ID
              </>
            ) : (
              <>
                <img
                  src="https://flagcdn.com/us.svg"
                  alt="EN"
                  className="w-4 h-3 object-cover rounded-[2px] shadow-sm"
                />
                EN
              </>
            )}
          </button>

          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-accent-400 hover:border-primary-400 transition-all duration-200 bg-white/50 dark:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        <motion.button
          className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-dark-800/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className={`py-3 px-4 rounded-xl text-base font-medium transition-all ${
                    activeSection === link.href.substring(1)
                      ? "text-primary-500 dark:text-accent-400 bg-primary-50/50 dark:bg-white/10"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {t(link.key)}
                </motion.a>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10 mt-2">
                <div className="flex gap-2">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    {language === "en" ? (
                      <>
                        <img
                          src="https://flagcdn.com/id.svg"
                          alt="ID"
                          className="w-4 h-3 object-cover rounded-[2px] shadow-sm"
                        />
                        ID
                      </>
                    ) : (
                      <>
                        <img
                          src="https://flagcdn.com/us.svg"
                          alt="EN"
                          className="w-4 h-3 object-cover rounded-[2px] shadow-sm"
                        />
                        EN
                      </>
                    )}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                  >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
