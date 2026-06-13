import type { Metadata } from "next";
import "./globals.css";
import AnimatedCursor from "@/app/components/AnimatedCursor/AnimatedCursor";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Jhonatan Ferreira | Full-Stack Engineer",
  description:
    "Full-stack Engineer with 6+ years of experience in web applications, APIs, and responsive design. Skilled in React, Remix, Angular, Node.js, and Laravel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-hidden" lang="en">
      <Analytics />
      <body className="overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(2,218,222,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(2,218,222,0.06),transparent_40%),linear-gradient(135deg,#050a12,#07101a,#0b1623)]">
        {children}
        <div className="splash-cursor"></div>
      </body>
    </html>
  );
}
