"use client";
import { useEffect, useState } from "react";
import { WiDayRain } from "react-icons/wi";

interface WeatherData {
  city: string;
  weatherData: any;
}

const mockData: WeatherData = {
  city: "City Name",
  weatherData: {
    latitude: 52.52,
    longitude: 13.419998,
    generationtime_ms: 0.18072128295898438,
    utc_offset_seconds: 7200,
    timezone: "Europe/Berlin",
    timezone_abbreviation: "GMT+2",
    elevation: 38.0,
    current_units: {
      time: "iso8601",
      interval: "seconds",
      temperature_2m: "°C",
      relative_humidity_2m: "%",
      apparent_temperature: "°C",
      weather_code: "wmo code",
      wind_speed_10m: "km/h",
    },
    current: {
      time: "2025-10-02T20:30",
      interval: 900,
      temperature_2m: 11.6,
      relative_humidity_2m: 64,
      apparent_temperature: 10.0,
      weather_code: 1,
      wind_speed_10m: 2.4,
    },
    daily_units: {
      time: "iso8601",
      weather_code: "wmo code",
      temperature_2m_max: "°C",
      temperature_2m_min: "°C",
    },
    daily: {
      time: [
        "2025-10-02",
        "2025-10-03",
        "2025-10-04",
        "2025-10-05",
        "2025-10-06",
        "2025-10-07",
        "2025-10-08",
      ],
      weather_code: [45, 45, 61, 61, 61, 61, 61],
      temperature_2m_max: [15.2, 15.2, 12.7, 14.4, 14.1, 15.8, 15.0],
      temperature_2m_min: [3.5, 4.8, 6.3, 10.3, 8.5, 12.7, 12.5],
    },
  },
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      return;

      try {
        const res = await fetch("/api/weather");
        const data: WeatherData = await res.json();
        setWeather(data);
      } catch (err) {
        setWeather({
          city: "Error",
          weatherData: {},
        });
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return (
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
            <div className="flex flex-row">
              <div className="flex-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{city}</h3>
                    <p className="text-gray-400">{current.date}</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-700 pt-4">
                  <h4 className="text-5xl font-extrabold text-white">
                    {current.temperature}°C
                  </h4>
                  <p className="text-gray-400">
                    {current.max} / {current.min} °C
                  </p>
                  <p className="mt-2">{current.condition}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Wind: {current.wind} | Humidity: {current.humidity}
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <WiDayRain className="h-40 w-40 text-blue-400 drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 divide-x divide-gray-700 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            {forecast.map((day, idx) => (
              <div
                key={idx}
                className="p-3 text-center transition hover:bg-gray-800/40"
              >
                <p className="text-xs text-gray-400">{day.date}</p>
                <div className="flex w-full justify-center">
                  <WiDayRain className="h-16 w-16 text-blue-400 drop-shadow-md" />
                </div>
                <p className="text-xs text-gray-300">{day.condition}</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {day.max} / {day.min} °C
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
