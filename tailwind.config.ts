/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Esto es crucial para el funcionamiento del tema
  theme: {
    extend: {
      colors: {
        // Definimos colores personalizados para cada tema
        background: {
          light: '#ffffff',
          dark: '#0f1b2d',
        },
        primary: {
          light: '#232f3e',
          dark: '#ffffff',
        }
      },
    },
  },
  plugins: [],
}