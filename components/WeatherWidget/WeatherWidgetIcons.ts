import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
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
  WiNightAltCloudy,
  WiSnowflakeCold,
} from "react-icons/wi";

export const weatherIcons = {
  "0": {
    day: { description: "Sunny", icon: WiDaySunny, color: "text-yellow-400" },
    night: { description: "Clear", icon: WiNightClear, color: "text-blue-300" },
  },
  "1": {
    day: {
      description: "Mainly Sunny",
      icon: WiDaySunny,
      color: "text-yellow-400",
    },
    night: {
      description: "Mainly Clear",
      icon: WiNightClear,
      color: "text-blue-300",
    },
  },
  "2": {
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
  "3": {
    day: { description: "Cloudy", icon: WiCloud, color: "text-gray-400" },
    night: { description: "Cloudy", icon: WiCloud, color: "text-gray-500" },
  },
  "45": {
    day: { description: "Foggy", icon: WiFog, color: "text-gray-400" },
    night: { description: "Foggy", icon: WiFog, color: "text-gray-500" },
  },
  "48": {
    day: { description: "Rime Fog", icon: WiFog, color: "text-gray-400" },
    night: { description: "Rime Fog", icon: WiFog, color: "text-gray-500" },
  },
  "51": {
    day: {
      description: "Light Drizzle",
      icon: WiDayShowers,
      color: "text-blue-300",
    },
    night: {
      description: "Light Drizzle",
      icon: WiNightAltShowers,
      color: "text-blue-400",
    },
  },
  "53": {
    day: { description: "Drizzle", icon: WiDayShowers, color: "text-blue-400" },
    night: {
      description: "Drizzle",
      icon: WiNightAltShowers,
      color: "text-blue-500",
    },
  },
  "55": {
    day: {
      description: "Heavy Drizzle",
      icon: WiDayShowers,
      color: "text-blue-500",
    },
    night: {
      description: "Heavy Drizzle",
      icon: WiNightAltShowers,
      color: "text-blue-600",
    },
  },
  "56": {
    day: {
      description: "Light Freezing Drizzle",
      icon: WiDaySleet,
      color: "text-cyan-300",
    },
    night: {
      description: "Light Freezing Drizzle",
      icon: WiNightAltSleet,
      color: "text-cyan-400",
    },
  },
  "57": {
    day: {
      description: "Freezing Drizzle",
      icon: WiDaySleet,
      color: "text-cyan-400",
    },
    night: {
      description: "Freezing Drizzle",
      icon: WiNightAltSleet,
      color: "text-cyan-500",
    },
  },
  "61": {
    day: { description: "Light Rain", icon: WiDayRain, color: "text-blue-400" },
    night: {
      description: "Light Rain",
      icon: WiNightAltRain,
      color: "text-blue-500",
    },
  },
  "63": {
    day: { description: "Rain", icon: WiDayRain, color: "text-blue-500" },
    night: {
      description: "Rain",
      icon: WiNightAltRain,
      color: "text-blue-600",
    },
  },
  "65": {
    day: { description: "Heavy Rain", icon: WiDayRain, color: "text-blue-600" },
    night: {
      description: "Heavy Rain",
      icon: WiNightAltRain,
      color: "text-blue-700",
    },
  },
  "66": {
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
  "67": {
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
  "71": {
    day: { description: "Light Snow", icon: WiDaySnow, color: "text-gray-200" },
    night: {
      description: "Light Snow",
      icon: WiNightAltSnow,
      color: "text-gray-300",
    },
  },
  "73": {
    day: { description: "Snow", icon: WiDaySnow, color: "text-gray-100" },
    night: {
      description: "Snow",
      icon: WiNightAltSnow,
      color: "text-gray-200",
    },
  },
  "75": {
    day: { description: "Heavy Snow", icon: WiDaySnow, color: "text-white" },
    night: {
      description: "Heavy Snow",
      icon: WiNightAltSnow,
      color: "text-gray-100",
    },
  },
  "77": {
    day: {
      description: "Snow Grains",
      icon: WiSnowflakeCold,
      color: "text-cyan-200",
    },
    night: {
      description: "Snow Grains",
      icon: WiSnowflakeCold,
      color: "text-cyan-300",
    },
  },
  "80": {
    day: {
      description: "Light Showers",
      icon: WiDayShowers,
      color: "text-blue-300",
    },
    night: {
      description: "Light Showers",
      icon: WiNightAltShowers,
      color: "text-blue-400",
    },
  },
  "81": {
    day: { description: "Showers", icon: WiDayShowers, color: "text-blue-400" },
    night: {
      description: "Showers",
      icon: WiNightAltShowers,
      color: "text-blue-500",
    },
  },
  "82": {
    day: {
      description: "Heavy Showers",
      icon: WiDayShowers,
      color: "text-blue-500",
    },
    night: {
      description: "Heavy Showers",
      icon: WiNightAltShowers,
      color: "text-blue-600",
    },
  },
  "85": {
    day: {
      description: "Light Snow Showers",
      icon: WiDaySnow,
      color: "text-gray-200",
    },
    night: {
      description: "Light Snow Showers",
      icon: WiNightAltSnow,
      color: "text-gray-300",
    },
  },
  "86": {
    day: { description: "Snow Showers", icon: WiDaySnow, color: "text-white" },
    night: {
      description: "Snow Showers",
      icon: WiNightAltSnow,
      color: "text-gray-200",
    },
  },
  "95": {
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
  "96": {
    day: {
      description: "Light Thunderstorms With Hail",
      icon: WiDayThunderstorm,
      color: "text-yellow-500",
    },
    night: {
      description: "Light Thunderstorms With Hail",
      icon: WiNightAltThunderstorm,
      color: "text-yellow-400",
    },
  },
  "99": {
    day: {
      description: "Thunderstorm With Hail",
      icon: WiDayThunderstorm,
      color: "text-yellow-600",
    },
    night: {
      description: "Thunderstorm With Hail",
      icon: WiNightAltThunderstorm,
      color: "text-yellow-500",
    },
  },
} as const;
