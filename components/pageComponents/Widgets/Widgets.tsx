import WeatherWidget from "@/components/WeatherWidget/WeatherWidget";
import { containerVariants, cardVariants } from "@/types/CardEffectVariants";
import { motion } from "framer-motion";

export default function Widgets() {
  return (
    <div className="flex w-full flex-col pt-10 pb-3">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col gap-6 pb-10 sm:pb-0"
      >
        <motion.div
          variants={cardVariants(true)}
          className="h-auto w-full rounded-sm border border-slate-600/60 bg-black/80 p-4 transition-colors duration-300 hover:border-slate-400/50"
        >
          <WeatherWidget></WeatherWidget>
        </motion.div>
      </motion.div>
    </div>
  );
}
