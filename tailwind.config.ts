import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0F2A1E",
        "bg-deep": "#0A2016",
        surface: "#16382A",
        "surface-2": "#1C4433",
        line: "#2A5642",
        cream: "#F4EFE2",
        "cream-dim": "#C9C4B4",
        gold: "#D6AD55",
      },
      fontFamily: {
        tajawal: ["var(--font-tajawal)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;