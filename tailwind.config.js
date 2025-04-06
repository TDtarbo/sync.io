/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#1a1c3d",
        "primary-100": "#171a36",
        "primary-200": "#151830",
        "primary-300": "#131529",
        "primary-400": "#101222",
        "primary-500": "#0d101c",
        "primary-600": "#0b0d17",
        "primary-700": "#090a12",
        "primary-800": "#06070c",
        "primary-900": "#040408",
        "primary-950": "#020204",
      }
      
    },
  },
  plugins: [require("daisyui")],
};
