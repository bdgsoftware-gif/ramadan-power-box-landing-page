/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        xl: "36rem", // 576px
        "2xl": "42rem", // 672px
        "3xl": "48rem", // 768px
        "4xl": "56rem", // 896px
        "5xl": "64rem", // 1024px
        "6xl": "72rem", // 1152px
        "7xl": "80rem", // 1280px
        "8xl": "88rem", // 1408px
        "9xl": "96rem", // 1536px
        "10xl": "104rem", // 1664px
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
          faq: "#FFFBF4",
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        "button-shake": "shake 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shake: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "10%, 30%, 50%": { transform: "rotate(-2deg)" },
          "20%, 40%, 60%": { transform: "rotate(2deg)" },
          "70%, 90%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
