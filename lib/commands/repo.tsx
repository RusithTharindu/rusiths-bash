import { CommandResult } from "@/lib/types/terminal";

export function repoCommand(): CommandResult {
  const repoUrl = "https://github.com/RusithTharindu/rusith-cli";

  // Open repo in new tab
  window.open(repoUrl, "_blank");

  const content = (
    <div className="space-y-2">
      <div className="text-terminal-banner font-semibold">Opening GitHub repository...</div>
      <div className="text-terminal-muted text-sm">
        If it didn't open,{" "}
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-link hover:underline"
        >
          click here
        </a>
      </div>
    </div>
  );

  return {
    type: "success",
    content,
  };
}
