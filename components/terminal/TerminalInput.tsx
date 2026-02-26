import { KeyboardEvent, ChangeEvent } from "react";

interface TerminalInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
}

export function TerminalInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
  disabled = false,
}: TerminalInputProps) {
  return (
    <div
      style={{
        paddingTop: "1rem",
        paddingBottom: "1.5rem",
      }}
    >
      {/* Prompt line - responsive layout */}
      <div className="flex flex-wrap items-center gap-1 select-none mb-1 sm:mb-0">
        <span className="text-terminal-username">guest</span>
        <span className="text-terminal-username">@</span>
        <span className="text-terminal-hostname">RusithTharindu</span>
        <span className="text-terminal-platform hidden sm:inline">MINGW64</span>
        <span className="text-terminal-path">~/portfolio</span>
        <span className="text-terminal-branch">(master)</span>
      </div>

      {/* Input line */}
      <div className="flex items-center" style={{ marginTop: "0.25rem" }}>
        <span className="text-terminal-command select-none" style={{ marginRight: "0.5rem" }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className={`flex-1 bg-transparent outline-none text-terminal-command caret-terminal-command min-w-0 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          autoFocus
          inputMode="text"
        />
      </div>
    </div>
  );
}
