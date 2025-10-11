import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import { DateTime } from "luxon";
import timezones from "@/data/timezones.json";
import { TimezoneOption } from "@/components/pageComponents/Widgets/TimezoneWidget/TimezoneWidgetInterfaces";

const normalize = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const normalizedTimezones = timezones.map((tz) => ({
  ...tz,
  locationNormalized: normalize(tz.location),
  timezoneNormalized: normalize(tz.timezone),
  timezoneShortNormalized: normalize(tz.timezoneShort),
}));

const fuse = new Fuse(normalizedTimezones, {
  keys: ["locationNormalized", "timezoneNormalized", "timezoneShortNormalized"],
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

  const uniqueLocations = new Map<string, TimezoneOption>();
  const uniqueTimezones = new Map<string, TimezoneOption>();

  for (const { item } of results) {
    const { location, timezone, timezoneShort } = item;

    const currentTime = DateTime.now().setZone(item.location).toFormat("HH:mm");

    if (!uniqueLocations.has(location)) {
      uniqueLocations.set(location, {
        label: `[${currentTime}] ${location} (${timezoneShort})`,
        value: location,
      });
    }

    if (!uniqueTimezones.has(timezoneShort)) {
      uniqueTimezones.set(timezoneShort, {
        label: `[${currentTime}] ${timezoneShort}`,
        value: timezoneShort,
      });
    }
  }

  const combined = [
    ...Array.from(uniqueLocations.values()),
    ...Array.from(uniqueTimezones.values()),
  ];

  return NextResponse.json(combined);
}
