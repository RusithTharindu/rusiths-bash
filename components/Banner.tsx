"use client";

import { motion } from "motion/react";
import { portfolioConfig } from "@/config/portfolio";

export function Banner() {
  const bannerLines = portfolioConfig.banner
    .split("\n")
    .filter((line) => line.trim());

  return (
    <div className="mb-4 sm:mb-6">
      <pre className="text-terminal-banner text-[10px] xs:text-xs sm:text-sm leading-tight mb-4 sm:mb-6 overflow-x-auto">
        {bannerLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
          >
            {line}
          </motion.div>
        ))}
      </pre>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: bannerLines.length * 0.1 + 0.2 }}
        className="text-terminal-primary space-y-1 text-xs sm:text-sm leading-relaxed"
      >
        <div style={{ marginBottom: 10 }} className="text-orange-400">
          {portfolioConfig.title}
        </div>
        <div>
          Type <span className="text-terminal-command">'help'</span> for a list
          of all available commands.
        </div>
        <div>
          Type <span className="text-terminal-command">'repo'</span> to view the
          GitHub repository or click{" "}
          <a
            href={portfolioConfig.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-link hover:underline"
          >
            here
          </a>
          .
        </div>
      </motion.div>
    </div>
  );
}
