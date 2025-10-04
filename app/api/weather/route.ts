import { NextResponse } from "next/server";
import { ipAddress } from "@vercel/edge";
import { WeatherAPIResponse } from "./interfaces";
import { WeatherData } from "@/components/WeatherWidget/WeatherWidgetInterfaces";
import { getTomorrowWeatherUrl } from "@/utils";

export async function GET(req: Request) {
  try {
    let ip = ipAddress(req) || null;

    if (!ip) {
      ip = await getFallbackIp();
    }

    const geoRes = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,city,lat,lon`,
    );

    const geo = await geoRes.json();
    const { lat, lon, timezone, city } = geo;

    const weatherRes = await fetch(getTomorrowWeatherUrl(lat, lon));
    const weatherAPIResponse: WeatherAPIResponse = await weatherRes.json();

    return NextResponse.json(
      formatWeatherData(weatherAPIResponse, city, timezone),
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function getFallbackIp() {
  const ipRes = await fetch("https://api64.ipify.org?format=json");
  const ipData = await ipRes.json();
  return ipData.ip;
}

function formatWeatherData(
  weatherAPIResponse: WeatherAPIResponse,
  city: string,
  timezone: string,
): WeatherData {
  const { hourly, daily } = weatherAPIResponse.timelines;
  const current = hourly[0];

  const period = getPeriod(timezone, current.time);

  return {
    city,
    current: {
      time: current.time,
      apparent_temperature: current.values.temperatureApparent,
      code: current.values.weatherCode,
      humidity: current.values.humidity,
      temperature: current.values.temperature,
      wind_speed: current.values.windSpeed,
      period,
    },
    daily: daily.slice(1).map((day) => ({
      time: day.time,
      code_max: day.values.weatherCodeMax,
      code_min: day.values.weatherCodeMin,
      max_temperature: day.values.temperatureMax,
      min_temperature: day.values.temperatureMin,
    })),
  };
}

function getPeriod(
  timezone: string,
  time: string,
): WeatherData["current"]["period"] {
  const date = new Date(time);

  const localHour = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: false,
  }).format(date);

  const hour = Number(localHour);
  const isDay = hour >= 6 && hour < 18;

  return isDay ? "day" : "night";
}
