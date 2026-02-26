"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { TypedContent } from "./TypedContent";
import { serializeContent } from "@/lib/utils/contentSerializer";

interface StreamingLineProps {
  children: ReactNode;
  delay?: number;
  isStreaming?: boolean;
  streamingSpeed?: number;
  skipAnimation?: boolean;
  onStreamComplete?: () => void;
}

export function StreamingLine({
  children,
  delay = 0,
  isStreaming = false,
  streamingSpeed = 50,
  skipAnimation = false,
  onStreamComplete,
}: StreamingLineProps) {
  // Skip animation entirely for commands
  if (skipAnimation) {
    return <div>{children}</div>;
  }

  // Use streaming effect for results
  if (isStreaming) {
    const serialized = serializeContent(children);
    return (
      <TypedContent
        content={serialized}
        originalNode={children}
        speed={streamingSpeed}
        onComplete={onStreamComplete}
        skip={skipAnimation}
      />
    );
  }

  // Use fade-in animation for other content
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
