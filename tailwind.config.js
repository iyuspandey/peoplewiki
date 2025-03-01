/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00ff00',
        secondary: '#0f0',
        background: '#121212',
        'card-bg': '#1e1e1e',
        'text': '#e0e0e0',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'matrix-fall': 'matrix-fall 20s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { textShadow: '0 0 5px rgba(0, 255, 0, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(0, 255, 0, 0.8)' },
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};