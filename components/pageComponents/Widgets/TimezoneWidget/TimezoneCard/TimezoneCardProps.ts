import { DateTime } from "luxon";
import { SelectedTimezone } from "../TimezoneWidgetInterfaces";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface TimezoneCardProps {
  timezone: SelectedTimezone;
  currentTime: DateTime;
  showComparisonText: boolean;
  onRemove: (id: UniqueIdentifier) => void;
}
