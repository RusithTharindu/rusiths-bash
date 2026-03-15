import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rusith Tharindu Thushan | Terminal Portfolio",
  description:
    "Interactive terminal-style portfolio showcasing my projects, skills, and experience as a Full Stack Developer.",
  keywords: [
    "portfolio",
    "developer",
    "terminal",
    "web development",
    "full stack",
  ],
  authors: [{ name: "Rusith Tharindu Thushan" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: "Rusith Tharindu Thushan | Terminal Portfolio",
    description:
      "Interactive terminal-style portfolio showcasing my projects and skills",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
