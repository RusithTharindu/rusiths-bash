import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function skillsCommand(): CommandResult {
  const { skills } = portfolioConfig;

  const content = (
    <div>
      <div className="text-terminal-banner font-bold mb-2">Technical Skills</div>
      <div className="space-y-1">
        {skills.map((category, index) => (
          <div key={index}>
            <div className="text-terminal-command font-semibold">
              {category.category}:
            </div>
            <div className="text-terminal-primary pl-3 text-sm">
              {category.skills.join(" • ")}
            </div>
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
