import { writeFileSync } from "fs";
import { DateTime } from "luxon";

const ianaZones = Intl.supportedValuesOf("timeZone");
const result: {
  location: string;
  timezone: string | null;
  timezoneShort: string | null;
}[] = [];

for (const zone of ianaZones) {
  const dt = DateTime.now().setZone(zone);

  result.push({
    location: zone,
    timezone: dt.offsetNameLong,
    timezoneShort: dt.offsetNameShort,
  });
}

writeFileSync("../data/timezones.json", JSON.stringify(result, null, 2));

console.log("Generated timezones.json with", result.length, "entries");
