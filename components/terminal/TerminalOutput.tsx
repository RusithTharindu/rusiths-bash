import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { TerminalLine } from "./TerminalLine";
import { Banner } from "../Banner";

interface TerminalOutputProps {
  lines: TerminalLineType[];
  showBanner: boolean;
  outputRef: React.RefObject<HTMLDivElement>;
}

export function TerminalOutput({ lines, showBanner, outputRef }: TerminalOutputProps) {
  return (
    <div ref={outputRef} className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      {showBanner && <Banner />}
      <div>
        {lines.map((line, index) => (
          <TerminalLine key={line.id} line={line} index={index} />
        ))}
      </div>
    </div>
  );
}
