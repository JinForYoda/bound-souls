import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09090f",
        panel: "#11141d",
        ember: "#ffb66d",
        mist: "#8eb5ff",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', "sans-serif"],
        display: ['"Cormorant Garamond"', "serif"],
      },
      boxShadow: {
        panel: "0 18px 80px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;

