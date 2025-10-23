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
import { Ban, ChevronLeft, ChevronRight } from "lucide-react";
import {
  createTimezoneWidgetStore,
  comparisonText,
  calculateTimezoneDurations,
} from "./TimezoneWidgetStore";

export default function TimezoneWidget() {
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(DateTime.now());
  const [rangeModal, setRangeModal] = useState(false);
  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [timezonesForTable, setTimezonesForTable] = useState<
    SelectedTimezone[]
  >([]);
  const [selectedRangeDuration, setSelectedRangeDuration] = useState<
    null | string
  >(null);

  const {
    setSelectedTimezones,
    getSelectedTimezones,
    getSelectedRange,
    updateSelectedTimezoneDurations,
    resetSelectedRange,
  } = createTimezoneWidgetStore();

  const initialTimezone: SelectedTimezone = {
    id: uuidv4(),
    label: "America/Sao_Paulo (GMT-3)",
    name: "America/Sao_Paulo (GMT-3)",
    value: "America/Sao_Paulo",
    comparisonText,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(DateTime.now());
    }, 1000);

    getInitialTimezones();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedTimezones",
      JSON.stringify(getSelectedTimezones()),
    );
  }, [getSelectedTimezones()]);

  useEffect(() => {
    setTimezonesForTable(
      calculateTimezoneDurations(getSelectedRange(), getSelectedTimezones()),
    );
  }, [getSelectedRange()]);

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

  const getInitialTimezones = () => {
    const timezonesFromLocalStorage = localStorage.getItem("selectedTimezones");

    if (timezonesFromLocalStorage) {
      return setSelectedTimezones(JSON.parse(timezonesFromLocalStorage));
    }

    let initialTimezones = [initialTimezone];
    const initialClientTimezone = createInitialClientTimezone();
    if (initialClientTimezone.value != initialTimezone.value) {
      initialTimezones.push(initialClientTimezone);
    }

    setSelectedTimezones(initialTimezones);
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
      ...getSelectedTimezones(),
      { ...timezone, id: uuidv4(), comparisonText },
    ]);

    updateSelectedTimezoneDurations();
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
      setSelectedTimezones(
        getSelectedTimezones().map((tz) => {
          if (tz.id === active.id) {
            const draggedTz = getSelectedTimezones().find(
              (t) => t.id === active.id,
            );
            const targetTz = getSelectedTimezones().find(
              (t) => t.id === over.id,
            );

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
    setSelectedTimezones(getSelectedTimezones().filter((tz) => tz.id !== id));
  };

  const hasMoreThanOneCard = () => {
    return getSelectedTimezones().length > 1;
  };

  const showComparisonText = (timezone: SelectedTimezone) => {
    return hasMoreThanOneCard() || timezone.comparisonText !== comparisonText;
  };

  const saveRange = () => {
    localStorage.setItem("selectedRange", JSON.stringify(getSelectedRange()));
    updateSelectedTimezoneDurations();
    setRangeModal(false);
  };

  const clearRange = () => {
    resetSelectedRange();
    setRangeModal(false);
  };

  return (
    <>
      <div className="mb-4 pr-5">
        <h2 className="text-[13px] font-semibold tracking-wide text-gray-200 uppercase xl:text-lg">
          Timezone Integration
        </h2>

        {getSelectedTimezones().length && (
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

      <div
        className={`px-5 pb-5 ${getSelectedTimezones().length ? "" : "pt-5"}`}
      >
        <div className="w-full overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-3 text-white shadow-lg">
          <div className="mt-2 grid grid-cols-1 gap-4">
            <DndContext onDragEnd={handleDragEnd}>
              <AnimatePresence>
                {getSelectedTimezones().map((tz) => (
                  <motion.div
                    key={tz.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <TimezoneCard
                      showComparisonText={showComparisonText(tz)}
                      showSelectedRangeText={
                        !!getSelectedTimezones().length &&
                        !!getSelectedTimezones()[0].selectedTimezoneDuration
                      }
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
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-md"
          >
            <motion.div
              className="relative m-1 flex h-4/5 w-[98%] justify-between overflow-auto rounded-lg border border-slate-600/60 bg-black/99 shadow-xl transition-colors duration-300 hover:border-slate-400/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex w-full min-w-[50rem] flex-col px-5 py-3">
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

                <div className="gray-scroll flex h-full flex-col overflow-auto pt-10">
                  <div className="mb-2 flex w-full items-center justify-center">
                    <div className="relative flex w-40 items-center justify-center">
                      <div className="absolute top-1/2 left-0 h-px w-full bg-gray-400" />
                      <ChevronLeft className="absolute left-0 h-3 w-3 -translate-x-2 text-gray-400" />
                      <ChevronRight className="absolute right-0 h-3 w-3 translate-x-2 text-gray-400" />
                      <span className="relative z-10 bg-black/99 px-2 text-sm text-gray-300">
                        {selectedRangeDuration}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-full w-full flex-col justify-between">
                    <div className="flex flex-col gap-5">
                      <HoursRangeSelect
                        currentTime={now}
                        updateSelectedRangeDuration={setSelectedRangeDuration}
                      />

                      <div className="flex justify-start pr-5 xl:pr-0">
                        <div className="w-full rounded-lg border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black shadow-inner xl:w-1/2">
                          <table className="w-full border-collapse text-left text-sm text-gray-300">
                            <thead className="bg-gray-900/60 text-cyan-400">
                              <tr>
                                <th className="px-4 py-2 font-semibold">
                                  Timezone
                                </th>
                                <th className="px-4 py-2 text-center font-semibold">
                                  Begins At
                                </th>
                                <th className="px-4 py-2 text-center font-semibold">
                                  Ends At
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {timezonesForTable.map((tz, index) => (
                                <tr
                                  key={index}
                                  className={`border-t border-gray-800 transition-colors hover:bg-gray-800/40 ${
                                    index % 2 === 0
                                      ? "bg-gray-900/40"
                                      : "bg-gray-950/40"
                                  }`}
                                >
                                  <td className="px-4 py-2">{tz.name}</td>
                                  <td className="px-4 py-2 text-center text-gray-300">
                                    {tz.selectedTimezoneStart}
                                  </td>
                                  <td className="px-4 py-2 text-center text-gray-300">
                                    {tz.selectedTimezoneEnd}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full justify-end gap-5 p-5">
                      <button
                        onClick={clearRange}
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-red-900 bg-gradient-to-br from-red-950 via-black to-black px-4 py-2 text-red-400 transition-all hover:border-red-700 hover:text-red-300"
                      >
                        <Ban className="h-4 w-4" />
                        Clear Range
                      </button>
                      <button
                        onClick={saveRange}
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-700 bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-2 text-gray-200 transition-all hover:border-blue-500 hover:text-blue-400"
                      >
                        Save Range
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-2 text-right text-[10px] text-gray-400 xl:text-sm">
        Time calculations abstracted with{" "}
        <a
          href="https://moment.github.io/luxon/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-gray-200"
        >
          Luxon
        </a>
        .
      </p>
    </>
  );
}
