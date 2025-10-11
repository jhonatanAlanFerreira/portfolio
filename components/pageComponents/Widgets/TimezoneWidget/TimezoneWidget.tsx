import { useState } from "react";
import { InputSelect } from "@/components/InputSelect/InputSelect";
import { useDebouncedCallback } from "@/clientUtils";
import { TimezoneOption } from "./TimezoneWidgetInterfaces";

export default function TimezoneWidget() {
  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [loading, setLoading] = useState(false);

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
        <div className="w-full overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-5 text-white shadow-lg">
          <InputSelect
            placeholder="Add New Timezone"
            noOptionsCustomMessage={{
              empty: "No timezones found",
              beforeTyping: "Start typing to list timezones",
            }}
            options={timezones}
            onInputChange={onTimezoneInputChange}
            isLoading={loading}
            filterOption={null}
            onChange={(timezone) =>
              onTimezoneSelectedChange(timezone as TimezoneOption)
            }
          ></InputSelect>
        </div>
      </div>
    </>
  );
}
