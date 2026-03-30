import useSWR from "swr";
import { WeatherData } from "./WeatherWidgetInterfaces";

const CACHE_KEY = "weather-cache";
const CACHE_DURATION = 30 * 60 * 1000;

function getCachedWeather(): WeatherData | null {
  try {
    const item = localStorage.getItem(CACHE_KEY);
    if (!item) return null;

    const parsed = JSON.parse(item);

    if (parsed.expires < Date.now()) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed.data as WeatherData;
  } catch {
    return null;
  }
}

function saveWeatherToCache(data: WeatherData) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      data,
      expires: Date.now() + CACHE_DURATION,
    }),
  );
}

const fetchWeather = async () => {
  const res = await fetch("/api/weather", { cache: "no-store" });
  if (!res.ok) throw new Error("Weather API error");
  return res.json();
};

export function useWeatherData() {
  const cached = typeof window !== "undefined" ? getCachedWeather() : null;

  const { data, error, isLoading } = useSWR<WeatherData>(
    cached ? null : "/api/weather",
    async () => {
      const fresh = await fetchWeather();
      saveWeatherToCache(fresh);
      return fresh;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 30 * 60 * 1000,
      refreshInterval: 0,
    },
  );

  const weather = cached ?? data ?? undefined;

  return {
    weather,
    error,
    loading: !weather && isLoading,
  };
}
