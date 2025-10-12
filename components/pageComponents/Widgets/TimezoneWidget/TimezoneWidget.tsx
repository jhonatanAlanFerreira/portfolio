import { useEffect, useState } from "react";
import { InputSelect } from "@/components/InputSelect/InputSelect";
import { useDebouncedCallback } from "@/clientUtils";
import { SelectedTimezone, TimezoneOption } from "./TimezoneWidgetInterfaces";
import { DateTime } from "luxon";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import "react-clock/dist/Clock.css";
import { v4 as uuidv4 } from "uuid";
import TimezoneCard from "./TimezoneCard/TimezoneCard";

export default function TimezoneWidget() {
  const comparisonText = "Drag to compare with another timezone";

  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(DateTime.now());
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

    compareInitialTimezones(clientTimezone);

    setSelectedTimezones((prev) => {
      const exists = prev.some((tz) => tz.value === clientZone);
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

  const compareInitialTimezones = (clientTimezone: SelectedTimezone) => {
    const firstTimeZone = selectedTimezones[0];

    if (firstTimeZone.value != clientTimezone.value) {
      clientTimezone.comparisonText = getTimezoneComparisonText(
        clientTimezone,
        firstTimeZone,
      );

      setSelectedTimezones((prev) => {
        const timezone = prev[0];
        timezone.comparisonText = getTimezoneComparisonText(
          timezone,
          clientTimezone,
        );
        return [timezone];
      });
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

  const getTimezoneComparisonText = (
    draggedTz: SelectedTimezone,
    targetTz: SelectedTimezone,
  ): string => {
    const now = DateTime.now();
    const draggedOffset = now.setZone(draggedTz.value).offset;
    const targetOffset = now.setZone(targetTz.value).offset;

    const diffMinutes = draggedOffset - targetOffset;
    const absHours = Math.floor(Math.abs(diffMinutes) / 60);
    const absMinutes = Math.abs(diffMinutes) % 60;

    if (diffMinutes > 0)
      return `${absHours}h ${absMinutes}m ahead of ${targetTz.name}`;
    if (diffMinutes < 0)
      return `${absHours}h ${absMinutes}m behind ${targetTz.name}`;
    return `Same time as ${targetTz.name}`;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      setSelectedTimezones((prev) =>
        prev.map((tz) => {
          if (tz.id === active.id) {
            const draggedTz = prev.find((t) => t.id === active.id);
            const targetTz = prev.find((t) => t.id === over.id);

            if (draggedTz && targetTz && draggedTz.id !== targetTz.id) {
              const comparisonText = getTimezoneComparisonText(
                draggedTz,
                targetTz,
              );
              return { ...tz, comparisonText };
            }
          }
          return tz;
        }),
      );
    }
  };

  const onRemove = (id: UniqueIdentifier) => {
    setSelectedTimezones((prev) => prev.filter((tz) => tz.id !== id));
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
                <TimezoneCard
                  hasMoreThanOneCard={selectedTimezones.length > 1}
                  key={tz.id}
                  timezone={tz}
                  currentTime={now}
                  onRemove={onRemove}
                />
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
