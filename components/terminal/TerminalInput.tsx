import { KeyboardEvent, ChangeEvent } from "react";

interface TerminalInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function TerminalInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
}: TerminalInputProps) {
  return (
    <div
      className="flex items-center"
      style={{
        paddingRight: "2rem",
        paddingBottom: "1.5rem",
        paddingTop: "1rem",
      }}
    >
      <div className="flex-shrink-0 select-none">
        <span className="text-terminal-username">guest</span>
        <span className="text-terminal-username">@</span>
        <span className="text-terminal-hostname">RusithTharindu</span>
        <span className="text-terminal-command"> </span>
        <span className="text-terminal-platform">MINGW64</span>
        <span className="text-terminal-command"> </span>
        <span className="text-terminal-path">~/portfolio</span>
        <span className="text-terminal-command"> </span>
        <span className="text-terminal-branch">(master)</span>
      </div>
      <div className="flex items-center">
        <span className="text-terminal-command select-none">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none text-terminal-command caret-terminal-commands"
          spellCheck={false}
          autoComplete="off"
          autoFocus
          style={{
            marginLeft: 5,
          }}
        />
      </div>
    </div>
  );
}
