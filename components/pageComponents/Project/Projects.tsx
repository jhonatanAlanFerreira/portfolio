"use client";
import { BiFullscreen } from "react-icons/bi";
import React, { useState } from "react";
import { GrGithub } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import ImageCarousel from "../../ImageCarousel/ImageCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { cardVariants, containerVariants } from "@/types/CardEffectVariants";
import { ProjectsData } from "./ProjectsData";

export default function Projects() {
  const [projectModal, setProjectModal] = useState<{
    imgs: string[];
    imgAlt: string;
  }>({ imgs: [], imgAlt: "" });

  const openProjectModal = (imgs: string[], imgAlt: string) => {
    setProjectModal({ imgs, imgAlt });
  };

  return (
    <div className="flex w-full flex-col pb-3">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col gap-6 pb-10 sm:pb-0"
      >
        {ProjectsData.map((pd, index) => (
          <motion.div
            key={index}
            variants={cardVariants(index % 2 === 0)}
            className="h-auto w-full rounded-sm border border-slate-600/60 bg-black/90 transition-colors duration-300 hover:border-slate-400/50"
          >
            <div className="flex h-full gap-5 p-4">
              {pd.img && (
                <div className="flex-2">
                  <div className="group max-h-full w-full content-center rounded-lg bg-slate-800/10 p-4 opacity-50 hover:opacity-100">
                    <div className="flex justify-center">
                      <img
                        className="max-h-50 group-hover:hidden"
                        src={pd.img}
                        alt={pd.imgAlt}
                      />
                      <div className="hidden w-full group-hover:flex">
                        <ImageCarousel
                          imgClasses="max-h-50 place-self-center"
                          gifs={pd.gifs}
                          gifAlt={pd.gifAlt}
                        />
                      </div>
                    </div>
                    <div
                      onClick={() => openProjectModal(pd.gifs, pd.gifAlt)}
                      className="mt-3 flex w-fit cursor-pointer justify-start gap-1"
                    >
                      <BiFullscreen size={25} className="text-gray-400/50" />
                      <span className="text-gray-400">Full Screen</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-3 flex-col space-y-2 text-gray-400 lg:space-y-5">
                <div>
                  <h3 className="text-md font-medium lg:text-xl">{pd.name}</h3>
                  <p className="text-[10px] text-white/80 lg:text-sm">
                    {pd.description}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-400 lg:text-xl">
                  <div className="flex flex-col">
                    <span>Language</span>
                    <span className="text-white/80">{pd.language}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium lg:text-xl">Stack</h3>
                  <div className="flex flex-wrap">
                    {pd.stackIcons.map((tech, index) => (
                      <a
                        key={index}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={tech.name}
                        className="cursor-pointer grayscale hover:scale-110 hover:grayscale-0"
                      >
                        <div className="flex h-7 w-8 items-center justify-center lg:h-10 lg:w-15">
                          {React.cloneElement(tech.icon, {
                            className: `${tech.icon.props.className} w-5 h-5 lg:w-8 lg:h-8`,
                          })}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-end grayscale">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pd.sourceCode}
                    className="group relative inline-flex h-5 items-center gap-2 overflow-hidden rounded-sm bg-slate-950/80 px-3 py-2 text-[8px] transition duration-300 hover:bg-slate-950/70 hover:shadow-sm hover:shadow-slate-500/20 lg:h-10 lg:rounded-lg lg:px-6 lg:text-lg"
                  >
                    <span className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                      <GrGithub className="h-2 w-2 text-white lg:h-5 lg:w-5" />
                      Code
                    </span>
                    <span className="absolute inset-0 flex translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <GrGithub className="h-2 w-2 text-white lg:h-5 lg:w-5" />
                      Code
                      <BsArrowRight className="h-2 w-2 text-white lg:h-5 lg:w-5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {projectModal.imgs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              className="relative flex h-full w-full justify-between rounded-lg bg-black/95 shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex w-full items-center justify-center p-4">
                <ImageCarousel
                  imgClasses="max-h-[calc(100vh-1rem)] place-self-center"
                  gifs={projectModal.imgs}
                  gifAlt={projectModal.imgAlt}
                />
              </div>
              <div>
                <button
                  onClick={() => setProjectModal({ imgs: [], imgAlt: "" })}
                  className="mr-3 cursor-pointer text-4xl text-gray-200 hover:scale-110 hover:text-gray-400"
                >
                  &times;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
