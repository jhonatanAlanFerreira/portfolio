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
