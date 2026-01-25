import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { TerminalLine } from "./TerminalLine";
import { Banner } from "../Banner";

interface TerminalOutputProps {
  lines: TerminalLineType[];
  showBanner: boolean;
}

export function TerminalOutput({ lines, showBanner }: TerminalOutputProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {showBanner && <Banner />}
      {lines.map((line) => (
        <TerminalLine key={line.id} line={line} />
      ))}
    </div>
  );
}
