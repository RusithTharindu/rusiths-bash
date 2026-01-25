import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function aboutCommand(): CommandResult {
  const { bio, email } = portfolioConfig;
  const { social } = portfolioConfig;

  const content = (
    <div>
      <div className="text-terminal-primary leading-relaxed mb-4">{bio}</div>

      <div className="space-y-0 font-mono text-sm">
        <div className="flex">
          <span className="text-terminal-primary w-28 flex-shrink-0">Email</span>
          <a href={`mailto:${email}`} className="text-terminal-link hover:underline">{email}</a>
        </div>
        {social.map((link, index) => (
          <div key={index} className="flex">
            <span className="text-terminal-primary w-28 flex-shrink-0">{link.platform}</span>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">
              {link.handle?.replace('@', '')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  return {
    type: "result",
    content,
  };
}
