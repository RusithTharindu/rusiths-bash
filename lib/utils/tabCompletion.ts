export function getTabCompletion(
  input: string,
  availableCommands: string[]
): string | null {
  const trimmed = input.trim().toLowerCase();

  if (!trimmed) {
    return null;
  }

  const matches = availableCommands.filter((cmd) =>
    cmd.toLowerCase().startsWith(trimmed)
  );

  if (matches.length === 1) {
    return matches[0];
  }

  return null;
}
