import { DateTime } from "luxon";

export default interface HoursRangeSelectProps {
  currentTime: DateTime;
  updateSelectedRangeDuration: (value: string) => void;
}
