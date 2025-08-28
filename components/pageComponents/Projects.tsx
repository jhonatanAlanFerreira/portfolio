import { BiFullscreen } from "react-icons/bi";
import { projectIcons } from "./ProjectIcons";
import React from "react";
import { GrGithub } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";

export default function Projects() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full flex flex-col 2xl:flex-row gap-3">
        <div className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300">
          <div className="flex h-full gap-5 p-4">
            <div className="flex-2">
              <div className="w-full p-4 content-center rounded-lg bg-slate-800/10 opacity-50 hover:opacity-100 group">
                <img
                  className="group-hover:hidden"
                  src="/financial_manager.png"
                  alt="Finalcial Manager Screen"
                />
                <img
                  className="hidden group-hover:flex"
                  src="/financial_manager.gif"
                  alt="Finalcial Manager Screen Recorded"
                />
                <div className="flex justify-end mt-3">
                  <BiFullscreen
                    size={25}
                    className="text-gray-400/50 opacity-0 group-hover:opacity-100 cursor-pointer"
                  ></BiFullscreen>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-3 text-gray-400">
              <h3 className="text-xl font-medium">Financial Manager</h3>
              <p className="text-white/80 text-sm pb-4">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis.{" "}
              </p>
              <h3 className="text-xl font-medium">Tech Stack</h3>
              <div className="flex">
                {projectIcons.financial_manager.map((tech, index) => (
                  <a
                    key={index}
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={tech.name}
                    className="cursor-pointer hover:scale-110"
                  >
                    <div className="flex items-center justify-center w-10 h-10 grayscale">
                      {React.cloneElement(tech.icon, { size: 25 })}
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex flex-1 justify-end items-end grayscale">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jhonatanAlanFerreira/financial_manager_remix"
                  className="h-10 group relative inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-slate-950/80 transition duration-300 hover:bg-slate-900/50 overflow-hidden"
                >
                  <span className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                    <GrGithub className="text-white w-5 h-5" />
                    Code
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 translate-x-12 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <GrGithub className="text-white w-5 h-5" />
                    Code
                    <BsArrowRight className="w-5 h-5 text-white" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300"></div>
      </div>
      <div className="w-full flex flex-col 2xl:flex-row gap-3">
        <div className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300"></div>
        <div className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300"></div>
      </div>
    </div>
  );
}
