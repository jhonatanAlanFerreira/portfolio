import { NextResponse } from "next/server";
import { ipAddress } from "@vercel/edge";
import { WeatherAPIResponse } from "./interfaces";
import { WeatherData } from "@/components/WeatherWidget/WeatherWidgetInterfaces";
import { getIpApiUrl, getIpifyUrl, getOpenMeteoWeatherUrl } from "@/utils";

export async function GET(req: Request) {
  try {
    let ip = ipAddress(req) || null;

    if (!ip) {
      ip = await getFallbackIp();
    }

    if (!ip) {
      throw new Error("IP not found");
    }

    const geoRes = await fetch(getIpApiUrl(ip));
    const geo = await geoRes.json();

    const { lat, lon, city } = geo;

    const weatherRes = await fetch(getOpenMeteoWeatherUrl(lat, lon));
    const weatherAPIResponse: WeatherAPIResponse = await weatherRes.json();
    return NextResponse.json(formatWeatherData(weatherAPIResponse, city));
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function getFallbackIp() {
  const ipRes = await fetch(getIpifyUrl());
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
