import { useDraggable, useDroppable } from "@dnd-kit/core";
import { TimezoneCardProps } from "./TimezoneCardProps";
import Clock from "react-clock";

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
  } = useDraggable({
    id: timezone.id,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: timezone.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    border: isOver ? "2px solid #38bdf8" : undefined,
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
      className="flex h-50 flex-col justify-between gap-4 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black/10 p-5 md:flex-row md:items-center"
    >
      <div className="flex h-full w-full flex-col md:flex-row md:items-center md:gap-6">
        <div className="flex items-center justify-center">
          <Clock
            value={localTime.toFormat("HH:mm:ss")}
            renderNumbers
            className="drop-shadow-lg"
          />
        </div>

        <div className="mt-4 flex h-full w-full justify-between md:mt-0">
          <div
            className={`flex flex-col ${showSelectedRangeText ? "justify-between" : "justify-center"}`}
          >
            <div>
              <h2 className="text-base font-semibold text-gray-100">
                {timezone.name}
              </h2>
              <p className="text-2xl font-bold text-blue-400">
                {localTime.toFormat("h:mm:s a").toLowerCase()}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {showComparisonText && timezone.comparisonText}
              </p>
            </div>
            {showSelectedRangeText && (
              <p className="mt-1 text-sm text-gray-500">
                <b>Selected Time Range: </b>
                {timezone.selectedTimezoneDuration}
              </p>
            )}
          </div>
          <div className="flex h-full">
            <span
              onClick={() => onRemove(timezone.id)}
              onPointerDown={(e) => e.stopPropagation()}
              className="relative -top-2 h-fit cursor-pointer text-gray-300"
            >
              <span className="text-xl">&times;</span> Remove
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
