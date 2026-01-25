"use client";

import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { StreamingLine } from "./StreamingLine";

interface TerminalLineProps {
  line: TerminalLineType;
  index?: number;
}

export function TerminalLine({ line, index = 0 }: TerminalLineProps) {
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

  return (
    <StreamingLine delay={index * 0.05}>
      <div
        className={`leading-relaxed ${getLineClass()}`}
        style={{
          marginTop: line.type === 'command' ? '1rem' : '0.5rem'
        }}
      >
        {line.type === "command" && (
          <span className="select-none">
            <span className="text-terminal-username">Rusith</span>
            <span className="text-terminal-username">@</span>
            <span className="text-terminal-hostname">Rusith</span>
            <span className="text-terminal-command"> </span>
            <span className="text-terminal-platform">MINGW64</span>
            <span className="text-terminal-command"> </span>
            <span className="text-terminal-path">~/portfolio</span>
            <span className="text-terminal-command"> </span>
            <span className="text-terminal-branch">(master)</span>
            <span className="text-terminal-command"> $ </span>
            <span className="text-terminal-command">{line.content}</span>
          </span>
        )}
        {line.type !== "command" && <span>{line.content}</span>}
      </div>
    </StreamingLine>
  );
}
