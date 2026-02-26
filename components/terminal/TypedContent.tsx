"use client";

import { useState, useEffect, useMemo, useRef, ReactNode } from "react";
import { StreamableContent } from "@/lib/types/terminal";
import { reconstructContent } from "@/lib/utils/contentSerializer";

interface TypedContentProps {
  content: StreamableContent;
  originalNode: ReactNode;
  speed?: number; // characters per second
  onComplete?: () => void;
  skip?: boolean;
}

export function TypedContent({
  content,
  originalNode,
  speed = 50,
  onComplete,
  skip = false,
}: TypedContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If skip is true, immediately show all content
    if (skip) {
      setCurrentIndex(content.totalLength);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // If content is very short, show it instantly
    if (content.totalLength < 10) {
      setCurrentIndex(content.totalLength);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const charsPerMs = speed / 1000;
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - (startTimeRef.current || 0);
      const newIndex = Math.floor(elapsed * charsPerMs);

      if (newIndex >= content.totalLength) {
        setCurrentIndex(content.totalLength);
        setIsComplete(true);
        onComplete?.();
      } else {
        setCurrentIndex(newIndex);
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [content, speed, onComplete, skip]);

  // Gentle auto-scroll - only update occasionally to avoid glitchiness
  useEffect(() => {
    if (isComplete) return;

    // Scroll into view less frequently to avoid conflicts with user scrolling
    const scrollTimer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "auto", // Changed from "smooth" to reduce jank
          block: "nearest",
        });
      }
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [Math.floor(currentIndex / 50), isComplete]); // Only scroll every 50 characters

  const rendered = useMemo(
    () => reconstructContent(originalNode, currentIndex, !isComplete),
    [originalNode, currentIndex, isComplete],
  );

  return <div ref={containerRef}>{rendered}</div>;
}
