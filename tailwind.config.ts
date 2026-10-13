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
        background: "rgb(9, 9, 11)",
        surface: "rgb(29, 32, 37)",
        "neon-green": "rgb(0, 255, 106)",
        cyan: "rgb(0, 255, 255)",
        blue: "rgb(168, 215, 231)",
        "light-blue": "rgb(120, 181, 255)",
        purple: "rgb(192, 132, 252)",
        yellow: "rgb(250, 204, 21)",
        red: "rgb(248, 113, 113)",
        white: "rgb(255, 255, 255)",
        muted: "rgb(120, 120, 120)",
        border: "rgb(60, 60, 60)",
      },
      screens: {
        tablet: "810px",
        desktop: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
