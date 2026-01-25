import { CommandResult } from "@/lib/types/terminal";

export function clearCommand(): CommandResult {
  return {
    type: "result",
    content: "", // The Terminal component will handle clearing
  };
}
