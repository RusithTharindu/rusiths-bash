"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface StreamingLineProps {
  children: ReactNode;
  delay?: number;
}

export function StreamingLine({ children, delay = 0 }: StreamingLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
