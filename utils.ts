export function formatWorkPeriod(startDate: string, endDate?: string): string {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const start = new Date(startYear, startMonth - 1, 1);
  const end = endDate
    ? new Date(
        endDate.split("-").map(Number)[0],
        Number(endDate.split("-")[1]) - 1,
        1,
      )
    : new Date();

  const startMonthStr = start.toLocaleString("en-US", { month: "short" });
  const startYearStr = start.getFullYear();
  const endMonthStr = endDate
    ? end.toLocaleString("en-US", { month: "short" })
    : "Present";
  const endYearStr = endDate ? end.getFullYear() : "";

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const durationParts = [];
  if (years > 0) durationParts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) durationParts.push(`${months} mo${months > 1 ? "s" : ""}`);

  const duration =
    durationParts.length > 0 ? ` • ${durationParts.join(" ")}` : "";

  return `${startMonthStr} ${startYearStr} – ${endMonthStr}${
    endYearStr ? " " + endYearStr : ""
  }${duration}`;
}

export function getGoogleCaptchaLink(token: string): string {
  const { RECAPTCHA_SECRET_KEY, RECAPTCHA_VERIFY_URL } = process.env;

  if (!RECAPTCHA_SECRET_KEY || !RECAPTCHA_VERIFY_URL) {
    throw new Error("Captcha env variables missing");
  }

  return `${RECAPTCHA_VERIFY_URL}?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;
}

export function getOpenMeteoWeatherUrl(lat: number, lon: number): string {
  const { OPEN_METEO_URL } = process.env;

  if (!OPEN_METEO_URL) {
    throw new Error("Open-Meteo env variable missing");
  }

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    current:
      "is_day,temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    timezone: "auto",
  });

  return `${OPEN_METEO_URL}?${params.toString()}`;
}

export function getIpifyUrl(): string {
  const { IPIFY } = process.env;

  if (!IPIFY) {
    throw new Error("IPIFY env variable missing");
  }

  return IPIFY;
}

export function getIpApiUrl(ip: string): string {
  const { IP_API_URL, IP_API_FIELDS } = process.env;

  if (!IP_API_URL || !IP_API_FIELDS) {
    throw new Error("IP API environment variables missing");
  }

  return `${IP_API_URL}/${ip}?fields=${IP_API_FIELDS}`;
}
