import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import timezones from "@/data/timezones.json";
import { TimezoneOptions } from "@/components/pageComponents/Widgets/TimezoneWidget/TimezoneWidgetInterfaces";

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

  const items: TimezoneOptions[] = results.flatMap((r) => {
    const { location, timezone, timezoneShort } = r.item;

    return [
      { label: location, value: location },
      { label: timezone, value: location },
      { label: timezoneShort, value: location },
    ];
  });

  return NextResponse.json(items);
}
