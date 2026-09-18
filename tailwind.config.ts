import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './nas-tim.html', './usluge/**/*.html', './src/**/*.{ts,js}'],
  theme: {
    extend: {
      colors: {
        ink:     { 950: '#04141A', 900: '#071F26' },
        petrol:  { 800: '#0B2E36', 700: '#0E3F47', 600: '#12545F', 500: '#176B77' },
        mint:    { 300: '#9FD4CE', 100: '#DCEDEA' },
        gold:    { 600: '#B08E4F', 500: '#C8A96B', 300: '#DCC08C', 100: '#F2E7CE' },
        ivory:   { 50: '#FBF9F5', 100: '#F5F1EA', 200: '#EAE4D9' },
        stone:   { 500: '#8A8579', 300: '#B9B4A9' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(7,31,38,0.14)',
        lift: '0 26px 60px -20px rgba(7,31,38,0.28)',
        gold: '0 18px 40px -16px rgba(200,169,107,0.45)',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: { container: '1280px' },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'slow-zoom': 'slow-zoom 18s ease-out both',
        shimmer: 'shimmer 2.6s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
