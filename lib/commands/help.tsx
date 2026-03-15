import { CommandResult } from "@/lib/types/terminal";
import { commands } from "./index";

export function helpCommand(): CommandResult {
  const commandList = Object.values(commands);

  const helpText = (
    <div>
      <div className="text-terminal-banner font-bold mb-2 text-sm sm:text-base">
        Available Commands:
      </div>
      <div className="space-y-0 text-xs sm:text-sm">
        {commandList.map((cmd) => (
          <div key={cmd.name} className="flex flex-wrap items-baseline gap-1">
            <span className="text-terminal-command">{cmd.name}</span>
            <span className="text-terminal-muted">- {cmd.description}</span>
          </div>
        ))}
      </div>
      <div className="text-terminal-muted pt-2 mt-2 border-t border-terminal-muted/20 text-xs sm:text-sm space-y-0.5">
        <div className="hidden sm:block">Tip: Use Tab for command completion</div>
        <div className="hidden sm:block">
          Tip: Use Up/Down arrows to navigate command history
        </div>
        <div>Tip: Press Esc to skip streaming or clear input</div>
        <div className="sm:hidden">Tip: Tap anywhere to focus input</div>
      </div>
    </div>
  );

  return {
    type: "result",
    content: helpText,
  };
}
