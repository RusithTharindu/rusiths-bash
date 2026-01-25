"use client";

import { motion } from "motion/react";
import { portfolioConfig } from "@/config/portfolio";

export function Banner() {
  const bannerLines = portfolioConfig.banner
    .split("\n")
    .filter((line) => line.trim());

  return (
    <div className="mb-6">
      <pre className="text-terminal-banner text-xs sm:text-sm leading-tight mb-6">
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
        className="text-terminal-primary space-y-0 text-sm leading-relaxed"
      >
        <div>
          Type <span className="text-terminal-command">'help'</span> for a list
          of all available commands.
        </div>
        <div>
          Type <span className="text-terminal-command">'repo'</span> to view the
          GitHub repository or click{" "}
          <a
            href="https://github.com/RusithTharindu/rusiths-bash"
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
