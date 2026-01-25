import { CommandResult } from "@/lib/types/terminal";

export function helpCommand(): CommandResult {
  const helpText = (
    <div>
      <div className="text-terminal-banner font-bold mb-2">Available Commands:</div>
      <div className="space-y-0">
        <div>
          <span className="text-terminal-command">about</span>
          <span className="text-terminal-muted ml-8">- Learn more about me</span>
        </div>
        <div>
          <span className="text-terminal-command">experience</span>
          <span className="text-terminal-muted ml-2">- View my work experience</span>
        </div>
        <div>
          <span className="text-terminal-command">education</span>
          <span className="text-terminal-muted ml-3">- View my educational background</span>
        </div>
        <div>
          <span className="text-terminal-command">projects</span>
          <span className="text-terminal-muted ml-4">- See my recent projects</span>
        </div>
        <div>
          <span className="text-terminal-command">skills</span>
          <span className="text-terminal-muted ml-7">- View my technical skills</span>
        </div>
        <div>
          <span className="text-terminal-command">contact</span>
          <span className="text-terminal-muted ml-5">- Get in touch with me</span>
        </div>
        <div>
          <span className="text-terminal-command">social</span>
          <span className="text-terminal-muted ml-7">- Find me on social media</span>
        </div>
        <div>
          <span className="text-terminal-command">resume</span>
          <span className="text-terminal-muted ml-7">- Download my resume</span>
        </div>
        <div>
          <span className="text-terminal-command">repo</span>
          <span className="text-terminal-muted ml-9">- View the GitHub repository</span>
        </div>
        <div>
          <span className="text-terminal-command">clear</span>
          <span className="text-terminal-muted ml-8">- Clear the terminal</span>
        </div>
        <div>
          <span className="text-terminal-command">help</span>
          <span className="text-terminal-muted ml-9">- Show this help message</span>
        </div>
      </div>
      <div className="text-terminal-muted pt-2 mt-2 border-t border-terminal-muted/20 text-sm space-y-0">
        <div>Tip: Use Tab for command completion</div>
        <div>Tip: Use Up/Down arrows to navigate command history</div>
        <div>Tip: Press Esc to clear current input</div>
      </div>
    </div>
  );

  return {
    type: "result",
    content: helpText,
  };
}
