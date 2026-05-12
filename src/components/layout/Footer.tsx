"use client";

import { useLanguage } from "@/context/LanguageContext";
import SocialIcons from "@/components/ui/SocialIcons";

const quickLinks = [
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.contact", href: "#contact" },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-dark-900 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="space-y-4">
            <a
              href="#home"
              className="inline-block font-bold text-2xl tracking-tight"
            >
              <img src="/logo/logo.png" alt="Logo" className="h-8 w-auto" />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <SocialIcons size="sm" />
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-accent-400 text-sm transition-colors duration-200"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p>irwanadinata8@email.com</p>
              <p>+62 851 5689 5256</p>
              <p>Indonesia 🇮🇩</p>
              <p className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                {t("hero.available")}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>
            © {year} Irwan Adinata. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
