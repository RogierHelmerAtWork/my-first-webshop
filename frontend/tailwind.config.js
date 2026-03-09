/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'light-pink': '#fdf2f8',
        'mid-pink': '#f9d8e8',
        'dark-pink': '#e07a9a',
        'almost-black': '#1a0f16',
      },
    },
  },
  plugins: [],
}