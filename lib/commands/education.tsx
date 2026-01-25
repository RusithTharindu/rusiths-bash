import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function educationCommand(): CommandResult {
  const { education } = portfolioConfig;

  const content = (
    <div className="space-y-4">
      <div className="text-terminal-success font-bold">Education</div>
      {education.map((edu, index) => (
        <div key={index} className="border-l-2 border-terminal-primary pl-4">
          <div className="text-terminal-primary font-semibold">{edu.degree}</div>
          <div className="text-terminal-secondary">
            {edu.institution} • <span className="text-terminal-muted">{edu.period}</span>
          </div>
          {edu.description && (
            <div className="text-terminal-secondary mt-2 text-sm">
              {edu.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return {
    type: "result",
    content,
  };
}
