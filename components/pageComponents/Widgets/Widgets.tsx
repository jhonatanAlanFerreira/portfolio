import { containerVariants, cardVariants } from "@/types/CardEffectVariants";
import { motion } from "framer-motion";
import React from "react";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import TimezoneWidget from "./TimezoneWidget/TimezoneWidget";

export default function Widgets() {
  const widgets = [<WeatherWidget />, <TimezoneWidget />];

  return (
    <div className="flex w-full flex-col pt-10 pb-3">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col gap-6 pb-10 sm:pb-0"
      >
        {widgets.map((widget, index) => (
          <motion.div
            key={index}
            variants={cardVariants(index % 2 === 0)}
            className="h-auto w-full rounded-sm border border-slate-600/60 bg-black/80 p-4 transition-colors duration-300 hover:border-slate-400/50"
          >
            {React.cloneElement(widget)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
