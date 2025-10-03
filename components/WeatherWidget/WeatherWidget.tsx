"use client";
import { useEffect, useState } from "react";
import { WiDayRain } from "react-icons/wi";
import { WeatherData } from "./WeatherWidgetInterfaces";
import { weatherCodeMaping } from "./WeatherWidgetIcons";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");
        const data: WeatherData = await res.json();
        setWeather(data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const getDetailsFromCode = (
    code: number,
    period: "day" | "night" = "day",
  ) => {
    return weatherCodeMaping[code][period];
  };

  return (
    <>
      {weather && (
        <div className="h-auto w-full rounded-md border border-slate-600/60 bg-black/90 bg-gradient-to-br p-5 shadow-xl transition-colors duration-300 hover:border-slate-400/50">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">
              Weather Integration
            </h2>
            <p className="text-sm text-gray-400">
              The data is provided by{" "}
              <span className="text-gray-200">Weather API</span>.
            </p>
          </div>

          <div className="p-8 opacity-60">
            <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 text-white shadow-lg">
              <div className="border-b border-gray-700">
                {(() => {
                  const {
                    icon: Icon,
                    color,
                    description,
                  } = getDetailsFromCode(
                    weather.current.code,
                    weather.current.period,
                  );
                  return (
                    <div className="flex flex-row">
                      <div className="flex-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold">
                              {weather.city}
                            </h3>
                            <p className="text-gray-400">
                              {weather.current.time}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 border-t border-gray-700 pt-4">
                          <h4 className="text-5xl font-extrabold text-white">
                            {weather.current.temperature}°C
                          </h4>
                          <p className="mt-2">{description}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            Wind: {weather.current.wind_speed} | Humidity:{" "}
                            {weather.current.humidity}
                          </p>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <Icon
                            className={`h-16 w-16 ${color} drop-shadow-md`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-7 divide-x divide-gray-700 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                {weather.daily.map((day, index) => {
                  const {
                    icon: Icon,
                    color,
                    description,
                  } = getDetailsFromCode(day.code, "day");

                  return (
                    <div
                      key={index}
                      className="p-3 text-center transition hover:bg-gray-800/40"
                    >
                      <p className="text-xs text-gray-400">{day.time}</p>
                      <div className="flex w-full justify-center">
                        <Icon className={`h-16 w-16 ${color} drop-shadow-md`} />
                      </div>
                      <p className="text-xs text-gray-300">{description}</p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {day.max_temperature} / {day.min_temperature} °C
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
