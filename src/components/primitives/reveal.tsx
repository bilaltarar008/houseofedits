"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/** Fade + rise on scroll into view. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "span" | "article";
  y?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      /* Trigger while the element is still ~180px below the fold so it has
         finished fading in by the time it's actually on screen. */
      viewport={{ once: true, amount: 0.15, margin: "0px 0px 180px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
