"use client";

export function BlinkingCursor() {
  return (
    <span className="inline-block w-2 h-4 bg-terminal-primary animate-blink align-middle">
      ▋
    </span>
  );
}
