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
    <div className="flex items-center px-4 pb-4">
      <div className="flex-shrink-0 select-none">
        <span className="text-terminal-success">user@portfolio</span>
        <span className="text-terminal-muted">:</span>
        <span className="text-terminal-primary">~</span>
        <span className="text-terminal-muted">$ </span>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="flex-1 bg-transparent outline-none text-terminal-primary caret-terminal-success"
        spellCheck={false}
        autoComplete="off"
        autoFocus
      />
    </div>
  );
}
