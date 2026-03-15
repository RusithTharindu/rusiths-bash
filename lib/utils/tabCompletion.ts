export interface TabCompletionResult {
  completed: string | null;
  suggestions: string[];
}

export function getTabCompletion(
  input: string,
  availableCommands: string[]
): TabCompletionResult {
  const trimmed = input.trim().toLowerCase();

  if (!trimmed) {
    return { completed: null, suggestions: [] };
  }

  const matches = availableCommands.filter((cmd) =>
    cmd.toLowerCase().startsWith(trimmed)
  );

  if (matches.length === 1) {
    return { completed: matches[0], suggestions: [] };
  }

  if (matches.length > 1) {
    return { completed: null, suggestions: matches };
  }

  return { completed: null, suggestions: [] };
}
