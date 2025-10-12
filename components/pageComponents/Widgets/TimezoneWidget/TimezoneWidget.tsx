import { useEffect, useState } from "react";
import { InputSelect } from "@/components/InputSelect/InputSelect";
import { useDebouncedCallback } from "@/clientUtils";
import { SelectedTimezone, TimezoneOption } from "./TimezoneWidgetInterfaces";
import { DateTime } from "luxon";
import Clock from "react-clock";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import "react-clock/dist/Clock.css";
import { v4 as uuidv4 } from "uuid";

export default function TimezoneWidget() {
  const comparisonText = "Drag to compare with another timezone";

  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(DateTime.now());
  const [sameTimezone, setSameTimezone] = useState(false);
  const [selectedTimezones, setSelectedTimezones] = useState<
    SelectedTimezone[]
  >([
    {
      id: uuidv4(),
      label: "America/Sao_Paulo (GMT-3)",
      name: "America/Sao_Paulo (GMT-3)",
      value: "America/Sao_Paulo",
      comparisonText,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(DateTime.now());
    }, 1000);

    const clientZone = DateTime.local().zoneName;
    const offset = DateTime.local().toFormat("ZZZZ");

    const clientTimezone: SelectedTimezone = {
      id: uuidv4(),
      label: `${clientZone} (${offset})`,
      name: `${clientZone} (${offset})`,
      value: clientZone,
      comparisonText,
    };

    setSelectedTimezones((prev) => {
      const exists = prev.some((tz) => tz.value === clientZone);
      setSameTimezone(exists);
      return exists ? prev : [...prev, clientTimezone];
    });

    return () => clearInterval(interval);
  }, []);

  const fetchTimezones = async (search: string) => {
    if (!search) return setLoading(false);
    setLoading(true);
    try {
      const res = await fetch(`/api/timezone?query=${search}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Timezone API error");
      const data: TimezoneOption[] = await res.json();
      setTimezones(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onTimezoneInputChange = (value: string) => {
    setLoading(true);
    onTimezoneInputChangeDebounced(value);
  };

  const onTimezoneInputChangeDebounced = useDebouncedCallback(
    async (value: string) => fetchTimezones(value),
    1000,
  );

  const resetTimezoneSelect = () => {
    setLoading(false);
    setTimezones([]);
  };

  const onTimezoneSelectedChange = (timezone: TimezoneOption) => {
    resetTimezoneSelect();
    setSelectedTimezones([
      ...selectedTimezones,
      { ...timezone, id: uuidv4(), comparisonText },
    ]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      setSelectedTimezones((prev) => {
        return prev.map((tz) => {
          if (tz.id === active.id) {
            const draggedTz = prev.find((t) => t.id === active.id);
            const targetTz = prev.find((t) => t.id === over.id);

            if (draggedTz && targetTz) {
              const now = DateTime.now();
              const draggedOffset = now.setZone(draggedTz.value).offset;
              const targetOffset = now.setZone(targetTz.value).offset;

              const diffMinutes = draggedOffset - targetOffset;
              const absHours = Math.floor(Math.abs(diffMinutes) / 60);
              const absMinutes = Math.abs(diffMinutes) % 60;

              let comparisonText = "";
              if (diffMinutes > 0) {
                comparisonText = `${absHours}h ${absMinutes}m ahead of ${targetTz.name}`;
              } else if (diffMinutes < 0) {
                comparisonText = `${absHours}h ${absMinutes}m behind ${targetTz.name}`;
              } else {
                comparisonText = `Same time as ${targetTz.name}`;
              }

              return { ...tz, comparisonText };
            }
          }
          return tz;
        });
      });
    }
  };

  const TimezoneCard = ({ timezone }: { timezone: SelectedTimezone }) => {
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

    const localTime = now.setZone(timezone.value);

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
        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
          <div className="flex items-center justify-center">
            <Clock
              value={localTime.toFormat("HH:mm:ss")}
              renderNumbers
              className="drop-shadow-lg"
            />
          </div>

          <div className="mt-4 md:mt-0">
            <h2 className="text-base font-semibold text-gray-100">
              {timezone.name}
            </h2>
            <p className="text-2xl font-bold text-blue-400">
              {localTime.toFormat("HH:mm:ss")}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {selectedTimezones.length > 1 && timezone.comparisonText}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-wide text-gray-200 uppercase">
          Timezone Integration
        </h2>
      </div>

      <div className="p-5">
        <div className="w-full overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-3 text-white shadow-lg">
          <div className="mt-2 grid grid-cols-1 gap-4">
            <DndContext onDragEnd={handleDragEnd}>
              {selectedTimezones.map((tz) => (
                <TimezoneCard key={tz.id} timezone={tz} />
              ))}
            </DndContext>
          </div>

          <div className="mt-4">
            <InputSelect
              placeholder="Add New Timezone"
              noOptionsCustomMessage={{
                empty: "No matching timezones found",
                beforeTyping: "Type to search for a timezone",
              }}
              options={timezones}
              onInputChange={onTimezoneInputChange}
              isLoading={loading}
              filterOption={null}
              onChange={(timezone) =>
                onTimezoneSelectedChange(timezone as TimezoneOption)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
