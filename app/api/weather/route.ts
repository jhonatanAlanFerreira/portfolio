import { NextResponse } from "next/server";
import { ipAddress } from "@vercel/edge";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { HttpProxyAgent } from "http-proxy-agent";
import { WeatherAPIResponse } from "./interfaces";
import { WeatherData } from "@/components/WeatherWidget/WeatherWidgetInterfaces";

const PROXY_URL = "http://mitmproxy:8080";

const httpsAgent = new HttpsProxyAgent(PROXY_URL, {});

const httpAgent = new HttpProxyAgent(PROXY_URL);

export async function GET(req: Request) {
  try {
    let ip = ipAddress(req) || null;

    if (!ip) {
      ip = await getFallbackIp();
    }

    const geoRes = await axios.get(`http://ip-api.com/json/${ip}`, {
      params: { fields: "status,message,city,lat,lon,timezone" },
      timeout: 10000,
      httpAgent,
      httpsAgent,
      proxy: false,
      validateStatus: () => true,
    });

    if (geoRes.status !== 200) {
      throw new Error(`ip-api returned status ${geoRes.status}`);
    }

    const geo = geoRes.data;
    if (geo.status !== "success") {
      throw new Error(`ip-api error: ${geo.message || "unknown"}`);
    }

    const { lat, lon, city } = geo;

    const URL =
      "https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min&current=is_day,temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto";

    const weatherRes = await axios.get(URL, {
      params: { latitude: lat, longitude: lon },
      timeout: 15000,
      httpsAgent,
      httpAgent,
      proxy: false,
      validateStatus: () => true,
    });

    if (weatherRes.status !== 200) {
      throw new Error(`weather API returned status ${weatherRes.status}`);
    }

    const weatherAPIResponse: WeatherAPIResponse = weatherRes.data;

    return NextResponse.json(formatWeatherData(weatherAPIResponse, city));
  } catch (err: any) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: String(err.message || err) },
      { status: 500 },
    );
  }
}

async function getFallbackIp() {
  const ipRes = await axios.get("https://api64.ipify.org", {
    params: { format: "json" },
    timeout: 8000,
    httpsAgent,
    httpAgent,
    proxy: false,
    validateStatus: () => true,
  });

  if (ipRes.status !== 200) {
    throw new Error(`ipify returned status ${ipRes.status}`);
  }

  const ipData = ipRes.data;
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
