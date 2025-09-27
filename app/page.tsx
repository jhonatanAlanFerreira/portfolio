"use client";
import Projects from "@/components/pageComponents/Project/Projects";
import Work from "@/components/pageComponents/Work/Work";
import SelectBar from "@/components/SelectBar/SelectBar";
import TechCarousel from "@/components/TechCarousel/TechCarousel";
import { PageTab } from "@/types/PageTypes";
import { JSX, useState } from "react";
import { GrGithub } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { PiLinkedinLogo } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "@/components/pageComponents/Contact/Contact";
import Widgets from "@/components/pageComponents/Widgets/Widgets";

export default function Home() {
  const [activeTab, setActiveTab] = useState<PageTab>("WORK");

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
    const TAB_TITLES: Record<PageTab, string> = {
      PROJECTS: "My Projects",
      WORK: "My Work",
      CONTACT: "Get in Touch",
      WIDGETS: "Just Some API Integrations",
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        >
          {TAB_TITLES[activeTab]}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="flex h-screen">
      <aside className="flex flex-1 bg-black backdrop-blur-md border-r border-slate-600 hover:border-slate-400 transition-colors duration-300 overflow-hidden">
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center pt-5">
            <div className="overflow-hidden rounded-sm h-20 w-20 lg:h-30 lg:w-30 border-1 border-slate-900 hover:border-slate-800 shadow-md">
              <img src="profile.png" alt="Profile Picture" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-white text-lg lg:text-3xl font-bold">
                Jhonatan Ferreira
              </h1>
              <p className="text-gray-500 text-sm lg:text-lg">
                Full Stack Developer
              </p>
            </div>
          </div>
          <div className="w-full px-2 mb-3 flex-1 place-items-center overflow-hidden z-10">
            <TechCarousel />
            <div className="flex flex-col w-full pt-4 text-[10px] lg:text-sm">
              <div className="space-y-1 font-medium text-gray-400">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-white/80">Brazil</span>
                </div>
                <div className="flex justify-between">
                  <span>Timezone:</span>
                  <span className="text-white/80">UTC-3</span>
                </div>
                <div className="flex justify-between">
                  <span>Languages:</span>
                  <span className="text-white/80">English / Portuguese</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="text-white/80">6 years full-stack</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grayscale size-5/6 relative h-15 bottom-0 border-t border-gray-400/90 lg:mb-6">
            <div className="flex justify-around pt-2">
              <div className="cursor-pointer p-2 rounded-lg bg-slate-950/80 transition duration-300 group hover:scale-110 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-slate-500/20">
                <GrGithub className="w-5 h-5 lg:w-10 lg:h-10 text-sky-400 group-hover:text-sky-300" />
              </div>
              <div className="cursor-pointer p-2 rounded-lg bg-slate-950/80 transition duration-300 group hover:scale-110 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-slate-500/20">
                <MdEmail className="w-5 h-5 lg:w-10 lg:h-10 text-sky-400 group-hover:text-sky-300" />
              </div>
              <div className="cursor-pointer p-2 rounded-lg bg-slate-950/80 transition duration-300 group hover:scale-110 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-slate-500/20">
                <PiLinkedinLogo className="w-5 h-5 lg:w-10 lg:h-10 text-sky-400 group-hover:text-sky-300" />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex flex-3">
        <section className="w-full">
          <div className="flex flex-col h-screen">
            <div className="flex flex-row py-5 px-8">
              <h2 className="text-white font-bold text-nowrap text-3xl">
                {renderSelectedTabTitle()}
              </h2>
              <SelectBar onChange={setActiveTab} />
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-1 px-8 gray-scroll mb-4">
              {renderSelectedTabContent()}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
