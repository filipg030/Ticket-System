/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rose': {
          '50': '#fef1f8',
          '100': '#fee5f2',
          '200': '#fecce6',
          '300': '#ffa2d2',
          '400': '#fd69b1',
          '500': '#f72585',
          '600': '#e81a6e',
          '700': '#ca0c54',
          '800': '#a70d45',
          '900': '#8b103c',
          '950': '#550220',
        },
        'seagull': {
          '50': '#f1fafe',
          '100': '#e1f4fd',
          '200': '#bde9fa',
          '300': '#83d9f6',
          '400': '#4cc9f0',
          '500': '#18afdf',
          '600': '#0b8dbe',
          '700': '#0a719a',
          '800': '#0d5f7f',
          '900': '#114f69',
          '950': '#0b3246',
        },

      },
    },
  },
  plugins: [],
}

