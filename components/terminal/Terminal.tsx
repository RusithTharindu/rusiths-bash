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

export function Terminal() {
  const [lines, setLines] = useState<TerminalLineType[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showBanner, setShowBanner] = useState(true);
  const [streamingLineIds, setStreamingLineIds] = useState<Set<string>>(new Set());

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Calculate if input should be disabled
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
      isStreaming: type === "result" || type === "error" || type === "success",
      streamingSpeed: type === "error" ? 30 : type === "result" ? 50 : 50,
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
      setStreamingLineIds(new Set()); // Clear streaming state
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
        // Skip all streaming animations
        setStreamingLineIds(new Set());
      } else {
        setCurrentInput("");
        setHistoryIndex(-1);
      }
      return;
    }

    // Disable other keys during streaming
    if (streamingLineIds.size > 0) {
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
      setStreamingLineIds(new Set()); // Clear streaming state
      return;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Disable input during streaming
    if (streamingLineIds.size > 0) {
      return;
    }
    setCurrentInput(e.target.value);
  };

  return (
    <div className="h-screen w-screen bg-terminal-bg flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="w-full h-full max-w-7xl flex flex-col border-2 sm:border-4 border-terminal-border rounded-lg overflow-hidden shadow-2xl shadow-terminal-border/20">
        <TerminalHeader />
        <div
          ref={terminalRef}
          onClick={handleTerminalClick}
          className="flex-1 bg-terminal-bg text-terminal-primary font-mono text-xs sm:text-sm overflow-hidden flex flex-col cursor-text"
        >
          <div
            ref={outputRef}
            className="flex-1"
            style={{
              overflowY: "auto",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "1rem",
              paddingBottom: "2rem",
              scrollBehavior: "smooth",
            }}
          >
            {showBanner && <Banner />}
            <TerminalOutput
              lines={lines}
              onStreamComplete={handleStreamComplete}
              streamingLineIds={streamingLineIds}
            />
            {!isInputDisabled && (
              <TerminalInput
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
                disabled={isInputDisabled}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
