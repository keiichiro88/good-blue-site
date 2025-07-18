/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'off-white': '#F5F5F5',
        'sage-green': '#7C9B8E',
        'dark-brown': '#4A3C31',
        'good-blue-gold': '#8B7355',
        'good-blue-brown': '#6B5D54',
        'good-blue-light': '#F5F2ED',
        'good-blue-cream': '#FBF7F0',
      },
      fontFamily: {
        'sans': ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};