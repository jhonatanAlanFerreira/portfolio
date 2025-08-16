import React from "react";
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
    <FaReact className="text-sky-400" />,
    <FaNodeJs className="text-green-500" />,
    <FaAngular className="text-red-500" />,
    <FaHtml5 className="text-orange-500" />,
    <FaCss3Alt className="text-blue-500" />,
    <FaJsSquare className="text-yellow-400" />,
  ];

  return (
    <div className="marquee rounded-xl shadow-sm bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border-[0.1px] border-slate-500/60 hover:border-slate-300/60 transition-colors duration-300">
      <p className="text-white absolute pl-4 pt-2 text-[11px] tracking-widest font-semibold uppercase text-slate-300 after:block after:h-[1px] after:w-8 after:mt-1 after:bg-slate-600/40">
        Tech Stack
      </p>
      <div className="marquee__item text-white pt-8">
        <div className="flex">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-15 h-15 grayscale"
            >
              {icon && React.cloneElement(icon, { size: 40 })}
            </div>
          ))}
        </div>
      </div>
      <div className="marquee__item text-white pt-8">
        <div className="flex">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-15 h-15 grayscale"
            >
              {icon && React.cloneElement(icon, { size: 40 })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
