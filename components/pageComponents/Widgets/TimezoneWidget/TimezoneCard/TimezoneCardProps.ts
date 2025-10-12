import { DateTime } from "luxon";
import { SelectedTimezone } from "../TimezoneWidgetInterfaces";

export interface TimezoneCardProps {
  timezone: SelectedTimezone;
  currentTime: DateTime;
  hasMoreThanOneCard: boolean;
}
