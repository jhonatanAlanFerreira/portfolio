"use client";
import Projects from "@/app/components/pageComponents/Project/Projects";
import Work from "@/app/components/pageComponents/Work/Work";
import SelectBar from "@/app/components/SelectBar/SelectBar";
import TechCarousel from "@/app/components/TechCarousel/TechCarousel";
import { PageTab } from "@/types/PageTypes";
import { JSX, useState } from "react";
import { GrGithub } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { PiLinkedinLogo } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "@/app/components/pageComponents/Contact/Contact";
import Widgets from "@/app/components/pageComponents/Widgets/Widgets";
import { FiChevronLeft } from "react-icons/fi";
import ResumeDownload from "@/app/components/ResumeDownload/ResumeDownload";

export default function Home() {
  const [activeTab, setActiveTab] = useState<PageTab>("WORK");
  const [asideVisible, setAsideVisible] = useState(true);

  const renderSelectedTabContent = () => {
    const TAB_CONTENT: Record<PageTab, JSX.Element> = {
      PROJECTS: <Projects />,
      WORK: <Work />,
      CONTACT: <Contact />,
      WIDGETS: <Widgets />,
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="h-full"
        >
          {TAB_CONTENT[activeTab]}
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderSelectedTabTitle = () => {
    const TAB_TITLES: Record<PageTab, { prefix: string; main: string }> = {
      PROJECTS: { prefix: "My", main: "Projects" },
      WORK: { prefix: "My", main: "Work" },
      CONTACT: { prefix: "Get in", main: "Touch" },
      WIDGETS: { prefix: "Just Some", main: "Cool API Integration" },
    };

    const { prefix, main } = TAB_TITLES[activeTab];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
          className="flex items-baseline gap-2"
        >
          <span className="text-[var(--primary)]">{prefix}</span>

          <span className="text-[var(--accent)]">{main}</span>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderExperienceLabel = (): string => {
    const start = new Date("2019-05");
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    const totalYears = months < 0 ? years - 1 : years;

    return `${totalYears} years as Full-Stack Developer`;
  };

  return (
    <div className="flex h-screen">
      <motion.aside
        initial={{ width: "12rem" }}
        animate={{
          width: asideVisible ? "12rem" : "0px",
          overflow: asideVisible ? "hidden" : "visible",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute z-2 h-full flex-1 border-r border-[var(--border-subtle)] bg-[rgba(11,22,35,0.6)] shadow-[4px_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-[var(--accent)]/30 sm:relative sm:flex sm:w-full"
      >
        <button
          className={`${
            asideVisible ? "-right-3" : "-right-6"
          } absolute top-3 flex cursor-pointer rounded-full bg-slate-900/70 p-2 transition duration-300 hover:bg-slate-800/70 sm:hidden`}
          onClick={() => setAsideVisible(!asideVisible)}
        >
          <motion.div
            animate={{ rotate: asideVisible ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronLeft size={20} className="text-white" />
          </motion.div>
        </button>
        <AnimatePresence>
          {asideVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-full w-full flex-col items-center gap-4"
            >
              <div className="flex flex-col items-center pt-5">
                <div className="h-15 w-15 overflow-hidden rounded-sm border-1 border-[var(--border-subtle)] hover:border-[var(--accent)]/40 lg:h-30 lg:w-30 2xl:h-40 2xl:w-40">
                  <img src="profile.jpeg" alt="Profile Picture" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-lg font-bold text-white 2xl:text-3xl">
                    Jhonatan Ferreira
                  </h1>
                  <p className="text-sm text-[var(--accent)]/80 2xl:text-lg">
                    Full Stack Developer
                  </p>
                  <ResumeDownload></ResumeDownload>
                </div>
              </div>
              <div className="z-10 mt-10 mb-3 w-full flex-1 place-items-center overflow-hidden px-2">
                <TechCarousel />
                <div className="flex w-full flex-col pt-4 text-[10px] 2xl:text-lg">
                  <div className="space-y-1 font-medium text-gray-400">
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="text-white/80">Brazil</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Languages:</span>
                      <span className="text-white/80">
                        English / Portuguese
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="text-end text-white/80">
                        {renderExperienceLabel()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative bottom-0 size-5/6 h-10 border-t border-gray-400/90 grayscale lg:mb-6 lg:h-5 2xl:h-12">
                <div className="flex justify-around pt-3">
                  <div className="group cursor-pointer rounded-full border border-slate-600/60 p-2 transition duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/20">
                    <a
                      href="https://github.com/jhonatanAlanFerreira"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <GrGithub className="h-3 w-3 text-sky-400 group-hover:text-sky-300 2xl:h-8 2xl:w-8" />
                    </a>
                  </div>
                  <div className="group cursor-pointer rounded-full border border-slate-600/60 p-2 transition duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/20">
                    <a href="mailto:contact@jhonatanferreira.dev">
                      <MdEmail className="h-3 w-3 text-sky-400 group-hover:text-sky-300 2xl:h-8 2xl:w-8" />
                    </a>
                  </div>
                  <div className="group cursor-pointer rounded-full border border-slate-600/60 p-2 transition duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/20">
                    <a
                      href="https://www.linkedin.com/in/jhonatan-alan-ferreira"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PiLinkedinLogo className="h-3 w-3 text-sky-400 group-hover:text-sky-300 2xl:h-8 2xl:w-8" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
      <main className="flex flex-3 overflow-hidden">
        <section className="w-full">
          <div className="flex h-screen flex-col">
            <div className="flex flex-row px-8 py-5">
              <h2 className="flex items-baseline gap-2 text-lg font-bold tracking-tight sm:flex lg:text-3xl">
                {renderSelectedTabTitle()}
              </h2>
              <SelectBar onChange={setActiveTab} />
            </div>
            <div className="gray-scroll flex-1 overflow-auto px-8">
              <div className="h-full min-w-128 pr-4 pb-4">
                {renderSelectedTabContent()}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
