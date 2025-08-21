"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsRegex } from "react-icons/bs";
import { DiScrum } from "react-icons/di";
import {
  FaReact,
  FaNodeJs,
  FaAngular,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaDocker,
  FaGitAlt,
  FaFigma,
  FaLinux,
  FaPhp,
} from "react-icons/fa";
import { RiRemixRunFill } from "react-icons/ri";
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiLaravel,
  SiNextdotjs,
  SiMysql,
} from "react-icons/si";

export default function TechCarousel() {
  const icons = [
    {
      icon: <FaReact className="text-sky-400" />,
      name: "React",
      link: "https://react.dev/",
    },
    {
      icon: <FaNodeJs className="text-green-500" />,
      name: "Node.js",
      link: "https://nodejs.org/en/docs",
    },
    {
      icon: <FaAngular className="text-red-500" />,
      name: "Angular",
      link: "https://angular.io/docs",
    },
    {
      icon: <FaHtml5 className="text-orange-400" />,
      name: "HTML5",
      link: "https://developer.mozilla.org/docs/Web/HTML",
    },
    {
      icon: <FaCss3Alt className="text-blue-400" />,
      name: "CSS3",
      link: "https://developer.mozilla.org/docs/Web/CSS",
    },
    {
      icon: <FaJsSquare className="text-yellow-400" />,
      name: "JavaScript",
      link: "https://developer.mozilla.org/docs/Web/JavaScript",
    },
    {
      icon: <SiTypescript className="text-blue-600" />,
      name: "TypeScript",
      link: "https://www.typescriptlang.org/docs/",
    },
    {
      icon: <SiTailwindcss className="text-sky-500" />,
      name: "Tailwind CSS",
      link: "https://tailwindcss.com/docs",
    },
    {
      icon: <SiMongodb className="text-green-600" />,
      name: "MongoDB",
      link: "https://www.mongodb.com/docs/",
    },
    {
      icon: <SiPostgresql className="text-blue-700" />,
      name: "PostgreSQL",
      link: "https://www.postgresql.org/docs/",
    },
    {
      icon: <SiGraphql className="text-pink-500" />,
      name: "GraphQL",
      link: "https://graphql.org/learn/",
    },
    {
      icon: <FaPhp className="text-indigo-500" />,
      name: "PHP",
      link: "https://www.php.net/docs.php",
    },
    {
      icon: <SiLaravel className="text-red-600" />,
      name: "Laravel",
      link: "https://laravel.com/docs",
    },
    {
      icon: <SiNextdotjs className="text-sky-300" />,
      name: "Next.js",
      link: "https://nextjs.org/docs",
    },
    {
      icon: <RiRemixRunFill className="text-purple-500" />,
      name: "Remix",
      link: "https://remix.run/docs",
    },
    {
      icon: <FaDocker className="text-blue-400" />,
      name: "Docker",
      link: "https://docs.docker.com/",
    },
    {
      icon: <FaGitAlt className="text-orange-500" />,
      name: "Git",
      link: "https://git-scm.com/doc",
    },
    {
      icon: <FaLinux className="text-gray-400" />,
      name: "Linux",
      link: "https://www.kernel.org/doc/html/latest/",
    },
    {
      icon: <FaFigma className="text-pink-500" />,
      name: "Figma",
      link: "https://help.figma.com/hc/en-us",
    },
    {
      icon: <DiScrum className="text-yellow-400" />,
      name: "Agile / Scrum",
      link: "https://www.scrum.org/resources/scrum-guide",
    },
    {
      icon: <BsRegex className="text-teal-400" />,
      name: "Regex",
      link: "https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_expressions",
    },
    {
      icon: <SiMysql className="text-blue-500" />,
      name: "MySQL",
      link: "https://dev.mysql.com/doc/",
    },
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<number | undefined>();

  useEffect(() => {
    if (firstItemRef.current) {
      setMaxWidth(firstItemRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      ref={marqueeRef}
      style={{ maxWidth }}
      className="gray-scroll group flex overflow-hidden whitespace-nowrap h-26 w-full rounded-md bg-gradient-to-b from-black/10 to-slate-800/10 hover:from-slate-800/10 hover:to-black transition-[height] duration-50 hover:h-full hover:overflow-auto backdrop-blur-md"
    >
      <p className="pl-1 absolute pt-2 text-[11px] font-semibold text-gray-500 tracking-widest after:block after:h-px after:w-8 after:mt-1 after:bg-slate-600/40 group-hover:hidden">
        TECH STACK
      </p>

      <div
        ref={firstItemRef}
        className="text-white pt-8 [animation:marquee-content_10s_linear_infinite] group-hover:animate-none group-hover:p-2 group-hover:w-[95%]"
      >
        <div className="flex flex-row group-hover:flex-col">
          {icons.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-slate-800 after:transition-all after:duration-300 hover:after:w-full"
            >
              <div className="flex items-center justify-center w-15 h-15">
                {React.cloneElement(tech.icon, { size: 40 })}
              </div>
              <span className="hidden group-hover:inline-block relative font-medium text-sm text-white content-center">
                {tech.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="text-white pt-8 [animation:marquee-content_10s_linear_infinite] group-hover:hidden">
        <div className="flex flex-row">
          {icons.map((tech, index) => (
            <div key={index} className="flex flex-row">
              <div className="flex items-center justify-center w-15 h-15 grayscale">
                {React.cloneElement(tech.icon, { size: 40 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
