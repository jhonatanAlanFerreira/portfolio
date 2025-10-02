"use client";
import { useEffect, useState } from "react";
import { WiDayRain } from "react-icons/wi";

interface WeatherData {
  city: string;
  country: string;
  coords: { latitude: number; longitude: number };
  temperature: number;
  error?: string;
}

const mockData = {
  city: "Munich",
  isDay: true,
  current: {
    date: "Wed 22 August",
    temperature: 30,
    min: 17,
    max: 27,
    condition: "Moderate or heavy rain shower",
    wind: "7 km/h",
    humidity: "77%",
  },
  forecast: [
    {
      date: "Thu 23 August",
      condition: "Moderate or heavy rain shower",
      min: 17,
      max: 27,
    },
    {
      date: "Fri 24 August",
      condition: "Moderate or heavy rain shower",
      min: 11,
      max: 27,
    },
    {
      date: "Sat 25 August",
      condition: "Heavy rain",
      min: 10,
      max: 11,
    },
    {
      date: "Sun 26 August",
      condition: "Patchy rain possible",
      min: 11,
      max: 19,
    },
    {
      date: "Sun 27 August",
      condition: "Patchy rain possible",
      min: 11,
      max: 19,
    },
    {
      date: "Sun 28 August",
      condition: "Patchy rain possible",
      min: 11,
      max: 19,
    },
  ],
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
          country: "",
          coords: { latitude: 0, longitude: 0 },
          temperature: 0,
          error: "Failed to load",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const { city, isDay, current, forecast } = mockData;

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
