import { motion } from "framer-motion";
import { MdLocationOn } from "react-icons/md";
import { cardVariants, containerVariants } from "@/types/CardEffectVariants";
import React from "react";
import { WorkData } from "./WorkData";

export default function Work() {
  return (
    <div className="flex w-full flex-col pb-3">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col gap-6 pb-10 sm:pb-0"
      >
        {WorkData.map((wd, index) => (
          <motion.div
            key={index}
            variants={cardVariants(index % 2 === 0)}
            className="h-auto w-full rounded-sm border border-slate-600/60 bg-black/80 transition-colors duration-300 hover:border-slate-400/50"
          >
            <div className="flex h-full gap-5 p-4">
              <div className="flex flex-3 flex-col space-y-5 text-gray-400">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold text-gray-400 lg:text-xl">
                    {wd.role}
                  </h3>
                  <span className="text-sm text-gray-400 lg:text-lg">
                    {wd.period}
                  </span>
                </div>

                <div className="flex flex-col gap-0 text-sm text-gray-400 lg:text-lg">
                  <span className="flex items-center gap-1">
                    <MdLocationOn className="text-gray-500" />
                    <span className="text-white">{wd.company}</span> |{" "}
                    {wd.location}
                  </span>
                  <span className="pl-5">
                    <span>Language:</span> {wd.language}
                  </span>
                </div>

                <ul className="list-inside list-disc space-y-1 text-[10px] text-gray-500 lg:mt-2 lg:text-lg">
                  {wd.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 lg:text-lg">
                    Stack
                  </h3>
                  <div className="flex flex-wrap">
                    {wd.stack.map((tech, index) => (
                      <a
                        key={index}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={tech.name}
                        className="cursor-pointer grayscale hover:scale-110 hover:grayscale-0"
                      >
                        <div className="flex h-7 w-8 items-center justify-center lg:h-10 lg:w-15">
                          {React.cloneElement(tech.icon, {
                            className: `${tech.icon.props.className} w-5 h-5 lg:w-8 lg:h-8`,
                          })}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
