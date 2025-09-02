import { motion } from "framer-motion";
import { MdLocationOn } from "react-icons/md";
import { WorkData } from "./WorkData";
import { cardVariants, containerVariants } from "@/types/CardEffectVariants";
import React from "react";

export default function Work() {
  return (
    <div className="flex flex-col w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col gap-6"
      >
        {WorkData.map((wd, index) => (
          <motion.div
            key={index}
            variants={cardVariants(index % 2 === 0)}
            className="w-full h-auto bg-black/80 border-l-2 border-slate-600"
          >
            <div className="flex h-full gap-5 p-4">
              <div className="flex flex-col space-y-5 flex-3 text-gray-400">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    {wd.role}
                  </h3>
                  <span className="text-sm text-gray-400">{wd.period}</span>
                </div>
                <p className="italic text-gray-400 mt-1 flex items-center gap-1">
                  <MdLocationOn className="text-gray-500" />
                  {wd.company}, {wd.location}
                </p>

                <ul className="list-disc list-inside text-gray-500 text-sm mt-2 space-y-1">
                  {wd.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>

                <div>
                  <h3 className="text-xl font-medium">Tech Stack</h3>
                  <div className="flex">
                    {wd.stack.map((tech, index) => (
                      <a
                        key={index}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={tech.name}
                        className="cursor-pointer grayscale hover:scale-110 hover:grayscale-0"
                      >
                        <div className="flex items-center justify-center w-10 h-10">
                          {React.cloneElement(tech.icon, { size: 25 })}
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
