import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { TerminalLine } from "./TerminalLine";
import { Banner } from "../Banner";

interface TerminalOutputProps {
  lines: TerminalLineType[];
  showBanner: boolean;
  outputRef: React.RefObject<HTMLDivElement | null>;
}

export function TerminalOutput({
  lines,
  showBanner,
  outputRef,
}: TerminalOutputProps) {
  return (
    <div
      ref={outputRef}
      style={{
        flex: "1 1 0%",
        overflowY: "auto",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        scrollBehavior: "smooth",
      }}
    >
      {showBanner && <Banner />}
      <div>
        {lines.map((line, index) => (
          <TerminalLine key={line.id} line={line} index={index} />
        ))}
      </div>
    </div>
  );
}
