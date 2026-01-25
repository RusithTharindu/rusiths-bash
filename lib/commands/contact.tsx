import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function contactCommand(): CommandResult {
  const { email, phone, website } = portfolioConfig;

  const content = (
    <div>
      <div className="text-terminal-banner font-bold mb-2">Contact Information</div>
      <div className="space-y-0 text-sm">
        <div>
          <span className="text-terminal-command">Email:</span>
          <a
            href={`mailto:${email}`}
            className="text-terminal-link hover:underline ml-2"
          >
            {email}
          </a>
        </div>
        {phone && (
          <div>
            <span className="text-terminal-command">Phone:</span>
            <span className="text-terminal-primary ml-2">{phone}</span>
          </div>
        )}
        {website && (
          <div>
            <span className="text-terminal-command">Website:</span>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-link hover:underline ml-2"
            >
              {website}
            </a>
          </div>
        )}
      </div>
      <div className="text-terminal-muted text-sm mt-3 pt-3 border-t border-terminal-muted/20 leading-relaxed">
        Feel free to reach out! I'm always open to discussing new projects and opportunities.
      </div>
    </div>
  );

  return {
    type: "result",
    content,
  };
}
