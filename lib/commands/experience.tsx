import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function experienceCommand(): CommandResult {
  const { experience } = portfolioConfig;

  const content = (
    <div>
      <div className="text-terminal-banner font-bold mb-2">Work Experience</div>
      <div className="space-y-2">
        {experience.map((job) => (
          <div key={`${job.title}-${job.company}`} className="border-l-2 border-terminal-muted/30 pl-3">
            <div className="text-terminal-command font-semibold">{job.title}</div>
            <div className="text-terminal-primary text-sm">
              <span className="text-terminal-banner">{job.company}</span> • <span className="text-terminal-muted">{job.period}</span>
            </div>
            <div className="text-terminal-primary mt-1.5 text-sm leading-relaxed">{job.description}</div>
            {job.highlights && job.highlights.length > 0 && (
              <ul className="mt-2 space-y-0 text-terminal-primary text-sm">
                {job.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-terminal-link mr-2">▹</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
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
