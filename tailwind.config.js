/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2F3B94', dark: '#1B2569', deep: '#101a4d', tint: '#E9ECF8' },
        ink: '#14202E',
        mist: '#F4F6F8',
        slate2: '#4A5565',
      },
      fontFamily: {
        sans: ['Inter', 'Sarabun', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
