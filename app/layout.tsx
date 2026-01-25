import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terminal Portfolio | Your Name",
  description: "Interactive terminal-style portfolio showcasing my projects, skills, and experience as a Full Stack Developer.",
  keywords: ["portfolio", "developer", "terminal", "web development", "full stack"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Terminal Portfolio | Your Name",
    description: "Interactive terminal-style portfolio showcasing my projects and skills",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
