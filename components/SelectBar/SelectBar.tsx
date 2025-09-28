"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageTab } from "@/types/PageTypes";

export default function SelectBar({
  onChange,
}: {
  onChange: (tab: PageTab) => void;
}) {
  const [active, setActive] = useState<PageTab>("WORK");
  const tabs: PageTab[] = ["WORK", "PROJECTS", "CONTACT", "WIDGETS"];

  const onClick = (tab: PageTab) => {
    setActive(tab);
    onChange(tab);
  };

  return (
    <div className="flex justify-end items-center w-full">
      <div className="flex bg-black/80 xl:gap-5 border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 rounded-full px-2 xl:px-4 pt-1 xl:pt-2 pb-1.5 xl:pb-2.5 space-x-2 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onClick(tab)}
            className={`bg-slate-800/10 relative cursor-pointer px-2 py-1 xl:px-5 xl:py-2 rounded-xl text-[5px] xl:text-xs font-semibold tracking-wider transition-all duration-300
              ${
                active === tab
                  ? "bg-gradient-to-b from-gray-800/50 to-black text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  : "text-gray-400 hover:text-white hover:bg-slate-900/40"
              }`}
          >
            {active === tab && (
              <motion.span
                layoutId="active-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white/70 rounded-full shadow-[0_0_6px_white]"
              />
            )}
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
