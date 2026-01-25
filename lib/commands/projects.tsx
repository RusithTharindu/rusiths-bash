import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function projectsCommand(): CommandResult {
  const { projects } = portfolioConfig;

  const content = (
    <div>
      <div className="text-terminal-banner font-bold mb-2">My Projects</div>
      <div className="space-y-2">
        {projects.map((project, index) => (
          <div key={index} className="border-l-2 border-terminal-muted/30 pl-3">
            <div className="text-terminal-command font-semibold">{project.name}</div>
            <div className="text-terminal-primary mt-1 text-sm leading-relaxed">{project.description}</div>
            <div className="text-terminal-muted mt-1.5 text-sm">
              <span className="text-terminal-primary">Tech:</span> {project.techStack.join(", ")}
            </div>
            <div className="mt-1.5 text-sm space-x-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-link hover:underline"
                >
                  🔗 Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-link hover:underline"
                >
                  📦 GitHub
                </a>
              )}
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
