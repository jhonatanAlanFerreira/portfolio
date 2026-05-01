import { containerVariants, cardVariants } from "@/types/CardEffectVariants";
import { motion } from "framer-motion";
import React from "react";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import TimezoneWidget from "./TimezoneWidget/TimezoneWidget";

export default function Widgets() {
  const widgets = [<WeatherWidget />, <TimezoneWidget />];

  return (
    <div className="flex w-full min-w-[50rem] flex-col pt-10 pb-3">
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
            className="h-auto w-full rounded-lg border border-[var(--border-subtle)] bg-[rgba(11,22,35,0.6)] p-4 transition-colors duration-300 hover:border-[var(--accent)]/40"
          >
            {React.cloneElement(widget)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
