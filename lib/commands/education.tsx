import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function educationCommand(): CommandResult {
  const { education } = portfolioConfig;

  const content = (
    <div>
      <div className="text-terminal-banner font-bold mb-2">Education</div>
      <div className="space-y-2">
        {education.map((edu, index) => (
          <div key={index} className="border-l-2 border-terminal-muted/30 pl-3">
            <div className="text-terminal-command font-semibold">{edu.degree}</div>
            <div className="text-terminal-primary text-sm">
              <span className="text-terminal-banner">{edu.institution}</span> • <span className="text-terminal-muted">{edu.period}</span>
            </div>
            {edu.description && (
              <div className="text-terminal-primary mt-1.5 text-sm leading-relaxed">
                {edu.description}
              </div>
            )}
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
