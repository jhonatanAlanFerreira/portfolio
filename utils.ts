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

export function getTomorrowWeatherUrl(lat: number, lon: number): string {
  const { TOMORROW_API_KEY, TOMORROW_URL } = process.env;

  if (!TOMORROW_API_KEY || !TOMORROW_URL) {
    throw new Error("Tomorrow.io env variables missing");
  }

  const params = new URLSearchParams({
    location: `${lat},${lon}`,
    apikey: TOMORROW_API_KEY,
    timesteps: "1h,1d",
  });

  return `${TOMORROW_URL}?${params.toString()}`;
}
