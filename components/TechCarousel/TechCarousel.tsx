"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaAngular,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";

export default function TechCarousel() {
  const icons = [
    { icon: <FaReact className="text-sky-400" />, name: "React" },
    { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
    { icon: <FaAngular className="text-red-500" />, name: "Angular" },
    { icon: <FaHtml5 className="text-orange-500" />, name: "HTML5" },
    { icon: <FaCss3Alt className="text-blue-500" />, name: "CSS3" },
    { icon: <FaJsSquare className="text-yellow-400" />, name: "JavaScript" },
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
      className="gray-scroll group flex overflow-hidden whitespace-nowrap h-26 w-full rounded-md bg-gradient-to-b from-black/10 to-slate-800/10 hover:from-gray-950/30 hover:to-black transition-[height] duration-100 hover:h-full hover:overflow-auto"
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
            <div
              key={index}
              className="flex flex-row grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
            >
              <div className="flex items-center justify-center w-15 h-15">
                {React.cloneElement(tech.icon, { size: 40 })}
              </div>
              <span className="hidden group-hover:inline-block relative font-medium text-sm text-white content-center">
                {tech.name}
              </span>
            </div>
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
