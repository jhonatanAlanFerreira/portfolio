import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiFog,
  WiDayShowers,
  WiNightAltShowers,
  WiDayRain,
  WiNightAltRain,
  WiDaySnow,
  WiNightAltSnow,
  WiDaySleet,
  WiNightAltSleet,
  WiDayThunderstorm,
  WiNightAltThunderstorm,
  WiSnowflakeCold,
} from "react-icons/wi";
import { WeatherCodeMaping } from "./WeatherWidgetInterfaces";

export const weatherCodeMaping: WeatherCodeMaping = {
  "0": {
    day: { description: "Unknown", icon: WiCloud, color: "text-gray-400" },
    night: { description: "Unknown", icon: WiCloud, color: "text-gray-500" },
  },
  "1000": {
    day: {
      description: "Clear, Sunny",
      icon: WiDaySunny,
      color: "text-yellow-400",
    },
    night: { description: "Clear", icon: WiNightClear, color: "text-blue-300" },
  },
  "1100": {
    day: {
      description: "Mostly Clear",
      icon: WiDaySunny,
      color: "text-yellow-300",
    },
    night: {
      description: "Mostly Clear",
      icon: WiNightClear,
      color: "text-blue-400",
    },
  },
  "1101": {
    day: {
      description: "Partly Cloudy",
      icon: WiDayCloudy,
      color: "text-yellow-200",
    },
    night: {
      description: "Partly Cloudy",
      icon: WiNightAltCloudy,
      color: "text-gray-400",
    },
  },
  "1102": {
    day: {
      description: "Mostly Cloudy",
      icon: WiCloud,
      color: "text-gray-400",
    },
    night: {
      description: "Mostly Cloudy",
      icon: WiCloud,
      color: "text-gray-500",
    },
  },
  "1001": {
    day: { description: "Cloudy", icon: WiCloud, color: "text-gray-400" },
    night: { description: "Cloudy", icon: WiCloud, color: "text-gray-500" },
  },
  "2000": {
    day: { description: "Fog", icon: WiFog, color: "text-gray-400" },
    night: { description: "Fog", icon: WiFog, color: "text-gray-500" },
  },
  "2100": {
    day: { description: "Light Fog", icon: WiFog, color: "text-gray-400" },
    night: { description: "Light Fog", icon: WiFog, color: "text-gray-500" },
  },
  "4000": {
    day: { description: "Drizzle", icon: WiDayShowers, color: "text-blue-300" },
    night: {
      description: "Drizzle",
      icon: WiNightAltShowers,
      color: "text-blue-400",
    },
  },
  "4001": {
    day: { description: "Rain", icon: WiDayRain, color: "text-blue-400" },
    night: {
      description: "Rain",
      icon: WiNightAltRain,
      color: "text-blue-500",
    },
  },
  "4200": {
    day: { description: "Light Rain", icon: WiDayRain, color: "text-blue-300" },
    night: {
      description: "Light Rain",
      icon: WiNightAltRain,
      color: "text-blue-400",
    },
  },
  "4201": {
    day: { description: "Heavy Rain", icon: WiDayRain, color: "text-blue-500" },
    night: {
      description: "Heavy Rain",
      icon: WiNightAltRain,
      color: "text-blue-600",
    },
  },
  "5000": {
    day: { description: "Snow", icon: WiDaySnow, color: "text-gray-100" },
    night: {
      description: "Snow",
      icon: WiNightAltSnow,
      color: "text-gray-200",
    },
  },
  "5001": {
    day: { description: "Flurries", icon: WiDaySnow, color: "text-gray-200" },
    night: {
      description: "Flurries",
      icon: WiNightAltSnow,
      color: "text-gray-300",
    },
  },
  "5100": {
    day: { description: "Light Snow", icon: WiDaySnow, color: "text-gray-200" },
    night: {
      description: "Light Snow",
      icon: WiNightAltSnow,
      color: "text-gray-300",
    },
  },
  "5101": {
    day: { description: "Heavy Snow", icon: WiDaySnow, color: "text-white" },
    night: {
      description: "Heavy Snow",
      icon: WiNightAltSnow,
      color: "text-gray-100",
    },
  },
  "6000": {
    day: {
      description: "Freezing Drizzle",
      icon: WiDaySleet,
      color: "text-cyan-300",
    },
    night: {
      description: "Freezing Drizzle",
      icon: WiNightAltSleet,
      color: "text-cyan-400",
    },
  },
  "6001": {
    day: {
      description: "Freezing Rain",
      icon: WiDaySleet,
      color: "text-cyan-400",
    },
    night: {
      description: "Freezing Rain",
      icon: WiNightAltSleet,
      color: "text-cyan-500",
    },
  },
  "6200": {
    day: {
      description: "Light Freezing Rain",
      icon: WiDaySleet,
      color: "text-cyan-300",
    },
    night: {
      description: "Light Freezing Rain",
      icon: WiNightAltSleet,
      color: "text-cyan-400",
    },
  },
  "6201": {
    day: {
      description: "Heavy Freezing Rain",
      icon: WiDaySleet,
      color: "text-cyan-400",
    },
    night: {
      description: "Heavy Freezing Rain",
      icon: WiNightAltSleet,
      color: "text-cyan-500",
    },
  },
  "7000": {
    day: {
      description: "Ice Pellets",
      icon: WiDaySleet,
      color: "text-cyan-300",
    },
    night: {
      description: "Ice Pellets",
      icon: WiNightAltSleet,
      color: "text-cyan-400",
    },
  },
  "7101": {
    day: {
      description: "Heavy Ice Pellets",
      icon: WiDaySleet,
      color: "text-cyan-400",
    },
    night: {
      description: "Heavy Ice Pellets",
      icon: WiNightAltSleet,
      color: "text-cyan-500",
    },
  },
  "7102": {
    day: {
      description: "Light Ice Pellets",
      icon: WiDaySleet,
      color: "text-cyan-300",
    },
    night: {
      description: "Light Ice Pellets",
      icon: WiNightAltSleet,
      color: "text-cyan-400",
    },
  },
  "8000": {
    day: {
      description: "Thunderstorm",
      icon: WiDayThunderstorm,
      color: "text-yellow-500",
    },
    night: {
      description: "Thunderstorm",
      icon: WiNightAltThunderstorm,
      color: "text-yellow-400",
    },
  },
} as const;
