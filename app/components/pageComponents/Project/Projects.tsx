"use client";
import React, { useState } from "react";
import { GrGithub } from "react-icons/gr";
import ImageCarousel from "../../ImageCarousel/ImageCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { cardVariants, containerVariants } from "@/types/CardEffectVariants";
import { ProjectsData } from "./ProjectsData";
import { FiExternalLink } from "react-icons/fi";
import { Project } from "./ProjectsInterfaces";
import ImageCarouselWithThumbnails from "@/app/components/ImageCarouselWithThumbnails/ImageCarouselWithThumbnails";

export default function Projects() {
  const [projectModal, setProjectModal] = useState<{
    gifs: string[];
    gifAlt: string | null;
  }>({ gifs: [], gifAlt: "" });
  const [isModalImgLoading, setIsModalImgLoading] = useState(true);

  const openProjectModal = (project: Project) => {
    const { gifs, gifAlt } = project;
    setProjectModal({ gifs, gifAlt });
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
            className="h-auto w-full rounded-lg border border-[var(--border-subtle)] bg-[rgba(11,22,35,0.6)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--accent)]/40"
          >
            <div className="flex h-full gap-5 p-4">
              {pd.img && pd.type !== "youtube" && (
                <ImageCarouselWithThumbnails
                  key={index}
                  project={pd}
                  onFullScreen={openProjectModal}
                ></ImageCarouselWithThumbnails>
              )}
              {pd.type === "youtube" && (
                <div className="relative flex-2">
                  <iframe
                    className="aspect-video w-full rounded-lg"
                    src={pd.youtubeLink}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="flex flex-3 flex-col space-y-2 text-[var(--muted)] lg:space-y-5">
                <div>
                  <h3 className="text-md font-medium text-[var(--primary)] lg:text-xl">
                    {pd.name}
                  </h3>
                  <p className="text-[10px] text-[var(--primary)]/80 lg:text-sm">
                    {pd.description}
                  </p>
                </div>

                <div className="text-sm font-medium text-[var(--muted)] lg:text-xl">
                  <div className="flex flex-col">
                    <span>Language</span>
                    <span className="text-[var(--primary)]/80">
                      {pd.language}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-[var(--accent)] lg:text-xl">
                    Stack
                  </h3>
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
                    className="group relative inline-flex h-5 items-center gap-2 overflow-hidden rounded-sm bg-[rgba(255,255,255,0.05)] px-3 py-2 text-[10px] text-[var(--primary)] transition duration-300 hover:bg-[rgba(255,255,255,0.08)] hover:shadow-[0_0_12px_rgba(2,218,222,0.2)] lg:h-10 lg:rounded-lg lg:px-6 lg:text-lg"
                  >
                    <span className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                      <GrGithub className="h-2 w-2 text-[var(--primary)] lg:h-5 lg:w-5" />
                      Code
                    </span>
                    <span className="absolute inset-0 flex translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <GrGithub className="h-2 w-2 text-[var(--primary)] lg:h-5 lg:w-5" />
                      Code
                      <FiExternalLink className="h-2 w-2 text-[var(--primary)] lg:h-5 lg:w-5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {projectModal.gifs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(6,13,22,0.9)]"
          >
            <motion.div
              className="relative flex h-full w-full justify-between rounded-lg bg-[var(--bg-dark)] shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="relative flex w-full items-center justify-center p-4">
                <div className="absolute flex h-full w-full items-center justify-center">
                  {isModalImgLoading && (
                    <span className="text-[var(--muted)] opacity-50">
                      Loading...
                    </span>
                  )}
                </div>
                <ImageCarousel
                  imgClasses="max-h-[calc(100vh-1rem)] place-self-center"
                  gifs={projectModal.gifs}
                  gifAlt={projectModal.gifAlt ?? ""}
                  onLoadingChange={(isLoading) =>
                    setIsModalImgLoading(isLoading)
                  }
                />
              </div>
              <div>
                <button
                  onClick={() => setProjectModal({ gifs: [], gifAlt: "" })}
                  className="mr-3 cursor-pointer text-4xl text-[var(--primary)] hover:scale-110 hover:text-[var(--accent)]"
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
