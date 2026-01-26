/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        "10xl": "104rem",
      },
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        bengali: ['"Noto Sans Bengali"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          primary: "#0F172A", // deep navy (trust, power)
          accent: "#F59E0B", // warm amber (Ramadan, CTA)
        },
        text: {
          primary: "#0F172A", // main text
          secondary: "#475569", // supporting text
          inverse: "#FFFFFF", // text on dark/CTA
        },
        surface: {
          base: "#FFFFFF", // page background
          soft: "#F8FAFC", // section background
          dark: "#020617", // footer / dark areas
        },
        border: {
          subtle: "#E2E8F0",
        },
        button: {
          primary: "#F59E0B", // CTA
          accent: "#FBBF24", // hover / highlight
        },
        bg: {
          primary: "#FFFFFF",
          accent: "#FFF7ED", // light Ramadan tone
          card: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
