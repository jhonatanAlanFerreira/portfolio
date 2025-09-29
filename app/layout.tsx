import type { Metadata } from "next";
import "./globals.css";
import AnimatedCursor from "@/components/AnimatedCursor/AnimatedCursor";

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
      <body className="overflow-hidden bg-black [background-image:radial-gradient(circle,hsla(0,0%,80%,0.1)_1px,transparent_1px),radial-gradient(circle,hsla(0,0%,80%,0.1)_1px,transparent_1px)] [background-size:1rem_1rem] [background-position:0_0,0.5rem_0.5rem]">
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
