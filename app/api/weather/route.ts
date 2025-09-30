import { NextResponse } from "next/server";
import { ipAddress } from "@vercel/edge";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    let ip = ipAddress(req) || null;

    if (!ip) {
      ip = await getFallbackIp();
    }

    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geo = await geoRes.json();

    const { latitude, longitude, city } = geo;

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
    );
    
    const weatherData = await weatherRes.json();

    return NextResponse.json({
      ip,
      city,
      coords: { latitude, longitude },
      temperature: weatherData.current.temperature_2m,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function getFallbackIp() {
  const ipRes = await fetch("https://api64.ipify.org?format=json");
  const ipData = await ipRes.json();
  return ipData.ip;
}
