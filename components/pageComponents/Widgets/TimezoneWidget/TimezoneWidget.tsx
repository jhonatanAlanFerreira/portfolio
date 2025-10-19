import { useEffect, useState } from "react";
import { InputSelect } from "@/components/InputSelect/InputSelect";
import { useDebouncedCallback } from "@/clientUtils";
import { SelectedTimezone, TimezoneOption } from "./TimezoneWidgetInterfaces";
import { DateTime } from "luxon";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import "react-clock/dist/Clock.css";
import { v4 as uuidv4 } from "uuid";
import TimezoneCard from "./TimezoneCard/TimezoneCard";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowsLeftRight } from "react-icons/fa6";
import HoursRangeSelect from "./HoursRangeSelect/HoursRangeSelect";

export default function TimezoneWidget() {
  const comparisonText = "Drag to compare with another timezone";

  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(DateTime.now());
  const [rangeModal, setRangeModal] = useState(false);
  const [selectedRangeDuration, setSelectedRangeDuration] = useState<
    null | string
  >(null);
  const [timezoneLocalStorageEmptyData, setTimezoneLocalStorageEmptyData] =
    useState(false);
  const [selectedTimezones, setSelectedTimezones] = useState<
    SelectedTimezone[]
  >(() => {
    const savedTimezones = localStorage.getItem("timezoneData");
    if (savedTimezones) {
      return JSON.parse(savedTimezones);
    }

    setTimezoneLocalStorageEmptyData(true);
    return [
      {
        id: uuidv4(),
        label: "America/Sao_Paulo (GMT-3)",
        name: "America/Sao_Paulo (GMT-3)",
        value: "America/Sao_Paulo",
        comparisonText,
      },
    ];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(DateTime.now());
    }, 1000);

    if (timezoneLocalStorageEmptyData) {
      const clientTimezone = createInitialClientTimezone();
      compareInitialTimezones(clientTimezone);
      setSelectedTimezones((prev) => {
        const exists = prev.some((tz) => tz.value === clientTimezone.value);
        return exists ? prev : [...prev, clientTimezone];
      });
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("timezoneData", JSON.stringify(selectedTimezones));
  }, [selectedTimezones]);

  const createInitialClientTimezone = () => {
    const clientZone = DateTime.local().zoneName;
    const offset = DateTime.local().toFormat("ZZZZ");

    const clientTimezone: SelectedTimezone = {
      id: uuidv4(),
      label: `${clientZone} (${offset})`,
      name: `${clientZone} (${offset})`,
      value: clientZone,
      comparisonText,
    };

    return clientTimezone;
  };

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

  const hasMoreThanOneCard = () => {
    return selectedTimezones.length > 1;
  };

  const showComparisonText = (timezone: SelectedTimezone) => {
    return hasMoreThanOneCard() || timezone.comparisonText !== comparisonText;
  };

  return (
    <>
      <div className="mb-4 pr-5">
        <h2 className="text-lg font-semibold tracking-wide text-gray-200 uppercase">
          Timezone Integration
        </h2>

        {hasMoreThanOneCard() && (
          <div className="flex justify-end">
            <button
              onClick={() => setRangeModal(true)}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-1 text-gray-200 transition-all duration-200 hover:border-blue-500 hover:text-blue-400"
            >
              <FaArrowsLeftRight className="h-4 w-4" />
              <span>Compare Time Ranges</span>
            </button>
          </div>
        )}
      </div>

      <div className={`px-5 pb-5 ${hasMoreThanOneCard() ? "" : "pt-5"}`}>
        <div className="w-full overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-3 text-white shadow-lg">
          <div className="mt-2 grid grid-cols-1 gap-4">
            <DndContext onDragEnd={handleDragEnd}>
              <AnimatePresence>
                {selectedTimezones.map((tz) => (
                  <motion.div
                    key={tz.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <TimezoneCard
                      showComparisonText={showComparisonText(tz)}
                      timezone={tz}
                      currentTime={now}
                      onRemove={onRemove}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
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

      <AnimatePresence>
        {rangeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center"
          >
            <motion.div
              className="relative m-1 flex h-full w-full justify-between rounded-lg border border-slate-600/60 bg-black/99 shadow-xl transition-colors duration-300 hover:border-slate-400/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex w-full flex-col px-5 py-3">
                <div className="flex justify-between align-middle">
                  <h2 className="mb-4 text-2xl font-semibold tracking-wide text-gray-200">
                    Compare Time Ranges
                  </h2>
                  <button
                    onClick={() => setRangeModal(false)}
                    className="mr-3 cursor-pointer text-4xl text-gray-200 hover:scale-110 hover:text-gray-400"
                  >
                    &times;
                  </button>
                </div>
                <div className="gray-scroll flex flex-col overflow-auto pt-10">
                  <div className="flex w-full justify-center">
                    <p className="text-white">{selectedRangeDuration}</p>
                  </div>
                  <div className="flex w-full">
                    <HoursRangeSelect
                      currentTime={now}
                      timezones={selectedTimezones}
                      updateSelectedRangeDuration={setSelectedRangeDuration}
                    ></HoursRangeSelect>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
