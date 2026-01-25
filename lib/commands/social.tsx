import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function socialCommand(): CommandResult {
  const { social } = portfolioConfig;

  const content = (
    <div className="space-y-3">
      <div className="text-terminal-success font-bold">Social Links</div>
      <div className="space-y-2">
        {social.map((link, index) => (
          <div key={index}>
            <span className="text-terminal-primary">{link.platform}:</span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-success hover:underline ml-2"
            >
              {link.handle || link.url}
            </a>
          </div>
        ))}
      </div>
      <div className="text-terminal-muted text-sm mt-4">
        Follow me for updates on my projects and tech insights!
      </div>
    </div>
  );

  return {
    type: "result",
    content,
  };
}
