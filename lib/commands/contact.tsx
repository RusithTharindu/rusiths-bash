import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function contactCommand(): CommandResult {
  const { email, phone, website } = portfolioConfig;

  const content = (
    <div className="space-y-3">
      <div className="text-terminal-success font-bold">Contact Information</div>
      <div className="space-y-2">
        <div>
          <span className="text-terminal-primary">Email:</span>
          <a
            href={`mailto:${email}`}
            className="text-terminal-success hover:underline ml-2"
          >
            {email}
          </a>
        </div>
        {phone && (
          <div>
            <span className="text-terminal-primary">Phone:</span>
            <span className="text-terminal-secondary ml-2">{phone}</span>
          </div>
        )}
        {website && (
          <div>
            <span className="text-terminal-primary">Website:</span>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-success hover:underline ml-2"
            >
              {website}
            </a>
          </div>
        )}
      </div>
      <div className="text-terminal-muted text-sm mt-4">
        Feel free to reach out! I'm always open to discussing new projects and opportunities.
      </div>
    </div>
  );

  return {
    type: "result",
    content,
  };
}
