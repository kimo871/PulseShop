/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter_24pt-Regular.ttf', 'sans-serif'],
        'inter-medium': ['Inter_24pt-Medium', 'sans-serif'],
        'inter-semibold': ['Inter_24pt-SemiBold', 'sans-serif'],
        'inter-bold': ['Inter_24pt-Bold.ttf', 'sans-serif'],
      },
    },
  },
  plugins: [],
}