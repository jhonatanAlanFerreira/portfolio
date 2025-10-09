import { useState } from "react";
import { Rnd } from "react-rnd";

export default function TimezoneWidget() {
  const boxWidth = 80;
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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

  const handleDragStop = (e: any, d: any) => {
    const snappedX = Math.round(d.x / boxWidth) * boxWidth;
    setRange((prev) => ({ ...prev, x: snappedX }));
  };

  const handleResizeStop = (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any,
  ) => {
    const snappedWidth =
      Math.round(parseInt(ref.style.width) / boxWidth) * boxWidth;
    const snappedX = Math.round(position.x / boxWidth) * boxWidth;
    setRange({ x: snappedX, width: snappedWidth });
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
          maxWidth={boxWidth * 12}
          minWidth={boxWidth / 2}
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
