"use client";
import { useEffect, useState } from "react";

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
    icon: "wi wi-rain",
  },
  forecast: [
    {
      date: "Thu 23 August",
      condition: "Moderate or heavy rain shower",
      min: 17,
      max: 27,
      icon: "wi wi-rain",
    },
    {
      date: "Fri 24 August",
      condition: "Moderate or heavy rain shower",
      min: 11,
      max: 27,
      icon: "wi wi-rain",
    },
    {
      date: "Sat 25 August",
      condition: "Heavy rain",
      min: 10,
      max: 11,
      icon: "wi wi-rain-wind",
    },
    {
      date: "Sun 26 August",
      condition: "Patchy rain possible",
      min: 11,
      max: 19,
      icon: "wi wi-showers",
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
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-purple-700/30 bg-[#1a1a2e] text-white shadow-lg">
      <div className="bg-gradient-to-r from-purple-800/80 to-purple-600/60 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{city}</h2>
            <p className="text-gray-300">{current.date}</p>
            <p className="mt-1 text-sm text-purple-200 italic">
              {isDay ? "☀️ Day" : "🌙 Night"}
            </p>
          </div>
          <i
            className={`${current.icon} text-6xl text-purple-200 opacity-90`}
          ></i>
        </div>

        <div className="mt-4">
          <h3 className="text-5xl font-extrabold">{current.temperature}°C</h3>
          <p className="text-gray-300">
            {current.max} / {current.min} °C
          </p>
          <p className="mt-2">{current.condition}</p>
          <p className="mt-1 text-sm text-gray-400">
            Wind: {current.wind} | Humidity: {current.humidity}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-purple-700/30 bg-[#11111f]">
        {forecast.map((day, idx) => (
          <div key={idx} className="p-3 text-center">
            <p className="text-xs text-gray-400">{day.date}</p>
            <i className={`${day.icon} my-2 text-3xl text-purple-300`}></i>
            <p className="text-xs">{day.condition}</p>
            <p className="mt-1 text-sm font-semibold">
              {day.max} / {day.min} °C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
