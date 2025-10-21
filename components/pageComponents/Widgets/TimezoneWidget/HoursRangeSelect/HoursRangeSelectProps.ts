import { DateTime } from "luxon";
import { SelectedTimezone } from "../TimezoneWidgetInterfaces";

export default interface HoursRangeSelectProps {
  timezones: SelectedTimezone[];
  currentTime: DateTime;
  updateSelectedRangeDuration: (value: string) => void;
}
