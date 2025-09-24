"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { icons } from "./Icons";

export default function TechCarousel() {
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
          {Object.values(icons).map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex flex-row pl-2 items-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-slate-800 after:transition-all after:duration-300 hover:after:w-full"
            >
              <div className="flex items-center justify-center w-15 h-15">
                {React.cloneElement(tech.icon, { size: 40 })}
              </div>
              <span className="hidden w-full justify-between group-hover:flex items-center gap-1 relative font-medium text-sm text-white content-center">
                {tech.name}
                <FiExternalLink
                  size={14}
                  className="opacity-70 hidden group-hover/link:flex"
                />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="text-white pt-8 [animation:marquee-content_10s_linear_infinite] group-hover:hidden">
        <div className="flex flex-row">
          {Object.values(icons).map((tech, index) => (
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
