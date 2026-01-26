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
        anekBangla: ['"Anek Bangla"', ...defaultTheme.fontFamily.sans],
        ebGaramond: ['"EB Garamond"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        brand: {
          primary: "#0F172A", // deep navy (trust, power)
          accent: "#F59E0B", // warm amber (Ramadan, CTA)
        },
        text: {
          primary: "#1F2A24", // main text
          secondary: "#475569", // supporting text
          inverse: "#FFFFFF", // text on dark/CTA
          golden: "#FFD567",
          accent: "#008000",
          dark: "#1F2A24",
        },
        surface: {
          base: "#FFFFFF", // page background
          soft: "#F8FAFC", // section background
          dark: "#020617", // footer / dark areas
        },
        border: {
          subtle: "#E2E8F0",
          accent: "#C9A14A", // hover / highlight
        },
        button: {
          primary: "#F59E0B", // CTA
          accent: "#D08700", // hover / highlight
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
