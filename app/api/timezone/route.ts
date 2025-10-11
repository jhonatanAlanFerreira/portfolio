import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import timezones from "@/data/timezones.json";
import { TimezoneOption } from "@/components/pageComponents/Widgets/TimezoneWidget/TimezoneWidgetInterfaces";

const fuse = new Fuse(timezones, {
  keys: ["location", "timezone", "timezoneShort"],
  threshold: 0.3,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query) {
    return NextResponse.json([]);
  }

  const results = fuse.search(query, { limit });

  const uniqueLocations = new Map<string, TimezoneOption>();
  const uniqueTimezones = new Map<string, TimezoneOption>();

  for (const { item } of results) {
    const { location, timezone, timezoneShort } = item;

    if (!uniqueLocations.has(location)) {
      uniqueLocations.set(location, {
        label: `${location} (${timezoneShort})`,
        value: location,
      });
    }

    if (!uniqueTimezones.has(timezoneShort)) {
      uniqueTimezones.set(timezoneShort, {
        label: timezoneShort,
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
