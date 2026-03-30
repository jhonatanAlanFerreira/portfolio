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
      className="gray-scroll group flex h-16 w-full overflow-hidden rounded-md bg-gradient-to-b from-black/10 to-slate-800/10 whitespace-nowrap backdrop-blur-md transition-[height] duration-50 hover:h-full hover:overflow-auto hover:from-slate-800/10 hover:to-black 2xl:h-26"
    >
      <p className="absolute pt-2 pl-1 text-[5px] font-semibold tracking-widest text-gray-500 group-hover:hidden after:mt-1 after:block after:h-px after:w-8 after:bg-slate-600/40 2xl:text-[11px]">
        Tech & Workflow
      </p>
      <div
        ref={firstItemRef}
        className="flex min-w-max [animation:marquee-content_10s_linear_infinite] pt-5 text-white group-hover:w-[95%] group-hover:animate-none group-hover:p-2 2xl:pt-8"
      >
        <div className="flex flex-row group-hover:hidden">
          {Object.values(icons).map((tech, index) => (
            <div key={`marquee1-${index}`} className="flex flex-row">
              <div className="flex h-10 w-10 items-center justify-center grayscale 2xl:h-15 2xl:w-15">
                {React.cloneElement(tech.icon, {
                  className: `${tech.icon.props.className} w-5 h-5 2xl:w-10 2xl:h-10`,
                })}
              </div>
            </div>
          ))}
          {Object.values(icons).map((tech, index) => (
            <div key={`marquee2-${index}`} className="flex flex-row">
              <div className="flex h-10 w-10 items-center justify-center grayscale 2xl:h-15 2xl:w-15">
                {React.cloneElement(tech.icon, {
                  className: `${tech.icon.props.className} w-5 h-5 2xl:w-10 2xl:h-10`,
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden w-full flex-col group-hover:flex">
          {Object.values(icons).map((tech, index) => (
            <a
              key={`hover-${index}`}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link relative flex transform cursor-pointer flex-row items-center grayscale transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-slate-800 after:transition-all after:duration-300 after:content-[''] hover:scale-110 hover:grayscale-0 hover:after:w-full 2xl:pl-2"
            >
              <div className="flex h-10 w-10 items-center justify-center 2xl:h-15 2xl:w-15">
                {React.cloneElement(tech.icon, {
                  className: `${tech.icon.props.className} w-5 h-5 2xl:w-10 2xl:h-10`,
                })}
              </div>
              <span className="relative hidden w-full content-center items-center justify-between gap-1 text-[8px] font-medium text-white group-hover:flex 2xl:text-sm">
                {tech.name}
                <FiExternalLink className="hidden h-2 w-2 opacity-70 group-hover/link:flex 2xl:h-4 2xl:w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
