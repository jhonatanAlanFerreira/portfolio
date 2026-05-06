"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { weatherCodeMapping } from "./WeatherWidgetIcons";
import { Loader2, AlertTriangle } from "lucide-react";
import { useWeatherData } from "./useWeatherData";

export default function WeatherWidget() {
  const fetched = useRef(false);
  const { weather, error, loading } = useWeatherData();

  const getDetailsFromCode = (code: number, period: "day" | "night" = "day") =>
    weatherCodeMapping[code][period];

  const formatDate = (date: string) => dayjs(date).format("ddd, MMM D");

  const getComfortLevel = (apparent: number): string => {
    if (apparent >= 38) return "🔥 Scorching hot";
    if (apparent >= 32) return "🥵 Very hot";
    if (apparent >= 26) return "🌤️ Warm";
    if (apparent >= 20) return "😊 Comfortable";
    if (apparent >= 10) return "🥶 Cool";
    return "❄️ Cold";
  };

  const getComfortColor = (apparent: number): string => {
    if (typeof apparent !== "number" || isNaN(apparent))
      return "text-[var(--muted)]";

    if (apparent >= 38) return "text-red-400";
    if (apparent >= 32) return "text-orange-300";
    if (apparent >= 26) return "text-yellow-300";
    if (apparent >= 20) return "text-green-300";
    if (apparent >= 10) return "text-blue-300";
    return "text-cyan-300";
  };

  if (loading) {
    return (
      <div className="flex h-60 w-full items-center justify-center text-[var(--muted)]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-[var(--muted)]" />
        Loading weather data...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex h-60 w-full flex-col items-center justify-center text-red-400">
        <AlertTriangle className="mb-2 h-8 w-8" />
        <p>Failed to load weather data.</p>
        <p>The API may have reached its limit or is temporarily unavailable.</p>
      </div>
    );
  }

  const current = weather.current;
  const {
    icon: CurrentIcon,
    color: currentColor,
    description,
  } = getDetailsFromCode(current.code, current.period);

  return (
    <>
      <div className="mb-4">
        <h2 className="text-[13px] font-semibold tracking-wide text-[var(--primary)] uppercase xl:text-lg">
          Weather Integration
        </h2>
      </div>

      <div className="p-5">
        <div className="w-full overflow-hidden rounded-md border border-[var(--border-subtle)] bg-[linear-gradient(135deg,rgba(11,22,35,0.75),rgba(15,27,46,0.65),rgba(2,218,222,0.08))] text-[var(--primary)] shadow-[0_6px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="flex">
            <div className="flex-2 p-6">
              <div>
                <h3 className="text-md font-bold tracking-tight xl:text-3xl">
                  {weather.city}, {weather.region}
                </h3>
                <p className="text-[10px] text-[var(--muted)] xl:mt-1 xl:text-sm">
                  {formatDate(current.time)} ·{" "}
                  {dayjs(current.time).format("h:mm a").toLowerCase()}
                </p>
              </div>

              <div className="my-2 border-t border-[var(--border-subtle)] xl:my-5" />

              <div className="flex items-baseline gap-3 xl:mt-3">
                <h4 className="text-4xl font-extrabold tracking-tight xl:text-6xl">
                  {current.temperature}°C
                </h4>
              </div>

              <p
                className={`text-sm font-semibold tracking-wide xl:mt-3 xl:text-lg ${getComfortColor(
                  current.apparent_temperature,
                )}`}
              >
                Feels like {current.apparent_temperature}°C{" "}
                <span className="text-[var(--muted)]">
                  ({getComfortLevel(current.apparent_temperature)})
                </span>
              </p>

              <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-[var(--muted)] xl:mt-3 xl:text-sm">
                <p title={`Wind: ${current.wind_speed} Km/h`}>
                  💨 {current.wind_speed} km/h
                </p>
                <p title={`Humidity: ${current.humidity}%`}>
                  💧 {current.humidity}%
                </p>
              </div>
            </div>

            {/* Right icon panel */}
            <div className="flex flex-1 flex-col items-center justify-center bg-[rgba(255,255,255,0.02)] p-6">
              <CurrentIcon
                title={description}
                className={`h-20 w-20 xl:h-25 xl:w-25 ${currentColor} drop-shadow-[0_0_25px_rgba(2,218,222,0.25)]`}
              />
            </div>
          </div>

          {/* Forecast */}
          <div className="grid grid-cols-7 divide-x divide-[var(--border-subtle)] border-t border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)]">
            {weather.daily.map((day, index) => {
              const {
                icon: Icon,
                color,
                description,
              } = getDetailsFromCode(day.code, "day");

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 text-center transition-colors duration-200 hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <p className="text-[10px] text-[var(--muted)] xl:text-xs">
                    {formatDate(day.time)}
                  </p>

                  <div className="flex justify-center xl:mt-2">
                    <Icon className={`h-7 w-7 xl:h-10 xl:w-10 ${color}`} />
                  </div>

                  <p className="text-[10px] text-[var(--muted)] xl:mt-1 xl:text-xs">
                    {description}
                  </p>

                  <p className="text-[10px] font-semibold text-[var(--primary)] xl:mt-1 xl:text-xs">
                    {day.max_temperature}° / {day.min_temperature}°
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-2 text-right text-[10px] text-[var(--muted)] xl:text-sm">
        The data is provided by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-[var(--primary)]"
        >
          Open-Meteo
        </a>
        .
      </p>
    </>
  );
}
