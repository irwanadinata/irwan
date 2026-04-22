/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-fira)', 'ui-monospace'],
      },
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        dark: {
          900: '#0a0f1e',
          800: '#0d1424',
          700: '#111827',
          600: '#1a2235',
          500: '#1f2d45',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow':  'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #22d3ee44, 0 0 20px #22d3ee22' },
          to:   { boxShadow: '0 0 20px #22d3ee88, 0 0 40px #22d3ee44' },
        },
      },
    },
  },
  plugins: [],
};
