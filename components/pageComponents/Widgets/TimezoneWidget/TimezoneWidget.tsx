import { useState } from "react";
import { DraggableData, Rnd } from "react-rnd";

export default function TimezoneWidget() {
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const boxWidth = 80;
  const maxWidth = boxWidth * hours.length;

  const [range, setRange] = useState({
    x: boxWidth * 2,
    width: boxWidth * 3,
  });

  const timezonesMock = [
    {
      city: "São José do Rio Preto",
      country: "Brazil",
      timezone: "America/Sao_Paulo",
      currentTime: "2025-10-08T23:17:00-03:00",
      selectedTimeRange: "22:00 - 02:30",
      compareWith: {
        timezone: "America/New_York",
        offset: "+01:00",
      },
    },
  ];

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
    <div className="gray-scroll overflow-auto pb-2">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-wide text-gray-200 uppercase">
          Timezone Integration
        </h2>
      </div>

      <div className="relative mt-10 w-fit">
        <div className="flex text-2xl text-white">
          {hours.map((h) => (
            <div
              key={h}
              className="flex h-20 w-20 items-center justify-center border border-gray-700"
            >
              {h}
            </div>
          ))}
        </div>

        <div className="flex text-2xl text-white">
          {hours.map((h) => (
            <div
              key={h}
              className="flex h-20 w-20 items-center justify-center border border-gray-700"
            >
              {h}
            </div>
          ))}
        </div>

        <Rnd
          bounds="parent"
          size={{ width: range.width, height: 160 }}
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

        <div className="mt-4 text-white">
          <p>
            Start hour: <strong>{Math.round(range.x / boxWidth) + 1}</strong>
          </p>
          <p>
            End hour:{" "}
            <strong>{Math.round((range.x + range.width) / boxWidth)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
