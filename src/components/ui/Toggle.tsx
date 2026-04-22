"use client";

import { motion } from "framer-motion";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  label?: string;
  size?: "sm" | "md";
}

export default function Toggle({
  enabled,
  onToggle,
  iconOn,
  iconOff,
  label,
  size = "md",
}: ToggleProps) {
  const trackW = size === "sm" ? "w-11" : "w-14";
  const trackH = size === "sm" ? "h-6" : "h-7";
  const thumbSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const thumbTranslate = size === "sm" ? 20 : 24;

  return (
    <button
      onClick={onToggle}
      aria-label={label ?? "Toggle"}
      className="flex items-center gap-2 focus:outline-none group"
    >
      {iconOff && (
        <span
          className={`text-sm transition-opacity ${enabled ? "opacity-40" : "opacity-100"}`}
        >
          {iconOff}
        </span>
      )}
      <div
        className={`relative ${trackW} ${trackH} rounded-full cursor-pointer transition-colors duration-300 ${
          enabled
            ? "bg-gradient-to-r from-primary-600 to-accent-500"
            : "bg-slate-300 dark:bg-slate-600"
        }`}
      >
        <motion.div
          className={`absolute top-1 left-1 ${thumbSize} rounded-full bg-white shadow-md flex items-center justify-center`}
          animate={{ x: enabled ? thumbTranslate : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      {iconOn && (
        <span
          className={`text-sm transition-opacity ${enabled ? "opacity-100" : "opacity-40"}`}
        >
          {iconOn}
        </span>
      )}
    </button>
  );
}
