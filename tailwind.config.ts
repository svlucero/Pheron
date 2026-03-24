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
          DEFAULT: "#8b5cf6", // Violet
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f5f3ff",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#ede9fe",
          foreground: "#5b21b6",
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
