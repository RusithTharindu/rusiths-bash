"use client";

import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { parseCommand } from "@/lib/utils/commandParser";
import { getTabCompletion } from "@/lib/utils/tabCompletion";
import { executeCommand, getAvailableCommands } from "@/lib/commands";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalInput } from "./TerminalInput";
import { TerminalHeader } from "./TerminalHeader";
import { Banner } from "../Banner";

const SESSION_HISTORY_KEY = "terminal_cv_history";

function loadHistory(): string[] {
  try {
    const stored = sessionStorage.getItem(SESSION_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: string[]) {
  try {
    sessionStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // sessionStorage unavailable (e.g. private mode) — fail silently
  }
}

export function Terminal() {
  const [lines, setLines] = useState<TerminalLineType[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>(loadHistory);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showBanner, setShowBanner] = useState(true);
  const [streamingLineIds, setStreamingLineIds] = useState<Set<string>>(new Set());

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const isInputDisabled = streamingLineIds.size > 0;

  // Auto-focus input on mount and after streaming completes
  useEffect(() => {
    if (!isInputDisabled) {
      inputRef.current?.focus();
    }
  }, [lines, isInputDisabled]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (outputRef.current) {
      setTimeout(() => {
        if (outputRef.current) {
          outputRef.current.scrollTo({
            top: outputRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [lines]);

  // Focus input when clicking anywhere on terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const addLine = (
    type: TerminalLineType["type"],
    content: TerminalLineType["content"],
  ) => {
    const newLine: TerminalLineType = {
      id: crypto.randomUUID(),
      type,
      content,
      isStreaming: type === "result" || type === "error" || type === "success",
      streamingSpeed: type === "error" ? 30 : 50,
      skipAnimation: type === "command",
    };
    setLines((prev) => [...prev, newLine]);

    // Track streaming lines
    if (newLine.isStreaming) {
      setStreamingLineIds((prev) => new Set(prev).add(newLine.id));
    }
  };

  const handleStreamComplete = (lineId: string) => {
    setStreamingLineIds((prev) => {
      const next = new Set(prev);
      next.delete(lineId);
      return next;
    });
  };

  const handleCommand = (input: string) => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    // Add command to history and persist it
    setCommandHistory((prev) => {
      const updated = [...prev, trimmedInput];
      saveHistory(updated);
      return updated;
    });
    setHistoryIndex(-1);

    // Display the command
    addLine("command", trimmedInput);

    // Parse and execute command
    const { command, args } = parseCommand(trimmedInput);

    // Handle clear command specially
    if (command === "clear") {
      setLines([]);
      setShowBanner(false);
      setCurrentInput("");
      setStreamingLineIds(new Set());
      return;
    }

    // Execute command
    const result = executeCommand(command, args);
    addLine(result.type, result.content);

    // Clear input
    setCurrentInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enter: Execute command
    if (e.key === "Enter") {
      handleCommand(currentInput);
      return;
    }

    // Escape: Skip streaming or clear current input
    if (e.key === "Escape") {
      if (streamingLineIds.size > 0) {
        setStreamingLineIds(new Set());
      } else {
        setCurrentInput("");
        setHistoryIndex(-1);
      }
      return;
    }

    // Disable other keys during streaming (Escape handled above)
    if (streamingLineIds.size > 0) {
      return;
    }

    // Tab: Auto-complete
    if (e.key === "Tab") {
      e.preventDefault();
      const { completed, suggestions } = getTabCompletion(
        currentInput,
        getAvailableCommands(),
      );
      if (completed) {
        setCurrentInput(completed);
      } else if (suggestions.length > 1) {
        // Show all possible completions as a result line
        addLine(
          "result",
          <span className="text-terminal-muted">
            {suggestions.join("    ")}
          </span>,
        );
      }
      return;
    }

    // Up Arrow: Previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) {
        return;
      }

      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setCurrentInput(commandHistory[newIndex]);
      return;
    }

    // Down Arrow: Next command
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) {
        return;
      }

      const newIndex = historyIndex + 1;

      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setCurrentInput("");
      } else {
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
      return;
    }

    // Ctrl+L: Clear terminal (consistent with clear command)
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setLines([]);
      setShowBanner(false);
      setCurrentInput("");
      setStreamingLineIds(new Set());
      return;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (streamingLineIds.size > 0) {
      return;
    }
    setCurrentInput(e.target.value);
  };

  return (
    <div className="h-screen w-screen bg-terminal-bg flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="w-full h-full max-w-7xl flex flex-col border-2 sm:border-4 border-terminal-border rounded-lg overflow-hidden shadow-2xl shadow-terminal-border/20">
        <TerminalHeader title="guest@RusithTharindu — ~/portfolio" />
        <div
          ref={terminalRef}
          onClick={handleTerminalClick}
          className="flex-1 bg-terminal-bg text-terminal-primary font-mono text-xs sm:text-sm overflow-hidden flex flex-col cursor-text"
        >
          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto px-4 pt-4 pb-8"
            style={{ scrollBehavior: "smooth" }}
          >
            {showBanner && <Banner />}
            <TerminalOutput
              lines={lines}
              onStreamComplete={handleStreamComplete}
              streamingLineIds={streamingLineIds}
            />
            {/* Always show the input — disable and dim it during streaming */}
            <TerminalInput
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
              disabled={isInputDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
