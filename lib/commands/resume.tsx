import { CommandResult } from "@/lib/types/terminal";
import { portfolioConfig } from "@/config/portfolio";

export function resumeCommand(): CommandResult {
  const { resumeUrl } = portfolioConfig;

  if (resumeUrl) {
    // Open resume in new tab
    window.open(resumeUrl, "_blank");
  }

  const content = (
    <div className="space-y-2">
      {resumeUrl ? (
        <>
          <div className="text-terminal-banner font-semibold">Opening resume...</div>
          <div className="text-terminal-muted text-sm">
            If the download didn't start,{" "}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-link hover:underline"
            >
              click here
            </a>
          </div>
        </>
      ) : (
        <div className="text-terminal-error">
          Resume not available. Please check back later.
        </div>
      )}
    </div>
  );

  return {
    type: resumeUrl ? "success" : "error",
    content,
  };
}
