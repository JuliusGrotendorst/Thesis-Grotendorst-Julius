import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          text:         "#5A1822",
          muted:        "#7A2A36",
          subtle:       "#A85565",
          border:       "#F4D8DA",
          bg:           "#FFF8F8",
          soft:         "#FCEDEE",
          warm:         "#F9DFE2",
          accent:       "#CC1728",
          "accent-soft":"#FFE0E2",
          dark:         "#3B2A1F",
          success:      "#6BAD7A",
          warning:      "#F0A954",
          danger:       "#CC1728",
        },
        neutral: {
          50:  "#F7F7F8",
          100: "#ECECEE",
          200: "#D9DDE3",
          400: "#9AA3AE",
          600: "#6B7280",
          800: "#1F2329",
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
