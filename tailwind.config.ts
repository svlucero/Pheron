import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#4f6ef5", // Blue-indigo
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f0f4ff",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#e8eeff",
          foreground: "#1e3a8a",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
