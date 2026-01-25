import { CommandResult } from "@/lib/types/terminal";

export function repoCommand(): CommandResult {
  const repoUrl = "https://github.com/RusithTharindu/rusiths-bash";

  const content = (
    <div className="space-y-2">
      <div className="text-terminal-banner font-semibold">
        GitHub Repository
      </div>
      <div className="text-terminal-muted text-sm mt-2">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-link hover:underline"
          onClick={(e) => {
            e.preventDefault();
            window.open(repoUrl, "_blank", "noopener,noreferrer");
          }}
        >
          {repoUrl}
        </a>
      </div>
      <div className="text-terminal-muted text-xs mt-1">
        Click the link above to open in a new tab
      </div>
    </div>
  );

  return {
    type: "success",
    content,
  };
}
