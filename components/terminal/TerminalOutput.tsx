import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { TerminalLine } from "./TerminalLine";

interface TerminalOutputProps {
  lines: TerminalLineType[];
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div>
      {lines.map((line, index) => (
        <TerminalLine key={line.id} line={line} index={index} />
      ))}
    </div>
  );
}
