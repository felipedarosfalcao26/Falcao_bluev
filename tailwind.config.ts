import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f2f6fb',
          100: '#e3ecf7',
          900: '#050b16',
          950: '#02060c',
        },
        blue: {
          50: '#eef6ff',
          100: '#dcedff',
          200: '#b3dbff',
          300: '#7ac2ff',
          400: '#3ea3ff',
          500: '#0b7fff',
          600: '#005fe0',
          700: '#0049ad',
          800: '#053a85',
          900: '#0a2f66',
          950: '#071b3d',
        },
        volt: {
          400: '#5eead4',
          500: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1360px',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, transparent, rgba(2,6,12,0.9))',
      },
    },
  },
  plugins: [],
};

export default config;
