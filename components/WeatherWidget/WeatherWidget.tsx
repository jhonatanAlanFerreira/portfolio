"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { WeatherData } from "./WeatherWidgetInterfaces";
import { weatherCodeMapping } from "./WeatherWidgetIcons";
import { Loader2, AlertTriangle } from "lucide-react";

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
    if (typeof apparent !== "number" || isNaN(apparent)) return "text-gray-400";

    if (apparent >= 38) return "text-red-400";
    if (apparent >= 32) return "text-orange-300";
    if (apparent >= 26) return "text-yellow-300";
    if (apparent >= 20) return "text-green-300";
    if (apparent >= 10) return "text-blue-300";
    return "text-cyan-300";
  };

  if (loading) {
    return (
      <div className="flex h-60 w-full items-center justify-center text-gray-300">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
        Loading weather data...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex h-60 w-full flex-col items-center justify-center text-red-400">
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
    <>
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-wide text-gray-200 uppercase">
          Weather Integration
        </h2>
      </div>

      <div className="w-full max-w-4xl overflow-hidden rounded-md border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-2 p-6">
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-white">
                {weather.city}, {weather.region}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {formatDate(current.time)} ·{" "}
                {dayjs(current.time).format("HH:mm")}
              </p>
            </div>

            <div className="my-5 border-t border-gray-800" />
            <div className="mt-3 flex items-baseline gap-3">
              <h4 className="text-6xl font-extrabold tracking-tight drop-shadow-md">
                {current.temperature}°C
              </h4>
            </div>

            <p
              className={`mt-3 text-lg font-semibold tracking-wide drop-shadow-sm ${getComfortColor(
                current.apparent_temperature,
              )}`}
            >
              Feels like {current.apparent_temperature}°C{" "}
              <span className="font-medium text-gray-300">
                ({getComfortLevel(current.apparent_temperature)})
              </span>
            </p>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400">
              <p
                className="hover:scale-110"
                title={`Wind: ${current.wind_speed} Km/h`}
              >
                💨 {current.wind_speed} km/h
              </p>
              <p
                className="hover:scale-110"
                title={`Humidity: ${current.humidity}%`}
              >
                💧 {current.humidity}%
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black/5 p-6">
            <CurrentIcon
              title={description}
              className={`h-25 w-25 hover:scale-110 ${currentColor} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
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
                <p className="text-xs text-gray-400">{formatDate(day.time)}</p>
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
    </>
  );
}
