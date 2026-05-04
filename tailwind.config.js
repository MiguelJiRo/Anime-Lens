/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        ink: {
          950: '#0a0716',
          900: '#0f0a24',
          800: '#1a1238',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'aurora': 'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(236,72,153,0.18), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 100%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(56,189,248,0.10), transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'aurora-shift': 'aurora 18s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%':      { transform: 'translate3d(2%, -2%, 0) scale(1.05)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-pink':   '0 10px 40px -10px rgba(236, 72, 153, 0.55)',
        'glow-purple': '0 10px 40px -10px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
