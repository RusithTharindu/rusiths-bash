import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function experienceCommand(): CommandResult {
  const { experience } = portfolioConfig;

  const content = (
    <div className="space-y-4">
      <div className="text-terminal-success font-bold">Work Experience</div>
      {experience.map((job, index) => (
        <div key={index} className="border-l-2 border-terminal-primary pl-4">
          <div className="text-terminal-primary font-semibold">{job.title}</div>
          <div className="text-terminal-secondary">
            {job.company} • <span className="text-terminal-muted">{job.period}</span>
          </div>
          <div className="text-terminal-secondary mt-2">{job.description}</div>
          {job.highlights && job.highlights.length > 0 && (
            <ul className="mt-2 space-y-1 text-terminal-secondary text-sm">
              {job.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-terminal-success mr-2">▹</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
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
