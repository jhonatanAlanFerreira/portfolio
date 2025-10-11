import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import { DateTime } from "luxon";
import timezones from "@/data/timezones.json";
import ct from "countries-and-timezones";
import { TimezoneOption } from "@/components/pageComponents/Widgets/TimezoneWidget/TimezoneWidgetInterfaces";

const normalize = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const enrichedTimezones = timezones.map((tz) => {
  const aliases: string[] = [];

  for (const country of Object.values(ct.getAllCountries())) {
    if ((country.timezones as string[]).includes(tz.location)) {
      aliases.push(country.name.toLowerCase());
    }
  }

  aliases.push(
    ...tz.location
      .split("/")
      .map((part) => part.toLowerCase().replace(/_/g, " ")),
  );

  return {
    ...tz,
    locationNormalized: normalize(tz.location),
    timezoneNormalized: normalize(tz.timezone),
    timezoneShortNormalized: normalize(tz.timezoneShort),
    aliases,
  };
});

const fuse = new Fuse(enrichedTimezones, {
  keys: [
    "locationNormalized",
    "timezoneNormalized",
    "timezoneShortNormalized",
    "aliases",
  ],
  threshold: 0.3,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query) {
    return NextResponse.json([]);
  }

  const normalizedQuery = normalize(query);
  const results = fuse.search(normalizedQuery, { limit });

  const uniqueOptions = new Map<string, TimezoneOption>();

  for (const { item } of results) {
    const { location, timezone, timezoneShort } = item;
    const currentTime = DateTime.now().setZone(location).toFormat("HH:mm");

    if (!uniqueOptions.has(location)) {
      uniqueOptions.set(location, {
        label: `[${currentTime}] ${location} (${timezoneShort})`,
        value: location,
      });
    }

    if (!uniqueOptions.has(timezoneShort)) {
      uniqueOptions.set(timezoneShort, {
        label: `[${currentTime}] ${timezoneShort}`,
        value: timezoneShort,
      });
    }

    if (!uniqueOptions.has(timezone)) {
      uniqueOptions.set(timezone, {
        label: `[${currentTime}] ${timezone}`,
        value: timezone,
      });
    }
  }

  return NextResponse.json(Array.from(uniqueOptions.values()));
}
