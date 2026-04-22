"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
  download?: boolean | string;
  target?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40",
  outline:
    "border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 dark:border-primary-400 dark:text-primary-300",
  ghost:
    "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
  accent:
    "bg-gradient-to-r from-accent-500 to-accent-400 text-dark-900 font-semibold shadow-lg shadow-accent-500/25",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      as,
      href,
      download,
      target,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 cursor-pointer select-none",
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    if (as === "a" && href) {
      return (
        <motion.a
          href={href}
          download={download}
          target={target}
          className={classes}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
