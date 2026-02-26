import { ReactNode } from "react";

export type LineType = "command" | "result" | "error" | "success" | "info";

export interface TerminalLine {
  id: string;
  type: LineType;
  content: ReactNode;
  isStreaming?: boolean;
  streamingSpeed?: number;
  skipAnimation?: boolean;
}

export interface ContentSegment {
  type: "text" | "break";
  text: string;
  startIndex: number;
  endIndex: number;
  className?: string;
  href?: string;
  isBlock?: boolean;
  elementType?: string;
}

export interface StreamableContent {
  segments: ContentSegment[];
  totalLength: number;
}

export interface CommandResult {
  type: LineType;
  content: ReactNode;
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => CommandResult;
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  handle?: string;
}

export interface PortfolioConfig {
  name: string;
  title: string;
  bio: string;
  location?: string;
  email: string;
  phone?: string;
  website?: string;
  banner: string;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  social: SocialLink[];
  resumeUrl?: string;
}
