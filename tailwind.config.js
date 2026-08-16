/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0F',
          surface: '#13131A',
          border: '#232330',
          muted: '#9A9AA5',
          text: '#F5F5F7',
        },
        paper: {
          DEFAULT: '#FAFAFA',
          surface: '#FFFFFF',
          border: '#E6E6EB',
          muted: '#5A5A66',
          text: '#111114',
        },
        accent: {
          violet: '#7C5CFF',
          teal: '#00E0C6',
          success: '#3DDC97',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(124, 92, 255, 0.45)',
        'glow-teal': '0 0 40px -10px rgba(0, 224, 198, 0.4)',
        card: '0 8px 30px -12px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'grid-fade': {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'grid-fade': 'grid-fade 8s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
