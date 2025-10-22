import { useEffect, useRef, useState } from "react";
import { DraggableData, Rnd } from "react-rnd";
import { motion } from "framer-motion";
import HoursRangeSelectProps from "./HoursRangeSelectProps";
import {
  boxHeight,
  boxWidth,
  createTimezoneWidgetStore,
  hoursAmount,
  maxWidth,
  snapStep,
} from "../TimezoneWidgetStore";

export default function HoursRangeSelect({
  currentTime,
  updateSelectedRangeDuration,
}: HoursRangeSelectProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [layoutReady, setLayoutReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [forceRemount, setForceRemount] = useState(false);

  const { getSelectedRange, setSelectedRange, getSelectedTimezones } =
    createTimezoneWidgetStore();

  useEffect(() => {
    const selectedRangeFromLocalstorage = localStorage.getItem("selectedRange");
    if (selectedRangeFromLocalstorage) {
      setSelectedRange(JSON.parse(selectedRangeFromLocalstorage));
    }

    const timeout = setTimeout(() => setLayoutReady(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    formatDuration();
  }, [getSelectedRange()]);

  useEffect(() => {
    if (!layoutReady || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { x, width } = getSelectedRange();
    const scrollPosition = x - container.clientWidth / 2 + width / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [layoutReady]);

  const formatDuration = () => {
    const totalHours = getSelectedRange().width / boxWidth;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    if (hours === 0) {
      return updateSelectedRangeDuration(`${minutes} minutes`);
    }
    if (minutes === 0) {
      return updateSelectedRangeDuration(
        `${hours} hour${hours > 1 ? "s" : ""}`,
      );
    }
    return updateSelectedRangeDuration(`${hours}h ${minutes}m`);
  };

  const handleDragStop = (_e: any, data: DraggableData) => {
    let snappedX = Math.round(data.x / snapStep) * snapStep;
    if (snappedX + getSelectedRange().width > maxWidth)
      snappedX = maxWidth - getSelectedRange().width;
    if (snappedX < 0) snappedX = 0;

    setSelectedRange({ ...getSelectedRange(), x: snappedX });
  };

  const handleResizeStop = (
    _e: MouseEvent | TouchEvent,
    _direction: string,
    refEl: HTMLElement,
    _delta: { width: number; height: number },
    position: { x: number; y: number },
  ) => {
    let snappedX = Math.round(position.x / snapStep) * snapStep;
    let snappedWidth =
      Math.round(parseInt(refEl.style.width) / snapStep) * snapStep;
    if (snappedX + snappedWidth > maxWidth) snappedWidth = maxWidth - snappedX;

    setSelectedRange({ x: snappedX, width: snappedWidth });
    setForceRemount((prev) => !prev);
  };

  const getHoursForTimezone = (tz: string) => {
    const hours: string[] = [];
    for (let h = 0; h < hoursAmount; h++) {
      const dt = currentTime.startOf("day").plus({ hours: h }).setZone(tz);
      hours.push(dt.toFormat("h a").toLowerCase());
    }
    return hours;
  };

  const handleHourClick = (hourIndex: number) => {
    const snappedX = hourIndex * boxWidth;
    const currentRange = getSelectedRange();

    const newX =
      snappedX + currentRange.width > maxWidth
        ? maxWidth - currentRange.width
        : snappedX;

    setSelectedRange({ ...currentRange, x: newX });
  };

  return (
    <div className="flex w-full gap-3 overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-3 py-3 text-white shadow-lg">
      <div>
        <ul className="text-nowrap">
          {getSelectedTimezones().map((tz, index) => {
            const localTime = currentTime.setZone(tz.value);

            return (
              <li
                key={index}
                className="flex h-25 flex-col content-end justify-center border-b border-b-slate-500/10"
              >
                <span className="text-lg">{tz.name}</span>
                <span className="text-sm text-gray-500">
                  <b>Current Time:</b>{" "}
                  {localTime.toFormat("h:mm:s a").toLowerCase()}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        ref={scrollContainerRef}
        className="gray-scroll relative overflow-auto pb-10"
      >
        <div
          id="hours-container"
          style={{ position: "relative", width: `${maxWidth}px` }}
        >
          {getSelectedTimezones().map((tz, index) => (
            <div key={index} className="flex text-2xl text-white">
              {getHoursForTimezone(tz.value).map((hourLabel, hourIndex) => {
                const dt = currentTime
                  .startOf("day")
                  .plus({ hours: hourIndex })
                  .setZone(tz.value);

                const currentDay = currentTime.setZone(tz.value).day;
                const hourDay = dt.day;
                let dayStatusLabel = "";
                if (hourDay < currentDay) {
                  dayStatusLabel = "Past Day";
                } else if (hourDay > currentDay) {
                  dayStatusLabel = "Next Day";
                }

                const isNewDay = dt.hour === 0;

                return (
                  <div
                    key={hourIndex}
                    onClick={() => handleHourClick(hourIndex)}
                    className={`flex h-25 w-20 flex-shrink-0 cursor-pointer flex-col items-center border border-gray-700 select-none ${
                      isNewDay ? "border-l-2 border-cyan-400" : ""
                    }`}
                  >
                    <div className="flex flex-1 pt-1">
                      <span className="text-xs text-gray-400">
                        {dayStatusLabel}
                      </span>
                    </div>
                    <div className="flex flex-2">
                      <span className="text-xl lowercase">{hourLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {layoutReady &&
            (animationDone ? (
              <Rnd
                key={forceRemount.toString()}
                bounds="#hours-container"
                size={{
                  width: getSelectedRange().width,
                  height: boxHeight * getSelectedTimezones().length,
                }}
                maxWidth={maxWidth}
                minWidth={boxWidth}
                position={{ x: getSelectedRange().x, y: 0 }}
                onDragStop={handleDragStop}
                onResizeStop={handleResizeStop}
                enableResizing={{ left: true, right: true }}
                dragAxis="x"
                style={{
                  border: "2px solid rgba(56,189,248,1)",
                  borderRadius: 8,
                  backgroundColor: "rgba(56,189,248,0.08)",
                  boxShadow: "0 6px 24px rgba(56,189,248,0.06)",
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 15, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onAnimationComplete={() => setAnimationDone(true)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: getSelectedRange().x,
                  width: getSelectedRange().width,
                  height: boxHeight * getSelectedTimezones().length,
                  border: "2px solid rgba(56,189,248,1)",
                  borderRadius: 8,
                  backgroundColor: "rgba(56,189,248,0.08)",
                  boxShadow: "0 6px 24px rgba(56,189,248,0.06)",
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
