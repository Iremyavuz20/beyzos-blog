import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        bodoni: ["var(--font-bodoni)", "serif"],
        allura: ["var(--font-allura)", "cursive"],
        script: ["var(--font-script)", "cursive"],
      },
      margin: {
        custom: "120px", // ml-custom
      },
    },
  },
  plugins: [typography],
};

export default config;
