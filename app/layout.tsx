import type { Metadata } from "next";
import "./globals.css";
import AnimatedCursor from "@/app/components/AnimatedCursor/AnimatedCursor";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Jhonatan Ferreira | Full-Stack Developer",
  description:
    "Full-stack developer with 6+ years of experience in web applications, APIs, and responsive design. Skilled in React, Remix, Angular, Node.js, and Laravel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-hidden" lang="en">
      <Analytics />
      <body className="overflow-hidden bg-gradient-to-br from-[#0b1220] via-[#0f1b2e] to-[#07101a]">
        {children}
        <div className="splash-cursor">
          <AnimatedCursor
            SPLAT_RADIUS={0.04}
            DENSITY_DISSIPATION={10}
            VELOCITY_DISSIPATION={5}
            BACK_COLOR={{ r: 0, g: 0, b: 0 }}
            TRANSPARENT={true}
          />
        </div>
      </body>
    </html>
  );
}
