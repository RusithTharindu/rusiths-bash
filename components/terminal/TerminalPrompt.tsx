export function TerminalPrompt() {
  return (
    <span className="select-none flex flex-wrap items-center gap-1">
      <span className="text-terminal-username">guest</span>
      <span className="text-terminal-username">@</span>
      <span className="text-terminal-hostname">RusithTharindu</span>
      <span className="text-terminal-platform hidden sm:inline">MINGW64</span>
      <span className="text-terminal-path">~/portfolio</span>
      <span className="text-terminal-branch">(master)</span>
    </span>
  );
}
