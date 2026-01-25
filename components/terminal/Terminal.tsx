"use client";

import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { TerminalLine as TerminalLineType } from "@/lib/types/terminal";
import { parseCommand } from "@/lib/utils/commandParser";
import { getTabCompletion } from "@/lib/utils/tabCompletion";
import { executeCommand, getAvailableCommands } from "@/lib/commands";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalInput } from "./TerminalInput";
import { TerminalHeader } from "./TerminalHeader";

export function Terminal() {
  const [lines, setLines] = useState<TerminalLineType[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showBanner, setShowBanner] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-focus input on mount and after each command
  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (outputRef.current) {
      // Use setTimeout to ensure DOM has updated
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
      id: Date.now().toString() + Math.random(),
      type,
      content,
    };
    setLines((prev) => [...prev, newLine]);
  };

  const handleCommand = (input: string) => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    // Add command to history
    setCommandHistory((prev) => [...prev, trimmedInput]);
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

    // Escape: Clear current input
    if (e.key === "Escape") {
      setCurrentInput("");
      setHistoryIndex(-1);
      return;
    }

    // Tab: Auto-complete
    if (e.key === "Tab") {
      e.preventDefault();
      const completion = getTabCompletion(currentInput, getAvailableCommands());
      if (completion) {
        setCurrentInput(completion);
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

    // Ctrl+L: Clear terminal
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setLines([]);
      setShowBanner(false);
      return;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  return (
    <div className="h-screen w-screen bg-terminal-bg flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="w-full h-full max-w-7xl flex flex-col border-2 sm:border-4 border-terminal-border rounded-lg overflow-hidden shadow-2xl shadow-terminal-border/20">
        <TerminalHeader />
        <div
          ref={terminalRef}
          onClick={handleTerminalClick}
          className="flex-1 bg-terminal-bg text-terminal-primary font-mono text-sm overflow-hidden flex flex-col cursor-text"
        >
          <TerminalOutput
            lines={lines}
            showBanner={showBanner}
            outputRef={outputRef}
          />
          <TerminalInput
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        </div>
      </div>
    </div>
  );
}
