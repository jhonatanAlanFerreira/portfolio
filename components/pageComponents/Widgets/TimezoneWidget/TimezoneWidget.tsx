import { useEffect, useState } from "react";
import { InputSelect } from "@/components/InputSelect/InputSelect";
import { useDebouncedCallback } from "@/clientUtils";
import { TimezoneOption } from "./TimezoneWidgetInterfaces";
import { DateTime } from "luxon";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

export default function TimezoneWidget() {
  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState<DateTime>(DateTime.now());
  const [sameTimezone, setSameTimezone] = useState(false);
  const [selectedTimezones, setSelectedTimezones] = useState<TimezoneOption[]>([
    {
      label: "America/Sao_Paulo (GMT-3)",
      name: "America/Sao_Paulo (GMT-3)",
      value: "America/Sao_Paulo",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(DateTime.now());
    }, 1000);

    const clientZone = DateTime.local().zoneName;
    const offset = DateTime.local().toFormat("ZZZZ");

    const clientTimezone: TimezoneOption = {
      label: `${clientZone} (${offset})`,
      name: `${clientZone} (${offset})`,
      value: clientZone,
    };

    setSelectedTimezones((prev) => {
      const alreadyExists = prev.some((tz) => tz.value === clientZone);
      setSameTimezone(alreadyExists);
      return alreadyExists ? prev : [...prev, clientTimezone];
    });

    return () => clearInterval(interval);
  }, []);

  const fetchTimezones = async (search: string) => {
    if (!search) {
      return setLoading(false);
    }

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
    async (value: string) => {
      fetchTimezones(value);
    },
    1000,
  );

  const resetTimezoneSelect = () => {
    setLoading(false);
    setTimezones([]);
  };

  const onTimezoneSelectedChange = (timezone: TimezoneOption) => {
    resetTimezoneSelect();
    console.log("Added new timezone: " + timezone.value); //WIP
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
            {selectedTimezones.map((timezone, index) => {
              const localTime = now.setZone(timezone.value);

              return (
                <div
                  key={index}
                  className="flex h-50 flex-col justify-between gap-4 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black/10 p-5 md:flex-row md:items-center"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                    <div className="flex items-center justify-center">
                      <Clock
                        value={localTime.toJSDate()}
                        renderNumbers={true}
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
                        1 hour ahead of the selected reference [WIP]
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
