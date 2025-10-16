import { useState } from "react";
import { DraggableData, Rnd } from "react-rnd";
import HoursRangeSelectProps from "./HoursRangeSelectProps";

export default function HoursRangeSelect({ timezones }: HoursRangeSelectProps) {
  const hours = Array.from({ length: 24 }, (_, i) => ++i);
  const boxWidth = 80;
  const boxHeight = 80;
  const maxWidth = boxWidth * hours.length;

  const [range, setRange] = useState({
    x: boxWidth * 2,
    width: boxWidth * 3,
  });

  const handleDragStop = (_e: any, data: DraggableData) => {
    let snappedX = Math.round(data.x / boxWidth) * boxWidth;

    if (snappedX + range.width > maxWidth) {
      snappedX = maxWidth - range.width;
    }

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
    let snappedX = Math.round(position.x / boxWidth) * boxWidth;
    let snappedWidth =
      Math.round(parseInt(ref.style.width) / boxWidth) * boxWidth;

    if (snappedX + snappedWidth > maxWidth) {
      snappedWidth = maxWidth - snappedX;
    }

    setRange({
      x: snappedX,
      width: snappedWidth,
    });
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
      <div className="gray-scroll overflow-auto">
        {timezones.map((tz, index) => (
          <div key={index} className="flex text-2xl text-white">
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex h-20 w-20 items-center justify-center border border-gray-700"
              >
                {hour}
              </div>
            ))}
          </div>
        ))}

        <Rnd
          bounds="parent"
          size={{ width: range.width, height: boxHeight * timezones.length }}
          maxWidth={maxWidth}
          minWidth={boxWidth}
          position={{ x: range.x, y: 0 }}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          enableResizing={{ left: true, right: true }}
          dragAxis="x"
          style={{
            border: "2px solid #22c55e",
            borderRadius: "8px",
            backgroundColor: "rgba(34,197,94,0.1)",
          }}
        />
      </div>
    </div>
  );
}
