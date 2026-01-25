import { Command, CommandResult } from "@/lib/types/terminal";
import { helpCommand } from "./help";
import { aboutCommand } from "./about";
import { projectsCommand } from "./projects";
import { skillsCommand } from "./skills";
import { contactCommand } from "./contact";
import { experienceCommand } from "./experience";
import { educationCommand } from "./education";
import { resumeCommand } from "./resume";
import { socialCommand } from "./social";
import { clearCommand } from "./clear";

export const commands: Record<string, Command> = {
  help: {
    name: "help",
    description: "Show all available commands",
    execute: () => helpCommand(),
  },
  about: {
    name: "about",
    description: "Learn more about me",
    execute: () => aboutCommand(),
  },
  experience: {
    name: "experience",
    description: "View my work experience",
    execute: () => experienceCommand(),
  },
  education: {
    name: "education",
    description: "View my educational background",
    execute: () => educationCommand(),
  },
  projects: {
    name: "projects",
    description: "See my recent projects",
    execute: () => projectsCommand(),
  },
  skills: {
    name: "skills",
    description: "View my technical skills",
    execute: () => skillsCommand(),
  },
  contact: {
    name: "contact",
    description: "Get in touch with me",
    execute: () => contactCommand(),
  },
  social: {
    name: "social",
    description: "Find me on social media",
    execute: () => socialCommand(),
  },
  resume: {
    name: "resume",
    description: "Download my resume",
    execute: () => resumeCommand(),
  },
  clear: {
    name: "clear",
    description: "Clear the terminal",
    execute: () => clearCommand(),
  },
};

export function executeCommand(commandName: string, args: string[]): CommandResult {
  const command = commands[commandName];

  if (!command) {
    return {
      type: "error",
      content: (
        <div>
          <span className="text-terminal-error">Command not found: {commandName}</span>
          <div className="text-terminal-muted text-sm mt-1">
            Type <span className="text-terminal-primary">help</span> to see available commands
          </div>
        </div>
      ),
    };
  }

  return command.execute(args);
}

export function getAvailableCommands(): string[] {
  return Object.keys(commands);
}
