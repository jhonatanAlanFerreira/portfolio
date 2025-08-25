"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SelectBar() {
  const [active, setActive] = useState("PROJECTS");

  const tabs = ["PROJECTS", "WORK", "CONTACT", "WIDGETS"];

  return (
    <div className="flex justify-end items-center w-full opacity-95">
      <div className="flex bg-black/80 border gap-5 border-slate-500/10 hover:border-slate-500/10 transition-colors duration-300 rounded-full px-4 pt-2 pb-2.5 space-x-2 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative cursor-pointer px-5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300
              ${
                active === tab
                  ? "bg-gradient-to-b from-slate-600/50 to-black/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  : "text-gray-400 hover:text-white hover:bg-slate-900/40"
              }`}
          >
            {active === tab && (
              <motion.span
                layoutId="active-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white/70 rounded-full shadow-[0_0_6px_white]"
              />
            )}
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
