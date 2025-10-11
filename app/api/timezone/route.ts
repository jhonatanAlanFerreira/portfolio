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

  if (!query) return NextResponse.json([]);

  const normalizedQuery = normalize(query);
  const results = fuse.search(normalizedQuery, { limit });

  const seenLabels = new Set<string>();
  const uniqueOptions: TimezoneOption[] = [];

  for (const { item } of results) {
    const { location, timezoneShort, timezone } = item;
    const currentTime = DateTime.now().setZone(location).toFormat("HH:mm");

    const gmtLabel = `[${currentTime}] ${timezoneShort}`;
    if (!seenLabels.has(gmtLabel)) {
      uniqueOptions.push({
        label: gmtLabel,
        value: location,
      });
      seenLabels.add(gmtLabel);
    }

    const fullLabel = `[${currentTime}] ${timezone}`;
    if (!seenLabels.has(fullLabel)) {
      uniqueOptions.push({
        label: fullLabel,
        value: location,
      });
      seenLabels.add(fullLabel);
    }

    const locationLabel = `[${currentTime}] ${location} (${timezoneShort})`;
    if (!seenLabels.has(locationLabel)) {
      uniqueOptions.push({
        label: locationLabel,
        value: location,
      });
      seenLabels.add(locationLabel);
    }
  }

  return NextResponse.json(uniqueOptions);
}
