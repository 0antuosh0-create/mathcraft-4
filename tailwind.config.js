/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Vazirmatn', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        vazir: ['Vazirmatn', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      colors: {
        paper: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f4f4f5',
          300: '#e4e4e7',
          border: '#e2e8f0',
        },
        studio: {
          950: '#07090e',
          900: '#0b0f17',
          850: '#101622',
          800: '#172033',
          700: '#23304a',
        }
      },
      boxShadow: {
        paper: '0 4px 20px -2px rgba(0,0,0,0.12), 0 20px 40px -15px rgba(0,0,0,0.18)',
        studio: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(0,0,0,0.3)',
        card: '0 1px 3px rgba(0,0,0,0.04)',
      }
    },
  },
  plugins: [],
}
