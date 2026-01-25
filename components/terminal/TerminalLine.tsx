import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";

interface TerminalLineProps {
  line: TerminalLineType;
}

export function TerminalLine({ line }: TerminalLineProps) {
  const getLineClass = () => {
    switch (line.type) {
      case "command":
        return "text-terminal-primary";
      case "error":
        return "text-terminal-error";
      case "success":
        return "text-terminal-success";
      case "info":
        return "text-terminal-secondary";
      case "result":
      default:
        return "text-terminal-secondary";
    }
  };

  return (
    <div className={`mb-2 ${getLineClass()}`}>
      {line.type === "command" && (
        <span className="select-none">
          <span className="text-terminal-success">user@portfolio</span>
          <span className="text-terminal-muted">:</span>
          <span className="text-terminal-primary">~</span>
          <span className="text-terminal-muted">$ </span>
        </span>
      )}
      <span>{line.content}</span>
    </div>
  );
}
