import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        starwarsoutline: ["starwars-outline", "sans-serif"],
        starwarsalternate: ['starwars-alternate', 'sans-serif']
      },
      colors: {
        'light-gray': 'rgb(30, 33, 45)',
        'yellow-sw': '#ffcc00',
        'yellow-sw-hover': '#bc9803',
      }
    },
  },
  plugins: [],
};
export default config;
