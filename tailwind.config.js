import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        dotted: "radial-gradient(currentColor 1px, transparent 1px)",
      },
      backgroundSize: {
        dotted: "1px 1px",
      },
      screens: {
        elephant1: "1373px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
