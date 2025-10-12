import { DateTime } from "luxon";
import { SelectedTimezone } from "../TimezoneWidgetInterfaces";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface TimezoneCardProps {
  timezone: SelectedTimezone;
  currentTime: DateTime;
  hasMoreThanOneCard: boolean;
  onRemove: (id: UniqueIdentifier) => void;
}
