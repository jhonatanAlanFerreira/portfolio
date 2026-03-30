import { create } from "zustand";
import {
  SelectedRange,
  SelectedTimezone,
  TimezoneWidgetStore,
} from "./TimezoneWidgetInterfaces";
import { DateTime } from "luxon";

export const boxWidth = 80;
export const boxHeight = 100;
export const hoursAmount = 48;
export const snapStep = 40;
export const maxWidth = 80 * 48;
export const comparisonText = "Drag to compare with another timezone";

export function calculateTimezoneDurations(
  selectedRange: SelectedRange,
  timezones: SelectedTimezone[],
) {
  const currentTime = DateTime.now();
  const totalHours = selectedRange.width / boxWidth;
  const startHour = selectedRange.x / boxWidth;
  const endHour = startHour + totalHours;

  return timezones.map((tz) => {
    const startDt = currentTime
      .startOf("day")
      .plus({ hours: startHour })
      .setZone(tz.value);

    const endDt = currentTime
      .startOf("day")
      .plus({ hours: endHour })
      .setZone(tz.value);

    const start = startDt.toFormat("h:mm a").toLowerCase();

    const end =
      endDt.day !== startDt.day
        ? `next day ${endDt.toFormat("h:mm a").toLowerCase()}`
        : endDt.toFormat("h:mm a").toLowerCase();

    return {
      ...tz,
      selectedTimezoneStart: start,
      selectedTimezoneEnd: end,
      selectedTimezoneDuration: `${start} - ${end}`,
    };
  });
}

export const createTimezoneWidgetStore = create<TimezoneWidgetStore>(
  (set, get) => {
    return {
      selectedTimezones: [],
      selectedRange: { x: 0, width: boxWidth * 3 },

      setSelectedTimezones: (timezones) =>
        set({ selectedTimezones: timezones }),
      setSelectedRange: (range) => set({ selectedRange: range }),
      getSelectedTimezones: () => get().selectedTimezones,
      getSelectedRange: () => get().selectedRange,
      resetSelectedRange: () => {
        set({ selectedRange: { x: 0, width: boxWidth * 3 } });
        localStorage.removeItem("selectedRange");
        get().updateSelectedTimezoneDurations();
      },
      updateSelectedTimezoneDurations: () => {
        const selectedRangeFromLocalstorage =
          localStorage.getItem("selectedRange");
        const { selectedTimezones } = get();

        if (!selectedRangeFromLocalstorage) {
          return set({
            selectedTimezones: selectedTimezones.map((tz) => ({
              ...tz,
              selectedTimezoneDuration: undefined,
            })),
          });
        }

        set({
          selectedTimezones: calculateTimezoneDurations(
            JSON.parse(selectedRangeFromLocalstorage),
            selectedTimezones,
          ),
        });
      },
    };
  },
);
