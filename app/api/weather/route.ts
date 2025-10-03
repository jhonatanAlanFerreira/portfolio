import { NextResponse } from "next/server";
import { ipAddress } from "@vercel/edge";
import { WeatherAPIResponse } from "./interfaces";
import { WeatherData } from "@/components/WeatherWidget/WeatherWidgetInterfaces";

export async function GET(req: Request) {
  try {
    let ip = ipAddress(req) || null;

    if (!ip) {
      ip = await getFallbackIp();
    }

    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geo = await geoRes.json();

    const { latitude, longitude, city } = geo;
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=is_day,temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

    const weatherRes = await fetch(URL);
    const weatherAPIResponse: WeatherAPIResponse = await weatherRes.json();
    return NextResponse.json(formatWeatherData(weatherAPIResponse, city));
  } catch (err: any) {
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
): WeatherData {
  const { current, daily } = weatherAPIResponse;

  const dailyData: WeatherData["daily"] = daily.weather_code.map(
    (code, index) => ({
      code,
      max_temperature: daily.temperature_2m_max[index],
      min_temperature: daily.temperature_2m_min[index],
      time: daily.time[index],
    }),
  );

  return {
    city,
    current: {
      time: current.time,
      apparent_temperature: current.apparent_temperature,
      code: current.weather_code,
      humidity: current.relative_humidity_2m,
      temperature: current.temperature_2m,
      wind_speed: current.wind_speed_10m,
      period: current.is_day ? "day" : "night",
    },
    daily: dailyData,
  };
}
