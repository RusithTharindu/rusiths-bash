import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function socialCommand(): CommandResult {
  const { social } = portfolioConfig;

  const content = (
    <div>
      <div className="text-terminal-banner font-bold mb-2">Social Links</div>
      <div className="space-y-0 text-sm">
        {social.map((link, index) => (
          <div key={index}>
            <span className="text-terminal-command">{link.platform}:</span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-link hover:underline ml-2"
            >
              {link.handle || link.url}
            </a>
          </div>
        ))}
      </div>
      <div className="text-terminal-muted text-sm mt-3 pt-3 border-t border-terminal-muted/20 leading-relaxed">
        Follow me for updates on my projects and tech insights!
      </div>
    </div>
  );

  return {
    type: "result",
    content,
  };
}
