/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          50: '#F3F7F4',
          100: '#E3EDE6',
          200: '#C4DCCB',
          300: '#9EBEA7',
          400: '#5F956D',
          500: '#2D6A4F', // Core garden deep green
          600: '#23553E',
          700: '#1B4332',
          800: '#143326',
          900: '#0D2118',
          950: '#07130E',
        },
        terracotta: {
          50: '#FDF7F3',
          100: '#F9EDE4',
          200: '#F3D8C6',
          300: '#E7B89B',
          400: '#DB926B',
          500: '#D97736', // Warm earthy amber/terracotta accent
          600: '#BF5F23',
          700: '#994819',
          800: '#7A3815',
          900: '#642E13',
        },
        cream: {
          50: '#FCFAF6',
          100: '#FAF6EF',
          200: '#F4ECE0',
          300: '#ECE0CE',
          400: '#E1D0B8',
          500: '#C8B294',
        },
        charcoal: {
          900: '#181A19',
          800: '#282C2A',
          700: '#3D4240',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
