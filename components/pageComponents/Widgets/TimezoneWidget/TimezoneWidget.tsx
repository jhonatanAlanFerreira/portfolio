import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function TimezoneWidget() {
  const [timezoneModal, setTimezoneModal] = useState(false);

  return (
    <>
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-wide text-gray-200 uppercase">
          Timezone Integration
        </h2>
      </div>

      <div className="p-5">
        <div className="w-full overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-5 text-white shadow-lg">
          <button
            onClick={() => setTimezoneModal(true)}
            className="flex cursor-pointer rounded-md bg-slate-950/80 p-3 text-white transition duration-300 hover:bg-slate-950/70 hover:shadow-sm hover:shadow-slate-500/20"
          >
            <PlusIcon /> Timezone
          </button>
        </div>
      </div>

      <AnimatePresence>
        {timezoneModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              className="relative flex h-3/4 w-3/4 justify-between rounded-lg border border-slate-600/60 bg-black p-2 shadow-xl transition-colors duration-300 hover:border-slate-400/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div>
                <h1 className="text-white">WIP</h1>
              </div>
              <div>
                <button
                  onClick={() => setTimezoneModal(false)}
                  className="mr-3 cursor-pointer text-4xl text-gray-200 hover:scale-110 hover:text-gray-400"
                >
                  &times;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
