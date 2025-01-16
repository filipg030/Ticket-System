/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '1/10':'10%'
      },
      colors: {
        "zslorange": {
          50: "#FFF4EB",
          100: "#FFE7D1",
          200: "#FFCEA4",
          300: "#FEB676",
          400: "#FE9D48",
          500: "#FE851A",
          600: "#EB6D01",
          700: "#B25301",
          800: "#753700",
          900: "#3D1D00",
          950: "#1E0E00",
          DEFAULT:"#FE851A"
        },
        'zslblue': {
          50: "#EBEFF4",
          100: "#DBE1EB",
          200: "#B3C0D5",
          300: "#8FA2C2",
          400: "#6881AC",
          500: "#4E658E",
          600: "#384966",
          700: "#2A364C",
          800: "#1D2635",
          900: "#0E131A",
          950: "#07090D",
          DEFAULT:"#4E658E"
        },
    

      },
    },
  },
  plugins: [],
}

