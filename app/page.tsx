"use client";
import Projects from "@/components/pageComponents/Projects";
import Work from "@/components/pageComponents/Work";
import SelectBar from "@/components/SelectBar/SelectBar";
import TechCarousel from "@/components/TechCarousel/TechCarousel";
import { PageSections, SectionFragments } from "@/types/PageTypes";
import { useEffect, useRef, useState } from "react";
import { GrGithub } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { PiLinkedinLogo } from "react-icons/pi";

export default function Home() {
  const [activeTab, setActiveTab] = useState<PageSections>("PROJECTS");

  const projectsRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  const sectionFragments: SectionFragments = {
    PROJECTS: projectsRef,
    WORK: workRef,
    CONTACT: contactRef,
    WIDGETS: widgetRef,
  };

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToFragment = (fragmentName: PageSections) => {
    setActiveTab(fragmentName);

    sectionFragments[fragmentName].current?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  };

  const attachScrollTopListener = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      console.log(container.scrollTop);
      if (container.scrollTop === 0) {
        setActiveTab("PROJECTS");
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  };

  const initSectionObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section") as PageSections;
          if (entry.isIntersecting) {
            setActiveTab(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.entries(sectionFragments).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.setAttribute("data-section", key);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  };

  useEffect(() => {
    const cleanupObserver = initSectionObserver();
    const cleanupScroll = attachScrollTopListener();

    return () => {
      cleanupObserver?.();
      cleanupScroll?.();
    };
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="flex flex-1 bg-black backdrop-blur-md border-r border-slate-600 hover:border-slate-400 transition-colors duration-300 overflow-hidden">
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center pt-5">
            <div className="overflow-hidden rounded-sm h-30 w-30 border-1 border-slate-900 hover:border-slate-800 shadow-md">
              <img src="profile.png" alt="Profile Picture" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-white text-3xl font-bold">
                Jhonatan Ferreira
              </h1>
              <p className="text-gray-500">Full Stack Developer</p>
            </div>
          </div>
          <div className="w-full px-2 mb-3 flex-1 place-items-center overflow-hidden z-10">
            <TechCarousel />
            <div className="flex flex-col w-full pt-4 text-sm">
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
          <div className="grayscale size-5/6 relative h-15 bottom-0 border-t border-gray-400/90">
            <div className="flex justify-around pt-2">
              <div className="cursor-pointer p-2 rounded-lg bg-slate-950/80 transition duration-300 group hover:scale-110 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-slate-500/20">
                <GrGithub
                  size={25}
                  className="text-sky-400 group-hover:text-sky-300"
                />
              </div>
              <div className="cursor-pointer p-2 rounded-lg bg-slate-950/80 transition duration-300 group hover:scale-110 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-slate-500/20">
                <MdEmail
                  size={25}
                  className="text-sky-400 group-hover:text-sky-300"
                />
              </div>
              <div className="cursor-pointer p-2 rounded-lg bg-slate-950/80 transition duration-300 group hover:scale-110 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-slate-500/20">
                <PiLinkedinLogo
                  size={25}
                  className="text-sky-400 group-hover:text-sky-300"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex flex-3">
        <section className="w-full">
          <div className="flex flex-col h-screen">
            <div className="flex py-5 px-8">
              <SelectBar active={activeTab} onChange={scrollToFragment} />
            </div>
            <div
              ref={scrollContainerRef}
              className="overflow-auto flex flex-col flex-1 px-8 gray-scroll mb-4"
            >
              <div ref={projectsRef}>
                <Projects />
              </div>
              <div ref={workRef}>
                <Work />
              </div>
              <div ref={contactRef}>
                <div className="h-screen flex items-center justify-center text-white">
                  Contact Section
                </div>
              </div>
              <div ref={widgetRef}>
                <div className="h-screen flex items-center justify-center text-white">
                  Widgets Section
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
