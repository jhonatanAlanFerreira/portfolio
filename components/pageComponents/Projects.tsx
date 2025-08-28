"use client";
import { BiFullscreen } from "react-icons/bi";
import React, { useState } from "react";
import { GrGithub } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import { ProjectsData } from "./ProjectsData";

export default function Projects() {
  const [projectModal, setProjectModal] = useState<{
    opened: boolean;
    img: string | null;
    imgAlt: string;
  }>({ opened: false, img: null, imgAlt: "" });

  const onCloseModal = () => {
    setProjectModal({ img: null, imgAlt: "", opened: false });
  };

  const openProjectModal = (img: string, imgAlt: string) => {
    setProjectModal({ img, imgAlt, opened: true });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full flex flex-col gap-3">
        {ProjectsData.map((pd, index) => (
          <div
            key={index}
            className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300"
          >
            <div className="flex h-full gap-5 p-4">
              <div className="flex-2">
                <div className="w-full p-4 content-center rounded-lg bg-slate-800/10 opacity-50 hover:opacity-100 group">
                  <img
                    className="group-hover:hidden"
                    src={pd.img}
                    alt={pd.imgAlt}
                  />
                  <img
                    className="hidden group-hover:flex"
                    src={pd.gif}
                    alt={pd.gifAlt}
                  />
                  <div className="flex justify-end mt-3">
                    <BiFullscreen
                      size={25}
                      className="text-gray-400/50 opacity-0 group-hover:opacity-100 cursor-pointer"
                      onClick={() => openProjectModal(pd.gif, pd.gifAlt)}
                    ></BiFullscreen>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-3 text-gray-400">
                <h3 className="text-xl font-medium">{pd.name}</h3>
                <p className="text-white/80 text-sm pb-4">{pd.description}</p>
                <h3 className="text-xl font-medium">Tech Stack</h3>
                <div className="flex">
                  {pd.stackIcons.map((tech, index) => (
                    <a
                      key={index}
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={tech.name}
                      className="cursor-pointer grayscale hover:scale-110 hover:grayscale-0"
                    >
                      <div className="flex items-center justify-center w-10 h-10">
                        {React.cloneElement(tech.icon, { size: 25 })}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="flex flex-1 justify-end items-end grayscale">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pd.sourceCode}
                    className="h-10 group relative inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-slate-950/80 transition duration-300 hover:bg-slate-950/70 hover:shadow-sm hover:shadow-slate-500/20 overflow-hidden"
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
        ))}
      </div>
    </div>
  );
}
