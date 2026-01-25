import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function aboutCommand(): CommandResult {
  const { name, title, bio, location } = portfolioConfig;

  const content = (
    <div className="space-y-3">
      <div>
        <span className="text-terminal-success text-lg font-bold">{name}</span>
      </div>
      <div>
        <span className="text-terminal-primary">{title}</span>
        {location && <span className="text-terminal-muted"> • {location}</span>}
      </div>
      <div className="text-terminal-secondary mt-3 leading-relaxed">{bio}</div>
    </div>
  );

  return {
    type: "result",
    content,
  };
}
