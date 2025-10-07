import { IconType } from "react-icons";

export interface WeatherData {
  city: string;
  region: string;
  current: {
    time: string;
    temperature: number;
    apparent_temperature: number;
    humidity: number;
    code: number;
    wind_speed: number;
    period: "day" | "night";
  };
  daily: {
    time: string;
    code: number;
    max_temperature: number;
    min_temperature: number;
  }[];
}

export interface WeatherCodeMapping {
  [code: number]: {
    day: { description: string; icon: IconType; color: string };
    night: { description: string; icon: IconType; color: string };
  };
}
