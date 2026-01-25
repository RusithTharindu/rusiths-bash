# Terminal Portfolio

A modern, interactive terminal-style portfolio website built with Next.js 15 and TypeScript. Features a command-line interface that showcases your projects, skills, and experience in a unique retro aesthetic.

## Features

- **Interactive Terminal Interface** - Fully functional command-line experience
- **Modern Tech Stack** - Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **Type-Safe** - 100% TypeScript with strict mode enabled
- **Config-Driven** - Easy content management through a single configuration file
- **Keyboard Shortcuts** - Tab completion, command history, and more
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern Dark Theme** - Beautiful blue/cyan color scheme
- **Zero Dependencies** - Custom terminal implementation, no external libraries

## Available Commands

- `help` - Display all available commands
- `about` - Learn more about you
- `experience` - View work experience
- `education` - View educational background
- `projects` - See recent projects
- `skills` - View technical skills
- `contact` - Get contact information
- `social` - Find social media links
- `resume` - Download resume (opens PDF)
- `clear` - Clear the terminal

## Keyboard Shortcuts

- **Enter** - Execute command
- **Tab** - Auto-complete command
- **Up/Down Arrows** - Navigate command history
- **Esc** - Clear current input
- **Ctrl+L** - Clear terminal

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your terminal portfolio.

### Build for Production

```bash
npm run build
npm start
```

## Customization

All portfolio content is managed through a single configuration file: `config/portfolio.ts`

### Update Your Information

1. Open `config/portfolio.ts`
2. Update the following sections:

```typescript
export const portfolioConfig: PortfolioConfig = {
  name: "Your Name",              // Your full name
  title: "Your Job Title",        // Your professional title
  bio: "Your bio...",             // About you
  location: "Your Location",      // Your location
  email: "your@email.com",        // Contact email

  // Add your projects
  projects: [
    {
      name: "Project Name",
      description: "Project description",
      techStack: ["Next.js", "TypeScript"],
      link: "https://...",
      github: "https://github.com/..."
    }
  ],

  // Add your work experience
  experience: [...],

  // Add your education
  education: [...],

  // Add your skills
  skills: [...],

  // Add your social links
  social: [...],
}
```

### Customize the ASCII Banner

Edit the `banner` field in `config/portfolio.ts` to change the ASCII art displayed on startup. Use tools like [patorjk.com](https://patorjk.com/software/taag/) to generate ASCII art.

### Update Resume

Replace `public/resume.pdf` with your actual resume file.

### Change Color Theme

Edit `app/globals.css` to customize colors:

```css
@theme inline {
  --color-terminal-bg: #0a0e1a; /* Background */
  --color-terminal-primary: #00d9ff; /* Primary text */
  --color-terminal-secondary: #7dd3fc; /* Secondary text */
  --color-terminal-success: #00ff9f; /* Success messages */
  --color-terminal-error: #ff5555; /* Error messages */
  --color-terminal-muted: #64748b; /* Muted text */
}
```

## Project Structure

```
terminal-cv/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles & theme
├── components/
│   ├── terminal/
│   │   ├── Terminal.tsx        # Main terminal component
│   │   ├── TerminalOutput.tsx  # Output display
│   │   ├── TerminalInput.tsx   # Input field
│   │   └── TerminalLine.tsx    # Individual line
│   └── Banner.tsx          # ASCII banner
├── lib/
│   ├── commands/           # Command implementations
│   ├── types/              # TypeScript types
│   └── utils/              # Utilities
├── config/
│   └── portfolio.ts        # Your portfolio data
└── public/
    └── resume.pdf          # Your resume
```

## Adding New Commands

1. Create a new command file in `lib/commands/yourcommand.tsx`
2. Export a function that returns a `CommandResult`
3. Register it in `lib/commands/index.ts`

Example:

```typescript
// lib/commands/mycommand.tsx
import { CommandResult } from "@/lib/types/terminal";

export function myCommand(): CommandResult {
  return {
    type: "result",
    content: <div>Your content here</div>,
  };
}

// lib/commands/index.ts
import { myCommand } from "./mycommand";

export const commands: Record<string, Command> = {
  // ... existing commands
  mycommand: {
    name: "mycommand",
    description: "My custom command",
    execute: () => myCommand(),
  },
};
```

## Deploy

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
npm run build
```

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

### Other Platforms

This is a standard Next.js application and can be deployed to:

- Netlify
- Railway
- AWS Amplify
- Any platform supporting Next.js

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 4
- **Runtime**: React 19

## License

MIT License - feel free to use this for your own portfolio!

## Acknowledgments

Inspired by terminal-style portfolio websites and the classic command-line aesthetic.
