/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        accent: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        wave: {
          dark: '#2D2825',
          light: '#5A4D41',
          orange: '#F29100',
        },
      },
    },
  },
  plugins: [],
}
