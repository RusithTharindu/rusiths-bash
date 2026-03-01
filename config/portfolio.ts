import { PortfolioConfig } from "@/lib/types/terminal";

export const portfolioConfig: PortfolioConfig = {
  name: "Rusith Tharindu Thushan",
  title: "Software Engineer",
  bio: "Hello World, I am Rusith. A Software Engineer from Sri Lanka.",
  location: "Sri Lanka",
  email: "rusiththarindu2@gmail.com",
  phone: "+1 (555) 123-4567", // TODO: replace with your real phone number or remove
  website: "https://yourwebsite.com", // TODO: replace with your real website URL or remove
  repoUrl: "https://github.com/RusithTharindu/rusiths-bash", // TODO: update if repo is renamed

  banner: `
██████╗ ██╗   ██╗███████╗██╗████████╗██╗  ██╗
██╔══██╗██║   ██║██╔════╝██║╚══██╔══╝██║  ██║
██████╔╝██║   ██║███████╗██║   ██║   ███████║
██╔══██╗██║   ██║╚════██║██║   ██║   ██╔══██║
██║  ██║╚██████╔╝███████║██║   ██║   ██║  ██║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝   ╚═╝  ╚═╝
  `,

  // TODO: replace these example projects with your real projects
  projects: [
    {
      name: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.",
      techStack: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Stripe",
        "Tailwind CSS",
      ],
      link: "https://demo.example.com",
      github: "https://github.com/yourusername/ecommerce-platform",
    },
    {
      name: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, team workspaces, and advanced filtering.",
      techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
      github: "https://github.com/yourusername/task-manager",
    },
    {
      name: "AI Content Generator",
      description:
        "AI-powered content generation tool using GPT-4 API with custom prompts and content optimization.",
      techStack: ["Python", "FastAPI", "OpenAI API", "React", "Redis"],
      link: "https://ai-content.example.com",
    },
  ],

  // TODO: replace these example jobs with your real work experience
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Corp Inc.",
      period: "2022 - Present",
      description:
        "Leading development of microservices architecture and mentoring junior developers.",
      highlights: [
        "Architected and deployed scalable microservices handling 1M+ daily requests",
        "Reduced API response time by 60% through optimization and caching strategies",
        "Led team of 5 developers in agile environment",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Developed customer-facing applications and internal tools.",
      highlights: [
        "Built responsive web applications using React and Node.js",
        "Implemented CI/CD pipelines reducing deployment time by 40%",
        "Collaborated with designers to create intuitive user interfaces",
      ],
    },
    {
      title: "Junior Developer",
      company: "Digital Agency",
      period: "2018 - 2020",
      description:
        "Worked on client projects ranging from landing pages to complex web applications.",
    },
  ],

  // TODO: replace these example entries with your real education
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      period: "2014 - 2018",
      description:
        "Focused on software engineering, algorithms, and data structures. Graduated with honors.",
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      institution: "Code Academy",
      period: "2017",
      description:
        "Intensive 12-week program covering modern web development technologies.",
    },
  ],

  skills: [
    {
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
    },
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Vue.js", "Tailwind CSS", "HTML/CSS"],
    },
    {
      category: "Backend",
      skills: [
        "Node.js",
        "Express",
        "FastAPI",
        "PostgreSQL",
        "MongoDB",
        "Redis",
      ],
    },
    {
      category: "DevOps",
      skills: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Vercel"],
    },
    {
      category: "Tools",
      skills: ["Git", "VS Code", "Figma", "Postman", "Linux"],
    },
  ],

  social: [
    {
      platform: "Github",
      url: "https://github.com/RusithTharindu",
      handle: "github/RusithTharindu",
    },
    {
      platform: "Linkedin",
      url: "https://www.linkedin.com/in/rusith-tharindu-thushan/",
      handle: "linkedin/rusith-tharindu-thushan",
    },
    {
      platform: "X (Twitter)",
      url: "https://x.com/ruziya66_",
      handle: "x/@ruziya66_",
    },
  ],

  resumeUrl: "/resume.pdf",
};
