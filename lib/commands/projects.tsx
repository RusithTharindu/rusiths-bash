import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function projectsCommand(): CommandResult {
  const { projects } = portfolioConfig;

  const content = (
    <div className="space-y-4">
      <div className="text-terminal-success font-bold">My Projects</div>
      {projects.map((project, index) => (
        <div key={index} className="border-l-2 border-terminal-primary pl-4">
          <div className="text-terminal-primary font-semibold">{project.name}</div>
          <div className="text-terminal-secondary mt-1">{project.description}</div>
          <div className="text-terminal-muted mt-2 text-sm">
            <span className="text-terminal-secondary">Tech:</span> {project.techStack.join(", ")}
          </div>
          {project.link && (
            <div className="text-sm mt-1">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-success hover:underline"
              >
                🔗 Live Demo
              </a>
            </div>
          )}
          {project.github && (
            <div className="text-sm mt-1">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-success hover:underline"
              >
                📦 GitHub Repo
              </a>
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
