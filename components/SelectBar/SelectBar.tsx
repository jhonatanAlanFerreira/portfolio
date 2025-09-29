"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageTab } from "@/types/PageTypes";
import SelectBarProps from "./SelectBarProps";

export default function SelectBar({ onChange }: SelectBarProps) {
  const [active, setActive] = useState<PageTab>("WORK");
  const tabs: PageTab[] = ["WORK", "PROJECTS", "CONTACT", "WIDGETS"];

  const onClick = (tab: PageTab) => {
    setActive(tab);
    onChange(tab);
  };

  return (
    <div className="flex w-full items-center justify-end">
      <div className="flex space-x-2 rounded-full border border-slate-600/60 bg-black/80 px-2 pt-1 pb-1.5 backdrop-blur-md transition-colors duration-300 hover:border-slate-400/50 xl:gap-5 xl:px-4 xl:pt-2 xl:pb-2.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onClick(tab)}
            className={`relative cursor-pointer rounded-xl bg-slate-800/10 px-2 py-1 text-[5px] font-semibold tracking-wider transition-all duration-300 xl:px-5 xl:py-2 xl:text-xs ${
              active === tab
                ? "bg-gradient-to-b from-gray-800/50 to-black text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                : "text-gray-400 hover:bg-slate-900/40 hover:text-white"
            }`}
          >
            {active === tab && (
              <motion.span
                layoutId="active-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute -top-2.5 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-white/70 shadow-[0_0_6px_white]"
              />
            )}
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
