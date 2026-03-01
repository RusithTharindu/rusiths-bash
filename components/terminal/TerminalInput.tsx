import { KeyboardEvent, ChangeEvent, RefObject } from "react";
import { TerminalPrompt } from "./TerminalPrompt";

interface TerminalInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
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
    <div className="pt-4 pb-6">
      {/* Prompt line - responsive layout */}
      <div className="flex flex-wrap items-center gap-1 mb-1 sm:mb-0">
        <TerminalPrompt />
      </div>

      {/* Input line */}
      <div className="flex items-center mt-1">
        <span className="text-terminal-command select-none mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className={`flex-1 bg-transparent outline-none text-terminal-command caret-terminal-command min-w-0 ${
            disabled ? "opacity-40 cursor-not-allowed" : ""
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
