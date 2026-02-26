import { CommandResult } from "@/lib/types/terminal";

export function helpCommand(): CommandResult {
  const helpText = (
    <div>
      <div className="text-terminal-banner font-bold mb-2 text-sm sm:text-base">Available Commands:</div>
      <div className="space-y-0 text-xs sm:text-sm">
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">about</span>
          <span className="text-terminal-muted">- Learn more about me</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">experience</span>
          <span className="text-terminal-muted">- View my work experience</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">education</span>
          <span className="text-terminal-muted">- View my educational background</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">projects</span>
          <span className="text-terminal-muted">- See my recent projects</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">skills</span>
          <span className="text-terminal-muted">- View my technical skills</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">contact</span>
          <span className="text-terminal-muted">- Get in touch with me</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">social</span>
          <span className="text-terminal-muted">- Find me on social media</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">resume</span>
          <span className="text-terminal-muted">- Download my resume</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">repo</span>
          <span className="text-terminal-muted">- View the GitHub repository</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">clear</span>
          <span className="text-terminal-muted">- Clear the terminal</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-terminal-command">help</span>
          <span className="text-terminal-muted">- Show this help message</span>
        </div>
      </div>
      <div className="text-terminal-muted pt-2 mt-2 border-t border-terminal-muted/20 text-xs sm:text-sm space-y-0.5">
        <div className="hidden sm:block">Tip: Use Tab for command completion</div>
        <div className="hidden sm:block">Tip: Use Up/Down arrows to navigate command history</div>
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
