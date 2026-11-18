"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className ? `reveal-item ${className}` : "reveal-item"}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.4,
              ease,
              delay: Math.min(index, 5) * 0.04,
            }
      }
    >
      {children}
    </motion.div>
  );
}
