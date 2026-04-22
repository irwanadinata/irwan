"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = false,
  glass = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        glass
          ? "bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10"
          : "bg-white dark:bg-dark-600 border border-slate-200 dark:border-dark-500",
        hover && "cursor-pointer",
        className,
      )}
      whileHover={
        hover
          ? { y: -6, boxShadow: "0 20px 40px rgba(34, 211, 238, 0.12)" }
          : undefined
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
