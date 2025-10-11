import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { TimezoneOptions } from "./TimezoneWidgetInterfaces";
import { InputSelect } from "@/components/InputSelect/InputSelect";

export default function TimezoneWidget() {
  const [timezoneModal, setTimezoneModal] = useState(false);
  const [timezones, setTimezones] = useState<TimezoneOptions[]>([]);

  const fetchTimezones = async (search: string) => {
    try {
      const res = await fetch(`/api/timezone?query=${search}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Timezone API error");
      const data: TimezoneOptions[] = await res.json();
      setTimezones(data);
    } catch (err) {
      console.error(err);
    }
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
            placeholder="Select Timezone"
            options={timezones}
          ></InputSelect>
        </div>
      </div>
    </>
  );
}
