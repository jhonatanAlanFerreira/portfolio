import { useDraggable, useDroppable } from "@dnd-kit/core";
import { TimezoneCardProps } from "./TimezoneCardProps";
import Clock from "react-clock";
import { AnimatePresence, motion } from "framer-motion";

export default function TimezoneCard({
  timezone,
  currentTime,
  showComparisonText,
  showSelectedRangeText,
  onRemove,
}: TimezoneCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: timezone.id,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: timezone.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 999 : "auto",
    willChange: "transform",
    position: "relative" as const,
  };

  const localTime = currentTime.setZone(timezone.value);

  return (
    <div
      ref={(node) => {
        setDragRef(node);
        setDropRef(node);
      }}
      {...listeners}
      {...attributes}
      style={style}
      className={`flex h-50 cursor-grab items-center justify-between gap-4 rounded-xl border p-5 transition-colors duration-200 ${isOver ? "border-sky-400" : "border-[var(--border-subtle)]"} ${isDragging ? "shadow-none backdrop-blur-none" : "shadow-lg backdrop-blur-xl"} bg-[linear-gradient(135deg,rgba(11,22,35,0.75),rgba(15,27,46,0.65),rgba(2,218,222,0.08))]`}
    >
      <div className="flex h-full w-full items-center gap-6">
        <div className="pointer-events-none flex items-center justify-center">
          <Clock
            value={localTime.toFormat("HH:mm:ss")}
            renderNumbers
            className="drop-shadow-lg"
          />
        </div>

        <div className="mt-4 flex h-full w-full justify-between md:mt-0">
          <div
            className={`flex flex-col ${
              showSelectedRangeText ? "justify-between" : "justify-center"
            }`}
          >
            <div>
              <h2 className="text-base font-semibold text-gray-100">
                {timezone.name}
              </h2>

              <p className="text-2xl font-bold text-sky-400">
                {localTime.toFormat("h:mm:ss a").toLowerCase()}
              </p>

              <p className="mt-1 text-sm text-gray-400">
                {showComparisonText && timezone.comparisonText}
              </p>
            </div>

            <AnimatePresence>
              {showSelectedRangeText && (
                <motion.p
                  key="selected-range-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="mt-1 text-sm text-gray-400"
                >
                  <b>Selected Time Range: </b>
                  {timezone.selectedTimezoneDuration}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex h-full">
            <span
              onClick={() => onRemove(timezone.id)}
              onPointerDown={(e) => e.stopPropagation()}
              className="relative -top-2 cursor-pointer text-gray-300 transition hover:text-red-400"
            >
              <span className="text-xl">&times;</span> Remove Card
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
