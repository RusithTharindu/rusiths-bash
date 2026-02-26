"use client";

import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { StreamingLine } from "./StreamingLine";

interface TerminalLineProps {
  line: TerminalLineType;
  index?: number;
  onStreamComplete?: (lineId: string) => void;
  shouldStream?: boolean;
}

export function TerminalLine({
  line,
  index = 0,
  onStreamComplete,
  shouldStream = false,
}: TerminalLineProps) {
  const getLineClass = () => {
    switch (line.type) {
      case "command":
        return "text-terminal-command";
      case "error":
        return "text-terminal-error";
      case "success":
        return "text-terminal-success";
      case "info":
        return "text-terminal-link";
      case "result":
      default:
        return "text-terminal-primary";
    }
  };

  const handleComplete = () => {
    onStreamComplete?.(line.id);
  };

  // Determine if this line should use streaming
  const useStreaming = line.isStreaming && shouldStream;

  return (
    <StreamingLine
      delay={index * 0.05}
      isStreaming={useStreaming}
      streamingSpeed={line.streamingSpeed}
      skipAnimation={line.skipAnimation || !shouldStream}
      onStreamComplete={handleComplete}
    >
      <div
        className={`leading-relaxed ${getLineClass()}`}
        style={{
          marginTop: line.type === "command" ? "1rem" : "0.5rem",
        }}
      >
        {line.type === "command" && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="select-none flex flex-wrap items-center gap-1">
              <span className="text-terminal-username">guest</span>
              <span className="text-terminal-username">@</span>
              <span className="text-terminal-hostname">RusithTharindu</span>
              <span className="text-terminal-platform hidden sm:inline">MINGW64</span>
              <span className="text-terminal-path">~/portfolio</span>
              <span className="text-terminal-branch">(master)</span>
              <span className="text-terminal-command">$</span>
            </span>
            <span className="text-terminal-command">{line.content}</span>
          </div>
        )}
        {line.type !== "command" && <span>{line.content}</span>}
      </div>
    </StreamingLine>
  );
}
