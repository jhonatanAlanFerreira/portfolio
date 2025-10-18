import { useEffect, useState } from "react";
import { DraggableData, Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import HoursRangeSelectProps from "./HoursRangeSelectProps";

export default function HoursRangeSelect({ timezones }: HoursRangeSelectProps) {
  const boxWidth = 80;
  const boxHeight = 80;
  const snapStep = boxWidth / 2;
  const maxWidth = boxWidth * 24;

  const [range, setRange] = useState({
    x: 0,
    width: boxWidth * 3,
  });
  const [layoutReady, setLayoutReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [forceRemount, setForceRemount] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLayoutReady(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleDragStop = (_e: any, data: DraggableData) => {
    let snappedX = Math.round(data.x / snapStep) * snapStep;
    if (snappedX + range.width > maxWidth) snappedX = maxWidth - range.width;
    if (snappedX < 0) snappedX = 0;
    setRange((prev) => ({ ...prev, x: snappedX }));
  };

  const handleResizeStop = (
    _e: MouseEvent | TouchEvent,
    _direction: string,
    ref: HTMLElement,
    _delta: { width: number; height: number },
    position: { x: number; y: number },
  ) => {
    let snappedX = Math.round(position.x / snapStep) * snapStep;
    let snappedWidth =
      Math.round(parseInt(ref.style.width) / snapStep) * snapStep;
    if (snappedX + snappedWidth > maxWidth) snappedWidth = maxWidth - snappedX;

    setRange({ x: snappedX, width: snappedWidth });
    setForceRemount((prev) => !prev);
  };

  const getHoursForTimezone = (tz: string) => {
    const hours: string[] = [];
    for (let h = 0; h < 24; h++) {
      const dt = DateTime.utc().startOf("day").plus({ hours: h }).setZone(tz);
      hours.push(dt.toFormat("h a").toLowerCase());
    }
    return hours;
  };
  return (
    <div className="flex w-full gap-3 overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-3 py-3 text-white shadow-lg">
      <div>
        <ul className="text-nowrap">
          {timezones.map((tz, index) => (
            <li
              key={index}
              className="flex h-20 place-content-end items-center"
            >
              {tz.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="gray-scroll relative overflow-auto pb-4">
        <div
          id="hours-container"
          style={{ position: "relative", width: `${maxWidth}px` }}
        >
          {timezones.map((tz, index) => (
            <div key={index} className="flex text-2xl text-white">
              {getHoursForTimezone(tz.value).map((hourLabel, hourIndex) => {
                const [hour, meridiem] = hourLabel.split(" ");
                return (
                  <div
                    key={hourIndex}
                    className="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center border border-gray-700"
                  >
                    <span className="text-xl">{hour}</span>
                    <span className="text-sm lowercase">{meridiem}</span>
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
                  width: range.width,
                  height: boxHeight * timezones.length,
                }}
                maxWidth={maxWidth}
                minWidth={boxWidth}
                position={{ x: range.x, y: 0 }}
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
                  left: range.x,
                  width: range.width,
                  height: boxHeight * timezones.length,
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
