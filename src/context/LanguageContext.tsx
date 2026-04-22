"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

type Language = "en" | "id";
type TranslationRecord = Record<string, unknown>;

const locales: Record<Language, TranslationRecord> = { en, id };

function getNestedValue(obj: TranslationRecord, key: string): string {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as object)) {
      current = (current as TranslationRecord)[part];
    } else {
      return key;
    }
  }
  return typeof current === "string" ? current : key;
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved === "en" || saved === "id") setLanguage(saved);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "en" ? "id" : "en";
      localStorage.setItem("language", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string =>
      getNestedValue(locales[language] as TranslationRecord, key),
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
