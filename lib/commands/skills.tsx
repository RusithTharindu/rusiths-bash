import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function skillsCommand(): CommandResult {
  const { skills } = portfolioConfig;

  const content = (
    <div className="space-y-3">
      <div className="text-terminal-success font-bold">Technical Skills</div>
      {skills.map((category, index) => (
        <div key={index}>
          <div className="text-terminal-primary font-semibold mb-1">
            {category.category}:
          </div>
          <div className="text-terminal-secondary pl-4">
            {category.skills.join(" • ")}
          </div>
        </div>
      ))}
    </div>
  );

  return {
    type: "result",
    content,
  };
}
