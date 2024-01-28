/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat Variable', ...defaultTheme.fontFamily.sans],
        mono: ['Red Hat Mono Variable', ...defaultTheme.fontFamily.mono],
        icon: ['Material Icons Outlined']
      },
      colors: {
        'primary': '#C9A3FF',
        'primary-dark': '#8463B3'
      }
    },
  },
  plugins: [],
};
