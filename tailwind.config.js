const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(drawer|toast|modal|spinner).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }, colors: {
        primary: '#2A84E9' // Este es un ejemplo de un color verde agua.
      }
    },
  },
  plugins: [nextui(),heroui()],
};


