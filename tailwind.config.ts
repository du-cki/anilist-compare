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
        "light-mode": "#FFFFFF",
        "light-text": "black",
        "dark-mode": "#111111",
        "dark-text": "white",
      },
    },
  },
  plugins: [],
};
export default config;
