import TechCarousel from "@/components/TechCarousel/TechCarousel";
import { GrGithub } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { PiLinkedinLogo } from "react-icons/pi";

export default function Home() {
  return (
    <div className="flex h-screen">
      <aside className="flex flex-1 bg-black backdrop-blur-md border-r border-slate-600 hover:border-slate-400 transition-colors duration-300 overflow-hidden">
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center pt-5">
            <div className="overflow-hidden rounded-full h-30 w-30 border-2 border-white shadow-md">
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
            <TechCarousel></TechCarousel>
            <div className="flex flex-col w-full pt-4 text-sm">
              <div className="space-y-1 font-medium text-gray-400">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-white/80">Brazil</span>
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
          <div className="grayscale size-5/6 absolute h-15 bottom-0 border-t border-slate-800/50">
            <div className="flex justify-around pt-2">
              <div className="p-2 rounded-lg bg-slate-950/80 transition group">
                <GrGithub size={25} className="text-sky-400" />
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80 transition group">
                <MdEmail size={25} className="text-sky-400" />
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80 transition group">
                <PiLinkedinLogo size={25} className="text-sky-400" />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex flex-3">
        <section></section>
      </main>
    </div>
  );
}
