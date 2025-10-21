import { DateTime } from "luxon";

export interface TimezoneOption {
  label: string;
  value: string;
  name: string;
}

export interface SelectedTimezone extends TimezoneOption {
  id: string;
  comparisonText: string;
  selectedTimezoneDuration?: string;
}

export interface SelectedRange {
  x: number;
  width: number;
}

export interface TimezoneWidgetState {
  selectedTimezones: SelectedTimezone[];
  selectedRange: SelectedRange;
}

export interface TimezoneWidgetStore extends TimezoneWidgetState {
  setSelectedTimezones: (timezones: SelectedTimezone[]) => void;
  setSelectedRange: (range: SelectedRange) => void;
  getSelectedTimezones: () => SelectedTimezone[];
  getSelectedRange: () => SelectedRange;
  resetSelectedRange: () => void;
  updateSelectedTimezoneDurations: () => void;
}
