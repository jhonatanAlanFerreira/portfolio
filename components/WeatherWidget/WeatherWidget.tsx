"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { WeatherData } from "./WeatherWidgetInterfaces";
import { weatherCodeMaping } from "./WeatherWidgetIcons";
import { Loader2, AlertTriangle } from "lucide-react";
import { cardVariants, containerVariants } from "@/types/CardEffectVariants";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (!res.ok) throw new Error("Weather API error");
        const data: WeatherData = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getDetailsFromCode = (code: number, period: "day" | "night" = "day") =>
    weatherCodeMaping[code][period];

  const isDay = () => weather?.current.period === "day";

  const formatDate = (date: string) => dayjs(date).format("ddd, MMM D");

  if (loading) {
    return (
      <div className="flex h-60 w-full items-center justify-center rounded-lg border border-slate-600/60 bg-black/90 text-gray-300">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
        Loading weather data...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex h-60 w-full flex-col items-center justify-center rounded-lg border border-slate-600/60 bg-black/90 text-red-400">
        <AlertTriangle className="mb-2 h-8 w-8" />
        Failed to load weather data.
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
    <div className="flex w-full flex-col pb-3">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col gap-6 pb-10 sm:pb-0"
      >
        <motion.div
          variants={cardVariants(true)}
          className="h-auto w-full rounded-sm border border-slate-600/60 bg-black/80 p-4 transition-colors duration-300 hover:border-slate-400/50"
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-wide text-gray-200 uppercase">
              Weather Integration
            </h2>
          </div>

          <div className="w-full max-w-4xl overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white shadow-lg">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-2 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold">{weather.city}</h3>
                    <p className="text-sm text-gray-400">
                      {formatDate(current.time)} ·{" "}
                      {dayjs(current.time).format("HH:mm")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-gray-800 pt-5">
                  <p
                    className={`mt-1 text-sm italic ${
                      isDay() ? "text-yellow-500" : "text-blue-400"
                    }`}
                  >
                    {isDay() ? "☀️ Daytime" : "🌙 Nighttime"}
                  </p>

                  <h4 className="text-6xl font-extrabold tracking-tight">
                    {current.temperature}°C
                  </h4>
                  <p className="mt-2 text-gray-200">{description}</p>

                  <p className="mt-2 text-sm text-gray-400">
                    💨 Wind: {current.wind_speed} km/h · 💧 Humidity:{" "}
                    {current.humidity}%
                  </p>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                <CurrentIcon
                  className={`h-24 w-24 ${currentColor} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-gray-800 border-t border-gray-800 bg-gray-950/60 sm:grid-cols-4 lg:grid-cols-7">
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
                    className="p-4 text-center transition-colors duration-200 hover:bg-gray-800/40"
                  >
                    <p className="text-xs text-gray-400">
                      {formatDate(day.time)}
                    </p>
                    <div className="mt-2 flex justify-center">
                      <Icon className={`h-10 w-10 ${color} drop-shadow-sm`} />
                    </div>
                    <p className="mt-1 text-xs text-gray-300">{description}</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {day.max_temperature}° / {day.min_temperature}°
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <p className="mt-2 text-right text-sm text-gray-400">
            The data is provided by{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-gray-200"
            >
              Open-Meteo
            </a>
            .
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
