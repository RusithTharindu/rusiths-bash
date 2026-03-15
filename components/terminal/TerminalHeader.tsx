"use client";

import { motion } from "motion/react";

interface TerminalHeaderProps {
  title?: string;
}

export function TerminalHeader({ title = "" }: TerminalHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-terminal-border text-black flex items-center justify-between border-b-2 border-terminal-border p-2 sm:p-3"
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="font-semibold text-xs sm:text-sm ml-1 sm:ml-2">{title}</span>
      </div>
    </motion.div>
  );
}
