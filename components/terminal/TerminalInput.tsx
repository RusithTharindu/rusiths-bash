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
    <div className="flex items-center px-4 sm:px-6 md:px-8 pb-6 pt-4">
      <div className="flex-shrink-0 select-none">
        <span className="text-terminal-username">Rusith</span>
        <span className="text-terminal-username">@</span>
        <span className="text-terminal-hostname">Rusith</span>
        <span className="text-terminal-command"> </span>
        <span className="text-terminal-platform">MINGW64</span>
        <span className="text-terminal-command"> </span>
        <span className="text-terminal-path">~/portfolio</span>
        <span className="text-terminal-command"> </span>
        <span className="text-terminal-branch">(master)</span>
      </div>
      <div className="flex items-center ml-1">
        <span className="text-terminal-command select-none mr-2">$ </span>
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
        />
      </div>
    </div>
  );
}
