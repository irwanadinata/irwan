"use client";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import socials from "@/data/socials.json";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
};

interface SocialIconsProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-lg p-2",
  md: "text-xl p-2.5",
  lg: "text-2xl p-3",
};

export default function SocialIcons({
  size = "md",
  showLabel = false,
  className = "",
}: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((social, index) => {
        const Icon = iconMap[social.icon];
        if (!Icon) return null;
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`inline-flex items-center gap-2 rounded-xl ${sizeClasses[size]} text-slate-500 dark:text-slate-400 hover:text-white transition-all duration-300 border border-transparent hover:border-white/10 bg-white/5 dark:bg-white/5 hover:bg-white/10 group`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            style={{ "--social-color": social.color } as React.CSSProperties}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = social.color;
              (e.currentTarget as HTMLElement).style.borderColor =
                social.color + "44";
              (e.currentTarget as HTMLElement).style.boxShadow =
                `0 0 16px ${social.color}33`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "";
              (e.currentTarget as HTMLElement).style.borderColor = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            <Icon className="shrink-0" />
            {showLabel && (
              <span className="text-sm font-medium">{social.name}</span>
            )}
          </motion.a>
        );
      })}
    </div>
  );
}
