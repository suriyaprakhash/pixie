import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {

      "background-bg": "rgba(var(--background-bg))",

      "primary-text": "rgba(var(--primary-text))",
      "secondary-text": "rgba(var(--secondary-text))",

      "text-area-bg": "rgba(var(--text-area-bg))",
      "text-area-text": "rgba(var(--text-area-text))",

      "button-bg": "rgba(var(--button-bg))",
      "button-text": "rgba(var(--button-text))",
      "button-bg-hover": "rgba(var(--button-bg-hover))",
      "button-text-hover": "rgba(var(--button-text-hover))",

    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
