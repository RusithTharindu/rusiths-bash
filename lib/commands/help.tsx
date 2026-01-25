import { CommandResult } from "@/lib/types/terminal";

export function helpCommand(): CommandResult {
  const helpText = (
    <div className="space-y-2">
      <div className="text-terminal-success mb-4">Available Commands:</div>
      <div className="grid gap-2">
        <div>
          <span className="text-terminal-primary">about</span>
          <span className="text-terminal-muted ml-8">- Learn more about me</span>
        </div>
        <div>
          <span className="text-terminal-primary">experience</span>
          <span className="text-terminal-muted ml-2">- View my work experience</span>
        </div>
        <div>
          <span className="text-terminal-primary">education</span>
          <span className="text-terminal-muted ml-3">- View my educational background</span>
        </div>
        <div>
          <span className="text-terminal-primary">projects</span>
          <span className="text-terminal-muted ml-4">- See my recent projects</span>
        </div>
        <div>
          <span className="text-terminal-primary">skills</span>
          <span className="text-terminal-muted ml-7">- View my technical skills</span>
        </div>
        <div>
          <span className="text-terminal-primary">contact</span>
          <span className="text-terminal-muted ml-5">- Get in touch with me</span>
        </div>
        <div>
          <span className="text-terminal-primary">social</span>
          <span className="text-terminal-muted ml-7">- Find me on social media</span>
        </div>
        <div>
          <span className="text-terminal-primary">resume</span>
          <span className="text-terminal-muted ml-7">- Download my resume</span>
        </div>
        <div>
          <span className="text-terminal-primary">clear</span>
          <span className="text-terminal-muted ml-8">- Clear the terminal</span>
        </div>
        <div>
          <span className="text-terminal-primary">help</span>
          <span className="text-terminal-muted ml-9">- Show this help message</span>
        </div>
      </div>
      <div className="text-terminal-muted mt-4 text-sm">
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
