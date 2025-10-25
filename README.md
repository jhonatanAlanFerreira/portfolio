# Full Stack Portfolio

This is a **personal portfolio project** built with [Next.js](https://nextjs.org), showcasing my work and projects as a **Full Stack Developer**.  
It highlights practical experience in frontend and backend development and component architecture.

---

## 🕒 Timezone Data

The `timezones.json` file, which contains all mapped timezones, is **auto-generated** by the script:

```
scripts/generateTimezones.ts
```

This script uses [Luxon](https://moment.github.io/luxon/) to handle timezone logic, ensuring accurate and up-to-date data.

---

## 🌦️ API Integrations

### Timezone Component

- Does **not** use any external API.
- Fully built with **Luxon abstractions** for time calculations and conversions.

### Weather Widget

- Uses `api64.ipify.org` for IP detection in **local development** and **Vercel’s IP service** in production.
- Retrieves location data from `http://ip-api.com/json`.
- Fetches weather data from `https://api.open-meteo.com`.
- The entire widget is custom built in **React**, without external UI libraries.

---

## ✨ Additional Features

- **Cursor Effect:** Created using [React Bits](https://reactbits.dev/).
- **Animated Interface:** Built with **Framer Motion** for transitions and effects.
- **Responsive Design:** Works across devices with modern CSS and Tailwind utilities.

---

## 🧑‍💻 Author

**Jhonatan Ferreira**  
Full Stack Developer | React, Remix, Node.js, and TypeScript  
[LinkedIn](https://www.linkedin.com/in/jhonatan-alan-ferreira)
