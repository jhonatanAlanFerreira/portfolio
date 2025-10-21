import { DateTime } from "luxon";
import { SelectedTimezone } from "./TimezoneWidgetInterfaces";

export const boxWidth = 80;
export const boxHeight = 80;
export const hoursAmount = 48;
export const snapStep = boxWidth / 2;
export const maxWidth = boxWidth * hoursAmount;

export function getTimezoneData(): SelectedTimezone[] | null {
  const savedRangeSelect = localStorage.getItem("timezoneData");

  if (savedRangeSelect) {
    return JSON.parse(savedRangeSelect);
  }

  return null;
}

export function setTimezoneData(selectedTimezones: SelectedTimezone[]) {
  localStorage.setItem("timezoneData", JSON.stringify(selectedTimezones));
}

export function getSelectRangeData(): { x: number; width: number } | null {
  const savedRangeSelect = localStorage.getItem("selectRangeData");

  if (savedRangeSelect) {
    return JSON.parse(savedRangeSelect);
  }

  return null;
}

export function setSelectRangeData(selectRangeData: {
  x: number;
  width: number;
}) {
  localStorage.setItem("selectRangeData", JSON.stringify(selectRangeData));
}

export function getSelectedRangeText(timezones: SelectedTimezone[]) {
  const range = getSelectRangeData();

  if (!range) {
    return timezones;
  }

  const totalHours = range.width / boxWidth;
  const startHour = range.x / boxWidth;
  const endHour = startHour + totalHours;
  const currentTime = DateTime.now();

  const updatedSelectedTimezoneRangeDuration = timezones.map((tz) => {
    const start = currentTime
      .startOf("day")
      .plus({ hours: startHour })
      .setZone(tz.value)
      .toFormat("h:mm a")
      .toLowerCase();
    const end = currentTime
      .startOf("day")
      .plus({ hours: endHour })
      .setZone(tz.value)
      .toFormat("h:mm a")
      .toLowerCase();

    const formattedRange = `${start} - ${end}`;

    return {
      ...tz,
      selectedTimezoneDuration: formattedRange,
    };
  });

  setSelectRangeData(range);
  return updatedSelectedTimezoneRangeDuration;
}
