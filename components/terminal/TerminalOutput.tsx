import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { TerminalLine } from "./TerminalLine";

interface TerminalOutputProps {
  lines: TerminalLineType[];
  onStreamComplete?: (lineId: string) => void;
  streamingLineIds?: Set<string>;
}

export function TerminalOutput({
  lines,
  onStreamComplete,
  streamingLineIds = new Set(),
}: TerminalOutputProps) {
  return (
    <div>
      {lines.map((line, index) => (
        <TerminalLine
          key={line.id}
          line={line}
          index={index}
          onStreamComplete={onStreamComplete}
          shouldStream={streamingLineIds.has(line.id)}
        />
      ))}
    </div>
  );
}
