/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const {nextui} = require("@nextui-org/react");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./core/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
    screens: {
      'small': '640px',   // Small devices (phones)
      'md': '768px',   // Medium devices (tablets)
      'large': '1024px',  // Large devices (desktops)
      'xl': '1280px',  // Extra large devices (large desktops)
      '2xl': '1536px', // Custom size
    },
  },
  },
  plugins: [nextui()],
});
