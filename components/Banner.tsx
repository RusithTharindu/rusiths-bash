import { portfolioConfig } from "@/config/portfolio";

export function Banner() {
  return (
    <div className="mb-6">
      <pre className="text-terminal-success text-xs sm:text-sm leading-tight">
        {portfolioConfig.banner}
      </pre>
      <div className="mt-4 text-terminal-secondary">
        <div>Welcome to my terminal portfolio!</div>
        <div className="mt-2">
          Type <span className="text-terminal-primary font-semibold">help</span> to see available commands.
        </div>
      </div>
    </div>
  );
}
